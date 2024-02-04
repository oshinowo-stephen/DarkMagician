use rand::Rng;

pub fn generate_number() -> isize {
    let mut generated_number = String::new(); 

    for _ in 0..32 {
        let num = rand::thread_rng().gen_range(0..9);
        generated_number.push_str(&format!("{}", num));
    }

    generated_number
        .parse::<isize>()
        .unwrap()
}