## todo dapp

### dependency overview
- node
- truffle
- express

### local blockchain
- [download ganache](https://www.trufflesuite.com/ganache)
- on `linux` platform eg:
```
$./ganache-2.3.0-beta.2-linux-x86_64.AppImage
```
- port `8545`

### metamask
- [download metamask](https://metamask.io/download.html)
- create account
- choose `http://localhost:8545` from the network dropdown
- import an account from `ganache` into metamask

### development configs
- setup `.env` for secrets
- `truffle-config.js` => development and test networks
- utilizing `infura.io` for testing against `rinkeby` test and mainnet network 

### rinkeby test faucet
- access [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/)
- generate `12` word mnemonic
- gather `mnemonic`
- save `address`, `public key` and `private key`
- request for funds at [https://faucet.rinkeby.io/](https://faucet.rinkeby.io/)

### install requirements
- [install nodejs instructions](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)
```
$ npm install
```

### compile smartcontract
```
$ truffle compile
```

### run migrations
```
$ truffle migrate
```
```
$ truffle migrate --network rinkeby
```

### run tests
```
$ truffle test
```

### start local web server
```
$ npm start
```


