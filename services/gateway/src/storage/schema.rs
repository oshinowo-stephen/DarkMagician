table! {
    deck_card (owner) {
        card_name -> Varchar,
        deck_name -> Varchar,
        owner -> Varchar,
    }
}

table! {
    decks (name) {
        name -> Varchar,
        owner -> Varchar,
    }
}

table! {
    player (id) {
        bal -> Int4,
        id -> Varchar,
    }
}

table! {
    player_card (name) {
        name -> Varchar,
        rarity -> Varchar,
        holder -> Varchar,
        amount -> Int4,
    }
}

joinable!(deck_card -> decks (deck_name));
joinable!(deck_card -> player (owner));
joinable!(deck_card -> player_card (card_name));
joinable!(decks -> player (owner));

allow_tables_to_appear_in_same_query!(
    deck_card,
    decks,
    player,
    player_card,
);
