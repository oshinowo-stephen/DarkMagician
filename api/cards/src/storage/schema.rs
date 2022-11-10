// @generated automatically by Diesel CLI.

diesel::table! {
    card_format_info (card_name) {
        tcg_limit -> Nullable<Varchar>,
        ocg_limit -> Nullable<Varchar>,
        goat_limit -> Nullable<Varchar>,
        tcg_release -> Nullable<Varchar>,
        ocg_release -> Nullable<Varchar>,
        allowed_formats -> Nullable<Varchar>,
        card_name -> Varchar,
    }
}

diesel::table! {
    card_img_info (card_name) {
        img_url_small -> Nullable<Varchar>,
        img_url -> Varchar,
        card_name -> Varchar,
    }
}

diesel::table! {
    card_info (name) {
        atk -> Nullable<Int4>,
        def -> Nullable<Int4>,
        lvl -> Nullable<Int4>,
        lval -> Nullable<Int4>,
        scale -> Nullable<Int4>,
        effect -> Nullable<Int4>,
        markers -> Nullable<Varchar>,
        attribute -> Nullable<Varchar>,
        archetype -> Nullable<Varchar>,
        market_url -> Nullable<Varchar>,
        card_type -> Varchar,
        card_race -> Varchar,
        card_desc -> Varchar,
        name -> Varchar,
    }
}

diesel::table! {
    card_set_info (card_name) {
        set_market_url -> Nullable<Varchar>,
        set_name -> Varchar,
        card_name -> Varchar,
    }
}

diesel::joinable!(card_format_info -> card_info (card_name));
diesel::joinable!(card_img_info -> card_info (card_name));
diesel::joinable!(card_set_info -> card_info (card_name));

diesel::allow_tables_to_appear_in_same_query!(
    card_format_info,
    card_img_info,
    card_info,
    card_set_info,
);
