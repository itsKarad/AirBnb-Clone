const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = process.env.FRONTEND_URL;


const { verifyUser, verifyPlace, getPlace, getUser, verifyBooking, getBooking } = require("../middleware/verify");
const Booking = require("../models/booking");



const createCheckoutSession = async (req, res, next) => {
    console.log(req.body);
    let {
        bookingId
    } = req.body;
    console.log(bookingId);
    let booking = await getBooking(req, res, next, bookingId);
    let customer = await getUser(req, res, next, booking.customerId);
    let place = await getPlace(req, res, next, booking.placeId);
    const customerEmail = customer.email;
    const session = await stripe.checkout.sessions.create({
        customer_email: customerEmail,
        line_items: [
        {
            price_data: {
                product_data: {
                    name: place.title,
                },
                unit_amount: booking.price * 100,
                currency: "INR",
            },
            quantity: 1,
        },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/place/${place._id}/?success=true`,
        cancel_url: `${YOUR_DOMAIN}/place/${place._id}/?cancelled=true`,
        client_reference_id: bookingId,
    });
    console.log(session.url);
    res.json(
        {stripeURL: session.url}
    );
    
};

const fulfillOrder = async (session) => {
    const bookingId = session.client_reference_id;
    if(!bookingId){
        return;
    }
    let booking = null;
    try{
        booking = await Booking.findById(bookingId);
    }
    catch{
        return;
    }
    if(!booking){
        return;
    }
    console.log("Fullfilling order 🚀 with BID:" + bookingId);

    booking.paymentSuccess = true;
    try{
        await booking.save();
    }
    catch{
        return (new HttpError("Something went wrong while saving successful transaction with booking ID" + bookingId));
    }
}

const createOrder = (session) => {

}

const emailCustomerAboutFailedPayment = (session) => {

}


const webhookHandler = async(request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];
    let event;
    // insecure
    //console.log(payload);
    // try {
    //     event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
    // } 
    // catch (err) {
    //     return response.status(400).send(`Webhook Error: ${err.message}`);
    // }
    //console.log(event);
    event = payload;
    console.log(event.type);
    // Handle events
    switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object;
          // Save an order in your database, marked as 'awaiting payment'
          //createOrder(session);
    
          // Check if the order is paid (for example, from a card payment)
          //
          // A delayed notification payment will have an `unpaid` status, as
          // you're still waiting for funds to be transferred from the customer's
          // account.
          if (session.payment_status === 'paid') {
            console.log("Should fulfill");
            await fulfillOrder(session);
          }
    
          break;
        }
    
        case 'checkout.session.async_payment_succeeded': {
            console.log("Should fulfill");
          const session = event.data.object;
    
          // Fulfill the purchase...
          await fulfillOrder(session);
    
          break;
        }
    
        case 'checkout.session.async_payment_failed': {
          const session = event.data.object;
          // Send an email to the customer asking them to retry their order
          //emailCustomerAboutFailedPayment(session);
    
          break;
        }
    }
  
    response.status(200);
};

module.exports = {
    createCheckoutSession,
    webhookHandler,
}