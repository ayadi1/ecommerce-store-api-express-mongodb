require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const shoppingCartRouter = require("./routers/shoppingCartRouter");
const Authorization = require("./middlewares/auth");

const app = express();

// app use json parser
app.use(express.json());
// app use routers
app.use("/api/v1/", userRouter);
app.use("/api/v1/product/", productRouter);
app.use("/api/v1/shoppingCart", Authorization, shoppingCartRouter);

const start = async () => {
  const port = 5000 || process.env.PORT;
  await connectDB(process.env.DB_HOST_NAME);
  app.listen(port, () => {
    console.log(`your server is up in port ${port}`);
  });
};

start();
