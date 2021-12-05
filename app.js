require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const shoppingCartRouter = require("./routers/shoppingCartRouter");
const orderRouter = require("./routers/orderRouter");
const Authorization = require("./middlewares/auth");
const fileUpload = require("express-fileupload");
var cors = require("cors");

const app = express();
// app use files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);
// app use json and body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app use routers
app.use("/api/v1/", userRouter);
app.use("/api/v1/product/", productRouter);
app.use("/api/v1/shoppingCart", Authorization, shoppingCartRouter);
app.use("/api/v1/order", Authorization, orderRouter);
// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ success: false, msg: err.message });
});

const start = async () => {
  const port = 5000 || process.env.PORT;
  await connectDB(process.env.DB_HOST_NAME);
  app.listen(port, () => {
    console.log(`your server is up in port ${port}`);
  });
};
start();
