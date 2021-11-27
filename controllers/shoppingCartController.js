const ShoppingCart = require("../modules/shoppingCartModule");
const User = require("../modules/userModule");
const Product = require("../modules/productModule");

const getShoppingCartOrders = async (req, res) => {
  try {
    const { userID } = req.user;
    const findShoppingCartOrders = await ShoppingCart.find({ userID });
    res
      .status(200)
      .json({ success: true, shoppingCartOrders: findShoppingCartOrders });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
const addOrderToShoppingCart = async (req, res) => {
  try {
    const { userID } = req.user;
    const { productID } = req.body;
    const orderInfo = req.body;
    orderInfo.userID = userID;
    if (!productID) {
      return res
        .status(400)
        .json({ success: false, msg: "pleas provide a product id" });
    }
    // check if product exist start
    const findProduct = await Product.findById(productID);
    if (!findProduct) {
      res
        .status(400)
        .json({ success: false, msg: `non product with id : ${productID}` });
    }
    // check if product exist end
    // check if order exist for user start and updated
    const findShoppingCartOrder = await ShoppingCart.findOne({
      productID,
      userID,
    });
    if (findShoppingCartOrder) {
      const quantity = findShoppingCartOrder.quantity;
      const newQuantity = Number(quantity) + Number(req.body.quantity);
      const UpdatedShoppingCart = await ShoppingCart.findOneAndUpdate(
        {
          productID,
          userID,
        },
        { quantity: newQuantity },
        { runValidators: true, new: true }
      );
      return res.status(200).json({ success: true, UpdatedShoppingCart });
    }
    // check if order exist for user end
    // add to shopping cart orders start
    const shoppingCartOrder = await ShoppingCart.create(orderInfo);
    if (!shoppingCartOrder) {
      return res.status(400).json({
        success: false,
        msg: "non order added to shopping cart pleas try again",
      });
    }
    // add to shopping cart orders end

    res.status(201).json({ success: true, shoppingCartOrder });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
const getOneShoppingCartOrder = async (req, res) => {
  try {
    const { userID } = req.user;
    const { id: orderShoppingCartID } = req.params;
    const findUser = await User.findById(userID);
    const fineSingleOrderShoppingCart = await ShoppingCart.findOne({
      userID,
      _id: orderShoppingCartID,
    });
    if (fineSingleOrderShoppingCart || findUser.isAdmin) {
      const findShoppingCartOrders = await ShoppingCart.findById(
        orderShoppingCartID
      );

      return res
        .status(200)
        .json({ success: true, order: findShoppingCartOrders });
    }
    return res.status(400).json({
      success: false,
      msg: `non order in shopping cart with id : ${orderShoppingCartID} for user with id ${userID} `,
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
const updateShoppingCartOrder = async (req, res) => {
  res.send("updateShoppingCartOrder");
};
const deleteShoppingCartOrder = async (req, res) => {
  try {
    const { userID } = req.user;
    const { id: orderShoppingCartID } = req.params;
    const findUser = await User.findById(userID);
    const fineSingleOrderShoppingCart = await ShoppingCart.findOne({
      userID,
      _id: orderShoppingCartID,
    });
    if (fineSingleOrderShoppingCart || findUser.isAdmin) {
      await ShoppingCart.findByIdAndDelete(orderShoppingCartID);

      return res
        .status(200)
        .json({ success: true, msg: "order was deleted from shopping cart" });
    }
    return res.status(400).json({
      success: false,
      msg: `non order in shopping cart with id : ${orderShoppingCartID} for user  ${findUser.name} `,
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

module.exports = {
  getShoppingCartOrders,
  addOrderToShoppingCart,
  getOneShoppingCartOrder,
  updateShoppingCartOrder,
  deleteShoppingCartOrder,
};
