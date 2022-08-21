use super::storage;

#[derive(Clone)]
pub struct AppState {
	pub conn: storage::Connection,
}

#[derive(Debug, Clone)]
pub struct ReqOptions {
	pub f: bool,
	pub atk: Option<usize>,
	pub def: Option<usize>,
	pub lvl: Option<usize>,
	pub lval: Option<usize>,
	pub scale: Option<usize>,
	pub attribute: Option<String>,
	pub set_name: Option<String>,
}

pub const TCG_PLAYER_YUGIOH: &'static str = "https://www.tcgplayer.com/search/yugioh";
pub const RAW_API_ENDPOINT: &'static str = "https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=yes";
