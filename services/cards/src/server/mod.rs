use crate::fetch as cards;
use std::io;

pub type Weights = Vec<RequestWeights>;

pub type Cards = Vec<cards::RawCard>;

#[derive(Debug, Deserialize)]
pub struct Request {
  pub query: String,
  pub action: String,
  pub weights: Option<Weights>,
}

#[derive(Debug, Deserialize)]
pub struct RequestWeights {
  pub atk: Option<usize>,
  pub def: Option<usize>,
  pub attr: Option<String>,
  pub level: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ProcessError {
  pub error: String,
  pub status: String,
}

pub fn process (
  socket: &zmq::Socket,
  mut msg: &mut zmq::Message,
) -> io::Result<()> {
  match socket.recv(&mut msg, 0) {
    Ok(_) => {
      let message = msg.as_str().unwrap();
      let request = serde_json::from_str::<Request>(&message)
        .expect("cannot parse this message");

      match handle_request(request) {
        Ok(cards) => {
          if let Ok(result) = serde_json::to_string::<Cards>(&cards) {
            socket.send(result.as_bytes(), 0).expect("cannot send");
          } else {
            socket.send("cannot parse".as_bytes(), 0).expect("");
          }
        },
        Err(error) => {
          socket.send("ran into an error".as_bytes(), 0)
            .expect("cannot send")
        }
      }
    },
    Err(error) => {},
  }

  Ok(())
}

fn handle_request (req: Request) -> Result<Cards, ProcessError> {
  match &*req.action.to_lowercase() {
    "fetch" => match cards::get(&req.query) {
      Ok(card) => Ok(vec![card]),
      Err(error) => Err(ProcessError {
        error: String::from("idk"),
        status: String::from("idk"),
      })
    },
    "search" => match cards::search(&req.query, vec![]) {
      Ok(cards) => Ok(cards),
      Err(error) => Err(ProcessError {
        error: String::from("id"),
        status: String::from("idk"),
      })
    },
    _ => Err(ProcessError {
      error: String::from("unknown request action"),
      status: String::from("N/A"),
    })
  }
}
