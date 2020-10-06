use crate::fetch::RawCard;

use std::error::Error;
use std::fmt::{self, Display};

#[derive(Debug)]
pub enum ParseError {}

#[derive(Debug, PartialEq)]
pub struct ParsedCard {
  pub effect: String,
  pub qck_eff: String,
  pub req: Option<CardRequirement>,
}

#[derive(Debug, PartialEq)]
pub enum CardRequirement {
  If(String),
  When(String),
  During(String),
  Tribute(String),
}

pub type Parsed = Result<ParseResult, ParseError>;

pub type ParseResult = (Vec<RawCard>, Vec<ParsedCard>);

pub fn parse (card: RawCard) -> Parsed {}

impl Display for ParseError {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    match self {
      _ => write!(f, "An unknown error has occurred")
    }
  }
}

impl Error for ParseError {}
