
#[derive(Debug, Deserialize)]
pub enum ParseError {}

pub type Parsed = Result<ParsedCard, ParseError>;

pub fn parse () -> Parsed {}
