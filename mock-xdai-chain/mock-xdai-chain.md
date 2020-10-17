# mock-xdai-chain
address is a string starting with "0x" - an Ethereum address

GET /balance/:address
get balance, return a number

GET /generateWallet
return {address, privateKey} two strings

POST /transfer
DATA: { from: fromAddress, to: toAddress, amount: amount}

a MongoDB collection "mock-xdai-chain" should be created

database scheme, very simple:
|key|value|
|address|balance|