const express=require("express")
const router=express.Router();
const Order=require('../Model/Order');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    let img=req.body.img
   
    await data.splice(0,0,{Order_date:req.body.order_date})


   
    let eId = await Order.findOne({ 'email': req.body.email })    

    if (eId===null) {
        try {
         
            await Order.create({
            
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


router.post('/myOrderData', async (req, res) => {
    try {
   
        let eId = await Order.findOne({ 'email': req.body.email })
       
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports =router