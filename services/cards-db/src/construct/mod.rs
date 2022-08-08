pub mod constants;
pub mod service;

use super::http;
use super::storage;

use service::{MappedEntryCard, MappedEntryFormat, MappedEntryImg, MappedEntrySet};
use storage::models;

#[derive(Debug, Serialize)]
pub struct Payload {
	card_data: MappedEntryCard,
	card_sets: Vec<MappedEntrySet>,
	card_imgs: Vec<MappedEntryImg>,
	card_format: MappedEntryFormat,
}

#[derive(Debug)]
pub struct FetchError(String);

impl FetchError {
	pub fn new(e: &str) -> Self {
		FetchError(e.to_owned())
	}
}

impl std::error::Error for FetchError {}

impl std::fmt::Display for FetchError {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "An error has occurred: {:#?}", self.0)
	}
}

pub async fn fetch_card_data(
	name: &str,
	c: storage::Connection,
	o: Option<constants::ReqOptions>,
) -> Result<Payload, Box<dyn std::error::Error>> {
	let n = &name.to_lowercase();

	let card_data: Option<MappedEntryCard> = match storage::fetch_card_data(n, c.clone()) {
		Ok(incoming_card_data) => Some(service::get_card_data(&incoming_card_data)),
		Err(_err) => {
			eprintln!("An error has occurred: {:#?}", &_err);

			match http::fetch_cards(n, o.clone()) {
				Ok(r_cards) => match storage::insert_card_data(&r_cards[0].convert(), c.clone()) {
					Ok(_) => {
						if let Ok(incoming_card_data) = storage::fetch_card_data(n, c.clone()) {
							Some(service::get_card_data(&incoming_card_data))
						} else {
							None
						}
					}
					Err(_err) => {
						eprintln!("Storage error has occurred: {:#?}", &_err);

						None
					}
				},
				Err(_err) => {
					eprintln!("HTTP error has occurred: {:#?}", &_err);

					None
				}
			}
		}
	};

	if card_data.is_none() {
		return Err(Box::new(FetchError::new("...")));
	}

	let card_imgs: Option<Vec<MappedEntryImg>> = match storage::fetch_card_image_data(n, c.clone()) {
		Ok(card_images) => {
			Some(service::get_img_data(card_images))
		}
		Err(_err) => match http::fetch_cards(n, o.clone()) {
			Ok(r_cards) => {
				for img in r_cards[0].card_images.clone() {
					if let Err(_err) =
						storage::insert_card_image_data(&img.convert(n), c.clone())
					{
						println!("Cannot store this image, reason: {:#?}", &_err)
					} else {
						continue;
					}
				}

				if let Ok(incoming_card_images) = storage::fetch_card_image_data(n, c.clone()) {
					Some(service::get_img_data(incoming_card_images))
				} else {
					None
				}
			}
			Err(_err) => {
				eprintln!("unable to fetch card images: {:#?}", &_err);

				None
			}
		},
	};

	let card_sets: Option<Vec<MappedEntrySet>> = match storage::fetch_card_set_data(n, c.clone()) {
		Ok(card_sets) => Some(service::get_set_data(card_sets)),
		Err(_) => match http::fetch_cards(n, o.clone()) {
			Ok(r_cards) => {
				if let Some(card_sets) = r_cards[0].card_sets.clone() {
					for set in card_sets {
						if let Err(_err) =
							storage::insert_card_set_data(&set.convert(n), c.clone())
						{
							println!("Cannot store this set, reason: {:#?}", &_err)
						} else {
							continue;
						}
					}

					if let Ok(incoming_card_sets) = storage::fetch_card_set_data(n, c.clone()) {
						Some(service::get_set_data(incoming_card_sets))
					} else {
						None
					}
				} else {
					None
				}
			}
			Err(_) => None,
		},
	};

	let card_format: Option<MappedEntryFormat> = match storage::fetch_card_format_data(n, c.clone()) {
		Ok(card_format) => Some(service::get_set_format(&card_format)),
		Err(_) => match http::fetch_cards(n, o.clone()) {
			Ok(r_cards) => {
				let mut format_info: models::EntryCardFormat = models::EntryCardFormat {
					card_name: n.to_owned().clone(),
					_tcg_limit: 0,
					_ocg_limit: 0,
					_goat_limit: 0,
					_tcg_release: String::new(),
					_ocg_release: String::new(),
				};

				if let Some(banlist_info) = r_cards[0]
					.banlist_info
					.clone()
				{
					format_info._tcg_limit = match banlist_info.clone().ban_tcg {
						Some(b) => if b.to_lowercase().as_str() == "banned" {
                3
            } else if b.to_lowercase().as_str() == "limited" {
                2
            } else {
                1
            }, 
						None => 0,
					};

					format_info._ocg_limit = match banlist_info.clone().ban_ocg {
						Some(b) => if b.to_lowercase().as_str() == "banned" {
                3
            } else if b.to_lowercase().as_str() == "limited" {
                2
            } else {
                1
            },
						None => 0,
					};

          format_info._goat_limit = match banlist_info.clone().ban_goat {
            Some(b) => if b.to_lowercase().as_str() == "banned" {
                3
            } else if b.to_lowercase().as_str() == "limited" {
                2
            } else {
                1
            },
            None => 0,
          };
				}

				format_info._tcg_release = r_cards[0].misc_info[0]
					.tcg_date
					.clone()
					.unwrap_or_default();

				format_info._ocg_release = r_cards[0].misc_info[0]
					.ocg_date
					.clone();

				if let Err(_err) = storage::insert_card_format_data(&format_info, c.clone()) {
					eprintln!("ran into an error while storing format_data, {:#?}", _err);

					None
				} else {
					Some(service::get_set_format(&format_info))
				}
			}
			Err(_) => None,
		},
	};

	Ok(Payload {
		card_data: card_data.unwrap(),
		card_imgs: card_imgs.unwrap(),
		card_sets: card_sets.unwrap(),
		card_format: card_format.unwrap(),
	})
}

impl http::RawCardSet {
	fn convert(&self, card_name: &str) -> models::EntryCardSet {
		models::EntryCardSet {
			id: uuid::Uuid::new_v4().to_string(),
			card_name: card_name.to_owned(),
			set_name: self.set_name.clone(),
			set_release: String::new(),
			set_market: format!(
				"{}&setName={}",
				constants::TCG_PLAYER_YUGIOH,
				&self.set_name
			),
		}
	}
}

impl http::RawCardImg {
	fn convert(&self, card_name: &str) -> models::EntryCardImg {
		models::EntryCardImg {
			id: uuid::Uuid::new_v4().to_string(),
			card_name: card_name.to_owned(),
			card_img: self.image_url.clone(),
			card_img_small: self.image_url_small.clone(),
		}
	}
}

impl http::RawCard {
	fn convert(&self) -> models::EntryCard {
		models::EntryCard {
			name: self
				.name
				.to_lowercase()
				.clone(),
			card_desc: self.desc.clone(),
			card_type: self.r#type.clone(),
			card_race: self.race.clone(),
			_atk: self.atk,
			_def: self.def,
			_lvl: self.level,
			_lval: self.linkval,
			_scale: self.scale,
			_attribute: self.attribute.clone(),
			_markers: if let Some(markers) = self.linkmarkers.clone() {
				Some(markers.join("."))
			} else {
				None
			},
			_has_effect: if self.misc_info[0]
				.has_effect
				.is_some()
			{
				Some(String::new())
			} else {
				None
			},
		}
	}
}
