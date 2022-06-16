extern crate tide;
#[macro_use]
extern crate serde;
extern crate dotenv;
#[macro_use]
extern crate diesel;
extern crate async_std;

mod storage;

#[async_std::main]
async fn main() -> tide::Result<()> {
    dotenv::dotenv().ok();

    Ok(())
}
