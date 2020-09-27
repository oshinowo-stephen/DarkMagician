use crate::fetch::RawCard;

use std::error::Error;

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

pub type ParseResult = (Vec<RawCard>, Vec<ParsedCard>);

pub type Parsed = Result<ParseResult, ParseError>;

pub fn parse (card: RawCard) -> Parsed {
  Ok((vec![card], vec![]))
}
