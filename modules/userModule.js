require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: {
    type: "String",
    required: [true, "please provide name"],
    minlength: 4,
    trim: true,
  },
  email: {
    type: "String",
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  city: {
    type: String,
    minlength: 4,
  },
  postalCode: {
    type: String,
    minlength: 3,
  },
  country: {
    type: String,
    minlength: 4,
  },
  address: {
    type: String,
    minlength: 4,
  },
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.genToken = async (id, email) => {
  try {
    const token = await jwt.sign({ id, email }, process.env.TOKEN_STRING_KEY, {
      expiresIn: process.env.TOKEN_LIFE_TIME,
    });
    return token;
  } catch (error) {
    res.json({ success: false, msg: "field to get token" });
  }
};

module.exports = mongoose.model("user", UserSchema);
