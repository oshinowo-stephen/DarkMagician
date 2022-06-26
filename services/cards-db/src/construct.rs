use super::http;
use super::storage::{self, models, schema};

use diesel::prelude::*;

use std::error::Error;
use std::fmt::{self, Display};

pub type Result<T> = std::result::Result<T, ConstructError>;

#[derive(Debug, Deserialize)]
pub struct ConstructError {
	pub message: String,
	pub e_type: String, 
}

#[derive(Debug, Deserialize)]
pub struct RequestCard {
	pub name: String,
	pub fuzzy: bool,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ReturningEntry {
	pub entry_card: models::EntryCard,
	pub entry_card_img: Vec<models::EntryCardImg>,
	// pub entry_card_set: Vec<models::EntryCardSet>,
	// pub entry_card_price: Vec<models::EntryCardPrice>,
	// pub entry_card_format: Vec<models::EntryCardFormat>,
}

pub fn fetch_card_entry(pooled: storage::Connection, n: &str) -> Result<ReturningEntry> {
	use schema::entry_card;
	use schema::entry_card_img;
	// use schema::entry_card_set;
	// use schema::entry_card_price;
	// use schema::entry_card_format;
	let temp_conn = pooled.clone();
	
	let _card = match entry_card::dsl::entry_card
		.filter(entry_card::dsl::name.eq(n))
		.get_result::<models::EntryCard>(&temp_conn.get().expect("cannot grab connection"))
	{
		Ok(card) => card.clone(),
		Err(_) => match http::get_card(n) {
			Ok(result) => { 
				let _entry = models::EntryCard {
					name: result.name,
					card_desc: result.desc,
					card_type: result.r#type,
					card_race: result.race,
					_atk: result.atk,
					_def: result.def,
					_lvl: result.level,
					_lval: result.linkval,
					_scale: result.scale,
					_markers: if let Some(markers) = result.linkmarkers {
						Some(markers.join(","))
					} else {
						None
					},
					_has_effect: if !result.misc_info.is_empty() &&
					result.misc_info[0].has_effect.is_some() {
						Some(String::default())
					} else {
						None
					}
				};

				if let Err(error) = diesel::insert_into(entry_card::table) 
					.values(&_entry)
					.execute(&temp_conn.get().expect("cannot grab connection"))
				{
					return Err(ConstructError {
						message: format!("Storage Error: {}", error),
						e_type: "STORAGE/INSERT".to_owned(),
					})
				}

				_entry
			}
			Err(_) => return Err(ConstructError {
				message: "Not Found.".to_owned(),
				e_type: "HTTP/STORAGE".to_owned(),
			})
		}	
	};

	let mut _card_imgs = entry_card_img::dsl::entry_card_img
		.filter(entry_card_img::dsl::card_name.eq(n))
		.load::<models::EntryCardImg>(&temp_conn.get().expect("cannot grab connection"))
		.expect("cannot find loaded images in database!");
	
	if _card_imgs.is_empty() {
		match http::get_card(n) {
			Ok(result) => {
				let mut images: Vec<models::EntryCardImg> = Vec::new();

				for image in result.card_images {
					let _img = models::EntryCardImg {
						card_name: result.name.clone(),
						card_img: image.image_url,
						card_img_small: image.image_url_small,
					};

					diesel::insert_into(entry_card_img::table) 
						.values(&_img)
						.execute(&temp_conn.get().expect("cannot grab connection"))
						.expect("cannot insert image into database!");

					images.push(_img)
				}

				_card_imgs = images
			},
			Err(_) => return Err(ConstructError {
				message: "Not Found.".to_owned(),
				e_type: "HTTP/STORAGE".to_owned(),
			})
		}
	};

	Ok(ReturningEntry {
		entry_card: _card,
		entry_card_img: _card_imgs,
		// entry_card_format: _card_format,
	})
}

impl Error for ConstructError {}

impl Display for ConstructError {
	fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
		write!(f, "ERROR: {}\nCLAUSE: {}", self.message, self.e_type)
	}
}