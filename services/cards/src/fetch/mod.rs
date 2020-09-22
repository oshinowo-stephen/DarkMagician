use std::fmt::{self, Display};
use std::error::Error;

pub mod tests;

#[derive(Debug)]
pub enum FetchError {
  Other(String),
  InvalidParams,
  InvalidQuery,
  NoSuchCard,
}

#[derive(Debug)]
pub enum SearchWeight {
  Atk(usize),
  Def(usize),
  Level(usize),
  Race(String),
  Link(usize),
  LinkMarker(
    Vec<String>,
  ),
  Attribute(String),
  Scale(
    usize,
  ),
  CardSet(String),
  Archetype(String),
  Banlist(String),
  Format(String),
}

#[derive(Debug, Deserialize)]
pub struct ApiResponse {
  pub data: Option<Vec<RawCard>>,
  pub error: Option<String>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct RawCard {
  pub id: usize,
  pub name: String,
  pub r#type: String,
  pub desc: String,
  pub atk: usize,
  pub def: usize,
  pub level: usize,
  pub race: String,
  pub attribute: String,
  pub card_sets: Vec<RawCardSet>,
  pub card_images: Vec<RawCardImg>,
  pub card_prices: Vec<RawCardPrice>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct RawCardImg {
  pub id: usize,
  pub image_url: String,
  pub image_url_small: String,
}

#[derive(Debug, Deserialize, Clone)]
pub struct RawCardSet {
  pub set_name: String,
  pub set_code: String,
  pub set_price: String,
  pub set_rarity: String,
  pub set_rarity_code: String,
}

#[derive(Debug, Deserialize, Clone)]
pub struct RawCardPrice {
  pub ebay_price: String,
  pub amazon_price: String,
  pub tcgplayer_price: String,
  pub cardmarket_price: String,
  pub coolstuffinc_price: String,
}

impl Error for FetchError {}

impl Display for FetchError {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    match self {
      FetchError::InvalidParams =>
        write!(f, "the params inserted are invalid."),
      FetchError::InvalidQuery =>
        write!(f, "the query inserted is invalid. (don't put name & id together)"),
      FetchError::NoSuchCard =>
        write!(f, "the card entered does not exist."),
      FetchError::Other(v) =>
        write!(f, "an unknown error has ocurred: {:#?}", v)
    }
  }
}

pub type RawCards = Vec<RawCard>;

pub type FetchResult<T> = Result<T, FetchError>;

pub fn get (
  card: &str,
) -> FetchResult<RawCard> {
  match forge_request(
    &format!(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?name={}",
      &parse_card_name(card),
    ),
    vec![])
  {
    Ok(cards) => Ok(cards[0].clone()),
    Err(error) => Err(error),
  }
}


pub fn search (
  card: &str,
  weights: Vec<SearchWeight>,
) -> FetchResult<RawCards> {
  forge_request(
    &format!(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname={}",
      &parse_card_name(card),
    ),
    weights,
  )
}

fn forge_request (
  url: &str,
  wgts: Vec<SearchWeight>,
) -> FetchResult<RawCards> {
  let mut uri = String::from(url);

  for w in wgts {
    add_weights(&mut uri, &w);
  }

  match ureq::get(&uri).call()
    .into_json_deserialize::<ApiResponse>()
  {
    Ok(resp) => {
      if let Some(data) = resp.data {
        Ok(data)
      } else {
        Err(FetchError::NoSuchCard)
      }
    },
    Err(error) => match error {
      _ => {
        dbg!(&error);

        Err(FetchError::InvalidQuery)
      }
    },
  }
}

fn parse_card_name (card: &str) -> String {
  let new_card = card
    .to_lowercase()
    .split(" ")
    .collect::<Vec<&str>>()
    .join("+").to_owned();

  new_card
}

fn add_weights (
  query: &mut String,
  weight: &SearchWeight,
) -> String {
  dbg!(&query);

  match weight {
    SearchWeight::Atk(v) =>
      query.push_str(
        &format!("&atk={}", v),
      ),
    SearchWeight::Def(v) =>
      query.push_str(
        &format!("&atk={}", v),
      ),
    SearchWeight::Level(v) =>
      query.push_str(
        &format!("&level={}", v),
      ),
    SearchWeight::Race(v) =>
      query.push_str(
        &format!("&race={}", v),
      ),
    SearchWeight::Link(v) =>
      query.push_str(
        &format!("&link={}", v),
      ),
    SearchWeight::LinkMarker(v) => {
      query.push_str(
        &format!(
          "linkmarkers={}",
          v.join(", "),
        ),
      )
    },
    SearchWeight::Scale(v) =>
      query.push_str(
        &format!("&scale={}", v)
      ),
    SearchWeight::Attribute(v) =>
      query.push_str(
        &format!("&attribute={}", v),
      ),
    SearchWeight::Banlist(v) =>
      query.push_str(
        &format!("&banlist={}", v),
      ),
    SearchWeight::Format(v) =>
      query.push_str(
        &format!("&format={}", v),
      ),
    SearchWeight::CardSet(v) =>
      query.push_str(
        &format!("&cardset={}", v),
      ),
    SearchWeight::Archetype(v) =>
      query.push_str(
        &format!("&archetype={}", v),
      ),
  }

  query.to_owned()
}
