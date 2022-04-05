table! {
    cards (name) {
        name -> Varchar,
        rarity -> Varchar,
        holder -> Varchar,
    }
}

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
    entry_card (name) {
        name -> Varchar,
        card_desc -> Varchar,
        race -> Varchar,
        card_type -> Varchar,
        _atk -> Nullable<Int4>,
        _def -> Nullable<Int4>,
        _lvl -> Nullable<Int4>,
        _lval -> Nullable<Int4>,
        _scale -> Nullable<Int4>,
        _markers -> Nullable<Varchar>,
    }
}

table! {
    entry_card_format (card_name) {
        card_name -> Varchar,
        format -> Varchar,
        limited -> Int4,
    }
}

table! {
    entry_card_img (card_name) {
        card_name -> Varchar,
        card_alt -> Varchar,
        card_img -> Varchar,
        card_img_small -> Varchar,
    }
}

table! {
    entry_card_price (card_name) {
        card_name -> Varchar,
        market_name -> Varchar,
        market_uri -> Varchar,
        market_price -> Varchar,
    }
}

table! {
    entry_card_set (card_name) {
        card_name -> Varchar,
        set_name -> Varchar,
        set_release -> Varchar,
        set_market -> Varchar,
    }
}

table! {
    player (id) {
        bal -> Int4,
        id -> Varchar,
    }
}

joinable!(cards -> player (holder));
joinable!(decks -> player (owner));
joinable!(entry_card_format -> entry_card (card_name));
joinable!(entry_card_img -> entry_card (card_name));
joinable!(entry_card_price -> entry_card (card_name));
joinable!(entry_card_set -> entry_card (card_name));

allow_tables_to_appear_in_same_query!(
    cards,
    deck_card,
    decks,
    entry_card,
    entry_card_format,
    entry_card_img,
    entry_card_price,
    entry_card_set,
    player,
);
