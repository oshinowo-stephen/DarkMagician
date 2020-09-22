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
