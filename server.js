const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const cors = require("cors");

const verifyAdmin = require("./middleware/verifyAdmin");
const verifyCustomer = require("./middleware/verifyCustomer");

const authRoutes = require("./routes/authRoutes");
const groundRoutes = require("./routes/groundRoutes");
const adminRoutes = require("./routes/adminRoutes");
const emailRoutes = require("./routes/emailRoutes");
const customerRoutes = require("./routes/customerRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");
const generalRoutes = require("./routes/generalRoutes");
const challengeRoutes = require("./routes/challengesRoutes");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/grounds", verifyAdmin.verifyAdmin, groundRoutes);
app.use("/admin", verifyAdmin.verifyAdmin, adminRoutes);
app.use("/email", emailRoutes);
app.use("/customer", verifyCustomer.verifyCustomer, customerRoutes);
app.use("/reviews", verifyCustomer.verifyCustomer, reviewsRoutes);
app.use("/general", generalRoutes);
app.use("/admin/challenge", verifyAdmin.verifyAdmin, challengeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Ground Booking API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connected successfully");
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
