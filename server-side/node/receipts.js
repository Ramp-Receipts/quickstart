// TODO: express and request must be installed
const express = require('express');
const request = require('request');
const router = express.Router();

const rootUrl = 'https://rampreceipts.com/api/v1/receipt/';

// TODO: Make sure you have your access key defined here
const accessKey = 'rr_...';

// TODO: Stripe customer ID would be loaded from the database (current logged in customer/user)
const customerId = 'cus_...';

// Customer data would be loaded from the database
const customerData = {
  name: 'John Doe',
  address: {
    line1: 'Elm Street 12',
    line2: 'App 13',
    country: 'USA',
    state: 'New York',
    city: 'New York',
    zip: '11000'
  }
};

// Gets the list of monthly receipts with links to PDFs
// one page only with 60 months - so 5 years of receipts
router.get('/', (req, res, next) => {
  request
    .post({
      url: `${rootUrl}${customerId}?page-size=60`,
      headers: {
        'Authorization': `Token ${accessKey}`,
        'Content-Type': 'application/json'
      },
      json: {
        customer: customerData
      }
    }, (error, response, body) => {
      if (error) {
        let errorMessage = `Error calling Ramp Receipts API: ${error}`;
        console.log(errorMessage);
        res.status(500).json({ error: errorMessage });
      } else {
        res.json(body);
      }
    });
});

// Get the receipt for the given month
router.get('/:year/:month', (req, res, next) => {
  let year = req.params.year;
  let month = req.params.month;

  request
    .post({
      url: `${rootUrl}${customerId}/${year}/${month}`,
      headers: {
        'Authorization': `Token ${accessKey}`,
        'Content-Type': 'application/json'
      },
      json: {
        customer: customerData
      }
    }, (error, response, body) => {
      if (error) {
        let errorMessage = `Error calling Ramp Receipts API: ${error}`;
        console.log(errorMessage);
        res.status(500).json({ error: errorMessage });
      } else {
        res.json(body);
      }
    });
});

// Get the current customer data from the db
router.get('/customer', (req, res, next) => {
  // TODO: Do the actual loading from DB here
  res.json(customerData);
});

// Save the current customer data to the DB
router.post('/customer', (req, res, next) => {
  let customer = req.body;

  console.log('Saving customer: ', customer);
  // TODO: Save the customer data to DB

  res.status(200).json(customer);
});

module.exports = router;
