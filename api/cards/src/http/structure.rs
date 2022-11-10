use std::error::Error;
use std::fmt::Display;

use serde::{Deserialize, Serialize};

pub const YUG_API_URL: &'static str = "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=yes&misc=yes";

pub type OutgoingResponse<T> = std::result::Result<T, ResponseError>;

#[derive(Debug)]
pub enum ResponseError {
    NotFound = 404,
    InternalServerError = 500,
}

#[derive(Debug)]
pub struct IncomingRequest {
    pub card_name: String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct IncomingCardInfo {
    pub name: String,
    pub desc: String,
    pub race: String,
    pub r#type: String,
    pub atk: Option<i32>,
    pub def: Option<i32>,
    pub level: Option<i32>,
    pub scale: Option<i32>,
    pub linkval: Option<i32>,
    pub linkmarkers: Vec<String>,
    pub archetype: Option<String>,
    pub attribute: Option<String>,
    pub card_sets: Vec<IncomingCardSet>,
    pub card_images: Vec<IncomingCardImg>,
    pub banlist_info: Option<BanlistInfo>,
    pub misc_info: Option<IncomingCardMiscInfo>
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct BanlistInfo {
   pub ban_tcg: Option<String>,
   pub ban_ocg: Option<String>,
   pub ban_goat: Option<String>, 
}

#[derive(Debug, Deserialize, Serialize)]
pub struct IncomingCardSet {
    pub set_name: String,
    pub set_code: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct IncomingCardImg {
    pub image_url: String,
    pub image_url_small: String
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct IncomingCardMiscInfo {
    pub formats: Vec<String>,
    pub tcg_date: Option<String>,
    pub ocg_date: Option<String>,
    pub has_effect: Option<usize>,
}

impl Default for BanlistInfo {
    fn default() -> Self {
        Self {
            ban_goat: None,
            ban_tcg: None,
            ban_ocg: None
        }
    }
}

impl Default for IncomingCardMiscInfo {
    fn default() -> Self {
        Self {
            formats: Vec::new(),
            tcg_date: None,
            ocg_date: None,
            has_effect: None
        }
    }
}

impl Error for ResponseError {}

impl Display for ResponseError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ResponseError::NotFound => 
                write!(f, "card not found."),
            ResponseError::InternalServerError =>
                write!(f, "internal issues."),
        }
    }
}