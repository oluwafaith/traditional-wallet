import mongoose from "mongoose";


const SingleOrderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  });

const orderSchema = new mongoose.Schema({
name: {
    type: String
},
price:{
type: Number,
default: 0,
},
orderItems: [SingleOrderItemSchema],
status: {
    type: String,
    enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
    default: 'pending',
  },
user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
},
{
    timestamps: true
})
export  const Product = mongoose.model('Product', orderSchema);