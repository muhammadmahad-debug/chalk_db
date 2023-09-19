require("dotenv").config();

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const User = require("../model/User");

// Define the handler function
async function handler(req, res) {
  try {
    const {
      name,
      email,
      line1,
      line2,
      city,
      state,
      postal_code,
      paymentMethod,
    } = req.body;
    let customer;
    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      customer = await stripe.customers.create({
        email,
        name,
        address: {
          line1,
          line2,
          city,
          state,
          postal_code,
        },
        payment_method: paymentMethod,
        invoice_settings: { default_payment_method: paymentMethod },
      });

      const user = new User({
        userName: name,
        email: email,
        customerId: customer.id,
      });

      // Saving the user to the database
      await user.save();
    } else {
      customer = {
        id: dbUser.customerId,
      };
    }
    // Create a customer

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: "price_1NrsXKKRsEKMHleBuZT9oI04",
        },
      ],
      trial_period_days: 7,
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      expand: ["pending_setup_intent"],
      payment_behavior: "default_incomplete",
    });

    // Send back the client secret for payment
    res.json({
      message: "Subscription successfully initiated",
      customerId: customer.id,
      clientSecret: subscription.pending_setup_intent.client_secret,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Export the handler function
module.exports = handler;
