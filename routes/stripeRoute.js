const express = require('express')
const annualhandler = require('../controllers/annualSubscription')
const monthlyhandler = require('../controllers/monthlySubscription')
const webhookhandler = require('../controllers/webhook')


const router = express.Router()

router.post('/annualsubscribe', annualhandler)
router.post('/monthlysubscribe', monthlyhandler)
router.post('/webhook', webhookhandler)



module.exports = router
