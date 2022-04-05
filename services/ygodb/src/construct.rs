#[derive(Debug, Deserialize)]
pub struct RequestCard {
	pub name: String,
	pub strict: bool,
}

#[derive(Debug, Serialize)]
pub struct ReturningCard {
	pub name: String,
	pub desc: String,
	pub race: String,
	pub r#type: String,
	pub img_data: ImageData,
	pub stat_info: Option<CardStatInfo>
}

#[derive(Debug, Serialize)]
pub struct ImageData {
	pub card_img: String,
	pub card_alt: Vec<String>,
	pub card_img_small: String,
}

#[derive(Debug, Serialize)]
pub struct CardStatInfo {
	pub atk: usize,
	pub def: Option<usize>,
	pub level: Option<usize>,
	pub scale: Option<usize>,
	pub link_val: Option<usize>,
	pub markers: Option<Vec<StatInfoMarkers>>,
	pub is_effect_monster: bool,
}

#[derive(Debug, Serialize)]
pub enum StatInfoMarkers {
	Top,
	Left,
	Right,
	Bottom,
	TopLeft,
	TopRight,
	BottomLeft,
	BottomRight,
}