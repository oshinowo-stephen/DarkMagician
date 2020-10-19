pub enum Boosters {
  RoTD,
  EntCode,
}

pub fn gen_boosters<'a> (
  booster: Boosters,
) -> [&'a str; 9] {

}

pub fn map_to_booster (input: &str) -> Option<Boosters> {
  match &input.to_lowercase() {
    "rotd" => Some(Boosters::RoTD),
    "ent_code" => Some(Boosters::EntCode),
    _ => None,
  }
}
