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
  knil::constructor().expect("cannot construct logger");

  if let Err(error) = server::process() {
    error!("An error occurred: {:#?}", error);
  }
}

#[cfg(tests)]
pub use fetch::tests;

#[cfg(tests)]
pub use parser::tests;
