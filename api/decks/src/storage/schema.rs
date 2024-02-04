// @generated automatically by Diesel CLI.

diesel::table! {
    deck_card (entry_id) {
        entry_id -> Varchar,
        card_id -> Int4,
        deck_id -> Varchar,
        copies -> Int4,
    }
}

diesel::table! {
    deck_info (id) {
        name -> Nullable<Varchar>,
        deck_about -> Nullable<Varchar>,
        deck_format -> Nullable<Varchar>,
        id -> Varchar,
        owner -> Varchar,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    deck_card,
    deck_info,
);
