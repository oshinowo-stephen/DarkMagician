use std::env;

pub fn load_env() {
    if let Ok(env) = env::var("RUST_ENV") {
        if env.to_lowercase() != "production" || env.to_lowercase() != "prod" {
            println!("Development branch found, resulting to: \"dotenv\"");

            dotenv::dotenv().unwrap();
        } else {
            println!("Production branch found, resulting to: \"secrets\"");

            secrets::load().unwrap();
        }
    } else {
        info!("No \"RUST_ENV\" found... resulting to: \"dotenv\"");

        dotenv::dotenv().ok();
    }
}

pub fn load_logger() {
    if let Err(_) = knil::init() {
        eprintln!("Failed to load in the logger...")
    }
}