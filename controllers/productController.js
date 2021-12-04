require("dotenv").config();
const Product = require("../modules/productModule");
const User = require("../modules/userModule");
const _ = require("lodash");
const {
  uploadOneImage,
  uploadMultipleImage,
} = require("../functions/uploadFile");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort("-createdAt");
    res.json({ nProduct: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
const getAllProductAndFilter = async (req, res) => {
  try {
    const { name, price, company, createdAt, sort, fields, limit, page } =
      req.query;
    const queryOptionFilter = {};
    let sortObjectFilter = "createdAt ";
    let fieldsFilter = "";
    let productLimit = 10;
    let numberOfSkippedProduct = 0;
    if (page) {
      for (let i = 1; i < Number(page); i++) {
        numberOfSkippedProduct += 10;
      }
    }
    if (limit) {
      productLimit = Number(limit);
    }
    if (fields) {
      fieldsFilter += fields.split(",").join(" ");
    }
    if (sort) {
      sortObjectFilter += sort.split(",").join(" ");
    }
    if (name) {
      queryOptionFilter.name = { $regex: _.lowerCase(name), $options: "i" };
    }
    if (company) {
      queryOptionFilter.company = _.lowerCase(company);
    }

    if (createdAt) {
      queryOptionFilter.createdAt = createdAt;
    }

    const products = await Product.find(queryOptionFilter)
      .sort(sortObjectFilter)
      .select(fieldsFilter)
      .limit(productLimit)
      .skip(numberOfSkippedProduct)
      .exec();
    res.json({ nProduct: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
const getProduct = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const product = await Product.findOne({ _id: productID });
    if (!product) {
      return res
        .status(400)
        .json({ success: false, msg: `non product by id : ${productID}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
const addProduct = async (req, res) => {
  try {
    let imageListNAme = [];
    if (req.files.images) {
      //  upload files
      if (Array.isArray(req.files.images)) {
        //! upload Multiple image
        const imageName = await uploadMultipleImage(req.files.images);
        if (imageName) imageListNAme = [...imageName];
      } else {
        const imageName = await uploadOneImage(req.files.images);
        if (imageName) imageListNAme.push(imageName);
      }
    }
    const { userID } = req.user;
    const { name, price, quantity, company } = req.body;
    const findUser = await User.findById(userID);
    if (!findUser.isAdmin) {
      return res.status(403).json({
        success: false,
        msg: "you don't have permission to add product",
      });
    }
    if ((!name || !quantity, !company)) {
      return res.status(400).json({
        success: false,
        msg: "please provide all required field",
      });
    }
    const productInfo = req.body;
    productInfo.createdBy = userID;
    productInfo.imageList = imageListNAme;
    const newProduct = await Product.create(productInfo);
    if (!newProduct) {
      return res.status(500).json({
        success: false,
        msg: "can't add new product please try again",
      });
    }

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const { userID } = req.user;
    const findUser = await User.findById(userID);
    const findProduct = await Product.findOne({
      _id: productID,
      createdBy: userID,
    });
    if (findUser.isSuperAdmin || findProduct) {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: productID },
        req.body,
        { runValidators: true, new: true }
      );
      return res.status(200).json({ success: true, product: updatedProduct });
    }
    res.status(400).json({ success: false, msg: "can't update product" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const { userID } = req.user;
    const findUser = await User.findById(userID);
    const findProduct = await Product.findOne({
      _id: productID,
      createdBy: userID,
    });
    if (findUser.isSuperAdmin || findProduct) {
      const updatedProduct = await Product.findOneAndDelete({ _id: productID });
      return res
        .status(200)
        .json({ success: true, msg: "product was deleted" });
    }
    res.status(400).json({ success: false, msg: "can't delete product" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProductAndFilter,
};
