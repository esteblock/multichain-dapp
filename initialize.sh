#!/bin/bash
echo "Creating an empty src/contract_ids.json file"
echo '{"standalone": {"title_id": "undefined"}, "futurenet": {"title_id": "undefined"}}' > src/contract_ids.json
set -e


echo Build the title contract

cd contract/title
cargo build --target wasm32-unknown-unknown --release
cargo test
cd ..
cd ..

for NETWORK in standalone futurenet
do
    case "$NETWORK" in
    standalone)
    echo "Using standalone network"
    SOROBAN_RPC_HOST="http://stellar:8000"
    SOROBAN_RPC_URL="$SOROBAN_RPC_HOST/soroban/rpc"
    SOROBAN_NETWORK_PASSPHRASE="Standalone Network ; February 2017"
    FRIENDBOT_URL="$SOROBAN_RPC_HOST/friendbot"
    ;;
    futurenet)
    echo "Using Futurenet network"
    SOROBAN_RPC_HOST="https://rpc-futurenet.stellar.org:443"
    SOROBAN_RPC_URL="$SOROBAN_RPC_HOST/soroban/rpc"
    SOROBAN_NETWORK_PASSPHRASE="Test SDF Future Network ; October 2022"
    FRIENDBOT_URL="https://friendbot-futurenet.stellar.org/"
    ;;
    *)
    echo "Usage: $0 standalone|futurenet"
    exit 1
    ;;
    esac

    #if !(soroban config network ls | grep "$NETWORK" 2>&1 >/dev/null); then
    # Always set a net configuration 
    echo Add the $NETWORK network to cli client
    soroban config network add "$NETWORK" \
        --rpc-url "$SOROBAN_RPC_URL" \
        --network-passphrase "$SOROBAN_NETWORK_PASSPHRASE"
    #fi

    TOKEN_ADMIN_SECRET="SAKCFFFNCE7XAWYMYVRZQYKUK6KMUCDIINLWISJYTMYJLNR2QLCDLFVT"
    if !(soroban config identity ls | grep token-admin 2>&1 >/dev/null); then
    echo Create the token-admin identity
    # TODO: Use `soroban config identity generate` once that supports secret key
    # output.
    # See: https://github.com/stellar/soroban-example-dapp/issues/88
    mkdir -p ".soroban/identities"
    echo "secret_key = \"$TOKEN_ADMIN_SECRET\"" > ".soroban/identities/token-admin.toml"
    fi
    TOKEN_ADMIN_ADDRESS="$(soroban config identity address token-admin)"

    # TODO: Remove this once we can use `soroban config identity` from webpack.
    echo "$TOKEN_ADMIN_SECRET" > .soroban/token_admin_secret
    echo "$TOKEN_ADMIN_ADDRESS" > .soroban/token_admin_address

    # This will fail if the account already exists, but it'll still be fine.
    echo Fund token-admin account from friendbot
    curl --silent -X POST "$FRIENDBOT_URL?addr=$TOKEN_ADMIN_ADDRESS" >/dev/null

    ARGS="--network $NETWORK --identity token-admin"

    echo Deploy the title contract
    WASM_PATH="contract/target/wasm32-unknown-unknown/release/title_contract.wasm"
    TITLE_ID="$(
    soroban contract deploy $ARGS \
        --wasm $WASM_PATH
    )"

    echo "Contract deployed in $NETWORK network succesfully with ID: $TITLE_ID"

    tmp=$(mktemp)
    jq ".$NETWORK.title_id = \"$TITLE_ID\"" src/contract_ids.json > "$tmp" && mv "$tmp" src/contract_ids.json


    echo "Setting the first title: My $NETWORK title"

    soroban contract invoke \
    $ARGS \
    --wasm contract/target/wasm32-unknown-unknown/release/title_contract.wasm \
    --id $TITLE_ID \
    --fn set_title --\
    --title 'AB'
    
    #'{"object":{"bytes":"my title"}}'
    echo "Done"
    echo "--"
    echo "--"
    echo "--"

    soroban contract invoke \
    $ARGS \
    --wasm contract/target/wasm32-unknown-unknown/release/title_contract.wasm \
    --id $TITLE_ID \
    --fn read_title


done

echo "We have our src/contract_ids.json file:"
cat src/contract_ids.json
chmod 777 src/contract_ids.json