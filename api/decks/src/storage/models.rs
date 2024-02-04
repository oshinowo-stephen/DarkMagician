use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use super::schema::*;
use std::default::Default;

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize, Clone)]
#[diesel(table_name = deck_info)]
pub struct EntryDeck {
    pub id: String,
    pub owner: String,
    pub name: Option<String>,
    pub deck_about: Option<String>,
    pub deck_format: Option<String>,
}

#[derive(Debug, Insertable, Queryable, Serialize, Deserialize, Clone)]
#[diesel(table_name = deck_card)]
pub struct EntryDeckCard {
    pub entry_id: String,
    pub card_id: i32,
    pub deck_id: String,
    pub copies: i32, 
}
