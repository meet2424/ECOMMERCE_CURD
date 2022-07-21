import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter product title'],
    },
    desc: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    img: {
      type: String,
      //   required: [true, 'Please enter product image'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
    },
    categories: {
      type: Array,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
