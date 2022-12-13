mod structure;

use serde::Deserialize;

use structure::YUG_API_URL;
pub use structure::IncomingCardInfo;
pub use structure::ResponseError as OutgoingError;
pub use structure::{IncomingRequest, OutgoingResponse};

pub type Response = std::result::Result<Vec<IncomingCardInfo>, ResponseError>;

#[derive(Debug)]
pub enum ResponseError {
    OTHER,
    PARSE,
    NOT_FOUND,
}

#[derive(Debug, Deserialize)]
struct IncomingResponse {
    error: Option<String>,
    data: Vec<IncomingCardInfo>
}

pub fn fetch_card(name: &str) -> Response {
    match ureq::get(&format!("{}&fname={}", YUG_API_URL, name)).call() {
        Ok(resp) => {
            match resp.into_json::<IncomingResponse>() {
                Ok(incoming_resp) => if !incoming_resp.data.is_empty() {
                    Ok(incoming_resp.data)
                } else {
                    Err(ResponseError::NOT_FOUND)
                }
                Err(_error) => {
                    println!("Failed to parse: {:#?}", _error);

                    Err(ResponseError::PARSE)
                }
            }
        }
        ,
        Err(_error) => {
            println!("Not Found, reason: {:#?}", _error);

            Err(ResponseError::NOT_FOUND)
        }
    }
}
