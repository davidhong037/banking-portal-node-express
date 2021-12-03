const express = require('express')
const router = express.Router()
const { accounts, writeJSON } = require('../data')

router.get('/transfer', (req, res) => {
    res.render('transfer')
})

router.get('/payment', (req, res) => {
    res.render('payment', { account: accounts.credit })
})

router.post('/transfer', (req, res) => {
    const fromAmount = accounts['savings'].balance - req.body.amount
    accounts['savings'].balance = fromAmount

    const checkingAcct = parseInt(accounts['checking'].balance)
    const toAmount = checkingAcct + parseInt(req.body.amount)
    accounts['checking'].balance = toAmount

    writeJSON()
    
    res.render('transfer', { message: "Transfer Completed" })
})

router.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount
    accounts.credit.available += parseInt(req.body.amount)

    writeJSON()
       
    res.render('payment', { message: "Payment Successful", account: accounts.credit } )
})

module.exports = router