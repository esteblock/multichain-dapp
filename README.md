# Soroban Multichain Dapp

![scaled50_1](https://github.com/esteblock/multichain-dapp/assets/2274485/be35b713-7da5-4bc6-90da-90954c906167)


![Multichain Demo 2](https://github.com/esteblock/multichain-dapp/assets/2274485/55543d79-9dc9-4543-bbd3-d90f1a3ae0d5)

# How does it works?
From @soroban-react v5.0.3 (currently supporting preview 9) you can set several networks for your dapp to be contected to.

Just import those networks when creating your Soroban React Provider using
```javascript
import {futurenet, sandbox, standalone} from '@soroban-react/chains';
import {ChainMetadata} from "@soroban-react/types";
const chains: ChainMetadata[] = [sandbox, standalone, futurenet];
```
Then, use this `chains` object to create your Soroban Provider. In this repo example, this is done in `src/MySorobanRectProvider.tsx`

```javascript
import React from 'react'
import {SorobanReactProvider} from '@soroban-react/core';
import {futurenet, sandbox, standalone} from '@soroban-react/chains';
import {freighter} from '@soroban-react/freighter';
import {ChainMetadata, Connector} from "@soroban-react/types";
      
const chains: ChainMetadata[] = [sandbox, standalone, futurenet];
const connectors: Connector[] = [freighter()]
                          
                          
  export default function MySorobanReactProvider({children}:{children: React.ReactNode}) {
    return (
      <SorobanReactProvider
        chains={chains}
        appName={"Example Stellar App"}
        connectors={connectors}>
          {children}
      </SorobanReactProvider>
    )
  }
```

# How to test this repo?

1.- Clone & install:

```bash
https://github.com/esteblock/multichain-dapp/
cd multichain-dapp
yarn
```

2.- Initialize a Standalone and a Futurenet blockchain instance in your machine.

In order to test this multichain dapp we are going to use the **Standalone** and the **Futurenet**. You are going to initialize both of them using the **stellar/quickstart** Docker image.

In one terminal do:
```bash
bash quickstart.sh standalone
```

This will open a standalone network in http://localhost:8000

In another terminal do:
```bash
bash quickstart.sh standalone
```
This will open a standalone network in http://localhost:8001

This, apart of creating a Standalone and Futurenet instance in your machine, it will also create a soroban-preview-9 container using the `esteblock/soroban-preview:9` image, that will help you to compile the test smart contract available in `./contract`

All of 3 docker containers will be running in a common `soroban-network` docker network.


3.- Run a bash terminal of `soroban-preview-9`
Just with 
```bash
bash run.sh
```

4.- Compile the **Title** Smart contract and deploy it in both chains:
Inside the `soroban-preview-9` container, run
```
bash initialize.sh
```

This will compile the smart contract and deploy them both in Standalone and Futurenet.
You should see some output like:
```bash
Using ARGS: --network standalone --source title-admin
--
--
Deploy the title contract
Contract deployed in standalone network succesfully with ID: e0019c10d10747ce41e3c082b7781915933ce22f3b6cd4b319dfe14477cd45b3
--
--
Setting the first title: My standalone title

--
--
Reading the  read_title function value
"I love Standalone"
.....
.....
Using ARGS: --network futurenet --source title-admin
--
--
Deploy the title contract
Contract deployed in futurenet network succesfully with ID: a1a91a0de70332af2ebb427177663576e42ca364be10d9a4126dcd7b1d951127
--
--
Setting the first title: My futurenet title

--
--
Reading the  read_title function value
"I prefer Futurenet"

```


Finally it will create a `src/contract_ids.json` that should look like this:

```json
{
  "standalone": {
    "title_id": "e0019c10d10747ce41e3c082b7781915933ce22f3b6cd4b319dfe14477cd45b3"
  },
  "futurenet": {
    "title_id": "a1a91a0de70332af2ebb427177663576e42ca364be10d9a4126dcd7b1d951127"
  }
}
```

5.- Configure your Freighter wallet with your Standalone and Futurenet setup.
Remember that your local futurenet node is running at http://localhost:8001

Configure your Standalone network in Freighter
   |   |   |
   |---|---|
   | Name | Standalone |
   | URL | http://localhost:8000/soroban/rpc |
   | Passphrase | Standalone Network ; February 2017 |
   
Configure your Local Futurenet network in Freighter
   |   |   |
   |---|---|
   | Name | Futurenet Local RPC|
   | URL | http://localhost:8001/soroban/rpc |
   | Passphrase | Test SDF Future Network ; October 2022 |


6.- Fund your account using the friendbot
For the standalone network is just as easy as typing in your browser:
```
http://localhost:8000/friendbot?addr=YOUR_PUBLIC_KEY
``` 

To use the Futurenet friendbot, visit https://laboratory.stellar.org/#account-creator?network=futurenet


7.- Run the App

```
yarn dev
```

Sometimes the dapp does not have permissions to read `src/contract_ids.json`. If you have that problem, just do, from inside the soroban-preview container:
```bash
chmod 777 src/contract_ids.json
```
