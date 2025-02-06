const express=require("express")
const router=express.Router();
const User=require('../Model/User');

const bcrypt = require("bcrypt");
const { getToken } = require("../utils/help");
const passport = require("passport");


const slatRounds = 10;



router.post("/CreateUser", async (req, res) => {
    try {
        // Destructure request body
        const { name,email, password, location} = req.body;

        // Check if user with email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(403)
                .json({ error: "A user with this email already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10); // Adjust saltRounds to 10

        // Create new user data
        const newUserData = {
            name,
            email,
            password: hashPassword,
            location,
            
        };

        // Save user to the database
        const newUser = await User.create(newUserData);
        

        // Generate token using the user data
        const token = await getToken(email, newUser);


        // Prepare response data
        const userToReturn = { ...newUser.toJSON(), token };
        delete userToReturn.password; // Remove password from the response

        // Return success response
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
        // find the user base on the email Id
        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res.status(403).json({ err: "Invalid credentials" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ err: "Invalid credentials" })
        }


        // Create JWT token with user info
        const token = await getToken(email, user);

        // Send the token to the client
        const userToReturn = { ...user.toJSON(), token };
        delete userToReturn.password; // Remove password from the response

        // Return success response
        return res.status(200).json(userToReturn);
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
});



module.exports=router;