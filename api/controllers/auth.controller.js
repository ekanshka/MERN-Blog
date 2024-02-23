import z from "zod";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { errorHandler } from "../utils/errorHandler.js";

dotenv.config();
const jwt_secret = process.env.JWT_SECRET || 'secret_string';

//zod types
const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const signup = async (req, res, next) => {
  //zod checks
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return next(errorHandler("Password is too small or incorrect inputs")); // CAN NOT STRESS THIS FACT ENOUGH PLEASE RETURN ERRORS THROUGH ERROR HANDLER AND A STATUS CODE IS SO IMPORTANT TO FIND OUT BUGS WTF
    // res.status(400).json({
    //     message: 'Incorrect inputs or password too small (must be 5 characters long)'
    // })
  }

  try {
    //destructuring
    const { username, email, password } = req.body;

    //existing username or email checks
    const existingUserWithUsername = await User.findOne({ username: username });
    const existingUserWithEmail = await User.findOne({ email: email });

    if (existingUserWithEmail) {
      return next(
        errorHandler("a user already exists with that email, login instead")
      );
    }

    if (existingUserWithUsername) {
      return next(errorHandler("username taken"));
      // res.status(411).json({message: "username taken"});
      //dont know if i should create an error for this case...
    }

    //hashing password with bcryptjs
    const saltRounds = 10;
    const hashedPassword = bcryptjs.hashSync(password, saltRounds);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "Signup successful!" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  //zod checks
  const { success } = signinSchema.safeParse(req.body);

  if (!success) {
    //error 400
    return next(errorHandler("Incorrect inputs")); // CAN NOT STRESS THIS FACT ENOUGH PLEASE RETURN ERRORS THROUGH ERROR HANDLER AND A STATUS CODE IS SO IMPORTANT TO FIND OUT BUGS WTF
  }

  try {
    //destructuring Request body
    const { email, password } = req.body;

    //email and password check from database and bcryptjs
    const validUser = await User.findOne({ email: email });     //works as a user info extraction for later as well

    if (!validUser) {
      return next(
        errorHandler("No user found")
      );
    }

    //hashing password with bcryptjs
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    //so acutally, the salt is stored in the hashed password automatically, hence not needing the salt when verifying.

    if(!validPassword) {
      return next(
        errorHandler("Invalid Password")
      )
    }

    // @ts-ignore
    const {password: whateverPassword, ...rest} = validUser._doc;    //notice the way of excluding the password from the object

    //signing jwt token with user id and jwt_secret to send
    const token = jwt.sign({id: validUser._id}, jwt_secret);

    res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest);

  } catch (error) {
    next(error);
  }
};
