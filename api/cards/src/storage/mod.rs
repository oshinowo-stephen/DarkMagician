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
    INVALID,
    CONNECTION,
}

pub fn fetch_all_cards(conn: Connection) -> Result<Vec<EntryCard>> {
    use schema::card_info::dsl::*;

    let mut connection = conn
        .get()
        .expect("unable to fetch connection");
    
    match card_info
        .load::<EntryCard>(&mut connection)
    {
        Ok(entries) => Ok(entries),
        Err(_) => Err(StorageError::INVALID)
    }
}

pub fn fetch_card_data(q: &str, conn: Connection) -> Result<EntryCard> {
    use schema::card_info::dsl::*;

    let mut connection = conn
        .get()
        .expect("unable to fetch connection.");

    match card_info
        .filter(name.eq(q))
        .first(&mut connection)
    {
        Ok(results) => Ok(results),
        Err(_error) => {
            Err(StorageError::FETCH)
        } 
    }
}

pub fn fetch_card_imgs(q: &str, conn: Connection) -> Result<Vec<EntryCardImg>> {
    use schema::card_img_info::dsl::*;

    let mut connection = conn
        .get()
        .expect("cannot fetch connection");

    match card_img_info
        .filter(card_name.eq(q))
        .get_results(&mut connection)
    {
        Ok(results) => Ok(results),
        Err(_error) => {
            Err(StorageError::FETCH)
        } 
    }   
}

pub fn fetch_card_sets(q: &str, conn: Connection) -> Result<Vec<EntryCardSet>> {
    use schema::card_set_info::dsl::*;

    let mut connection = conn
        .get()
        .expect("cannot fetch connection");

    match card_set_info
        .filter(card_name.eq(q))
        .get_results(&mut connection)
    {
        Ok(results) => Ok(results),
        Err(_error) => {
            Err(StorageError::FETCH)
        } 
    }

}

pub fn fetch_card_format(q: &str, conn: Connection) -> Result<EntryCardFormat> {
    use schema::card_format_info::dsl::*;

    let mut connection = conn
        .get()
        .expect("cannot fetch connection");

    match card_format_info
        .filter(card_name.eq(q))
        .get_result(&mut connection)
    {
        Ok(results) => Ok(results),
        Err(_error) => {
            Err(StorageError::FETCH)
        } 
    }
}

pub fn ine_store_entry_card(entry: models::EntryCard, conn: Connection) -> Result<()> {
    let bound_conn = conn.clone();

    if let Err(_) = fetch_card_data(&entry.name, bound_conn) {
        store_entry_card(entry, conn)
    } else {
        Err(StorageError::INVALID)
    }
}

pub fn ine_store_card_image(entry: models::EntryCardImg, conn: Connection) -> Result<()> {
    let bound_conn = conn.clone();

    if let Err(_) = fetch_card_imgs(&entry.card_name, bound_conn) {
        store_card_image(entry, conn)
    } else {
        Err(StorageError::INVALID)
    }
}

pub fn ine_store_card_sets(entry: models::EntryCardSet, conn: Connection) -> Result<()> {
    let bound_conn = conn.clone();

    if let Err(_) = fetch_card_sets(&entry.card_name, bound_conn) {
        store_card_sets(entry, conn)
    } else {
        Err(StorageError::INVALID)
    }
}

pub fn ine_store_card_format(entry: models::EntryCardFormat, conn: Connection) -> Result<()> {
    let bound_conn = conn.clone();

    if let Err(_) = fetch_card_sets(&entry.card_name, bound_conn) {
        store_card_format(entry, conn)
    } else {
        Err(StorageError::INVALID)
    }
}

fn store_entry_card(entry: models::EntryCard, conn: Connection) -> Result<()> {
    use schema::card_info::dsl::*;   
    
    let mut connection = conn
        .get()
        .expect("cannot fetch connection");

    if let Err(error) = diesel::insert_into(card_info)
        .values(entry)
        .execute(&mut connection) 
    {
        return Err(StorageError::INSERT)
    }

    Ok(())
}

fn store_card_image(entry: models::EntryCardImg, conn: Connection) -> Result<()> {
    use schema::card_img_info::dsl::*;   
    
    let mut connection = conn
        .get()
        .expect("cannot fetch connection");


    if let Err(error) = diesel::insert_into(card_img_info)
        .values(entry)
        .execute(&mut connection) 
    {
        return Err(StorageError::INSERT)
    }

    Ok(())
}

fn store_card_sets(entry: models::EntryCardSet, conn: Connection) -> Result<()> {
    use schema::card_set_info::dsl::*;   
    
    let mut connection = conn
        .get()
        .expect("cannot fetch connection");

    if let Err(error) = diesel::insert_into(card_set_info)
        .values(entry)
        .execute(&mut connection) 
    {
        return Err(StorageError::INSERT)
    }

    Ok(())
}

fn store_card_format(entry: models::EntryCardFormat, conn: Connection) -> Result<()> {
    use schema::card_format_info::dsl::*;   
    
    let mut connection = conn
        .get()
        .expect("cannot fetch connection");

    if let Err(error) = diesel::insert_into(card_format_info)
        .values(entry)
        .execute(&mut connection) 
    {
        return Err(StorageError::INSERT)
    }

    Ok(())
}

pub fn create_connection() -> Result<Connection> {
    if let Ok(conn_url) = env::var("CARD_DATABASE_URL") {
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
