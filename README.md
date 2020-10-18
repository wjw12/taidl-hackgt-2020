# Taidl - Everyday Payment with xDai Blockchain
# Taidl
We present Taidl, an app that makes payment with cryptocurrency easy. You don't have to be an expert in blockchain. You don't need to worry about high transaction fee or fluctuation in the conversion rate. Taidl is powered with xDai, a stablecoin that lives on a sidechain of Ethereum. The transaction fee is as low as $0.01 for 500 transactions, making it the perfect solution to peer-to-peer payments, local business payments, online payments and international transfers.

Taidl app has even more exciting features that assists you in your daily spending. There is a address book for storing your contacts, so you don't need to search and type the receipient account every time you pay. You can scan a QR code to make a payment. You can check your transaction history to keep track of your finance.

The registration process is especially easy. Just sign up with your favorite user name, which does not have to be your real name. Type in your password, just like you are using any traditional finance app without the burden to understand how cryptocurrency works. For experts and nerds who want full control of the crypto wallet, we can handle over the custody of private keys to you. Otherwise your private keys will be securely stored in our encrypted server as safe as a bank.

# Inspirations
- 🙊 Traditional crypto wallet apps are designed for expert users, traders and geeks. Unfriendly UI and complex technical functions can easily intimidate normal users. We keep the usability in mind when designing the interaction. We greatly reduce the complexity of using a mobile crypto wallet without sacrificing core functions or safety.

- 🎰 The price of crypto assets like BTC, ETH fluctuate heavily so they are not suitable for everyday uses. We adopts a stablecoin solution - xDai, an asset that is pegged to US Dollar. 1 xDai = 1 USD in almost every time. You don't need to worry about the conversion rate when paying and receiving money with xDai 

- ⚡️ Transactions on xDai chain happen incredibly fast - 10~15 seconds to everywhere in the world! The transaction fee does not depend on the amount that you transfer. It's one same price for $1 and $10,000. Fee is as low as $0.0002 for each transaction.

- 🍩 In the near future cryptocurrency will become more mainstream with a larger user base. Small businesses who do not want to pay for credit card channels will benefit the most. Just print a QR code sticker at the checkout. Let customers scan the code and payment is done!

- 🌞 For international students and international travellers, you will not need to worry about expensive fiat conversions. With blockchain, you can go anywhere in the world and use the same currency, or you can exchange xDai for local currency with small fees.

# Main features

- ✈️ Fast (within 10 seconds) transfer to worldwide users

- 🎈 Free in-network transfers and very low transfer fees via xDAI blockchain (a high-performance sidechain of Ethereum)

- 📅 Scan QR code to make a payment

- ☕️ Request customer payments at local businesses

- 📝 Address book to save recent contacts

- 🥇 One unique user name, no need to type long addresses

- 🔑 We let you manage your private key if you like

- 💱 Support conversion to and from fiat (USD, GBP, EUR, AUD) (In Development)

- 💲 Borrow BTC, ETH with xDai as collatoral (In Development)

- 📈 Invest in DeFi mining protocals to earn passive income with your xDai savings (In Development)

# How we built it
- **React Native** for iOS and Android devices

- **Vercel** for serverless backend functions

- **MongoDB** as database

- **NCR Consumer Data Management API** for user management

- **Figma** as collaborative design tool


# Git Repos
- Mobile App https://github.com/wjw12/taidl-hackgt-2020/tree/main

- Blockchain APIs https://github.com/wjw12/mock-xdai-chain

- Backend https://github.com/wjw12/taidl-backend

# Taidl Design Doc (old version)

## Goal
Tidal is a xDAI wallet app that enables people to use cryptocurrency (xDAI stablecoin) in day-to-day spending.

## Main features
- Fast (within 10 seconds) transfer to worldwide users
- Free in-network transfers and very low transfer fees via xDAI blockchain (a high-performance sidechain of Ethereum)
- Scan QR code to make a payment
- Address book to save recent contacts
- One unique ID, multiple accounts for different purposes
- Anonymous transfer
- Support conversion to and from fiat (USD, GBP, EUR, AUD)

## Types of xDAI transfer
1. In-network: transfer between Tidal users is in-network. 
- zero fees (Tidal pays for it)
- User ID appears as the sender and receipient, unless in an anonymous transfer
- mobile push notification
- visible on Blockscout (it's a real transfer via blockchain, everyone can witness it)

2. Out-network (via blockchain): transfer with any xDAI address
- small fees (500 transactions cost about $0.01)
- xDAI address appears as the sender and receipient
- user can fund their accounts via blockchain

## Account structure
When a user registers with Tidal, a unique user ID (Tidal ID) is chosen. Tidal ID will appear in every in-network transaction unless the transaction is specified as anonymous. Tidal users can transfer xDAI to another user by the user ID.

A user ID associates with multiple accounts. By default, upon successful registration, a default account is auto generated. An account in its essence is an Ethereum address (Note: xDAI sidechain shares the same address as Eth addr), however we prefer to use the term "account" in the app to simplify the concept by mimicing the way traditional personal finance app works.

User can create multiple accounts, which essentially creates multiple ETH address. User can choose which account to use when making a payment.

Each account (ETH address) has a private key. Whoever owns the key owns the access to the money of the address. By default, the private key is maintained by Tidal server so that users do not need to bear the burden of storing private keys (mnemonic phrases) at the risk of losing or leaking them. However we should provide options to users who want to self-manage the private keys.

There are two modes of key management:
- managed by Tidal: the key is securely stored in Tidal server. User is still able to export the private key and keep a local copy.
- managed by user: the key is deleted from Tidal server. User must keep the key in safe and accessible place otherwise the money is lost. This feature is for advanced users only, so the entry point should not appear in main UI but hide in some menu.

When user logs in a different device, those accounts with Tidal-managed keys will be avaiable to use immediately. Those accounts with self-managed keys will appear in the app but inactive (Because Tidal server does not have the keys). Only after user imports the private  keys (type in the mnemonic phrases) can they be activated.

Information associated with an account:
- whether is default (one user ID can only have 1 default account. It will be used as the default method for receiving payment)
- whether is anonymous - by default every account is not anonymous, which means when making a transfer the sender name will be user ID. And when receiving an in-network payment the receipient name shows user ID. User can set an account to anonymous then the account name appears as "Tidal User" as sender and receipient. 
- account label (e.g. default, savings, secret wallet). Only visible to local user. User can name whatever they like, but no duplicates.
- key management mode
- account address (Eth address): normally it's not very useful for in-network transfer unless anonymous

## How to make a payment (to another Tidal user, or a ETH address)
Several ways:
1. type receipient user ID, and send
2. scan a QR code, the code includes the ETH address. Or paste an ETH address. Tidal checks if it belongs to a Tidal user. If yes, the receipient name shows the Tidal ID or "Tidal User" if that account is anonymous.
3. select a contact from address book, and send

Sender can send in either anonymous mode or not. The rule is:
1. By default, transfers from an anonymous account is anonymous, named account is named
2. User can click a checkbox to make the transfer anonymous

In a transfer preview page, the user is able to preview the transaction amount, the estimated arrival time (let's just generate a random number a few seconds), and see the sender name and receipient name (Tidal ID, or "Tidal User", or ETH address)


