#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Player {
    pub bal: i32,
    pub id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlayerCard {
    pub name: String,
    pub rarity: String,
    pub holder: String,
    pub amount: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlayerDeck {
    pub name: String,
    pub owner: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DeckCard {
    pub card_name: String,
    pub deck_name: String,
    pub owner: String,
}