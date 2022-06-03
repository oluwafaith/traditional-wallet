import mongoose from "mongoose";


const SingleOrderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
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
subtotal: {
  type: Number,
  required: true,
},
total: {
  type: Number,
  required: true,
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
export  const Order = mongoose.model('Order', orderSchema);