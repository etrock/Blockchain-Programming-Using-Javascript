const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

const bodyParser = require('body-parser')
const express = require('express')
const app = express()


const transactions = [] 

let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

app.use(bodyParser.json())

app.post('/transactions', (req, res) => {
    let {to, from, amount} = req.body
    const transaction = new Transaction(from,to, amount)
    transactions.push(transaction)
    res.json(transactions)
})

app.get('/mine', (req, res) => {
    const block = blockchain.getNextBlock(transactions)
    blockchain.addBlock(block)
    res.json(block)
})

app.get('/blockchain', (req, res) => {
    res.json(blockchain)
})


const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);