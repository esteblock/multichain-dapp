#![no_std]
use soroban_sdk::{contractimpl, symbol, Env, Symbol};

const TITLE: Symbol = symbol!("TITLE");

pub struct TitleContract;

#[contractimpl]
impl TitleContract {


    pub fn set_title(env: Env, title: Symbol) {
                env.storage().set(&TITLE, &title)
    }

    pub fn read_title(env: Env) -> Symbol {
        env.storage().get_unchecked(&TITLE).unwrap()
    }
    
} 

mod test;
