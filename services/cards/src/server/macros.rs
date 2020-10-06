macro_rules! send_buffer {
  ($s:expr, $b:expr) => {
    if let Err(error) = $s.send($b, 0) {
      error!("An error occurred sending a buffer: {:?}", error);
    }
  };
}
