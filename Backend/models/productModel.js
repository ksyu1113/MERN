const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      minlength: 5,
      required: [true, "Please enter product Name"],
      trim: true,
    },
    description: {
      type: String,
      minlength: [5, "please enter at least 50words"],
      required: [true, "Please enter product Description"],
    },
    category: {
      type: String,
      enum: [
        "Antiques",
        "Art",
        "Books",
        "CDs, DVDs, Games",
        "Computers",
        "Dining",
        "Electronics",
        "Food & Gourmet Items For Your Pet",
        "Golf & Sports Gear Handbags",
        "Health & Fitness",
        "Home",
        "Jewelry",
        "Lawn & Garden Memorabilia",
        "Other",
        "Services",
        "Spa & Beauty",
        "Tickets-Entertainment",
        "Tickets-Sports",
        "Toys",
        "Travel",
        "Unique Experiences",
        "Wine",
      ],
      required: [true, "Please enter Product Category"],
    },
    condition: {
      type: String,
      enum: ["New", "Used"],
      required: [true, "Please enter New or Used"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product Price"],
      maxlength: [8, "Price cannot exceed 8 characters"],
    },
    images: [
      {
        public_id: {
          type: String,
          // required: true,    not sure about this
        },
        url: {
          type: String,
          // required: true,    not sure about this
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
