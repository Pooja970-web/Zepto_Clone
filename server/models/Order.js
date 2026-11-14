import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    total: Number,
    address: String,
    status: {
      type: String,
      enum: ["placed", "packed", "on_the_way", "delivered"],
      default: "placed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);