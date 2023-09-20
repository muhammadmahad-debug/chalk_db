const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { connectDB } = require("../config/db");
require("dotenv").config();
const stripeRoutes = require("../routes/stripeRoute");
const userRoutes = require("../routes/userRoute");
const app = express();
app.use(cors());


app.use(express.json({ limit: "4mb" }));
app.use(helmet());
connectDB();

app.use("/api/stripe", stripeRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
