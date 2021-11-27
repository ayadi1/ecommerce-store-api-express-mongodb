const express = require("express");
const Authorization = require("../middlewares/auth");

const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProductAndFilter,
} = require("../controllers/productController");
const route = express.Router();

route.route("/search").get( getAllProductAndFilter);
route.route("/").get(getAllProducts).post(Authorization, addProduct);
route
  .route("/:id")
  .get(getProduct)
  .patch(Authorization, updateProduct)
  .delete(Authorization, deleteProduct);

module.exports = route;
