import {Router} from "express";
import Project from "../models/Project.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import fs from "fs";
const router=Router();
const uploadDir=path.resolve("uploads"); fs.mkdirSync(uploadDir,{recursive:true});
const storage=multer.diskStorage({destination:uploadDir,filename:(req,file,cb)=>cb(null,Date.now()+"-"+file.originalname.replace(/[^a-zA-Z0-9._-]/g,""))});
const upload=multer({storage,limits:{fileSize:5*1024*1024},fileFilter:(req,file,cb)=>cb(null,/^image\/(png|jpeg|webp|gif|svg\+xml)$/.test(file.mimetype))});
router.get("/",async(req,res)=>{
 const filter={status:"published"};
 if(req.query.admin==="true") delete filter.status;
 const items=await Project.find(filter).sort({featured:-1,createdAt:-1});
 res.json(items);
});
router.get("/:slug",async(req,res)=>{
 try{
  const project=await Project.findOne({slug:req.params.slug,status:"published"});
  if(!project)return res.status(404).json({message:"Project not found"});
  res.json(project);
 }catch(e){res.status(400).json({message:e.message});}
});
router.post("/",auth,upload.single("image"),async(req,res)=>{
 try{
  const data={...req.body,
   technologies:(req.body.technologies||"").split(",").map(x=>x.trim()).filter(Boolean),
   features:(req.body.features||"").split(",").map(x=>x.trim()).filter(Boolean)
  };
  if(req.file)data.image=`/uploads/${req.file.filename}`;
  else if(req.body.imageUrl)data.image=req.body.imageUrl;
  delete data.imageUrl;
  data.status=data.status==="draft"?"draft":"published";
  data.featured=data.featured==="true" || data.featured==="on";
  data.slug=(data.slug||data.title).toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const project=await Project.create(data);res.status(201).json(project);
 }catch(e){res.status(400).json({message:e.message});}
});
router.put("/:id",auth,upload.single("image"),async(req,res)=>{
 try{
  const data={...req.body};
  if(typeof data.technologies==="string")data.technologies=data.technologies.split(",").map(x=>x.trim()).filter(Boolean);
  if(typeof data.features==="string")data.features=data.features.split(",").map(x=>x.trim()).filter(Boolean);
  if(req.file)data.image=`/uploads/${req.file.filename}`;
  else if(req.body.imageUrl)data.image=req.body.imageUrl;
  delete data.imageUrl;
  if("status" in data)data.status=data.status==="draft"?"draft":"published";
  if("featured" in data)data.featured=data.featured==="true" || data.featured==="on";
  const project=await Project.findByIdAndUpdate(req.params.id,data,{new:true,runValidators:true});
  if(!project)return res.status(404).json({message:"Project not found"});
  res.json(project);
 }catch(e){res.status(400).json({message:e.message});}
});
router.delete("/:id",auth,async(req,res)=>{await Project.findByIdAndDelete(req.params.id);res.json({ok:true});});
export default router;
