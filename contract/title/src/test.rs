#![cfg(test)]

use super::*;
use soroban_sdk::{symbol, Env};


#[test]
fn test() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TitleContract);
    let client = TitleContractClient::new(&env, &contract_id);

    client.set_title(&symbol!("Hello"));
    let client_title = client.read_title(); 

    assert_eq!(client_title, symbol!("Hello"));

}
