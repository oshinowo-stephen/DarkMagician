use super::schema::*;

#[derive(Debug, Insertable, Queryable, Deserialize)]
#[table_name="entry_card"]
pub struct EntryCard<'a> {
	pub name: &'a str,
	pub card_desc: &'a str,
	pub race: &'a str,
	pub card_type: &'a str,
	pub _atk: Option<usize>,
	pub _def: Option<usize>,
	pub _lvl: Option<usize>,
	pub _lval: Option<usize>,
	pub _scale: Option<usize>,
	pub _markers: Option<&'a str>,
}

#[derive(Debug, Insertable, Queryable, Deserialize)]
#[table_name="entry_card_img"]
pub struct EntryCardImg<'a> {
	pub name: &'a str,
	pub image_alt: &'a str,
	pub image_url: &'a str,
	pub image_url_small: &'a str,
}

#[derive(Debug, Insertable, Queryable, Deserialize)]
#[table_name="entry_card_set"]
pub struct EntryCardSet<'a> {
	pub name: &'a str,
	pub set_name: &'a str,
	pub set_release: &'a str,
	pub set_market: &'a str,
}

#[derive(Debug, Insertable, Queryable, Deserialize)]
#[table_name="entry_card_price"]
pub struct EntryCardPrice<'a> {
	pub name: &'a str,
	pub market_name: &'a str,
	pub market_uri: &'a str,
	pub market_price: &'a str,
}

#[derive(Debug, Insertable, Queryable, Deserialize)]
#[table_name="entry_card_format"]
pub struct EntryCardFormat<'a> {
	pub name: &'a str,
	pub format: &'a str,
	pub limited: u8,
}