mod storage;
mod payload;

pub use payload::Payload;
pub use storage::{create_connection, Connection};

pub fn get(deck_name: String, conn: Connection) -> Option<Payload> {
    match storage::fetch_deck_by_name(deck_name, conn.clone()) {
        
    } 
}

pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
