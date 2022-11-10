#[macro_use]
extern crate log;
extern crate knil;
extern crate zmq;
extern crate cards;
extern crate dotenv;
extern crate secrets_to_env as secrets;

mod loadable;
use loadable as loadables;

use std::env;

fn main() {
    loadables::load_logger();
    loadables::load_env();

    let context = zmq::Context::new();

    let socket = context.socket(zmq::REP).unwrap();
    let addr = env::var("CARD_SOCKET_ADDR")
        .unwrap_or("tcp://*:5555".to_owned());

    assert!(socket.bind(&addr).is_ok());

    let mut msg = zmq::Message::new();   

    info!("Starting socket server on: {}", &addr);
    loop {
        socket.recv(&mut msg, 0).unwrap();
        println!("Got Message: {:#?}", msg.as_str().unwrap());
        socket.send("somethin-somethin", 0).unwrap();
    }
}
