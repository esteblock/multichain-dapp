#![cfg(test)]

use super::*;
use soroban_sdk::{Env, Bytes};


#[test]
fn test() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TitleContract);
    let client = TitleContractClient::new(&env, &contract_id);

    // let client_default_title = client.read_title(); 
    // assert_eq!(client_default_title, Bytes::from_slice(&env, b"Default Title"));

    client.set_title(&Bytes::from_slice(&env, b"New Title"));
    let client_new_title = client.read_title(); 

    assert_eq!(client_new_title, Bytes::from_slice(&env, b"New Title"));

}
