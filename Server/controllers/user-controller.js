import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return console.log(e);
  }

  if (existingUser) {
    return res.status(400).json({
      message: "An account associated with that email already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await newUser.save();
  } catch (e) {
    return console.log(e);
  }

  return res.status(201).json({ newUser });
};

export const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (e) {
    console.log(e);
  }

  if (!users) {
    return res.status(400).json({ message: "No users found" });
  }

  return res.status(200).json({ users });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return console.log(e);
  }

  if (!existingUser) {
     return res
      .status(404)
      .json({ message: "No account assosisated with this email!" });
  }

  const passwordsAreEqual = await bcrypt.compare(
    password,
    existingUser.password
  );


  if (!passwordsAreEqual) {
    return res.status(400).json({ message: "Incorrect password!" });
  }

  return res
    .status(200)
    .json({ message: "Login successful", user: existingUser });
};
