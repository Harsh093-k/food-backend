const express =require('express');
const app= express();
const mongoose=require("mongoose");
const CreateUser=require("./Router/CreateUser")
const Data = require('./Router/Data');
const orderData=require('./Router/OrderData');
const cors=require("cors");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport=require("passport");
const FoodItems=require('./Model/FoodItem');
require("dotenv").config()


app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080' }));
app.options('*', cors()); // Handle preflight requests

mongoose.connect(process.env.Mongo_url,{useNewUrlParser: true,
    useUnifiedTopology: true})
.then(()=>{
    console.log("connect to mongodb");
}).catch((err)=>{
    console.log(err);
})

passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from the Authorization header
        secretOrKey:process.env.session_secret, // The secret key for verification
      },
      async (jwtPayload, done) => {
        try {
          // Use async/await with findById
          const user = await User.findById(jwtPayload.userId); // This returns a Promise now
  
          if (!user) {
            return done(null, false); // No user found, authentication failed
          }
  
          return done(null, user); // User found, authentication successful
        } catch (error) {
          return done(error, false); // Handle any errors
        }
      }
    )
  );

app.use('/api',CreateUser);
app.use('/food',Data);
app.use('/api/auth',orderData);




app.listen(8080,()=>{
   console.log("start port no is 8080")
})