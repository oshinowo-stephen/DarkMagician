mod http;
mod storage;
mod construct;
pub mod payload;

use construct::*;
use construct::workers;
pub use http::IncomingRequest;

pub use http::OutgoingError;
pub use http::OutgoingResponse;

pub use payload::Payload;
pub use storage::{create_connection, Connection};

pub fn get(req: IncomingRequest, conn: Connection) -> OutgoingResponse<Payload> {
    match storage::fetch_all_cards(conn.clone()) {
        Ok(stored_cards) => match workers::fe_fetch_card_entry(stored_cards, &req.card_name) {
            Some(returning_entry) => Ok(Payload {
                name: returning_entry.name.clone(),
                desc: returning_entry.card_desc.clone(),
                race: returning_entry.card_race.clone(),
                attribute: returning_entry.attribute.clone(),
                archetype: returning_entry.archetype.clone(),
                card_imgs: match storage::fetch_card_imgs(&returning_entry.name, conn.clone()) {
                    Ok(images) => images
                        .into_iter()
                        .map(|img| payload::ImageData {
                            url: img.img_url.clone(),
                            url_small: img.img_url_small.clone()
                        })
                        .collect::<Vec<payload::ImageData>>(),
                    Err(_) => vec![]
                },
                card_sets: match storage::fetch_card_sets(&returning_entry.name, conn.clone()) {
                    Ok(sets) => sets
                        .into_iter()
                        .map(|set| payload::SetData {
                            name: set.set_name.clone(),
                            market: set.set_market_url
                        })
                        .collect::<Vec<payload::SetData>>(),
                    Err(_) => vec![]
                },
                card_format: match storage::fetch_card_format(&returning_entry.name, conn.clone()) {
                    Ok(format_data) => Some(payload::FormatData {
                        tcg_limit: format_data.tcg_limit,
                        ocg_limit: format_data.ocg_limit,
                        goat_limit: format_data.goat_limit,
                        tcg_release: format_data.tcg_release,
                        ocg_release: format_data.ocg_release,
                    }),
                    Err(_) => None
                },
                card_type: returning_entry.card_type.clone(),
                monster_info: if returning_entry.atk.is_some() {
                    Some(payload::MonsterInfo {
                        atk: returning_entry.atk.unwrap(),
                        def: returning_entry.def,
                        lvl: returning_entry.lvl,
                        lval: returning_entry.lval,
                        scale: returning_entry.scale,
                        markers: if let Some(marks) = returning_entry.markers {
                            marks
                                .split(",")
                                .map(|x| x.to_string())
                                .collect::<Vec<String>>()
                        } else {
                            vec![]
                        },
                        has_effect: returning_entry.effect.is_some()
                    })
                } else {
                    None
                },
            }),
            None => {
                eprintln!("cannot find this card from the entries...");

                Err(OutgoingError::NotFound)
            }
        },
        Err(_) => match http::fetch_card(&req.card_name) {
            Ok(raw_cards) => {
                let borrowed_conn = conn.clone();

                for card in raw_cards {
                    if let Err(error) = storage::store_entry_card(card.into_card_entry(), borrowed_conn.clone()) {
                        eprintln!("Fail to store card: {}, reason: {:?}. Exiting operation...",
                            &card.name, &error);
                        
                        break
                    } else {
                        for img in card.into_card_imgs() {
                            if let Err(error) = storage::store_card_image(img, borrowed_conn.clone()) {
                                eprintln!("Fail to store img for: {}, reason: {:?}. Skipping operation...",
                                    &card.name, &error);
                            }
                        }

                        for set in card.into_card_sets() {
                            if let Err(error) = storage::store_card_sets(set, borrowed_conn.clone()) {
                                eprintln!("Fail to stor set for: {}, reason: {:?}. Skipping operation...",
                                    &card.name, &error);       
                            }
                        }

                        if let Err(error) = storage::store_card_format(card.into_card_format(), borrowed_conn.clone()) {
                            eprintln!("Fail to store format for: {}, reason: {:?}. Skipping operation...",
                                &card.name, &error);       
                        }
                    }
                }

                get(req, borrowed_conn)
            },
            Err(_err) => {
                eprintln!("Unable to fetch card from source: {:?}", &_err);

                Err(OutgoingError::NotFound)
            }
        } 
    }
}
