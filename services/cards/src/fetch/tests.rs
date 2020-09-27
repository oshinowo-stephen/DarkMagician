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

#[test]
#[should_panic]
fn fetch_invalid_card () {
  super::get("fucking horse crap")
    .expect("cannot fetch card entry; thank you!");
}

#[test]
#[should_panic]
fn search_invalid_card () {
  super::search("fucking horse bullshit", vec![])
    .expect("cannot find any card entry; thankfully");
}

#[test]
#[should_panic]
fn valid_card_with_invalid_weight() {
  use super::SearchWeight;

  super::search("dark magician girl", vec![ SearchWeight::Atk(1) ])
    .expect("found card; but this card(s) doesn't have that weight.");
}
