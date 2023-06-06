![scaled50_1](https://github.com/esteblock/multichain-dapp/assets/2274485/be35b713-7da5-4bc6-90da-90954c906167)


![Multichain Demo 2](https://github.com/esteblock/multichain-dapp/assets/2274485/55543d79-9dc9-4543-bbd3-d90f1a3ae0d5)


# Multichain Dapp

1.- Set Futurenet and Standalone networks in your wallet:
   |   |   |
   |---|---|
   | Name | Standalone |
   | URL | http://localhost:8000/soroban/rpc |
   | Passphrase | Standalone Network ; February 2017 |
   
   |   |   |
   |---|---|
   | Name | Futurenet Local RPC|
   | URL | http://localhost:8000/soroban/rpc |
   | Passphrase | Test SDF Future Network ; October 2022 |

```
./quickstart.sh standalone
docker exec soroban-preview-8 ./initialize.sh
docker exec soroban-preview-8 chmod 777 src/contract_ids.json
```

```
yarn
yarn dev
```


```
docker run --rm -it \
  -p 8002:8000 \
  --name stellar-futurenet \
  stellar/quickstart:soroban-dev@sha256:81c23da078c90d0ba220f8fc93414d0ea44608adc616988930529c58df278739 \
  --futurenet \
  --enable-soroban-rpc
```
