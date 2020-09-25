const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.get('/blockchain', (req, res) => {
    let transaction = new Transaction('Mary', 'Jerry', 100)
    let genesisBlock = new Block()
    let blockchain = new Blockchain(genesisBlock)
    let block = blockchain.getNextBlock([transaction])
    blockchain.addBlock(block)

    let anotherTransaction = new Transaction('Bob', 'James', 300)
    let anotherBlock = blockchain.getNextBlock([anotherTransaction])
    blockchain.addBlock(anotherBlock)   

    res.json(blockchain)
})


const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);

/*
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

*/