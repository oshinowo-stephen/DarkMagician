pub mod models;
pub mod schema;

use diesel::prelude::*;
use diesel::PgConnection;
use diesel::RunQueryDsl;
use diesel::{r2d2, r2d2::ConnectionManager};
use std::env;

pub type Connection = r2d2::Pool<ConnectionManager<PgConnection>>;

pub type DbError = diesel::result::Error;

pub type Result<T> = std::result::Result<T, DbError>;

pub fn fetch_card_data(cname: &str, conn: Connection) -> Result<models::EntryCard> {
	use schema::entry_card::dsl::*;

	let c = conn
		.get()
		.expect("failed to retrieve connection");

	match entry_card
		.filter(name.eq(cname))
		.first::<models::EntryCard>(&c)
	{
		Ok(incoming_card) => Ok(incoming_card),
		Err(_error) => Err(_error),
	}
}

pub fn fetch_card_image_data(cname: &str, conn: Connection) -> Result<Vec<models::EntryCardImg>> {
	use schema::entry_card_img::dsl::*;

	let c = conn
		.get()
		.expect("failed to retrieve connection");

	match entry_card_img
		.filter(card_name.eq(cname))
		.get_results(&c)
	{
		Ok(incoming_images) => Ok(incoming_images),
		Err(_error) => Err(_error),
	}
}

pub fn fetch_card_set_data(cname: &str, conn: Connection) -> Result<Vec<models::EntryCardSet>> {
	use schema::entry_card_set::dsl::*;

	let c = conn
		.get()
		.expect("failed to retrieve connection");

	match entry_card_set
		.filter(card_name.eq(cname))
		.get_results(&c)
	{
		Ok(incoming_sets) => Ok(incoming_sets),
		Err(_error) => Err(_error),
	}
}

// pub fn fetch_card_market_data(cname: &str, conn: Connection) -> Result<models::EntryCardPrice> {
// 	use schema::entry_card_price::dsl::*;
//
// 	let c = conn
// 		.get()
// 		.expect("failed to retrieve connection");
//
// 	match entry_card_price
// 		.filter(card_name.eq(cname))
// 		.execute(&c)
// 	{
// 		Ok(incoming_card) => Ok(incoming_card),
// 		Err(_error) => Err(_error),
// 	}
// }

pub fn fetch_card_format_data(cname: &str, conn: Connection) -> Result<models::EntryCardFormat> {
	use schema::entry_card_format::dsl::*;

	let c = conn
		.get()
		.expect("failed to retrieve connection");

	match entry_card_format
		.filter(card_name.eq(cname))
		.first::<models::EntryCardFormat>(&c)
	{
		Ok(incoming_card) => Ok(incoming_card),
		Err(_error) => Err(_error),
	}
}

pub fn insert_card_data(data: &models::EntryCard, conn: Connection) -> Result<()> {
	use schema::entry_card::dsl::*;

	let c = conn
		.get()
		.expect("failed to retrieve connection");

	match diesel::insert_into(entry_card)
		.values(data)
		.execute(&c)
	{
		Ok(_) => Ok(()),
		Err(_error) => Err(_error),
	}
}

pub fn insert_card_image_data(data: &models::EntryCardImg, conn: Connection) -> Result<()> {
	use schema::entry_card_img::dsl::*;

	let c = conn
		.get()
		.expect("failed to retrieve connection");

	match diesel::insert_into(entry_card_img)
		.values(data)
		.execute(&c)
	{
		Ok(_) => Ok(()),
		Err(_error) => Err(_error),
	}
}

pub fn insert_card_set_data(data: &models::EntryCardSet, conn: Connection) -> Result<()> {
	use schema::entry_card_set::dsl::*;

	let c = conn
		.get()
		.expect("failed to retrieve connection");

	match diesel::insert_into(entry_card_set)
		.values(data)
		.execute(&c)
	{
		Ok(_) => Ok(()),
		Err(_error) => Err(_error),
	}
}

// pub fn insert_card_market_data(data: models::EntryCardPrice, conn: Connection) -> Result<()> {
// 	use schema::entry_card_price::dsl::*;
//
// 	let c = conn
// 		.get()
// 		.expect("failed to retrieve connection");
//
// 	match diesel::insert_into(entry_card_price)
// 		.values(&data)
// 		.execute(&c)
// 	{
// 		Ok(_) => Ok(()),
// 		Err(_error) => Err(_error),
// 	}
// }

pub fn insert_card_format_data(data: &models::EntryCardFormat, conn: Connection) -> Result<()> {
	use schema::entry_card_format::dsl::*;

	let c = conn
		.get()
		.expect("failed to retrieve connection");

	match diesel::insert_into(entry_card_format)
		.values(data)
		.execute(&c)
	{
		Ok(_) => Ok(()),
		Err(_error) => Err(_error),
	}
}

pub fn create_connection() -> Connection {
	let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

	let manager = ConnectionManager::<PgConnection>::new(&db_url);
	let pool = r2d2::Pool::builder()
		.build(manager)
		.expect("Cannot build");

	pool.clone()
}
