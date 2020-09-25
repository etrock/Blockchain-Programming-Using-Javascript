let Block = require('./block')
let Blockchain = require('./blockchain')
let Transaction = require('./transaction')

let transaction = new Transaction('Mary', 'Jerry', 100)

let genesisBlock = new Block()

let blockchain = new Blockchain(genesisBlock)

let block = blockchain.getNextBlock([transaction])
blockchain.addBlock(block)

let anotherTransaction = new Transaction('Bob', 'James', 300)
let anotherBlock = blockchain.getNextBlock([anotherTransaction])
blockchain.addBlock(anotherBlock)


console.log(blockchain)