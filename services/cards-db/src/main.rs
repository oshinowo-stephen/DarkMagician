#[macro_use]
extern crate diesel;
extern crate async_std;
extern crate ureq;
#[macro_use]
extern crate serde;
extern crate dotenv;
extern crate secrets_to_env as secrets;
extern crate tide;

mod construct;
mod http;
mod storage;

use construct::AppState;

use std::default::Default;

#[derive(Debug, Deserialize)]
#[serde(default)]
struct RequestParams {
	n: String,
	fuzz: bool,
}

fn load_env() {
	use std::env;

	let app_env = env::var("RUST_ENV").unwrap_or_default();

	if app_env.is_empty() || app_env != "prod" {
		dotenv::dotenv().ok();
	} else {
		secrets::load().ok();
	}
}

#[async_std::main]
async fn main() -> tide::Result<()> {
	load_env();
	let conn = storage::create_connection();
	let state = AppState { conn };
	let mut app = tide::with_state(state);

	app
		.at("/cards")
		.get(|req: tide::Request<AppState>| async move {
			println!("Endpoint hit!");

			let app_state = req.state();
			let pooled_conn = app_state.conn.clone();

			let _params: RequestParams = req.query()?;

			dbg!(&_params);

			let response_body;

			let request_data = construct::RequestCardData {
				name: _params.n,
				opts: None,
			};

			dbg!(&request_data);

			if let Ok(incoming_card) = construct::get_requested_card(request_data, pooled_conn) {
				dbg!(&incoming_card);

				response_body = construct::get_response_body(Some(incoming_card), String::new(), 200);
			} else {
				response_body = construct::get_response_body(None, String::from("Invalid Card."), 404);
			}

			tide::Body::from_json(&response_body)
		});

	println!("Listening on http://127.0.0.1:2552");
	app
		.listen("127.0.0.1:2552")
		.await?;
	Ok(())
}

impl Default for RequestParams {
	fn default() -> Self {
		Self {
			n: String::new(),
			fuzz: false,
		}
	}
}

// TODO: RE-WRITE TESTS!!!
