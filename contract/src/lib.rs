#![no_std]
use soroban_sdk::{contractimpl, Env, Symbol, String};

const TITLE: Symbol = Symbol::short("TITLE");

pub struct TitleContract;

#[contractimpl]
impl TitleContract {


    pub fn set_title(env: Env, title: String) {
                env.storage().set(&TITLE, &title)
    }

    pub fn read_title(env: Env) -> String {
        env.storage().get(&TITLE)
            .unwrap_or(Ok(String::from_slice(&env, "Default Title")))
            .unwrap() 
    }
    
} 

mod test;
