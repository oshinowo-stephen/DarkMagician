extern crate tide;
#[macro_use]
extern crate serde;
extern crate dotenv;
#[macro_use]
extern crate diesel;
extern crate async_std;
extern crate secrets_to_env as docker_secrets;

mod storage;
mod construct;

use storage::models;
use construct::AppState;
use construct::GatewayRequest;
use construct::ReturningResponse;

fn load_env() {
    use std::env;

    let app_env = env::var("RUST_ENV").unwrap_or(String::from("dev"));

    if app_env != "prod" || app_env != "production" {
        dotenv::dotenv().ok();
    } else {
        docker_secrets::load().ok();
    }
}

#[async_std::main]
async fn main() -> tide::Result<()> {
    load_env();
    let conn = storage::create_connection();
    let app_state = AppState { conn };
    let mut app = tide::with_state(app_state);

    app.at("/players").post(|mut req: tide::Request<AppState>| async move {
        let app_state = req.state();
        let conn = app_state.conn.clone();
        let GatewayRequest { player_info, .. } = req.body_json().await?;
        let pinfo = player_info.as_ref().unwrap();
        let pid: Option<models::Player>;

        let response_body: ReturningResponse<String>;
        
        if player_info.is_some() {
            pid = Some(models::Player {
                id: pinfo.id.clone(),
                bal: player_info.unwrap().bal.unwrap_or(0)
            })
        } else {
            pid = None
        }

        match storage::insert_player(pid.unwrap(), conn) {
            Ok(_) =>
                response_body = construct::get_response_body(None, String::new(), 200),
            Err(error) =>
                response_body = construct::get_response_body(None, format!("{:?}", error), 500)
        };

        tide::Body::from_json(&response_body)
    });

    app.at("/players/:id").get(|req: tide::Request<AppState>| async move {
        let app_state = req.state();
        let conn = app_state.conn.clone();
        let player_id = req.param("id").unwrap();

        let response_body;

        if let Ok(player) = storage::fetch_player(&player_id, conn) {
            response_body = construct::get_response_body(Some(player), String::new(), 200);
        } else {
            response_body = construct::get_response_body(None, String::from("No such player."), 404) 
        }

        tide::Body::from_json(&response_body)
    });

    app.at("/players/:id/cards").post(|mut req: tide::Request<AppState>| async move {
        let app_state = req.state();
        let conn = app_state.conn.clone();
        let GatewayRequest { player_card_info, .. } = req.body_json().await?;
        let player_id = req.param("id").unwrap();

        let response_body;
        let pcard: Option<models::PlayerCard>;

        if let Some(card_info) = player_card_info {
            pcard = Some(models::PlayerCard {
                holder: player_id.to_string(),
                rarity: card_info.rarity.unwrap_or("N".to_owned()),
                name: card_info.name.clone(),
                amount: card_info.amount.unwrap_or(0)
            })
        } else {
            pcard = None
        }; 

        match storage::insert_player_card(pcard.unwrap(), conn) {
            Ok(_) => 
                response_body = construct::get_response_body(Some(()), String::new(), 200),
            Err(_err) =>
                response_body = construct::get_response_body(None, String::from("Error."), 500)
        }

        tide::Body::from_json(&response_body)
    });

    app.at("/players/:id/cards").get(|req: tide::Request<AppState>| async move {
        let app_state = req.state();
        let conn = app_state.conn.clone();
        let player_id = req.param("id").unwrap();

        let response_body;

        if let Ok(player_cards) = storage::fetch_player_cards(&player_id, conn) {
            if player_cards.is_empty() {
                response_body = construct::get_response_body(None, String::from("No cards."), 404)
            } else  {
                response_body = construct::get_response_body(Some(player_cards), String::new(), 200)
            }
        } else {
            response_body = construct::get_response_body(None, String::from("No such player."), 404) 
        };

        tide::Body::from_json(&response_body)
    });

    app.at("/players/id:/cards/:name").get(|req: tide::Request<AppState>| async move {
        let app_state = req.state();
        let conn = app_state.conn.clone();
        let player_id = req.param("id").unwrap();
        let card_name = req.param("cname").unwrap();

        let response_body;

        if let Ok(p_card) = storage::fetch_player_card(&player_id, &card_name, conn) {
            response_body = construct::get_response_body(Some(p_card), String::new(), 200)
        } else {
            response_body = construct::get_response_body(None, String::from("No such card."), 404) 
        };

        tide::Body::from_json(&response_body)
    });

    println!("Listening on http://127.0.0.1:2500");   
    app.listen("127.0.0.1:2500").await?;
    Ok(())
}