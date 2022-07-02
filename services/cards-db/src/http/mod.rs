mod raw;
pub use raw::*;
use std::default::Default;
use std::error::Error;
use std::fmt::{self, Display};

#[derive(Debug)]
pub enum HttpError {
	NotFound,
	InvalidInput,
}

#[derive(Debug)]
pub struct RequestOptions {
	f: bool,
	// card_atk: Option<usize>,
	// card_def: Option<usize>,
	// card_lvl: Option<usize>,
	// card_lval: Option<usize>,
	// card_type: Option<String>,
	// card_race: Option<String>,
}

pub type Result = std::result::Result<Vec<RawCard>, Box<dyn std::error::Error>>;

const CARD_INFO_ENDPOINT: &str = "https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=yes";

pub fn fetch_cards(name: &str, opts: Option<RequestOptions>) -> Result {
	if !name.is_empty() {
		let url = if opts.unwrap_or_default().f {
			format!("{}&fname={}", CARD_INFO_ENDPOINT, name)
		} else {
			format!("{}&name={}", CARD_INFO_ENDPOINT, name)
		};
	
		match ureq::get(&url)
			.call()
		{
			Ok(incoming_call) => match incoming_call
				.into_json::<IncomingResponse>()
			{
				Ok(resp) => Ok(resp.data),
				Err(_e) => Err(Box::new(HttpError::NotFound))
			},
			Err(_e) => Err(Box::new(HttpError::NotFound))
		}
	} else {
		Err(Box::new(HttpError::InvalidInput))
	}
}

impl Error for HttpError {}

impl Default for RequestOptions {
	fn default() -> Self {
		Self {
			f: false,
			// ..Default::default()
		}
	}
}

impl Display for HttpError {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		match self {
			HttpError::NotFound => write!(f, "Card not found"),
			HttpError::InvalidInput => write!(f, "Invalid input"),
		}
	}
}
