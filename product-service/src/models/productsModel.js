import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      required: true,
    },
    category_id: {
      type: Number, 
      required: true,
    },
    product_name: {
      type: String,
      required: true,
      maxlength: 150,
      index: "text", // Fulltext index equivalent
    },
    description: {
      type: String,
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    stock_quantity: {
      type: Number,
      default: 0,
    },
    product_img:{
      type: String,
      default: "default-product.png",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const Product = mongoose.model("Product", ProductSchema);
