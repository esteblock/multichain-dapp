#![no_std]
use soroban_sdk::{contractimpl, symbol, Env, Symbol, Bytes};

const TITLE: Symbol = symbol!("TITLE");

pub struct TitleContract;

#[contractimpl]
impl TitleContract {


    pub fn set_title(env: Env, title: Bytes) {
                env.storage().set(&TITLE, &title)
    }

    pub fn read_title(env: Env) -> Bytes {
        env.storage().get_unchecked(&TITLE)
        //.unwrap_or(Bytes::from_slice(&env, b"Default Title")) // Default title
        .unwrap() // Panic if the value of COUNTER is not u32.
    }
    
} 

mod test;
