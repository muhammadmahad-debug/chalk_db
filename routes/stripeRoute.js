// const express = require('express')
// const annualhandler = require('../controllers/annualSubscription')
// const monthlyhandler = require('../controllers/monthlySubscription')
// const webhookhandler = require('../controllers/webhook')

// const router = express.Router()

// router.post('/annualsubscribe', annualhandler)
// router.post('/monthlysubscribe', monthlyhandler)
// router.post('/webhook', webhookhandler)

// module.exports = router

const express = require("express");
const cors = require("cors");
const annualhandler = require("../controllers/annualSubscription");
const monthlyhandler = require("../controllers/monthlySubscription");
const webhookhandler = require("../controllers/webhook");

const router = express.Router();

// CORS options
const corsOptions = {
  origin: "https://join.chalkperformancetraining.com", // replace with your frontend application's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Use CORS middleware
router.use(cors(corsOptions));

router.post("/annualsubscribe", annualhandler);
router.post("/monthlysubscribe", monthlyhandler);
router.post("/webhook", webhookhandler);

module.exports = router;
