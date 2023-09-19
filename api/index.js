const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { connectDB } = require("../config/db");
require("dotenv").config();
const stripeRoutes = require("../routes/stripeRoute");
const userRoutes = require("../routes/userRoute");

connectDB();
const app = express();

app.use(express.json({ limit: "4mb" }));
app.use(helmet());
app.use(cors());
app.options("*", cors());

app.use("/api/stripe", stripeRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
