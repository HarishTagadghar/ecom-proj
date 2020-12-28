require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const bannerRoutes = require("./routes/banner");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");
const RazorpayRoutes = require("./routes/razorpay");

//DB Connection
mongoose
//mongodb://localhost:27017/name
  .connect("mongodb+srv://Harish-admin:gorahul269@cluster0-qxhqz.mongodb.net/ecom?retryWrites=true&w=majority" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  }).catch(err => {
    console.log(err);
  })

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", bannerRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", RazorpayRoutes); 


//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
