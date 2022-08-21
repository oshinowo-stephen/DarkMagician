use super::storage::models;

#[derive(Debug, Serialize)]
pub struct MappedEntryCard {
	pub name: String,
	pub desc: String,
	pub race: String,
	pub attribute: String,
	pub card_type: String,
  pub market: Option<String>,
	pub monster_info: Option<MonsterCardInfo>,
}

#[derive(Debug, Serialize)]
pub struct MonsterCardInfo {
	pub atk: i32,
	pub is_effect: bool,
	pub def: Option<i32>,
	pub lvl: Option<i32>,
	pub lval: Option<i32>,
	pub scale: Option<i32>,
	pub markers: Option<Vec<String>>,
}

#[derive(Debug, Serialize)]
pub struct MappedEntryImg {
	pub image: String,
	pub image_small: String,
}

#[derive(Debug, Serialize)]
pub struct MappedEntrySet {
	pub name: String,
	pub market_url: String,
}

#[derive(Debug, Serialize)]
pub struct MappedEntryFormat {
	pub tcg_limit: i8,
	pub ocg_limit: i8,
	pub goat_limit: Option<i8>,
	pub tcg_release: String,
	pub ocg_release: String,
  pub allowed_formats: Vec<String>,
}

pub fn get_card_data(m: &models::EntryCard) -> MappedEntryCard {
	let monster_info: Option<MonsterCardInfo> = if m._atk.is_some() {
		Some(MonsterCardInfo {
			atk: m._atk.unwrap(),
			def: m._def,
			lvl: m._lvl,
			lval: m._lval,
			scale: m._scale,
			markers: if let Some(stringed_markers) = m._markers.clone() {
				let mut marks = Vec::<String>::new();

				for mark in stringed_markers
					.clone()
					.split('.')
				{
					marks.push(mark.to_string())
				}

				Some(marks)
			} else {
				None
			},
			is_effect: m._has_effect.is_some(),
		})
	} else {
		None
	};

	MappedEntryCard {
		name: m.name.clone(),
		desc: m.card_desc.clone(),
		race: m.card_race.clone(),
    market: m._market_url.clone(),
		attribute: if m._attribute.is_none() {
			if m
				.card_type
				.clone()
				.contains("Spell")
			{
				String::from("Spell")
			} else {
				String::from("Trap")
			}
		} else {
			m._attribute.clone().unwrap()
		},
		card_type: m.card_type.clone(),
		monster_info,
	}
}

pub fn get_img_data(m: Vec<models::EntryCardImg>) -> Vec<MappedEntryImg> {
	let mut mapped_images: Vec<MappedEntryImg> = Vec::<MappedEntryImg>::new();

	for data_set in m {
		mapped_images.push(MappedEntryImg {
			image: data_set.card_img.clone(),
			image_small: data_set
				.card_img_small
				.clone(),
		});
	}

	mapped_images
}

pub fn get_set_data(m: Vec<models::EntryCardSet>) -> Vec<MappedEntrySet> {
	let mut mapped_sets: Vec<MappedEntrySet> = Vec::<MappedEntrySet>::new();

	for data_set in m {
		mapped_sets.push(MappedEntrySet {
			name: data_set.set_name.clone(),
			market_url: data_set.set_market.clone(),
		});
	}

	mapped_sets
}

pub fn get_set_format(m: &models::EntryCardFormat) -> MappedEntryFormat {
  let mut allowed_formats: Vec<String> = Vec::new();
  dbg!(&m._allowed_formats);

  for format in m._allowed_formats
    .split(",")
    .collect::<Vec<&str>>()
  {
    allowed_formats.push(format.to_owned()) 
  }

  MappedEntryFormat {
		tcg_limit: m._tcg_limit as i8,
		ocg_limit: m._ocg_limit as i8,
		goat_limit: if let Some(goat_limit) = m._goat_limit {
        Some(goat_limit as i8)
    } else {
        None
    },
		tcg_release: m._tcg_release.clone(),
		ocg_release: m._ocg_release.clone(),
    allowed_formats,
	}
}
