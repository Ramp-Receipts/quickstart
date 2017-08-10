# Node.js sample

Node.js sample is a simple Express module called `receipts.js` that has 4 endpoints defined using the Express router. Two of those endpoints are calling Ramp Receipts API in order to get the list of receipts and individual receipts.

Things you need to take care after copying the module to your project (follow TODO comments in code):

- `express` and `request` need to be installed
- Ramp Receipts API access key must be defined (either hard code it in the module, or better define it as an environment variable)
- Stripe `customerId` for the currently logged in user need to be used (you would load it from the session, or from the database)
- Customer data need to be loaded from and saved to your database
