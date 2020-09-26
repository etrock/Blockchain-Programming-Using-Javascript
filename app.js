const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')
const DrivingRecordSmartContract = require('./smartContracts')

const bodyParser = require('body-parser')
const express = require('express')
const fetch = require('node-fetch');
const sha256 = require('js-sha256');

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

let transactions = []
let nodes = [] 

let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

app.use(bodyParser.json())

app.get('/resolve', (req, res) => {

    nodes.forEach( (node) => {
        console.log(node)
        fetch(node.url + '/blockchain')
        .then( (response) => {
            return response.json()
        })
        .then( (otherNodeBlockchain) => {
            if(blockchain.blocks.length < otherNodeBlockchain.blocks.length){
                blockchain = otherNodeBlockchain
            }
            res.send(blockchain)
        })
    })

})

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

app.get('/driving-records/:driverLicenseNumber', (req, res) => {
    
    let driverLicenseNumber = sha256(req.params.driverLicenseNumber)
    console.log(driverLicenseNumber)
    let transactions = blockchain.transactionsByDriverLicenseNumber(driverLicenseNumber)

    res.json(transactions)

})

app.post('/transactions', (req, res) => {

    let drivingRecordSmartContract = new DrivingRecordSmartContract()

    let {driverLicenseNumber, violationDate, violationType} = req.body
    driverLicenseNumber = sha256(driverLicenseNumber)
    let transaction = new Transaction(driverLicenseNumber,violationDate, violationType)

    drivingRecordSmartContract.apply(transaction , blockchain.blocks)

    transactions.push(transaction)
    res.json(transactions)
})

app.get('/mine', (req, res) => {
    const block = blockchain.getNextBlock(transactions)
    blockchain.addBlock(block)
    transactions = []
    res.json(block)
})

app.get('/blockchain', (req, res) => {
    res.json(blockchain) 
})


const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);