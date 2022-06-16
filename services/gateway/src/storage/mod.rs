use diesel::PgConnection;
use std::env::var as env_var;
use diesel::{r2d2, r2d2::ConnectionManager};

pub mod models;
pub mod schema;

pub type Connection = r2d2::Pool<ConnectionManager<PgConnection>>; 

pub fn create_connection() -> Connection {
    let db_url = env_var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    
    let manager = ConnectionManager::<PgConnection>::new(&db_url);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Cannot build");
    
    pool.clone()
} 