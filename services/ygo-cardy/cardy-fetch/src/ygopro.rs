extern crate ureq;

use std::error::Error;
use std::fmt::{self, Display};

pub type CardResult = Result<Vec<RawCard>, CardError>;

#[derive(Debug)]
pub enum CardError {
	NotFound,
	BadRequest,
	InvalidInput,
	Other(String),
}

#[derive(Debug, Deserialize)]
pub struct APIResponse {
	pub data: Vec<RawCard>
}

#[derive(Debug, Deserialize)]
pub struct RawCard {
	pub id: u32,
	pub race: String,
	pub name: String,
	pub desc: String,
	pub r#type: String,
	pub attribute: String,
	pub archetype: String,
	pub card_sets: Vec<RawCardSet>,
	pub card_images: Vec<RawCardImg>,
	pub card_prices: Vec<RawCardPrice>,
	pub atk: Option<u16>,
	pub def: Option<u16>,
	pub level: Option<u16>,
	pub scale: Option<u16>,
	pub linkval: Option<u16>,
	pub linkmarkers: Option<Vec<String>>,
}

#[derive(Debug, Deserialize)]
pub struct RawCardSet {
	pub set_name: String,
	pub set_price: String,
	pub set_rarity: String,
	pub set_rarity_code: String,
}

#[derive(Debug, Deserialize)]
pub struct RawCardImg {
	pub id: u32,
	pub image_url: String,
	pub image_url_small: String,
}

#[derive(Debug, Deserialize)]
pub struct RawCardPrice {
	pub cardmarket_price: String,
	pub tcgplayer_price: String,
	pub ebay_price: String,
	pub amazon_price: String,
	pub coolstuffinc_price: String,
}

#[derive(Debug, Default)]
pub struct RequestCard {
	pub name: Option<String>,
	pub fname: Option<String>,
}

pub fn get_card (c: RequestCard) -> CardResult {
	let uri: String = if c.name.is_none() && c.fname.is_none() {
		String::new()
	} else if c.name.is_none() && c.fname.is_some() {
		build_req_string(&c.fname.unwrap(), true, None)
	} else {
		build_req_string(&c.name.unwrap(), false, None)
	};

	if uri.is_empty() {
		return Err(CardError::InvalidInput)
	}

	let resp = ureq::get(&uri)
		.set("Content-Type", "application/json")
		.set("Transfer-Encoding", "chunked")
		.call();

	match resp.status() {
		200 => match resp.into_json_deserialize::<APIResponse>() {
			Ok(cards) => Ok(cards.data),
			Err(error) => match error.kind() {
				_ => Err(send_err("other", Some("can't deserialize content")))
			}
		},
		400 => Err(send_err("not_found", None)),
		_ => Err(send_err("bad_request", None)),
	}
}

pub fn get_random () -> CardResult {
	Err(CardError::NotFound)
}

fn build_req_string(
	name: &str,
	fuzzy: bool,
	_options: Option<RequestCard>,
) -> String {
	let base_url: &str = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

	let query = if !fuzzy {
		format!("name={}", name)
	} else {
		format!("fname={}", name)
	};

	format!(
		"{}?{}",
		base_url, query)
}

fn send_err (etype: &str, error: Option<&str>) -> CardError {
	match etype {
		"not_found" => CardError::NotFound,
		"bad_request" => CardError::BadRequest,
		"invalid_input" => CardError::InvalidInput,
		_ => CardError::Other(if error.is_some() {
			error.unwrap().to_string()
		} else {
			format!("UNKNOWN ERROR")
		})
	}
}

impl Display for CardError {
	fn fmt (&self, f: &mut fmt::Formatter) -> fmt::Result {
		match self {
			CardError::NotFound =>
				write!(f, "Card not found."),
			CardError::BadRequest =>
				write!(f, "A Bad Request was made."),
			CardError::InvalidInput =>
				write!(f, "Invalid card input."),
			CardError::Other(s) =>
				write!(f, "An invalid error occurred: {}", s)
		}
	}
}

impl Error for CardError {}
