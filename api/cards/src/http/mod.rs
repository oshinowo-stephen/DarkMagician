mod structure;

use serde::Deserialize;

use structure::YUG_API_URL;
pub use structure::IncomingCardInfo;
pub use structure::ResponseError as OutgoingError;
pub use structure::{IncomingRequest, OutgoingResponse};

type IncomingData = Vec<IncomingCardInfo>;
pub type Response = std::result::Result<IncomingData, ResponseError>;

#[derive(Debug)]
pub enum ResponseError {
    OTHER,
    PARSE,
    NOT_FOUND,
}

#[derive(Debug, Deserialize)]
struct IncomingResponse {
    error: Option<String>,
    data: Option<IncomingData>
}

pub fn fetch_card(name: &str) -> Response {
    match ureq::get(&format!("{}&fname={}", YUG_API_URL, name)).call() {
        Ok(resp) => match resp.into_json::<IncomingResponse>() {
            Ok(incoming_resp) => if let Some(data) = incoming_resp.data {
               if !data.is_empty() {
                    Ok(data)
               } else {
                    Err(ResponseError::NOT_FOUND)
               }    
            } else {
                Err(ResponseError::NOT_FOUND)
            },
            Err(_) => Err(ResponseError::PARSE)
        },
        Err(_) => Err(ResponseError::NOT_FOUND)
    }
}
