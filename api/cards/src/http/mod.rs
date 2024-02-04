mod structure;

use serde::Deserialize;

use structure::YUG_API_URL;
pub use structure::IncomingCardInfo;
pub use structure::ResponseError as OutgoingError;
pub use structure::{IncomingRequest, OutgoingResponse};

type ResponseInfo = std::result::Result<Vec<IncomingCardInfo>, ResponseError>;

#[derive(Debug, Deserialize)]
pub struct ResponseError {
    message: String,
    cause: String,
    code: i16,
}

#[derive(Debug, Deserialize)]
struct IncomingResponse {
    error: Option<String>,
    data: Vec<IncomingCardInfo>
}

pub fn fetch_card(name: &str) -> ResponseInfo {
    match ureq::get(&format!("{}&name={}", YUG_API_URL, name)).call() {
        Ok(response) => {
            match response.status() {
                200 => match response.into_json::<IncomingResponse>() {
                    Ok(r) => Ok(r.data),
                    Err(_error) => Err(ResponseError {
                        message: "unable to parse incoming response.".to_string(),
                        cause: _error.to_string(),
                        code: 500
                    })
                },
                404 => match response.into_json::<IncomingResponse>() {
                    Ok(r) => Err(ResponseError {
                        message: "invalid card.".to_string(),
                        cause: r.error.unwrap(),
                        code: 404
                    }),
                    Err(_error) => Err(ResponseError {
                        message: "unable to parse incoming response.".to_string(),
                        cause: _error.to_string(),
                        code: 500
                    })
                }
                _ => Err(ResponseError {
                    message: format!("invalid code: {}", response.status()),
                    cause: "unable to decern endpoint".to_owned(),
                    code: 500,
                }) 
            }
        }
        ,
        Err(_error) => Err(ResponseError {
            message: "invalid card input.".to_string(),
            cause: _error.to_string(),
            code: 500
        }) 
    }
}
