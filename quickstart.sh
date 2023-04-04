#!/bin/bash

set -e

case "$1" in
standalone)
    echo "Using standalone network"
    ARGS="--standalone --enable-core-artificially-accelerate-time-for-testing"
    STELLAR_NAME='stellar-standalone'
    LOCAL_PORT='8000'
    ;;
futurenet)
    echo "Using Futurenet network"
    ARGS="--futurenet"
    STELLAR_NAME='stellar-futurenet'
    LOCAL_PORT='8001'
    ;;
*)
    echo "Usage: $0 standalone|futurenet"
    exit 1
    ;;
esac

# Run the soroban-preview container
# Remember to do 
# cd docker
# bash build.sh

echo "Searching for a previous soroban-preview docker container"
containerID=$(docker ps --filter="name=soroban-preview-7" --all --quiet)
if [[ ${containerID} ]]; then
    echo "Start removing soroban-preview  container."
    docker rm --force soroban-preview-7
    echo "Finished removing soroban-preview container."
else
    echo "No previous soroban-preview container was found"
fi

currentDir=$(pwd)
docker run --volume  ${currentDir}:/workspace \
           --name soroban-preview-7 \
           --interactive \
           --tty \
           --detach \
           --ipc=host \
           --network soroban-network \
           esteblock/soroban-preview:7

# Run the stellar quickstart image
docker run --rm -ti \
  --name $STELLAR_NAME \
  --network soroban-network \
  -p $LOCAL_PORT:8000 \
  stellar/quickstart:soroban-dev@sha256:81c23da078c90d0ba220f8fc93414d0ea44608adc616988930529c58df278739 \
  $ARGS \
  --enable-soroban-rpc #\
  #--protocol-version 20 

  #--platform linux/amd64 \

#   docker run --rm -it \
#   -p 8002:8000 \
#   --name stellar-futurenet \
#   stellar/quickstart:soroban-dev@sha256:81c23da078c90d0ba220f8fc93414d0ea44608adc616988930529c58df278739 \
#   --futurenet \
#   --enable-soroban-rpc
