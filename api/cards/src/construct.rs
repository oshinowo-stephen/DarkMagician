use super::http;
use super::storage;

pub mod workers {
    use super::storage;

    pub fn fe_fetch_card_entry(entries: Vec<storage::EntryCard>, query: &str) -> Option<storage::EntryCard> {
        let mut returning_entry: Option<storage::EntryCard> = None;

        for entry in entries.into_iter() {
            if entry.name.to_lowercase() == query.to_lowercase() {
                returning_entry = Some(entry);

                break
            } else {
                dbg!(&returning_entry);

                continue
            }
        }

        returning_entry
    }
}

pub trait IntoCardEntry {
    fn into_card_entry(&self) -> storage::EntryCard;    
}

pub trait IntoEntryCardImg {
    fn into_card_imgs(&self) -> Vec<storage::EntryCardImg>;
}

pub trait IntoEntryCardSet {
    fn into_card_sets(&self) -> Vec<storage::EntryCardSet>;
} 

pub trait IntoEntryCardFormat {
    fn into_card_format(&self) -> storage::EntryCardFormat;
}

impl IntoCardEntry for http::IncomingCardInfo {
    fn into_card_entry(&self) -> storage::EntryCard {
        storage::EntryCard {
            name: self.name.clone(),
            card_desc: self.desc.clone(),
            card_race: self.race.clone(),
            card_type: self.r#type.clone(),
            lvl: self.level,
            lval: self.linkval,
            scale: self.scale,
            attribute: self.attribute.clone(),
            market_url: None,
            markers: if let Some(markers) = &self.linkmarkers {
                Some(markers.join(","))
            } else {
                None
            },
            archetype: self.archetype.clone(),
            atk: self.atk,
            def: self.def,
            effect: if !self.misc_info.is_empty() {
                if self.misc_info[0].has_effect.is_some() {
                    Some(1)
                } else {
                    None
                }
            } else {
                None
            },
        }
    }
}

impl IntoEntryCardImg for http::IncomingCardInfo {
    fn into_card_imgs(&self) -> Vec<storage::EntryCardImg> {
        let mut images = Vec::<storage::EntryCardImg>::new();

        if !self.card_images.is_empty() {
            for imgs in &self.card_images {
                images.push(storage::EntryCardImg {
                    id: uuid::Uuid::new_v4()
                        .to_string(),
                    card_name: self.name.clone(),
                    img_url: imgs.image_url.clone(),
                    img_url_small: Some(imgs.image_url_small.clone()),
                })
            }
        }

        images
    }
}

impl IntoEntryCardSet for http::IncomingCardInfo {
    fn into_card_sets(&self) -> Vec<storage::EntryCardSet> {
        let mut sets = Vec::<storage::EntryCardSet>::new();

        if !self.card_sets.is_empty() {
            for s in &self.card_sets {
                sets.push(storage::EntryCardSet {
                    id: uuid::Uuid::new_v4()
                        .to_string(),
                    set_market_url: None,
                    set_name: s.set_name.clone(),
                    card_name: self.name.clone(),
                })
            }
        }

        sets
    }
}

impl IntoEntryCardFormat for http::IncomingCardInfo {
    fn into_card_format(&self) -> storage::EntryCardFormat {    
        let banlist_info = self.banlist_info
            .clone()
            .unwrap_or_default();
        let misc_info = self.misc_info
            .clone();
        
        storage::EntryCardFormat {
            tcg_limit: banlist_info.ban_tcg,
            ocg_limit: banlist_info.ban_ocg,
            goat_limit: banlist_info.ban_goat,
            tcg_release: misc_info[0].tcg_date.clone(),
            ocg_release: misc_info[0].ocg_date.clone(),
            allowed_formats: if !misc_info[0].formats.is_empty() {
                Some(misc_info[0].formats.join(","))
            } else {
                None
            },
            card_name: self.name.clone(),
        }
    }
}

