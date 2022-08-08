mod raw;
use super::construct::constants;
use super::construct::constants::RAW_API_ENDPOINT as CARD_INFO_ENDPOINT;
pub use raw::*;

use std::error::Error;
use std::fmt::{self, Display};

#[derive(Debug)]
enum HttpError {
	NotFound,
	InvalidInput,
}

pub type Result = std::result::Result<Vec<RawCard>, Box<dyn std::error::Error>>;

pub fn fetch_cards(name: &str, opts: Option<constants::ReqOptions>) -> Result {
	if !name.is_empty() {
		let url = if opts.is_some() && opts.unwrap().f {
			format!("{}&fname={}", CARD_INFO_ENDPOINT, name)
		} else {
			format!("{}&name={}", CARD_INFO_ENDPOINT, name)
		};

		match ureq::get(&url).call() {
			Ok(incoming_call) => match incoming_call.into_json::<IncomingResponse>() {
				Ok(resp) => Ok(resp.data),
				Err(_e) => Err(Box::new(HttpError::NotFound)),
			},
			Err(_e) => Err(Box::new(HttpError::NotFound)),
		}
	} else {
		Err(Box::new(HttpError::InvalidInput))
	}
}

impl Error for HttpError {}

impl Display for HttpError {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		match self {
			HttpError::NotFound => write!(f, "Card not found"),
			HttpError::InvalidInput => write!(f, "Invalid input"),
		}
	}
}
