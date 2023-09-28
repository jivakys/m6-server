const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
require("dotenv").config();

const getUser = async (req, res) => {
  try {
    let userId = req.userId;
    const user = await User.findById(userId);

    return res.status(200).json({
      status: true,
      message: " login hai ",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: " something went wrong try again later ",
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      avatar,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETKEY);
    res
      .header("x-auth-token", token)
      .json({ message: "Login successful", user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error", error });
  }
};

module.exports = { getUser, register, login };
