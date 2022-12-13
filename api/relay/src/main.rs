#[macro_use]
extern crate log;
extern crate knil;
extern crate zmq;
extern crate cards;
extern crate dotenv;
extern crate serde_json;
extern crate secrets_to_env as secrets;

mod loadable;
use loadable as loadables;

use std::env;

#[derive(Debug, serde::Deserialize, serde::Serialize)]
pub struct RequestBody {
    atk: Option<usize>,
    def: Option<usize>,
    owner: Option<String>,
    card_name: Option<String>,
    deck_name: Option<String>,
}

fn main() {
    loadables::load_logger();
    loadables::load_env();

    let context = zmq::Context::new();

    let socket = context.socket(zmq::REP).unwrap();
    let addr = env::var("CARD_SOCKET_ADDR")
        .unwrap_or("tcp://*:5555".to_owned());

    assert!(socket.bind(&addr).is_ok());

    let mut msg = zmq::Message::new();   
    let card_conn = cards::create_connection()
        .expect("Unable to grab the \"cards\" connection");

    info!("Starting socket server on: {}", &addr);
    loop {
        socket.recv(&mut msg, 0).unwrap();
        let incoming_request: RequestBody = serde_json::from_str(msg.as_str().unwrap())
            .expect("cannot parse this request");

        if let Some(card_name) = incoming_request.card_name {
            match cards::get(cards::IncomingRequest { card_name }, card_conn.clone()) {
                Ok(card_payload) => {
                    let payload = serde_json::to_string(&card_payload)
                        .expect("cannot construct payload.");

                    socket.send(&payload, 0)
                        .expect("cannot send this payload");
                },
                Err(_error) => {
                    error!("Error reached: {:#?}", &_error);

                    match _error {
                        cards::OutgoingError::NotFound =>
                            socket.send("404 | Not Found", 0)
                                .expect("cannot send this payload"),
                        _ =>
                            socket.send("500 | Internal Error", 0)
                                .expect("cannot send this payload")
                    }
                }
            }
        }
    }
}
