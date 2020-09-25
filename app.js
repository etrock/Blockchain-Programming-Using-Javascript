const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

const bodyParser = require('body-parser')
const express = require('express')
const BlockchainNode = require('./BlockchainNode')
const app = express()

let port = 3000

// access the arguments
process.argv.forEach((val,index, array) => {
    port = array[2]
})

if(port == undefined) {
    port = 3000
}

const transactions = []
const nodes = [] 

let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

app.use(bodyParser.json())


app.post('/nodes/register', (req,res) => {
    const nodesLists = req.body.urls
    nodesLists.forEach((nodeDictionary) => {
        let node = new BlockchainNode(nodeDictionary['url'])
        nodes.push(node)
    })

    res.json(nodes)
})

app.get('/nodes', (req,res) => {
    res.json(nodes)
})

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


const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);