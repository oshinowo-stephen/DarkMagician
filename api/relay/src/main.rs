#[macro_use]
extern crate log;
extern crate knil;
extern crate zmq;
extern crate cards;
extern crate dotenv;
extern crate serde_json;
extern crate secrets_to_env as secrets;

mod loadable;
mod queries {

    pub mod decks {

        pub fn handle_query(deck_info: DeckQuery) {
            unimplemented!()
        }

        #[derive(Debug, serde::Deserialize, serde::Serialize)]
        pub struct DeckQuery {
            pub owner: String,
            pub deck_name: String,
            pub cards: Option<Vec<(u8, usize)>>,
        }

    }

    pub mod cards {
       
        use crate::AppState;

        use super::super::cards as card_service;

        pub fn handle_query(card_info: CardQuery, socket: &zmq::Socket, app_state: AppState<card_service::Connection>) {
            let _connection = app_state.conn.clone();

            match card_service::get(card_service::IncomingRequest { 
                card_name: card_info.card_name,
                ..Default::default()
            }, _connection) {
                Ok(payload) => {
                    let p = serde_json::to_string(&payload)
                        .expect("cannot construct payload");
                
                    socket.send(&p, 0)
                        .expect("cannot send this payload.")
                },
                Err(_error) => {
                    match _error {
                        card_service::OutgoingError::NotFound => socket.send("404 | Not Found", 0)
                            .expect("cannot send this payload."),
                        _ => socket.send("500 | Internal Server Error1", 0)
                            .expect("cannot send this payload.")
                    }
                }
            }
        }

        #[derive(Debug, serde::Deserialize, serde::Serialize)]
        pub enum CardAttribute {
            LIGHT,
            DARK,
            WATER,
            EARTH,
            FIRE,
            WIND,
            TRAP,
            SPELL
        }

        pub trait CardConnection {
            fn get_connection(&self) -> card_service::Connection;
        }

        #[derive(Debug, serde::Deserialize, serde::Serialize)]
        pub struct CardQuery {
            pub atk: Option<usize>,
            pub def: Option<usize>,
            pub card_name: String, 
            pub attribute: CardAttribute
        }

        impl Default for CardQuery {
            fn default() -> Self {
                Self {
                    atk: None,
                    def: None,
                    card_name: String::new(),
                    attribute: CardAttribute::SPELL
                }
            } 
        }                

    }

}

use cards as card_service;
use loadable as loadables;

use std::env;

#[derive(Debug, serde::Deserialize, serde::Serialize)]
struct Query<T> {
    data: T
}

#[derive(Debug, serde::Deserialize, serde::Serialize)] 
pub struct AppState<T> {
    pub conn: T
}

fn main() {
    use queries::cards::{self, CardQuery};
    use queries::decks::{self, DeckQuery};

    loadables::load_logger();
    loadables::load_env();

    let context = zmq::Context::new();

    let socket = context.socket(zmq::REP).unwrap();
    let addr = env::var("RELAY_SOCKET_ADDR")
        .unwrap_or("tcp://*:5555".to_owned());

    assert!(socket.bind(&addr).is_ok());

    let mut msg = zmq::Message::new(); 

    let card_conn = card_service::create_connection()
        .expect("Unable to grab the \"cards\" connection");

    info!("Starting socket server on: {}", &addr);
    loop {
        socket.recv(&mut msg, 0).unwrap();

        let message = if msg.as_str().is_some() {
            msg.as_str().unwrap()
        } else {
            eprintln!("invalid message parse.");
            ""          
        };

        if let Ok(incoming_request) = serde_json::from_str::<Query<CardQuery>>(message) {
            if incoming_request.data.card_name.is_empty() {
                socket.send("400 | Bad Request", 0).expect("failed to send socket message.");
            } else {
                cards::handle_query(incoming_request.data, &socket, AppState { 
                    conn: card_conn.clone() 
                })
            }
        } else if let Ok(incoming_request) = serde_json::from_str::<Query<DeckQuery>>(message) {
            if incoming_request.data.deck_name.is_empty() {
                socket.send("400 | Bad Request", 0).expect("failed to send message.")
            } else {
                decks::handle_query(incoming_request.data)
            }
        } else {
            socket.send("400 | Bad Request", 0).expect("failed to send message.")
        }
    }
}
