const { json } = require("body-parser")
const stripe = require('stripe')('sk_test_51OHhpdSHOPCy8W3A4EieW0iFT2ixYBD8h5EaZDGj6ndWfcTaP9biiJy3pIq60LfSzAhs84o3cOuI9KEg0wRjWEiK00kQ9anIrc')

const uuid = require("uuid").v4; 

exports.handlePayment =async (req,res) => {
  try {
  const { product, token, subTotal, email } = req.body;
    const idempotencyKey = uuid();

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: subTotal * 100,
        currency: 'inr',
        receipt_email: email,
        description: `Payment for ${product}`,
      },
      { idempotencyKey }
    );

    res.status(200).json(paymentIntent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

    
//     const prices = await stripe.prices.list({
//         lookup_keys: [req.body.lookup_key],
//         expand: ['data.product'],
//       });
//       const session = await stripe.checkout.sessions.create({
//         billing_address_collection: 'auto',
//         line_items: [
//           {
//             price: prices.data[0].id,
//             // For metered billing, do not pass quantity
//             quantity: 1,
    
//           },
//         ],
//         mode: 'subscription',
//         success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//       });
    
//       res.redirect(303, session.url);
//     };

//     exports.paymentcreate=async(req,res)=>{
//         const { session_id } = req.body;
//         const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
      
//         // This is the url to which the customer will be redirected when they are done
//         // managing their billing with the portal.
//         const returnUrl = YOUR_DOMAIN;
      
//         const portalSession = await stripe.billingPortal.sessions.create({
//           customer: checkoutSession.customer,
//           return_url: returnUrl,
//         });
      
//         res.redirect(303, portalSession.url);
//       }

//       exports.webbook.express.raw({type: 'application/json'})= async(request, response) =>{
//         let event = request.body;
//     // Replace this endpoint secret with your endpoint's unique secret
//     // If you are testing with the CLI, find the secret by running 'stripe listen'
//     // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
//     // at https://dashboard.stripe.com/webhooks
//     const endpointSecret = 'whsec_12345';
//     // Only verify the event if you have an endpoint secret defined.
//     // Otherwise use the basic event deserialized with JSON.parse
//     if (endpointSecret) {
//       // Get the signature sent by Stripe
//       const signature = request.headers['stripe-signature'];
//       try {
//         event = stripe.webhooks.constructEvent(
//           request.body,
//           signature,
//           endpointSecret
//         );
//       } catch (err) {
//         console.log(`⚠️  Webhook signature verification failed.`, err.message);
//         return response.sendStatus(400);
//       }
//     }
//     let subscription;
//     let status;
//     // Handle the event
//     switch (event.type) {
//       case 'customer.subscription.trial_will_end':
//         subscription = event.data.object;
//         status = subscription.status;
//         console.log(`Subscription status is ${status}.`);
//         // Then define and call a method to handle the subscription trial ending.
//         // handleSubscriptionTrialEnding(subscription);
//         break;
//       case 'customer.subscription.deleted':
//         subscription = event.data.object;
//         status = subscription.status;
//         console.log(`Subscription status is ${status}.`);
//         // Then define and call a method to handle the subscription deleted.
//         // handleSubscriptionDeleted(subscriptionDeleted);
//         break;
//       case 'customer.subscription.created':
//         subscription = event.data.object;
//         status = subscription.status;
//         console.log(`Subscription status is ${status}.`);
//         // Then define and call a method to handle the subscription created.
//         // handleSubscriptionCreated(subscription);
//         break;
//       case 'customer.subscription.updated':
//         subscription = event.data.object;
//         status = subscription.status;
//         console.log(`Subscription status is ${status}.`);
//         // Then define and call a method to handle the subscription update.
//         // handleSubscriptionUpdated(subscription);
//         break;
//       default:
//         // Unexpected event type
//         console.log(`Unhandled event type ${event.type}.`);
//     }
//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//       }

//     if(JSON.parse(response).STATUS==="tn_sucess"){
//         res.sendFile(__dirname,"/sucess.html")
//     }
