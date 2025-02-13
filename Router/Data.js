const express=require('express');
const router=express.Router();
const passport = require("passport");
const FoodItems = require("../Model/FoodItem");
const FoodCategory = require('../Model/FoodCategory');

router.post("/add", async (req, res) => {
  const { CategoryName, name, options, img, description } = req.body;

 
  if (!CategoryName || !name || !options || !img || !description) {
    return res.status(400).json({ message: "Please fill in all the information!" });
  } else {
    try {
      
      const foodData = { CategoryName, name, options, img, description };
      const FoodItem = await FoodItems.create(foodData);
      
      
      const userToReturn = { ...FoodItem.toJSON() };
      
    
      return res.status(200).json(userToReturn);
    } catch (error) {
      
      console.error(error);
      return res.status(500).json({ message: "Error adding food item.", error: error.message });
    }
  }
})

router.post("/addcategory", async (req, res) => {
  const { CategoryName} = req.body;

 
  if (!CategoryName ) {
    return res.status(400).json({ message: "Please fill in all the information!" });
  } else {
    try {
      
      const foodData = { CategoryName};
      const FoodCategorydata = await FoodCategory.create(foodData);
      
     
      const userToReturn = { ...FoodCategorydata.toJSON() };
      
   
      return res.status(200).json(userToReturn);
    } catch (error) {
     
      console.error(error);
      return res.status(500).json({ message: "Error adding food item.", error: error.message });
    }
  }
})

router.get("/items",async(req,res)=>{
  const response=await FoodItems.find({});
  return res.status(200).json(response);
})

router.get("/category",async(req,res)=>{
  const response=await FoodCategory.find({});
  return res.status(200).json(response);
})



module.exports=router;