#[macro_use]
extern crate log;
extern crate zmq;
extern crate knil;
extern crate ureq;
#[macro_use]
extern crate serde;
extern crate serde_json;

pub mod fetch;
pub mod parser;
mod server;

fn main() {
  let context = zmq::Context::new();

  knil::construct().expect("cannot construct logger");

  let socket = context.socket(zmq::REP)
    .expect("cannot");

  assert!(socket.bind("tcp://*:4560").is_ok());

  let mut message = zmq::Message::new();

  loop {
    if let Err(error) = server::process(&socket, &mut message) {
      error!("The server ran into an error: {:#?}", error);
    }
  }
}

#[cfg(tests)]
pub use fetch::tests;

#[cfg(tests)]
pub use parser::tests;
