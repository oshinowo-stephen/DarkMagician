extern crate warp;
#[macro_use]
extern crate diesel;
extern crate reqwest;
extern crate tokio;
#[macro_use]
extern crate serde;

mod http;
mod storage;
mod construct;

use warp::Filter;
use construct::{RequestCard, ReturningCard};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let retrieve_card = warp::post()
        .and(warp::path::end())
        .and(warp::body::content_length_limit(1024 * 8))
        .and(warp::body::json())
        .map(retrieve_card_data);

    Ok(())
}

fn retrieve_card_data(request: RequestCard) -> ReturningCard {
    unimplemented!()
}

#[cfg(test)]
mod tests {
    use crate::http::*;

    macro_rules! tokio_rt {
        ($e:expr) => {
            tokio_test::block_on($e)
        };
    }  

    #[test]
    fn fetch() {
        let card = tokio_rt!(get_card("Dark Magician"))
            .expect("Failed to fetch card");
            
        assert_eq!(card.name, "Dark Magician");
    }

    #[test]
    fn search() {
        let cards = tokio_rt!(search_card("Dark Magician"))
            .expect("Failed to search card");

        assert_eq!(cards.len() > 1, true);
        assert_eq!(cards[0].name, "Dark Magician");
        assert_eq!(cards[1].name, "Dark Magician Girl");
    }

    #[test]
    #[should_panic]
    fn fetch_card_not_found() {
	    tokio_rt!(get_card("sdasdsadasdasd"))
            .expect("Failed to fetch card");
    }
}
