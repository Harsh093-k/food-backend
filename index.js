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
app.use(cors());
app.options('*', cors()); 

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
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:process.env.session_secret,
      },
      async (jwtPayload, done) => {
        try {
          
          const user = await User.findById(jwtPayload.userId); 
  
          if (!user) {
            return done(null, false); 
          }
  
          return done(null, user); 
        } catch (error) {
          return done(error, false);
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