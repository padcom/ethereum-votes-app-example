#!/usr/bin/env node
const fs = require('fs')
const Web3 = require('web3')
const solc = require('solc')

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const code = fs.readFileSync('Voting.sol').toString()
const compiledCode = solc.compile(code)
const abi = JSON.parse(compiledCode.contracts[':Voting'].interface)
const VotingContract = new web3.eth.Contract(abi)
const byteCode = compiledCode.contracts[':Voting'].bytecode

console.log('VotingContract', VotingContract)

web3.eth.getAccounts()
  .then(accounts => {
    VotingContract
      .deploy({ data: byteCode, arguments: [ [ 'Rama','Nick','Jose' ].map(Web3.utils.asciiToHex) ] })
      .send({ from: accounts[0], gas: 4700000 })
      .then(deployedContract => {
        console.log(deployedContract.options.address)
      });
  });
