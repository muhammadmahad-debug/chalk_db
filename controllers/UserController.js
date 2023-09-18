require("dotenv").config();

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const User = require("../model/User");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { userName, email, customerId } = req.body;
    const user = new User({ userName, email, customerId });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const chargeCustomer = async (req, res) => {
  try {
    const customer = await stripe.paymentMethods.list({
      customer: req.body.customer,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      customer: req.body.customer,
      payment_method: customer.data[0].id,
      confirm: true,
      description: req.body.description,
      return_url: "http://chalkperformancetraining.com/pages/thank-you",
    });
    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { userName, email, customerId } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { userName, email, customerId },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Soft delete: Update the user's isDeleted field to true
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );

    // Check if the user exists
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  chargeCustomer,
};
