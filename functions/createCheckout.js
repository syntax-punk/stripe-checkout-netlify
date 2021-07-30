const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const inventory = require('./data/products.json');

exports.handler = async (event) => {
  //  data is send from the form submission step
  const { sku, quantity} = JSON.parse(event.body);
  //  find the product from db based on the sku
  const product = inventory.find((p) => p.sku === sku);
  //  validate product quantity
  const validatedQty = quantity > 0 && quantity < 11 ? quantity : 1;
  
  //  create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['NO', 'CA']
    },
    success_url: `${process.env.URL}/success.html`,
    cancel_url: process.env.URL,
    line_items: [
      {
        name: product.name,
        description: product.description,
        images: [product.image],
        amount: product.amount,
        currency: product.currency,
        quantity: validatedQty
      }
    ]
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
  }
}