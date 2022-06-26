#[macro_use]
extern crate diesel;
extern crate async_std;
extern crate ureq;
#[macro_use]
extern crate serde;
extern crate tide;
extern crate dotenv;

mod http;
mod storage;
mod construct;

#[derive(Clone)]
struct AppState {
	conn: storage::Connection,
}

#[async_std::main]
async fn main() -> tide::Result<()> {
	dotenv::dotenv().ok();
	let conn = storage::connect();
	let state = AppState { conn };
	let mut app = tide::with_state(state);

	app.at("/").post(|mut req: tide::Request<AppState>| async move {
		let app_state = req.state();
		let pooled_conn = app_state.conn.clone();
		let construct::RequestCard { name, fuzzy: _ } = req.body_json().await?;

		let incoming_entry = construct::fetch_card_entry(pooled_conn, &name)?;

		tide::Body::from_json(&incoming_entry)
	});

	println!("Listening on http://127.0.0.1:2550");
	app.listen("127.0.0.1:2550").await?;
	Ok(())
}

#[cfg(test)]
mod tests {
	use crate::http;

	#[test]
	fn fetch() {
		let card = http::get_card("Dark Magician").unwrap();

		assert_eq!(card.name, "Dark Magician");
	}

	#[test]
	fn search() {
		let incoming_cards = http::search_cards("lil-la")
			.expect("failed to find query");
		
		assert_eq!(incoming_cards.len() > 1, true);
		assert_eq!(incoming_cards[0].name, "Evil★Twin Lil-la");
	}

	#[test]
	#[should_panic]
	fn fetch_card_not_found() {
		http::get_card("sdasdsadasdasd").expect("Failed to fetch card");
	}
}
