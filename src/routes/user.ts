
import express, { Request, Response } from 'express';
import { signupSchema } from '../../types';

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

  // const existingUser = await

})

export {router}