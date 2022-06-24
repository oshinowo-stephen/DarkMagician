use crate::storage;

#[derive(Debug, Deserialize, Serialize)]
pub struct GatewayRequest {
    pub player_info: Option<PInfo>,
    pub player_card_info: Option<QueryPlayerCard>,
    pub player_deck_info: Option<QueryPlayerDeck>,
    pub player_deck_card_info: Option<QueryDeckCard>, 
}

#[derive(Debug, Deserialize, Serialize)]
pub struct QueryPlayerDeck {
    pub name: String,
    pub owner: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct QueryDeckCard {
    pub deck_name: String,
    pub card_name: Option<String>,
    pub owner: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct QueryPlayerCard {
    pub holder: Option<String>,
    pub name: String,
    pub rarity: Option<String>,
    pub amount: Option<i32>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct PInfo {
    pub id: String,
    pub bal: Option<i32>, 
}

#[derive(Clone)]
pub struct AppState {
    pub conn: storage::Connection
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ReturningResponse<T> {
    pub package: Option<T>,
    pub status: u32,
    pub clause: Option<String>,
}

pub fn get_response_body<T>(p: Option<T>, clause: String) -> ReturningResponse<T> {
    if clause.is_empty() {
        ReturningResponse {
            package: p,
            status: 200,
            clause: None
        }
    } else {
        ReturningResponse {
            package: None,
            status: 404,
            clause: Some(clause)
        }
    }
}

