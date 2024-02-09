import z from "zod";
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});

const signup = async (req, res) => {

  //zod checks
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
      res.status(400).json({
          message: 'Incorrect inputs or password too small'
      })
  }

  //destructuring
  const { username, email, password } = req.body;

  //existing username or email checks
  const existingUserWithUsername = await User.findOne({ username: username });
  const existingUserWithEmail = await User.findOne({ email: email });

  if (existingUserWithEmail) { 
    res.status(411).json({message: "a user already exists with that email, login instead"})
  }

  if (existingUserWithUsername) {
    res.status(411).json({message: "username taken"})
  }
  
  //hashing password with bcryptjs
  const saltRounds = 10;
  const hashedPassword = bcryptjs.hashSync(password, saltRounds);

  const newUser = await new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({message: "Signup successful!"});
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
  
};

export default signup;