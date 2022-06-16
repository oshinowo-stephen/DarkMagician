mod raw;
pub use raw::*;
use std::error::Error;
use std::fmt::{self, Display};

#[derive(Debug)]
pub enum HttpError {
	NotFound,
	InvalidInput,
}

pub type RawCards = Vec<RawCard>;

pub type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

const BASE_URL: &str = "https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=yes";

pub fn get_card(name: &str) -> Result<RawCard> {
	if name.is_empty() {
		return Err(Box::new(HttpError::InvalidInput));
	}

	let url = format!("{}&name={}", BASE_URL, name);
	
	let resp: IncomingResponse = ureq::get(&url)
		.call()
		.expect("cannot call this request")
		.into_json()
		.expect("cannot parse json");
	
	if resp.data.is_empty() {
		return Err(Box::new(HttpError::NotFound));
	} else {
		Ok(resp.data[0].clone())
	}
}

// pub async fn search_card(name: &str) -> Result<RawCards> {
// 	if name.is_empty() {
// 		return Err(Box::new(HttpError::InvalidInput));
// 	}

// 	let url = format!("{}&fname={}", BASE_URL, name);

// 	let resp = reqwest::get(url)
// 		.await?
// 		.json::<IncomingResponse>()
// 		.await?;

// 	if resp.data.is_empty() {
// 		Err(Box::new(HttpError::NotFound))
// 	} else {
// 		Ok(resp.data)
// 	}
// }

impl Error for HttpError {}

impl Display for HttpError {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		match self {
			HttpError::NotFound => write!(f, "Card not found"),
			HttpError::InvalidInput => write!(f, "Invalid input"),
		}
	}
}
