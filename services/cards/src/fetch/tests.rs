#[test]
fn fetch_card () {
  let expect = "Dark Magician Girl";
  let card = super::get(expect)
    .expect("cannot find \"Dark Magician Girl\" in database.");

  assert_eq!(&card.name, expect)
}

#[test]
fn search_card () {
  let cards = super::search("Dark Magician Girl", vec![])
    .expect("cannot find any entry of \"Dark Magician Girl\" in database.");

  assert_eq!(&cards[0].name, "Dark Magician Girl")
}

#[test]
fn search_card_with_weights () {
  use super::SearchWeight;

  let cards = super::search("Dark Magician Girl", vec![ SearchWeight::Atk(2000) ])
    .expect("cannot find any entries of \"Dark Magician Girl\" with these weights");

  assert_eq!(cards.len() == 2, true);
  assert_eq!(&cards[0].name, "Dark Magician Girl");
  assert_eq!(&cards[1].name, "Toon Dark Magician Girl")
}
