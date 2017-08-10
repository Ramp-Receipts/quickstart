# PHP sample

PHP sample is a vanilla PHP class in `receipts.php` that has 4 endpoints defined using `.htaccess` file. Two of those endpoints are calling Ramp Receipts API in order to get the list of receipts and individual receipts.

Things you need to take care after copying the class to your project (follow TODO comments in code):

- Make sure you have routes defined in your `.htaccess` file
- Ramp Receipts API access key must be defined (either hard code it in the class, or better define it as an environment variable)
- Stripe `customerId` for the currently logged in user need to be used (you would load it from the session, or from the database)
- Customer data need to be loaded from and saved to your database
