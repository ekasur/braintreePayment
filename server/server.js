const express = require("express");
const cors = require("cors");
const port = 3000;
const bodyParser = require('body-parser');
require("dotenv").config();
const braintree = require("braintree");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.merchantId,
  publicKey: process.env.publicKey,
  privateKey: process.env.privateKey
});

app.get("/client_token", (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
      res.send(response.clientToken);
    });
});

app.post("/checkout", (req, res) => {
    console.log(req.body);

    const nonceFromTheClient = req.body.payment_method_nonce;
    const deviceDataFromTheClient = req.body.deviceData;
    // Use payment method nonce here
    gateway.transaction.sale({
        amount: "11.00",
        paymentMethodNonce: nonceFromTheClient,
        deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if (err){
            res.send(err.message);
        }
        res.send(result);
      });
});

app.get('/', (req, res)=>{
  res.send('braintree payment....')
})

app.listen(port, ()=>{
    console.log('Server listen on port '+port);
})