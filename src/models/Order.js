//src/models/Order.js

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
{
  invoiceNumber: {
    type: String,
    unique: true,
  },

  customerName: {
    type: String,
    required: true,
  },

  customerPhone: {
    type: String,
    required: true,
  },

  customerEmail: String,

  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],

  amount: Number,

  transactionId: {
    type: String,
    required: true,
    unique: true,
  },

  paymentMethod: {
    type: String,
    default: "PHONEPE",
  },

  phonepeOrderId: String,
  
  paymentStatus: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING",
  },

  invoiceDate: {
    type: Date,
    default: Date.now,
  },
},
{ timestamps: true }
);

export default mongoose.models.Order ||
mongoose.model("Order", OrderSchema);