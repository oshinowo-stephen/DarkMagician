extern crate ureq;
#[macro_use]
extern crate serde;
extern crate serde_json;

mod ygopro;
pub use ygopro::{
	get_card, get_random,
	CardResult, CardError,
	RequestCard, RawCard,
};

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn fetch_card () {
		let card = get_card(RequestCard {
			name: Some(String::from("Dark Magician")),
			..Default::default()
		});

		assert_eq!(card.is_ok(), true);
		assert_eq!(&card.unwrap()[0].name, "Dark Magician")
	}

	#[test]
	fn search_card () {
		let card = get_card(RequestCard {
			fname: Some(String::from("Dark Magician Girl")),
			..Default::default()
		});

		let resp = card.unwrap();

		assert_eq!(&resp[0].name, "Dark Magician Girl");
		assert_eq!(&resp[1].name, "Dark Magician Girl the Dragon Knight");
	}

	#[test]
	#[should_panic]
	fn no_input () {
		let card = get_card(RequestCard {
			name: None,
			fname: None,
		});

		card.expect("no validated input");
	}

	#[test]
	#[should_panic]
	fn no_card_found() {
		let card = get_card(RequestCard {
			name: Some(String::from("some$1card^&*")),
			..Default::default()
		});

		let cards = card.expect("cannot find card.");

		assert_eq!(cards.is_empty(), true)
	}
}
