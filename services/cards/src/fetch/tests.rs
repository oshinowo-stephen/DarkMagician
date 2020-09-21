
#[test]
fn fetch_card () {
  let card = super::fetch("Dark Magician")
    .expect("cannot find \"Dark Magician\" in database.");

  assert_eq!(&card.name, "Dark Magician")
}
