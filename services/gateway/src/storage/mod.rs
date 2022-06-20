use diesel::prelude::*;
use diesel::PgConnection;
use diesel::RunQueryDsl;
use std::env::var as env_var;
use diesel::{r2d2, r2d2::ConnectionManager};

pub mod models;
pub mod schema;

pub type Connection = r2d2::Pool<ConnectionManager<PgConnection>>; 

#[derive(Debug)]
pub enum DbError {
    Invalid,
}

pub fn fetch_player_cards(pid: &str, conn: Connection) -> Result<Vec<models::PlayerCard>, DbError> {
    use schema::player_card::dsl::*;
    
    let c = conn.get().expect("failed to retrieve connection");

    match player_card
        .filter(holder.eq(pid))
        .load::<models::PlayerCard>(&c)
    {
        Ok(incoming_cards) => Ok(incoming_cards),
        Err(_error) => Err(DbError::Invalid)
    }
}

pub fn fetch_player_card(pid: &str, cname: &str, conn: Connection) -> Result<models::PlayerCard, DbError> {
    use schema::player_card::dsl::*;

    let c = conn.get().expect("failed to retrieve connection");

    match player_card
        .filter(holder.eq(pid))
        .filter(name.eq(cname))
        .first::<models::PlayerCard>(&c)
    {
        Ok(incoming_card) => Ok(incoming_card),
        Err(error) => Err(DbError::Invalid)
    }
}

pub fn insert_player_card(pid: &str, cinfo: models::PlayerCard, conn: Connection) -> Result<(), DbError> {
    use schema::player_card::dsl::*;

    let c = conn.get().expect("failed to retrieve connection");

    match diesel::insert_into(player_card)
        .values(&cinfo)
        .execute(&c)
    {
        Ok(_) => Ok(()),
        Err(_error) => Err(DbError::Invalid)
    }
}

pub fn fetch_player(pid: &str, conn: Connection) -> Result<models::Player, DbError> {
    use schema::player::dsl::*;

    let c = conn.get()
        .expect("cannot fetch connection.");

    let p: models::Player = player
        .filter(id.eq(pid))
        .get_result::<models::Player>(&c)
        .expect("cannot fetch player.");

    Ok(p)
}

pub fn insert_player(p: models::Player, conn: Connection) -> Result<(), DbError> {
    use schema::player::dsl::*;
    let connection = conn.get().unwrap();

    let new_player = models::Player {
        id: p.id,
        bal: p.bal,
    };

    diesel::insert_into(player)
        .values(&new_player)
        .execute(&connection)
        .unwrap();

    Ok(())
}

pub fn create_connection() -> Connection {
    let db_url = env_var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    
    let manager = ConnectionManager::<PgConnection>::new(&db_url);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Cannot build");
    
    pool.clone()
} 