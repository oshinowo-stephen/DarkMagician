#[derive(Debug, Deserialize)]
pub struct IncomingResponse {
	pub data: Vec<RawCard>,
	pub error: Option<String>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct RawCard {
	pub name: String,
	pub desc: String,
	pub r#type: String,
	pub atk: Option<i32>,
	pub def: Option<i32>,
	pub level: Option<i32>,
	pub race: String,
  pub archetype: Option<String>,
	pub attribute: Option<String>,
	pub scale: Option<i32>,
	pub linkval: Option<i32>,
	pub banlist_info: Option<BanlistInfo>,
	pub linkmarkers: Option<Vec<String>>,
	pub card_sets: Option<Vec<RawCardSet>>,
	pub card_images: Vec<RawCardImg>,
	pub misc_info: Vec<MiscInfo>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct BanlistInfo {
	pub ban_tcg: Option<String>,
	pub ban_ocg: Option<String>,
	pub ban_goat: Option<String>,
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
pub struct MiscInfo {
	pub has_effect: Option<i32>,
	pub formats: Vec<String>,
	pub tcg_date: Option<String>,
	pub ocg_date: String,
}
