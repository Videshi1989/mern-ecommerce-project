const mongoose = require("mongoose");

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const day = String(now.getDate()).padStart(2, '0');
const created_date = `${year}-${month}-${day}`;
//const created_date = `${day}-${month}-${year}`;


const ProductColorSchema = new mongoose.Schema({

    productid:{type:String,require:true},
    color:{type:String,require:true},
    created_date:{type:String,default:created_date}
   
});



const ProductColor = new mongoose.model('ProductColor',ProductColorSchema); 
module.exports = ProductColor;