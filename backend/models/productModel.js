const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please enter your name"]
    },
    description: {
        type: String,
        required: [true, "Please enter your description"]
    },
    price:{
        type: Number,
        required:[true, "Please enter price"],
        maxLength:[8,"Price could not exceed more than 8 digits"]
    },
    rating:{
        type: Number,
        default: 0
    },
    image:{
        public_id:{
            type: String,
            required:true
        },
        url:{
            type: String,
            required: true
        }
    },
    category:{
        type: String,
        required:[true, "Please Select Category of a product"]
    },
    stock:{
        type: Number,
        required:[true, "Please enter product stock"],
        maxLength:[4,"Please enter stock less than 1000"],
        default:1
    },
    numOfReviews:{
        type: Number,
        required:true
    },
    reviews:[
        {
            name:{
                type: String,
                required:true
            },
            rating:{
                type: Number,
                required:true
            },
            comments:{
                type: String,
                required: true
            }
        }
    ],
    createdAt:{
        type: Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Product", productSchema);