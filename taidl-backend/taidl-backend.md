# taidl-backend

## API Documentation

### Consumer Data Management Provided by NCR
POST /cdm/consumers (creates a new consumer)
DATA:
userId: string (unique ID)
password: string
email: string

PATCH /cdm/consumers/:userId (update information of a consumer) can be used to add an address to a user
DATA: 
{ address: string (a ETH address), isAnonymous: boolean, isPrimary: boolean }

GET /cdm/consumers/:userId (get a consumer information)
returns a json dictionary
address: the primary (default) ETH address, must not be anonymous otherwise returns an empty string

### Login
POST /login
DATA:
userId: string
password: string

result 200 if password is correct, 400 otherwise

### Chain and transfer related
Note: QR code format is like:
ethereum:0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8[?value=10] we can also append any custom fields

GET /address/:ethaddress
returns 
{userId: UserID (a string), isAnonymous: boolean}

POST /transfer
DATA: 
{ from: [userId or "Taidl User" for anonymous], to: [destination userId], memo: string}

Transfer API is used together with on-chain transfer to carry some extra data like memo and sender ID, this will trigger notification on the receipient side 


### Address book feature
no api needed. address book is stored locally

### Database schema
- "address" collection
key: address
mapped values:
owner: userId
isAnonymous: boolean

- "user" collection
key: userId
mapped values:
addresses: a list of addresses
primaryAddress: an address
email: string
password: string