import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerName: String,
    customerPhone: String,
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
    transactionId: String,
    paymentStatus: {
      type: String,
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);