## Setup

Create a .config file similar to the config-sample.json file and substitute with your own DB credentials, API key and RPC node for ethereum mainnet

`{ "database_connection": { "host": "localhost", "user": "root", "database": "denam", "password": "YOUR_DB_PASSWORD" }, "unstoppable_domains": { "API_KEY": "YOUR_API_KEY" }, "rpc_urls": { "mainnet_eth": "YOUR_RPC_URL_TO_ETH_MAINNET" } } `

## Start backend server with:

node index.js
