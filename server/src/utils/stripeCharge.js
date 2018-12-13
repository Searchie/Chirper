import stripeLoader from 'stripe';

const STRIPE = stripeLoader(process.env.STRIPE_SK);

function charge(token, amt) {
  //This will return a promise
  return STRIPE.charges.create({
    amount: amt * 100, //amount in cents
    currency: 'usd',
    source: token,
    description: 'Statement description'
  });
}

export { charge };