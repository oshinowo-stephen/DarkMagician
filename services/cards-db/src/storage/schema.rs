table! {
    entry_card (name) {
        name -> Varchar,
        card_desc -> Varchar,
        card_race -> Varchar,
        card_type -> Varchar,
        _atk -> Nullable<Int4>,
        _def -> Nullable<Int4>,
        _lvl -> Nullable<Int4>,
        _lval -> Nullable<Int4>,
        _scale -> Nullable<Int4>,
        _markers -> Nullable<Varchar>,
        _attribute -> Nullable<Varchar>,
        _archetype -> Nullable<Varchar>,
        _has_effect -> Nullable<Bpchar>,
        _market_url -> Nullable<Varchar>,
    }
}

table! {
    entry_card_format (card_name) {
        card_name -> Varchar,
        _goat_limit -> Nullable<Int4>,
        _tcg_limit -> Int4,
        _ocg_limit -> Int4,
        _tcg_release -> Varchar,
        _ocg_release -> Varchar,
        _allowed_formats -> Varchar,
    }
}

table! {
    entry_card_img (id) {
        id -> Varchar,
        card_name -> Varchar,
        card_img -> Varchar,
        card_img_small -> Varchar,
    }
}

table! {
    entry_card_set (id) {
        id -> Varchar,
        card_name -> Varchar,
        set_name -> Varchar,
        set_market -> Varchar,
    }
}

joinable!(entry_card_format -> entry_card (card_name));
joinable!(entry_card_img -> entry_card (card_name));
joinable!(entry_card_set -> entry_card (card_name));

allow_tables_to_appear_in_same_query!(
    entry_card,
    entry_card_format,
    entry_card_img,
    entry_card_set,
);
