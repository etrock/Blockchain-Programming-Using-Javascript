const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

const bodyParser = require('body-parser')
const express = require('express')
const app = express()


const transactions = [] 

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.post('/transactions', (req, res) => {
    let {to, from, amount} = req.body
    const transaction = new Transaction(from,to, amount)
    transactions.push(transaction)
    res.json(transactions)
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