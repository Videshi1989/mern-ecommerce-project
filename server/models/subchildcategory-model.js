const mongoose = require("mongoose");

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const day = String(now.getDate()).padStart(2, '0');
const created_date = `${year}-${month}-${day}`;
//const created_date = `${day}-${month}-${year}`;

const subchildcategorySchema = new mongoose.Schema({

    categoryid:{type:String,require:true},
    subcategoryid:{type:String,require:true},
    childcategoryid:{type:String,require:true},
    subchildcategoryname:{type:String,require:true},

    brandid:{type:String,default:null},
    modelnumber:{type:String,default:null},
    weight:{type:String,default:null},
    size:{type:String,default:null},//added
    color:{type:String,default:null},//added
    scaleid:{type:String,default:null},
    height:{type:String,default:null},
    width:{type:String,default:null},
    length:{type:String,default:null},
    heightid:{type:String,default:null},
    widthid:{type:String,default:null},
    lengthid:{type:String,default:null},
    mrp:{type:Number,require:true},
    discount:{type:Number,require:true},
    price:{type:Number,require:true},
    availablequantity:{type:Number,require:true},
    bodymaterial:{type:String,default:null},
    battery:{type:String,default:null},
    warranty:{type:String,default:null},
    description:{type:String,default:null},

    status:{type:String,require:true},
    created_date:{type:String,default:created_date}
   
});



const SubChildCategory = new mongoose.model('subchildcategorySchema',subchildcategorySchema); 
module.exports = SubChildCategory;