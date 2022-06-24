extern crate tide;
#[macro_use]
extern crate serde;
extern crate dotenv;
#[macro_use]
extern crate diesel;
extern crate async_std;

mod storage;
mod construct;

use storage::models;
use construct::AppState;
use construct::GatewayRequest;
use construct::ReturningResponse;

#[async_std::main]
async fn main() -> tide::Result<()> {
    dotenv::dotenv().ok();
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

        if let Err(error) = storage::insert_player(pid.unwrap(), conn) {
            response_body = ReturningResponse {
                package: None,
                status: 500,
                clause: Some(format!("{:?}", error)),
            }
        } else {
            response_body = ReturningResponse {
                package: None,
                status: 200,
                clause: None,
            }
        };

        tide::Body::from_json(&response_body)
    });

    app.at("/players/:id").get(|req: tide::Request<AppState>| async move {
        let app_state = req.state();
        let conn = app_state.conn.clone();
        let player_id = req.param("id").unwrap();

        let response_body;

        if let Ok(player) = storage::fetch_player(&player_id, conn) {
            response_body = construct::get_response_body(Some(player), String::new());
        } else {
            response_body = construct::get_response_body(None, String::from("No such player.")) 
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
                response_body = construct::get_response_body(Some(()), String::new()),
            Err(_err) =>
                response_body = construct::get_response_body(None, String::from("Error."))
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
                response_body = construct::get_response_body(None, String::from("No cards."))
            } else  {
                response_body = construct::get_response_body(Some(player_cards),  String::new())
            }
        } else {
            response_body = construct::get_response_body(None, String::from("No such player.")) 
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
            response_body = construct::get_response_body(Some(p_card), String::new())
        } else {
            response_body = construct::get_response_body(None, String::from("No such card.")) 
        };

        tide::Body::from_json(&response_body)
    });

    println!("Listening on http://127.0.0.1:2560");   
    app.listen("127.0.0.1:2560").await?;
    Ok(())
}