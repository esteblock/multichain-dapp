# Multichain Dapp
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