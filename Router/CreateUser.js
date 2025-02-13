const express=require("express")
const router=express.Router();
const User=require('../Model/User');

const bcrypt = require("bcrypt");
const { getToken } = require("../utils/help");
const passport = require("passport");


const slatRounds = 10;



router.post("/CreateUser", async (req, res) => {
    try {
        
        const { name,email, password, location} = req.body;

        
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(403)
                .json({ error: "A user with this email already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10); 

       
        const newUserData = {
            name,
            email,
            password: hashPassword,
            location,
            
        };

       
        const newUser = await User.create(newUserData);
        

      
        const token = await getToken(email, newUser);


        
        const userToReturn = { ...newUser.toJSON(), token };
        delete userToReturn.password; 

       
        return res.status(200).json(userToReturn);
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log({ email, password })
   
        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res.status(403).json({ err: "Invalid credentials" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ err: "Invalid credentials" })
        }


       
        const token = await getToken(email, user);

       
        const userToReturn = { ...user.toJSON(), token };
        delete userToReturn.password; 

      
        return res.status(200).json(userToReturn);
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
});



module.exports=router;