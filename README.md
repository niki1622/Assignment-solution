

## Price API

The price API is an HTTP service that returns the price details for a product, identified by it's name. The shopping cart should integrate with the price API to retrieve product prices. 

### Price API Service Details

Start the price API by running the following command: `npm run serve-products`

Base URL: `http://localhost:3001/`

View Product: `GET /products/{product}`

List of available products
* `cheerios`
* `cornflakes`
* `frosties`
* `shreddies`
* `weetabix`

## Example
The below is a sample with the correct values you can use to confirm your calculations

### Inputs
* Add 1 × cornflakes @ 2.52 each
* Add another 1 x cornflakes @2.52 each
* Add 1 × weetabix @ 9.98 each
  
### Results  
* Cart contains 2 x cornflakes
* Cart contains 1 x weetabix
* Subtotal = 15.02
* Tax = 1.88
* Total = 16.90
## Solution 
## Implement the Shopping Cart Logic ( App.js)
Create a Cart class that:
     Stores items as an array of { name, quantity, price }.
     Fetches product prices from the Price API (http://localhost:3001/products/{product}).
Calculates:
     Subtotal (sum of all product prices)
     Tax (12.5% of subtotal)
     Total (subtotal + tax)
## Connect to the Price API
Use fetch or axios to retrieve prices dynamically when adding items to the cart.
## Writed Unit Tests ( App.test.ts)
Adding products
Calculating totals correctly
Handling invalid products
