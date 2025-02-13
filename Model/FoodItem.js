const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({
  half: { type: String, required: true },
  full: { type: String, required: true }, 
});

const foodItemSchema = new mongoose.Schema({
    
  CategoryName: { type: String, required: true }, 
  name: { type: String, required: true },        
  img: { type: String, required: true },         
  options: [optionSchema],  
  owner: { type: mongoose.Schema.ObjectId, ref: "User" },                     
  description: { type: String, required: true }, 
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
