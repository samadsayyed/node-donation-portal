const express = require("express");
const app = express();
const cors = require("cors");

const stripe = require("stripe")("sk_test_51QZ5TIP6D9LHv1Cjiy9SvNggvI3GGprvFLBpACLrRyNrkeVJIP4P5kbJ0l2HvxYwJt6d0PXINlOABwgVZ929xbvJ00fuegIksn");


app.use(express.json());

app.use(cors());
app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "gbp",
    });
    console.log(paymentIntent.client_secret,"-----------");
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: error.message });
  }
});


app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
