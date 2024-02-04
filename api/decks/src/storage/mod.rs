mod models;
mod schema;

pub use models::*;

use diesel::prelude::*;
use diesel::PgConnection;
use diesel::{r2d2, r2d2::ConnectionManager};

use std::env;

pub type Result<T> = std::result::Result<T, StorageError>;

pub type Connection = r2d2::Pool<ConnectionManager<PgConnection>>;

#[derive(Debug)]
pub enum StorageError {
    FETCH,
    INSERT,
    CONNECTION,
    OTHER(String),
}

pub fn fetch_all_owner_decks(owner: String, conn: Connection) -> Result<Vec<EntryDeck>> {
    use schema::deck_info::dsl::*;

    let mut connection = conn
        .get()
        .expect("unable to fetch \"db_decks\" connection");

    match deck_info
        .load::<EntryDeck>(&mut connection)
    {
        Ok(entries) => if !entries.is_empty() {
            Ok(entries)
        } else {
            Err(StorageError::FETCH)
        },
        Err(err_msg) => Err(StorageError::OTHER(err_msg.to_string())),
    }
}

pub fn create_connection() -> Result<Connection> {
    if let Ok(conn_url) = env::var("DECK_DATABASE_URL") {
        let manager = ConnectionManager::<PgConnection>::new(&conn_url);

        match r2d2::Pool::builder()
            .build(manager)
        {
            Ok(connection) => Ok(connection),
            Err(_) => Err(StorageError::CONNECTION)
        }
    } else {
        Err(StorageError::CONNECTION)
    }
}