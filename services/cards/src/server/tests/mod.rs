
use std::thread;

use crate::server::Request;

fn start_server () {
  thread::spawn(|| crate::main());
}

#[test]
fn fetch_card () {
  let context = zmq::Context::new();
  let socket = context.socket(zmq::REQ)
    .expect("cannot connect to socket.");

  start_server();

  let mut msg = zmq::Message::new();

  assert!(socket.connect("tcp://127.0.0.1:4560").is_ok());

  assert!(socket.send(&send_test_data("black rose dragon"), 0).is_ok());

  assert!(socket.recv(&mut msg, 0).is_ok());

  println!("Got Message: {:?}", msg.as_str().unwrap());
}

fn send_test_data (card: &str) -> String {
  serde_json::to_string::<Request>(&Request {
    query: String::from(card.to_string()),
    action: String::from("fetch"),
    weights: None,
  }).unwrap()
}
