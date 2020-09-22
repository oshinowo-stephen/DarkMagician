use std::error::Error;

#[derive(Debug)]
pub enum ParseError {}

#[derive(Debug, PartialEq)]
pub struct ParsedCard {}

pub type Parsed = Result<ParsedCard, ParseError>;

pub fn parse () -> Parsed { Ok(ParsedCard {}) }
