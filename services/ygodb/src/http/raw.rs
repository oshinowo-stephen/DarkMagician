#[derive(Debug, Deserialize)]
pub struct IncomingResponse {
	pub data: Vec<RawCard>
}

#[derive(Debug, Deserialize, Clone)]
pub struct RawCard {

	pub name: String,
	pub desc: String,
	pub r#type: String,
	pub atk: Option<usize>,
	pub def: Option<usize>,
	pub level: Option<usize>,
	pub	race: String,
	pub attribute: String,
	pub scale: Option<String>,
	pub linkval: Option<usize>,
	pub linkmarkers: Option<Vec<String>>,
	pub card_sets: Option<Vec<RawCardSet>>,
	pub card_images: Vec<RawCardImg>,
	pub misc_info: Vec<MiscInfo>
}

#[derive(Debug, Deserialize, Clone)]
pub struct RawCardSet {
	pub set_name: String,
	pub set_code: String,
	pub set_rarity: String,
	pub set_rarity_code: String,
	pub set_price: String,
}

#[derive(Debug, Deserialize, Clone)]
pub struct RawCardImg {
	pub image_url: String,
	pub image_url_small: String,
}

#[derive(Debug, Deserialize, Clone)]
pub struct RawCardMarket {
	pub tcgplayer_price: String,
	pub amazon_price: String,
}

#[derive(Debug, Deserialize, Clone)]
pub struct MiscInfo {
	pub has_effect: Option<u8>,
	pub formats: Vec<String>,
	pub tcg_date: String,
	pub ocg_date: String,
}
