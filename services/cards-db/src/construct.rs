use super::http;
use super::storage;

#[derive(Clone)]
pub struct AppState {
	pub conn: storage::Connection,
}

#[derive(Debug)]
pub struct RequestCardData {
	pub name: String,
	pub opts: Option<http::RequestOptions>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ReturningCardEntry {
	card_data: storage::models::EntryCard,
	card_img_data: Vec<storage::models::EntryCardImg>,
	card_set_data: Vec<storage::models::EntryCardSet>,
	// card_market_data: Vec<storage::models::EntryCardPrice>,
	card_format_data: storage::models::EntryCardFormat,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ReturningResponse {
	pub p: Option<ReturningCardEntry>,
	pub status: u32,
	pub clause: Option<String>,
}

pub enum RequestError {
	INVALID,
}

const BASE_MARKET_URI: &str = "https://www.tcgplayer.com/search/yugioh";

pub type Result<T> = std::result::Result<T, RequestError>;

pub fn get_response_body(
	p: Option<ReturningCardEntry>,
	clause: String,
	status: u32,
) -> ReturningResponse {
	if clause.is_empty() {
		ReturningResponse {
			p,
			status,
			clause: None,
		}
	} else {
		ReturningResponse {
			p: None,
			status,
			clause: Some(clause),
		}
	}
}

pub fn get_requested_card(
	data: RequestCardData,
	conn: storage::Connection,
) -> Result<ReturningCardEntry> {
	let card_data: storage::models::EntryCard;
	let card_img_data: Vec<storage::models::EntryCardImg>;
	let card_set_data: Vec<storage::models::EntryCardSet>;
	// let card_market_data: storage::models::EntryCardPrice;
	let mut card_format_data: storage::models::EntryCardFormat;

	if let Ok(incoming_card) = storage::fetch_card_data(&data.name, conn.clone()) {
		card_data = incoming_card;
	} else {
		if let Ok(incoming_cards) = http::fetch_cards(&data.name, None) {
			let _data = incoming_cards[0].clone();

			card_data = storage::models::EntryCard {
				name: _data.name.clone(),
				card_desc: _data.desc.clone(),
				card_race: _data.race.clone(),
				card_type: _data.r#type.clone(),
				_atk: _data.atk,
				_def: _data.def,
				_lvl: _data.level,
				_lval: _data.linkval,
				_scale: _data.scale,
				_markers: if let Some(markers) = _data.linkmarkers {
					let m = markers.join(",");
					Some(m)
				} else {
					None
				},
				_has_effect: if _data.misc_info[0]
					.has_effect
					.is_some()
				{
					Some(String::new())
				} else {
					None
				},
			};

			if let Err(s_error) = storage::insert_card_data(&card_data, conn.clone()) {
				eprintln!("Unable to store card_data, reason: {:?}", s_error);
			}
		} else {
			return Err(RequestError::INVALID);
		}
	}

	if let Ok(incoming_images) = storage::fetch_card_image_data(&data.name, conn.clone()) {
		card_img_data = incoming_images;
	} else {
		let mut outgoing_images: Vec<storage::models::EntryCardImg> = Vec::new();
		let incoming_card_data = http::fetch_cards(&data.name, None).expect("cannot fetch card data.");
		let _data = incoming_card_data[0].clone();

		for img in _data.card_images {
			let card_image = storage::models::EntryCardImg {
				card_name: data.name.clone(),
				card_img: img.image_url,
				card_img_small: img.image_url_small,
			};

			if let Err(s_error) = storage::insert_card_image_data(&card_image, conn.clone()) {
				eprintln!("Ubnable to store card_image, reason: {:?}", s_error);
			}

			outgoing_images.push(card_image);
		}

		card_img_data = outgoing_images;
	}

	if let Ok(incoming_card_set) = storage::fetch_card_set_data(&data.name, conn.clone()) {
		card_set_data = incoming_card_set;
	} else {
		if let Ok(incoming_card_data) = http::fetch_cards(&data.name, None) {
			let mut outgoing_sets: Vec<storage::models::EntryCardSet> = Vec::new();
			let _data = incoming_card_data[0].clone();

			if let Some(sets) = _data.card_sets {
				for set in sets {
					let card_set = storage::models::EntryCardSet {
						set_name: set.set_name.clone(),
						set_release: String::from("some_data"),
						set_market: format!("/{}/{}?grid=Yes", BASE_MARKET_URI, &set.set_name),
						card_name: data.name.clone(),
					};

					if let Err(s_error) = storage::insert_card_set_data(&card_set, conn.clone()) {
						eprintln!("Unable to store card_set,  reason: {:?}", s_error);
					}

					outgoing_sets.push(card_set);
				}
			}

			card_set_data = outgoing_sets;
		} else {
			return Err(RequestError::INVALID);
		}
	}

	// card_market_data = None;
	if let Ok(incoming_card_format) = storage::fetch_card_format_data(&data.name, conn.clone()) {
		card_format_data = incoming_card_format
	} else {
		card_format_data = storage::models::EntryCardFormat {
			card_name: data.name.clone(),
			_tcg_limit: 0,
			_ocg_limit: 0,
			_goat_limit: 0,
			_tcg_release: String::new(),
			_ocg_release: String::new(),
		};

		if let Ok(incoming_card_data) = http::fetch_cards(&data.name, None) {
			let _data = incoming_card_data[0].clone();

			if let Some(banlist_info) = _data.banlist_info {
				dbg!(&banlist_info);

				card_format_data._tcg_limit = match banlist_info.ban_tcg {
					Some(limit_type) => match limit_type.as_str() {
						"Limited" => 1,
						"Semi-Limited" => 2,
						_ => 0,
					},
					None => 0,
				};
				
				card_format_data._ocg_limit = match banlist_info.ban_ocg {
					Some(limit_type) => match limit_type.as_str() {
						"Limited" => 1,
						"Semi-Limited" => 2,
						_ => 0,
					},
					None => 0,
				};

				card_format_data._goat_limit = match banlist_info.ban_goat {
					Some(limit_type) => match limit_type.as_str() {
						"Limited" => 1,
						"Semi-Limited" => 2,
						_ => 0,
					},
					None => 0,
				};
			}

			let _misc_data = _data.misc_info[0].clone();

			card_format_data._tcg_release = _misc_data
				.tcg_date
				.unwrap_or_default();

			card_format_data._ocg_release = _misc_data.ocg_date;

			if let Err(s_error) = storage::insert_card_format_data(&card_format_data, conn.clone()) {
				eprintln!("Unable to store card_format, reason: {:?}", s_error);
			}
		} else {
			return Err(RequestError::INVALID);
		}
	}

	Ok(ReturningCardEntry {
		card_data,
		card_img_data,
		card_set_data,
		// card_market_data,
		card_format_data,
	})
}
