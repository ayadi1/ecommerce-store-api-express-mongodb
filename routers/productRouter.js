const express = require("express");
const Authorization = require("../middlewares/auth");

const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProductAndFilter,
  uploadFileTester,
} = require("../controllers/productController");
const route = express.Router();

route.route("/search").get(getAllProductAndFilter);
route.route("/").get(getAllProducts).post(Authorization, addProduct);
route
  .route("/:id")
  .get(getProduct)
  .patch(Authorization, updateProduct)
  .delete(Authorization, deleteProduct);
// route.post("/uploadFile", uploadFileTester);

module.exports = route;
