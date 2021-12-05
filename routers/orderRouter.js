const express = require("express");

const router = express.Router();
const errorHandelFunction = require("../functions/errorHandling");
const {
  getAllOrders,
  addOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router
  .route("/")
  .get(errorHandelFunction(getAllOrders))
  .post(errorHandelFunction(addOrder));
router
  .route("/:id")
  .get(errorHandelFunction(getOneOrder))
  .patch(errorHandelFunction(updateOrder))
  .delete(errorHandelFunction(deleteOrder));

module.exports = router;
