import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createToken } from "../middlewares/checkAuth.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let errors = {};

  let existingUser;

  try {
    existingUser = await User.findOne({ email });

    if (existingUser) {
      errors.email = "An account associated with that email already exists.";
    }
  } catch (e) {
    return console.log(e);
  }

  if (password.length < 8) {
    errors.password = "Please enter a password with at least 8 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Incorrect details:",
      errors,
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
  const token = createToken(email);

  return res.status(201).json({ user: newUser, token });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let errors = {};

  if (password.length < 8) {
    errors.password = "Please enter a password with at least 8 characters.";
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return console.log(e);
  }

  if (!existingUser) {
    errors.userDNE = "No account assosisated with this email!";

    return res
      .status(422)
      .json({
        message: "Login unsuccessful",
        errors
      });
  }

  const passwordsAreEqual = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    errors.incorrectInput = "Wrong email or password.";


    return res.status(422).json({
      message: "Invalid login data.",
      errors
    });
  }

  const token = createToken(email);

  return res
    .status(200)
    .json({ message: "Login successful", user: existingUser, token });
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