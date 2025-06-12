
import express, { Request, Response } from 'express';
import { signinSchema, signupSchema } from '../types/index.js';
import  prisma from "../db.js";
import jwt from "jsonwebtoken";
import JWT_SECRET from '../config.js';
import authMiddleware from "../middleware.js";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
});

router.post("/signup", async(req: Request, res: Response) =>{
  const SignUpBody = await req.body;

  const { success } = signupSchema.safeParse(SignUpBody);

  if(!success){
     res.status(400).json({
      message: "Invalid Inputs",
    });
    return;
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email : req.body.email
    }
  });

  if(existingUser){
    res.status(409).json({
      message: "user already exists",

    });
    return;
  }
  try{
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    });
    const userId: number = user.id;

    if(!userId){
      res.status(500).json({
      message: "Something went wrong!",
    });
    return;
    }
    const payload = {
      userId
    }

    const token = jwt.sign(payload, JWT_SECRET);

    res.status(200).json({
    message: "user created successfully",
    token: token,
  });

    
  }catch(e){
    console.log("error creating signup query ", e);
    return;
  };  
});


router.post('/signin', async(req: Request, res: Response)=> {
  const signinBody = await req.body;
  const {success} = signinSchema.safeParse(signinBody);

  if(!success){
    res.status(400).json({
      message: "Invalid inputs"
    });

    return;
  };
  try{
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    });

    if(!user){
      res.status(404).json({
        message: "No account exists. SignUp to continue"
      });

      return;
    };

    const userId: number = user.id;

    const payload = {
      userId
    }

    const token = jwt.sign(payload, JWT_SECRET);

    res.status(200).json({
      message: "Signin Successfull",
      token: token
    })

  }catch(e){
    console.log("error in signing up: ", e)

  }

});

router.get("/dashboard", async(req: Request, res: Response)=> {


})

export {router}