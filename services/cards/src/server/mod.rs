#[macro_use]
mod macros;

pub mod tests;

use crate::fetch as cards;
use cards::SearchWeight;

pub type Cards = Vec<cards::RawCard>;

pub type Weights = Vec<RequestWeights>;

#[derive(Debug, Deserialize, Serialize)]
pub struct Request {
  pub query: String,
  pub action: String,
  pub weights: Option<Weights>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct RequestWeights {
  pub atk: Option<usize>,
  pub def: Option<usize>,
  pub attr: Option<String>,
  pub level: Option<usize>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ProcessError {
  pub status: usize,
  pub message: String,
}

pub fn process (
  socket: &zmq::Socket,
  mut message: &mut zmq::Message
) {
  match process_message(socket, &mut message) {
    Ok(request) => match process_request(&request) {
      Ok(result) => match process_response::<Cards>(&result) {
        Ok(resp) => send_buffer!(
          socket,
          &resp
        ),
        Err(error) => send_buffer!(
          socket,
          &process_response::<ProcessError>(&error)
            .expect("cannot generate response.")
        )
      },
      Err(error) => send_buffer!(
        socket,
        &process_response::<ProcessError>(&error)
          .expect("cannot generate response.")
      ),
    },
    Err(error) => if error.status != 5000 {
      send_buffer!(
        socket,
        &process_response::<ProcessError>(&error)
          .expect("cannot generate response.")
      )
    }
  }
}

fn process_message (
  socket: &zmq::Socket,
  mut message: &mut zmq::Message
) -> Result<Request, ProcessError> {
  if let Ok(_) = socket.recv(&mut message, 0) {
    let msg = message.as_str().unwrap_or_else(|| "");

    match serde_json::from_str::<Request>(&msg) {
      Ok(request) => Ok(request),
      Err(error) => match error {
        _ => Err(gen_error("Invalid Request", 1000))
      },
    }
  } else {
    Err(gen_error("No Message Sent", 5000))
  }
}

fn process_request (
  req: &Request,
) -> Result<Cards, ProcessError> {
  use cards::FetchError;

  match req.get_action().as_ref() {
    "fetch" => match cards::get(&req.get_query()) {
      Ok(card) => Ok(vec![card]),
      Err(error) => match error {
        FetchError::NoSuchCard => Err(
          gen_error(
            &format!("Card: {}, not found", req.get_query()),
            1100,
          ),
        ),
        _ => Err(
          gen_error(
            "Invalid Error",
            4000,
          )
        ),
      }
    },
    "search" => match cards::search(&req.get_action(), req.get_weights()) {
      Ok(cards) => Ok(cards),
      Err(error) => match error {
        _ => Err(
          gen_error(
            "Invalid Error",
            4000,
          )
        ),
      }
    }
    _ => Err(gen_error("Invalid Request.", 1050))
  }
}


fn process_response<T> (resp: &T) -> Result<String, ProcessError>
  where T: serde::Serialize
{
  use serde_json::to_string as as_string;

  if let Ok(res) = as_string::<T>(resp) {
    Ok(res)
  } else {
    Err(gen_error("Unable to parse response.", 1250))
  }
}

fn gen_error (error: &str, status: u32) -> ProcessError {
  ProcessError {
    status: status as usize,
    message: error.to_string(),
  }
}

impl Request {
  pub fn get_query (&self) -> String {
    self.query.to_lowercase()
  }

  pub fn get_action (&self) -> String {
    self.action.to_lowercase()
  }

  pub fn get_weights (&self) -> Vec<SearchWeight> {
    let mut search_weights = vec![];

    if let Some (weights) = &self.weights {
      for wght in weights {
        if let Some (atk) = &wght.atk {
          search_weights.push(
            SearchWeight::Atk(*atk)
          )
        } else if let Some (def) = &wght.def {
          search_weights.push(
            SearchWeight::Def(*def)
          )
        } else if let Some (attr) = &wght.attr {
          search_weights.push(
            SearchWeight::Attribute(
              attr.to_owned()
            )
          )
        } else if let Some (level) = &wght.level {
          search_weights.push(SearchWeight::Level(*level))
        }
      }
    }

    search_weights
  }
}
