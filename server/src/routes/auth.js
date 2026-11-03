import {Router} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router=Router();
router.post("/login",async(req,res)=>{
 const {email,password}=req.body||{};
 if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD)
   return res.status(401).json({message:"Invalid email or password"});
 const token=jwt.sign({email,role:"admin"},process.env.JWT_SECRET,{expiresIn:"12h"});
 res.json({token,admin:{email}});
});
export default router;
