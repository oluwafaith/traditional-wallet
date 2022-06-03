import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide product name'],
        maxlength: [100, 'Name can not be more than 100 characters'],
      },
      price: {
        type: Number,
        required: [true, 'Please provide product price'],
        default: 0,
      },
user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    // required: true,
  },

})
export  const Product = mongoose.model('Product', productSchema);