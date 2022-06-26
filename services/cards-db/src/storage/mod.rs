pub mod models;
pub mod schema;

use std::env;
use diesel::PgConnection;
use diesel::{r2d2, r2d2::ConnectionManager};

pub type Connection = r2d2::Pool<ConnectionManager<PgConnection>>;

pub fn connect() -> Connection {
	let database_url = env::var("DATABASE_URL")
		.expect("DATABASE_URL must be set");
	let manager = ConnectionManager::<PgConnection>::new(&database_url);
	let pool = r2d2::Pool::builder()
		.build(manager)
		.expect("Cannot build");

	pool.clone()
}