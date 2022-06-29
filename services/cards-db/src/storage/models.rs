use super::schema::*;

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize, Clone)]
#[table_name = "entry_card"]
pub struct EntryCard {
	pub name: String,
	pub card_desc: String,
	pub card_race: String,
	pub card_type: String,
	pub _atk: Option<i32>,
	pub _def: Option<i32>,
	pub _lvl: Option<i32>,
	pub _lval: Option<i32>,
	pub _scale: Option<i32>,
	pub _markers: Option<String>,
	pub _has_effect: Option<String>,
}

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize, Clone)]
#[table_name = "entry_card_img"]
pub struct EntryCardImg {
	pub card_name: String,
	pub card_img: String,
	pub card_img_small: String,
}

#[derive(Debug, Insertable, Serialize, Queryable, Deserialize, Clone)]
#[table_name = "entry_card_set"]
pub struct EntryCardSet {
	pub card_name: String,
	pub set_name: String,
	pub set_release: String,
	pub set_market: String,
}

// #[derive(Debug, Insertable, Queryable, Deserialize, Clone)]
// #[table_name = "entry_card_price"]
// pub struct EntryCardPrice {
// 	pub card_name: String,
// 	pub market_name: String,
// 	pub market_uri: String,
// 	pub market_price: String,
// }

#[derive(Debug, Insertable, Serialize, Queryable, Deserialize, Clone)]
#[table_name = "entry_card_format"]
pub struct EntryCardFormat {
	pub card_name: String,
	pub _tcg_limit: i32,
	pub _ocg_limit: i32,
	pub _goat_limit: i32,
	pub _tcg_release: String,
	pub _ocg_release: String,
}
