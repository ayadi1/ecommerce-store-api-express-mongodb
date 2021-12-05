const OrderModule = require("../modules/orderModule");
const ProductModule = require("../modules/productModule");
const UserModule = require("../modules/userModule");
const getAllOrders = async (req, res) => {
  const { userID } = req.user;
  const orders = await OrderModule.find({ userID });
  res.status(200).json({ success: true, nOrders: orders.length, orders });
};
const addOrder = async (req, res) => {
  const { userID } = req.user;
  const { productID, quantity } = req.body;
  if ((!productID, !quantity)) {
    throw res.status(400).json({
      success: false,
      msg: "please provide a product {productID} id and quantity {quantity}",
    });
  }
  // check if product exist
  const product = await ProductModule.findOne({ _id: productID });
  if (!product) {
    throw res
      .status(400)
      .json({ success: false, msg: `non product with id: ${productID}` });
  }
  // update product quantity
  const productQuantity = product.quantity;
  if (productQuantity == 0) {
    throw res.status(400).json({ success: false, msg: "product out of stock" });
  }
  if (quantity > productQuantity) {
    throw res
      .status(400)
      .json({ success: false, msg: "please provide other quantity " });
  }
  const updateProductData = await ProductModule.findByIdAndUpdate(
    productID,
    {
      quantity: productQuantity - quantity,
    },
    { new: true, runValidators: true }
  );
  // add order
  const orderData = {
    productID,
    userID,
    quantity,
  };
  const newOrder = await OrderModule.create(orderData);
  if (!newOrder) {
    throw res
      .status(500)
      .json({ success: false, msg: "server error please try again" });
  }
  res.status(201).json({ success: true, order: newOrder });
};
const getOneOrder = async (req, res) => {
  const order = await OrderModule.findOne({
    _id: req.params.id,
    userID: req.user.userID,
  });
  res.status(200).json({ success: true, order });
};
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { userID } = req.user;
  const { status, trackingNumber } = req.body;
  const newOrderData = {};
  // check if order exists
  const order = await OrderModule.findById(id);
  const user = await UserModule.findById(userID);
  if (!order) {
    throw res
      .status(400)
      .json({ success: false, msg: `non order with id: ${id}` });
  }
  if (status) {
    newOrderData.status = status;
  }
  if (trackingNumber && user.isAdmin) {
    newOrderData.trackingNumber = trackingNumber;
  }
  const updatedOrder = await OrderModule.findByIdAndUpdate(id, newOrderData, {
    new: true,
    runValidators: true,
  });
  if (!updatedOrder) {
    throw new Error("server error please try again");
  }

  res.status(200).json({ success: true, updatedOrder });
};
const deleteOrder = async (req, res) => {
  const { userID } = req.user;
  const { id } = req.params;
  const order = await OrderModule.findById(id);
  const user = await UserModule.findById(userID);
  if (!order) {
    return res
      .status(400)
      .json({ success: false, msg: `non order with id: ${id}` });
  }
  if (user.isAdmin) {
    const deleteOrderByAdmin = await OrderModule.findByIdAndDelete(id);
    if (!deleteOrderByAdmin) {
      throw new Error("server error please try again");
    }
    return res.status(200).json({ success: true });
  }
  const deleteOrderByUser = await OrderModule.findOneAndDelete({
    _id: id,
    userID,
  });
  if (!deleteOrderByUser) {
    throw new Error("server error please try again");
  }
  return res.status(200).json({ success: true });
};
const paysOrder = async (req,res)=>{
  
}
module.exports = {
  getAllOrders,
  addOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
};
