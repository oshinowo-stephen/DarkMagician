#[macro_use]
extern crate diesel;
extern crate async_std;
extern crate ureq;
#[macro_use]
extern crate serde;
extern crate dotenv;
extern crate secrets_to_env as secrets;
extern crate tide;
extern crate uuid;

mod construct;
mod http;
mod storage;

use construct::constants::AppState;

use std::default::Default;

#[derive(Debug, Deserialize)]
#[serde(default)]
struct RequestParams {
	name: String,
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
		.at("/")
		.get(|req: tide::Request<AppState>| async move {
			let app_state = req.state();
			let pooled_conn = app_state.conn.clone();

			let params: RequestParams = req.query()?;

			match construct::fetch_card_data(&params.name, pooled_conn, None).await {
				Ok(resp_payload) => {
          let mut response = tide::Response::new(200);

          response.set_body(tide::Body::from_json(&resp_payload).unwrap());
          
          Ok(response)
				}
				Err(_err) => {
          let mut response = tide::Response::new(500);

          response.set_body(tide::Body::empty());

          if _err.to_string() == "..." {
            response.set_status(404);
          }

          dbg!(&response);
					Ok(response)
				}
			}
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
			name: String::new(),
			fuzz: false,
		}
	}
}

#[cfg(test)]
mod tests {
    use super::{storage, construct};

    macro_rules! aw {
        ($e:expr) => {
            tokio_test::block_on($e)
        }
    }

    #[test]
    fn fetch_card_data() {
        setup_env();
        dbg!(&std::env::var("DATABASE_URL").expect("cannot fetch var"));
        let conn = storage::create_connection();

        let result = aw!(construct::fetch_card_data("Gagaga Girl", conn.clone(), None));

        assert!(result.is_ok())
    }
   
    #[test]
    #[should_panic]
    fn fetch_fake_card_data() {
        setup_env();
        let conn = storage::create_connection();

        aw!(construct::fetch_card_data(".invalid card.", conn.clone(), None))
            .expect("cannot find card!");
    }

    fn setup_env() {
        if std::env::var("DATABASE_URL").is_err() {
            std::env::set_var("DATABASE_URL", "postgresql://testing:testpass123@localhost/_mg_cards_test")
        }
    }
}
