#![cfg(test)]

use super::*;
use soroban_sdk::{Env, Symbol};


#[test]
fn test() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TitleContract);
    let client = TitleContractClient::new(&env, &contract_id);

    let client_default_title = client.read_title(); 
    assert_eq!(client_default_title, Symbol::short("TITLE"));

    client.set_title(&Symbol::new(&env, "new_title"));
    let client_new_title = client.read_title(); 

    assert_eq!(client_new_title, Symbol::new(&env, "new_title"));

}
