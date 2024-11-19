import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  items: [
    {
      name: { type: String, required: true }, // Name of the product
      quantity: { type: Number, required: true }, // Quantity of the product
      price: { type: Number, required: true } // Price of the product
    }
  ], // Array of item objects
  amount: { type: Number, required: true }, // Total amount
  address: { type: Object, required: true }, // Delivery address object
  status: { type: String, default: "Food Processing" }, // Order status
  date: { type: Date, default: Date.now }, // Order date
  payment: { type: Boolean, default: false } // Payment status
});

// Check for existing model or define the model
const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;

