const express = require("express");
const {
  getShoppingCartOrders,
  addOrderToShoppingCart,
  getOneShoppingCartOrder,
  updateShoppingCartOrder,
  deleteShoppingCartOrder,
} = require("../controllers/shoppingCartController");

const route = express.Router();

route
  .route("/")
  .get(getShoppingCartOrders)
  .post(addOrderToShoppingCart);
  
  route
  .route("/:id")
  .get(getOneShoppingCartOrder)
  .patch(updateShoppingCartOrder)
  .delete(deleteShoppingCartOrder);

module.exports = route;
