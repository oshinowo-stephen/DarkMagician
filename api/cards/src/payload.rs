use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct Payload {
    pub name: String,
    pub desc: String,
    pub race: String,
    pub attribute: Option<String>,
    pub archetype: Option<String>,
    pub card_type: String,
    pub card_sets: Vec<SetData>,
    pub card_imgs: Vec<ImageData>,
    pub card_format: Option<FormatData>,
    pub monster_info: Option<MonsterInfo>   
}

#[derive(Debug, Deserialize, Serialize)]
pub struct MonsterInfo {
    pub atk: i32,
    pub has_effect: bool,
    pub def: Option<i32>,
    pub lvl: Option<i32>,
    pub lval: Option<i32>,
    pub scale: Option<i32>,
    pub markers: Vec<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ImageData {
    pub url: String,    
    pub url_small: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SetData {
    pub name: String,
    pub market: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FormatData {
    pub ocg_limit: Option<String>,
    pub tcg_limit: Option<String>,
    pub goat_limit: Option<String>,
    pub tcg_release: Option<String>,
    pub ocg_release: Option<String>, 
}