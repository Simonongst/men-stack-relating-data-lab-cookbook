require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

const connectDB = require("./db/db.js");
const authController = require("./controllers/auth.js");
const foodsController = require('./controllers/food.js');
const isSignedIn = require('./middleware/is-signed-in.js');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/foods',foodsController);

const PORT = process.env.PORT ? process.env.PORT : "5001";

app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}!`);
});
