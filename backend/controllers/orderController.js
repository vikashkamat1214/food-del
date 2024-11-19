import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to place an order and initiate Stripe Checkout
const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:5173";

  try {
    // Create a new order in the database
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare line items for Stripe Checkout
    const lineItems = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100 * 80), // Convert price to cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charges as a separate line item
    lineItems.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: Math.round(2 * 100 * 80), // Convert delivery charge to cents
      },
      quantity: 1,
    });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Respond with the session URL
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error placing order" });
  }
}

const verifyOrder = async ( req, res)=>{
   const {orderId, success} = req.body;
     try {
      if(success == "true"){
          await orderModel.findByIdAndUpdate(orderId, {payment:true});
          res.json({success:true, message:"Paid"})
      }
      else{
       await orderModel.findByIdAndDelete(orderId);
       res.json({success:false, message:"payment failed"})
      }
      
     } catch (error) {
       console.log(error);
       res.json({success:false, message:"Error"})
     }
}

export { placeOrder, verifyOrder };
