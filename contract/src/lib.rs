#![no_std]
//use soroban_sdk::{contractimpl, Env, Symbol, String};
use soroban_sdk::{contractimpl, Env, Symbol};

const TITLE: Symbol = Symbol::short("TITLE");

pub struct TitleContract;

#[contractimpl]
impl TitleContract {


    //pub fn set_title(env: Env, title: String) {
    pub fn set_title(env: Env, title: Symbol) {
                env.storage().set(&TITLE, &title)
    }


    //pub fn read_title(env: Env) -> String {
    pub fn read_title(env: Env) -> Symbol {
        env.storage().get(&TITLE)
            .unwrap_or(Ok(Symbol::short("TITLE")))
            .unwrap() 
    }
    
} 

mod test;
