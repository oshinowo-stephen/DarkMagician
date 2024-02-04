use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use super::schema::*;

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize, Clone)]
#[diesel(table_name = card_info)]
pub struct EntryCard {
    pub id: i32,
    pub atk: Option<i32>,
    pub def: Option<i32>,
    pub lvl: Option<i32>,
    pub lval: Option<i32>,
    pub scale: Option<i32>,
    pub effect: Option<i32>,
    pub markers: Option<String>,
    pub attribute: Option<String>,
    pub archetype: Option<String>,
    pub market_url: Option<String>,
    pub card_type: String,
    pub card_race: String,
    pub card_desc: String,
    pub name: String,    
}

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize, Clone)]
#[diesel(table_name = card_img_info)]
pub struct EntryCardImg {
    pub id: String,
    pub img_url_small: Option<String>,
    pub img_url: String,
    pub card_name: String,
}

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize, Clone)]
#[diesel(table_name = card_set_info)]
pub struct EntryCardSet {
    pub id: String,
    pub set_market_url: Option<String>,
    pub set_name: String,
    pub card_name: String,
}

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize, Clone)]
#[diesel(table_name = card_format_info)]
pub struct EntryCardFormat {
    pub tcg_limit: Option<String>,
    pub ocg_limit: Option<String>,
    pub goat_limit: Option<String>,
    pub tcg_release: Option<String>,
    pub ocg_release: Option<String>,
    pub allowed_formats: Option<String>,
    pub card_name: String    
}

