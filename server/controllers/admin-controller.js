
var validator = require("email-validator");    //npm i email-validator than use
const RegisteredUsers = require("../models/registeredusers-model");
const ContactUs = require("../models/contactus-model");
const Brand = require("../models/brand-model");
const Scale = require("../models/scale-model");
const Category = require("../models/category-model");
const SubCategory = require("../models/subcategory-model");
const ChildCategory = require("../models/childcategory-model");
const SubChildCategory = require("../models/subchildcategory-model");
const CategoryImageSlider = require("../models/categoryimageslider-model");
const SubCategoryImageSlider = require("../models/subcategoryimageslider-model");
const MultiImages = require("../models/multiimages-model");
const ProductOffer = require("../models/productoffer-model");
const ProductColor = require("../models/productcolor-model");
const ProductSize = require("../models/productsize-model");
//const RegisteredUsers = require("../models/registeredusers-model");
const bcrypt = require("bcryptjs");    // To bcrypt password 
const uploadSingle = require("../middlewares/upload")  //to upload file
const uploadMultipe = require("../middlewares/uploadMultiple");  //to upload multiple file

//require("dotenv").config();



const uploadSingleImage = async (req, res) => {
    uploadSingle(req, res, (err) => {
        if(err) 
        {
            //res.status(400).json({ msg: err });
            res.status(400).json({ imagesrc: '', imagename: '', imagestatus: 'selected', imagesize:"exceed", imageext: '' });
        } 
        else 
        {
            if(req.file == undefined) 
            { 
                res.status(400).json({ imagesrc: '', imagename: '', imagestatus: 'notselected', imagesize:'', imageext:'' });
            } 
            else 
            {
                const{path,filename} = req.file
                const extension = filename.split('.').pop();
                res.status(200).json({ imagesrc: path, imagename: filename, imagestatus: 'selected', imagesize:req.file.size, imageext: extension  });
            }
        }
    });
    
};

const uploadMultipleImage = async (req, res) => {

    uploadMultipe(req, res, (err) => {
            if(err) 
            {
                res.status(400).json({ imagestatus: 'selected', imagesize:err.code, imagelength:'' });
            }
            else 
            {
                if (req.files.length === 0) 
                { 
                    res.status(400).json({ imagestatus: 'notselected', imagesize:'', imagelength:0 });
                } 
                else 
                {
                    res.status(200).json({ files: req.files.map(file => file), imagestatus: 'selected', imagesize:req.files.size, imagelength: req.files.length});
                }
            }
    
    });
};

const getAllRegisteredusers = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        //const users = await RegisteredUsers.find()
      
      
        const users = await RegisteredUsers.find({ isAdmin : { $eq : false } }).sort({ _id: -1 });
        //console.log(users);
        if(!users || users.length===0 || users.length==="" || users.length===null || users.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(users);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllSubAdminList = async (req,res)=>{
   
    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        //const users = await RegisteredUsers.find()
      
      
        const users = await RegisteredUsers.find({ $and:[{ isAdmin : { $eq : true } },{ usertype : { $eq : 'subadmin' } }] }).sort({ _id: -1 });
        //console.log(users);
        if(!users || users.length===0 || users.length==="" || users.length===null || users.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(users);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllContectedusers = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const contactedusers = await ContactUs.find().sort({ _id: -1 });
        //console.log(users);
        if(!contactedusers || contactedusers.length===0 || contactedusers.length==="" || contactedusers.length===null || contactedusers.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(contactedusers);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};


const getAllBrand = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const category = await Brand.find().sort({ _id: -1 });
        //console.log(category);
        if(!category || category.length===0 || category.length==="" || category.length===null || category.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(category);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllScale = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const scale = await Scale.find().sort({ _id: -1 });
        //console.log(category);
        if(!scale || scale.length===0  || scale.length==="" || scale.length===null || scale.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(scale);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllBrandAccordingStatus = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const brand = await Brand.find({status:'enable'});
        //console.log(category);
        if(!brand || brand.length===0 || brand.length==="" || brand.length===null || brand.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(brand);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllScaleAccordingStatus = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const scale = await Scale.find({status:'enable'});
        //console.log(category);
        if(!scale || scale.length===0 || scale.length==="" || scale.length===null || scale.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(scale);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllCategory = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const category = await Category.find().sort({ _id: -1 });
        //console.log(category);
        if(!category || category.length===0 || category.length==="" || category.length===null || category.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(category);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllCategoryAccordingStatus = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const category = await Category.find({status:'enable'}).sort({ _id: -1 });
        //console.log(category);
        if(!category || category.length===0 || category.length==="" || category.length===null || category.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(category);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

/*const getCountSubcategory = async (req,res)=>{

    try{
       
        const totalrecord = await SubCategory.find({_id:req.params.id}).count();
      
        // if(!contactedusers || contactedusers.length===0)
        // {
        //     res.status(404).json({msg:"No record found!"});
        //     return;
        // }
        // else
        // {
        //     return res.status(200).json(contactedusers);
        // }
        console.log("count:",totalrecord)
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};  */


const filterRegisteredUsersByDate = async (req,res)=>{
    
    const{fromDate,toDate} = req.body;
    try
    {  
        if(fromDate === '' || fromDate === null || fromDate === undefined)
        {
            return res.status(401).json({msg:"Please select from date !"})
        }
        else if(toDate === '' || toDate === null || toDate === undefined)
        {
            return res.status(401).json({msg:"Please select to date !"})
        }
        else
        {   
            const filtereddata = await RegisteredUsers.find(
                                {
                                    $and: [{ isAdmin: false },{ created_date: { $gte: fromDate,$lt: toDate + 1 }}]
                                }
                                )                                
        
            return res.json(filtereddata);
        }

    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }




};

const filterContactedUsersByDate = async (req,res)=>{
    
    const{fromDate,toDate} = req.body;
    try
    {  
        if(fromDate === '' || fromDate === null || fromDate === undefined)
        {
            return res.status(401).json({msg:"Please select from date !"})
        }
        else if(toDate === '' || toDate === null || toDate === undefined)
        {
            return res.status(401).json({msg:"Please select to date !"})
        }
        else
        {   
           const filtereddata = await ContactUs.find({
                                                created_date: {
                                                                $gte: fromDate,
                                                                $lt: toDate + 1
                                                            }
                                        })
        
            return res.json(filtereddata);
        }

    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }




};

const filterBrandByDate = async (req,res)=>{

    const{fromDate,toDate} = req.body;
    try
    {  
        if(fromDate === '' || fromDate === null || fromDate === undefined)
        {
            return res.status(401).json({msg:"Please select from date !"})
        }
        else if(toDate === '' || toDate === null || toDate === undefined)
        {
            return res.status(401).json({msg:"Please select to date !"})
        }
        else
        {
            const filtereddata = await Brand.find({
                                                created_date: {
                                                                $gte: fromDate,
                                                                $lt: toDate + 1
                                                            }
                                        })
        
            return res.json(filtereddata);
        }

    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }




};

const filterScaleByDate = async (req,res)=>{

    const{fromDate,toDate} = req.body;
    try
    {  
        if(fromDate === '' || fromDate === null || fromDate === undefined)
        {
            return res.status(401).json({msg:"Please select from date !"})
        }
        else if(toDate === '' || toDate === null || toDate === undefined)
        {
            return res.status(401).json({msg:"Please select to date !"})
        }
        else
        {
            const filtereddata = await Scale.find({
                                                created_date: {
                                                                $gte: fromDate,
                                                                $lt: toDate + 1
                                                            }
                                        })
        
            return res.json(filtereddata);
        }

    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }




};

const filterCategoryByDate = async (req,res)=>{

    const{fromDate,toDate} = req.body;
    try
    {  
        if(fromDate === '' || fromDate === null || fromDate === undefined)
        {
            return res.status(401).json({msg:"Please select from date !"})
        }
        else if(toDate === '' || toDate === null || toDate === undefined)
        {
            return res.status(401).json({msg:"Please select to date !"})
        }
        else
        {
            const filtereddata = await Category.find({
                                                created_date: {
                                                                $gte: fromDate,
                                                                $lt: toDate + 1
                                                            }
                                        })
        
            return res.json(filtereddata);
        }

    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }




};

const filterSubCategoryByDate = async (req,res)=>{

    const{fromDate,toDate} = req.body;
    try
    {  
        if(fromDate === '' || fromDate === null || fromDate === undefined)
        {
            return res.status(401).json({msg:"Please select from date !"})
        }
        else if(toDate === '' || toDate === null || toDate === undefined)
        {
            return res.status(401).json({msg:"Please select to date !"})
        }
        else
        {
            const filtereddata = await SubCategory.find({
                                                created_date: {
                                                                $gte: fromDate,
                                                                $lt: toDate + 1
                                                            }
                                        })
        
            return res.json(filtereddata);
        }

    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }




};

const filterCategoryImageSliderByDate = async (req,res)=>{

    const{fromDate,toDate} = req.body;
    try
    {  
        if(fromDate === '' || fromDate === null || fromDate === undefined)
        {
            return res.status(401).json({msg:"Please select from date !"})
        }
        else if(toDate === '' || toDate === null || toDate === undefined)
        {
            return res.status(401).json({msg:"Please select to date !"})
        }
        else
        {
            const filtereddata = await CategoryImageSlider.find({
                                                created_date: {
                                                                $gte: fromDate,
                                                                $lt: toDate + 1
                                                            }
                                        })
        
            return res.json(filtereddata);
        }

    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }




};

const filterChildCategoryByDate = async (req,res)=>{

    const{fromDate,toDate} = req.body;
    try
    {  
        if(fromDate === '' || fromDate === null || fromDate === undefined)
        {
            return res.status(401).json({msg:"Please select from date !"})
        }
        else if(toDate === '' || toDate === null || toDate === undefined)
        {
            return res.status(401).json({msg:"Please select to date !"})
        }
        else
        {
            const filtereddata = await ChildCategory.find({
                                                created_date: {
                                                                $gte: fromDate,
                                                                $lt: toDate + 1
                                                            }
                                        })
        
            return res.json(filtereddata);
        }

    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }




};

const filterSubCategoryImageSliderByDate = async (req,res)=>{

    const{fromDate,toDate} = req.body;
    try
    {  
        if(fromDate === '' || fromDate === null || fromDate === undefined)
        {
            return res.status(401).json({msg:"Please select from date !"})
        }
        else if(toDate === '' || toDate === null || toDate === undefined)
        {
            return res.status(401).json({msg:"Please select to date !"})
        }
        else
        {
            const filtereddata = await SubCategoryImageSlider.find({
                                                created_date: {
                                                                $gte: fromDate,
                                                                $lt: toDate + 1
                                                            }
                                        })
        
            return res.json(filtereddata);
        }

    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }




};

const filterSubChildCategoryByDate = async (req,res)=>{

    const{fromDate,toDate} = req.body;
    try
    {  
        if(fromDate === '' || fromDate === null || fromDate === undefined)
        {
            return res.status(401).json({msg:"Please select from date !"})
        }
        else if(toDate === '' || toDate === null || toDate === undefined)
        {
            return res.status(401).json({msg:"Please select to date !"})
        }
        else
        {
            const filtereddata = await SubChildCategory.find({
                                                created_date: {
                                                                $gte: fromDate,
                                                                $lt: toDate + 1
                                                            }
                                        })
        
            return res.json(filtereddata);
        }

    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }




};

const getAllSubCategory = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const subcategory = await SubCategory.find().sort({ _id: -1 });
        //console.log(subcategory);
        if(!subcategory || subcategory.length===0 || subcategory.length==="" || subcategory.length===null || subcategory.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(subcategory);
        }
       
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllCategoryImageSlider = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const subcategory = await CategoryImageSlider.find().sort({ _id: -1 });
        //console.log(subcategory);
        if(!subcategory || subcategory.length===0 || subcategory.length==="" || subcategory.length===null || subcategory.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(subcategory);
        }
       
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllSubCategoryByCategoryid = async (req,res)=>{

    const id = req.params.id;

    try{
        //const users = await User.find({},{password:0}); //it will not fetch password colom
        //const subcategory = await SubCategory.find({categoryid:id});
        const subcategory = await SubCategory.find({$and:[ {categoryid:id},{status:'enable'} ]}).sort({ _id: -1 });
        //console.log(subcategory);
        if(!subcategory || subcategory.length===0 || subcategory.length==="" || subcategory.length===null || subcategory.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(subcategory);
        }
       
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllChildCategoryBySubCategoryid = async (req,res)=>{

    const id = req.params.id;

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        //const childcategory = await ChildCategory.find({subcategoryid:id});
        const childcategory = await ChildCategory.find({$and:[{subcategoryid:id},{status:'enable'}]}).sort({ _id: -1 });
        //console.log(childcategory);
        if(!childcategory || childcategory.length===0 || childcategory.length==="" || childcategory.length===null || childcategory.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(childcategory);
        }
       
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllChildCategory = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const childcategory = await ChildCategory.find().sort({ _id: -1 });
       // console.log(childcategory);
        if(!childcategory || childcategory.length===0 || childcategory.length==="" || childcategory.length===null || childcategory.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(childcategory);
        }
       
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllSubCategoryImageSlider = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const subcatimgslider = await SubCategoryImageSlider.find().sort({ _id: -1 });
       // console.log(childcategory);
        if(!subcatimgslider || subcatimgslider.length===0 || subcatimgslider.length==="" || subcatimgslider.length===null || subcatimgslider.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(subcatimgslider);
        }
       
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAllSubChildCategory = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const subchildcategory = await SubChildCategory.find().sort({ _id: -1 });
        //console.log(subchildcategory);
        if(!subchildcategory || subchildcategory.length===0 || subchildcategory.length==="" || subchildcategory.length===null || subchildcategory.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(subchildcategory);
        }
       
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getMultiImages = async (req,res)=>{
   
    try{
        const id = req.params.id;
        const multiimagesdata = await MultiImages.find({subchildcategoryid:id});  //it will not fetch password colom
        
        if(!multiimagesdata || multiimagesdata.length===0 || multiimagesdata.length==="" || multiimagesdata.length===null || multiimagesdata.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(multiimagesdata);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getMultiSizes = async (req,res)=>{

    try{
        const id = req.params.id;
        const multisizesdata = await ProductSize.find({productid:id});  //it will not fetch password colom
        
        if(!multisizesdata || multisizesdata.length===0 || multisizesdata.length==="" || multisizesdata.length===null || multisizesdata.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(multisizesdata);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getMultiColors = async (req,res)=>{

    try{
        const id = req.params.id;
        const multicolorsdata = await ProductColor.find({productid:id});  //it will not fetch password colom
        
        if(!multicolorsdata || multicolorsdata.length===0 || multicolorsdata.length==="" || multicolorsdata.length===null || multicolorsdata.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(multicolorsdata);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getMultiOffers = async (req,res)=>{

    try{
        const id = req.params.id;
        const multioffersdata = await ProductOffer.find({productid:id});  //it will not fetch password colom
        
        if(!multioffersdata || multioffersdata.length===0 || multioffersdata.length==="" || multioffersdata.length===null || multioffersdata.length===undefined)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(multioffersdata);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getSingleUser = async (req,res)=>{

    try{
        const id = req.params.id;
        const singleuser = await RegisteredUsers.findOne({_id:id},{password:0});  //it will not fetch password colom
       // console.log(singleuser);
        if(!singleuser || singleuser.length===0 || singleuser.length==="" || singleuser.length===null )
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(singleuser);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getSingleContactedUser = async (req,res)=>{

    try{
        const id = req.params.id;
        const singlecontecteduser = await ContactUs.findOne({_id:id});  //it will not fetch password colom
       // console.log(singleuser);
        if(!singlecontecteduser || singlecontecteduser.length===0 || singlecontecteduser.length==="" || singlecontecteduser.length===null )
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(singlecontecteduser);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getAdminDetails = async (req,res)=>{

    try{
        const id = req.params.id;
        const data = await RegisteredUsers.findOne({_id:id});  
        //console.log(data);
        if(!data || data.length===0 || data.length==="" || data.length===null )
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(data);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

/*const getAdminData = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const admindata = await User.findOne({isAdmin:true})
        //console.log(category);
        if(!admindata || admindata.length===0)
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(admindata);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};*/

const getSingleBrand = async (req,res)=>{

    try{
        const id = req.params.id;
        const singlebrand = await Brand.findOne({_id:id});  //it will not fetch password colom
        //console.log(singlecategory);
        if(!singlebrand || singlebrand.length===0 || singlebrand.length==="" || singlebrand.length===null )
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(singlebrand);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getSingleScale = async (req,res)=>{

    try{
        const id = req.params.id;
        const singlescale = await Scale.findOne({_id:id});  
        //console.log("scale",singlescale);
        if(!singlescale || singlescale.length === 0 || singlescale.length==="" || singlescale.length===null )
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(singlescale);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};



const getSingleCategory = async (req,res)=>{

    try{
        const id = req.params.id;
        const singlecategory = await Category.findOne({_id:id});  //it will not fetch password colom
        //console.log(singlecategory);
        if(!singlecategory || singlecategory.length===0 || singlecategory.length==="" || singlecategory.length===null )
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
            return res.status(200).json(singlecategory);
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getSingleSubCategory = async (req,res)=>{

    try{
        const id = req.params.id;
        const singlesubcategory = await SubCategory.findOne({_id:id});  //it will not fetch password colom
        //console.log(singlesubcategory);
        if(!singlesubcategory || singlesubcategory.length===0 || singlesubcategory.length==="" || singlesubcategory.length===null )
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
           return res.status(200).json(singlesubcategory);
           
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getSingleCategoryImageSlider = async (req,res)=>{

    try{
        const id = req.params.id;
        const singlesubcategory = await CategoryImageSlider.findOne({_id:id});  //it will not fetch password colom
        //console.log(singlesubcategory);
        if(!singlesubcategory || singlesubcategory.length===0 || singlesubcategory.length==="" || singlesubcategory.length===null )
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
           return res.status(200).json(singlesubcategory);
           
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getSingleChildCategory = async (req,res)=>{

    try{
        const id = req.params.id;
        const singlechildcategory = await ChildCategory.findOne({_id:id});  //it will not fetch password colom
        //console.log(singlechildcategory);
        if(!singlechildcategory || singlechildcategory.length===0 || singlechildcategory.length==="" || singlechildcategory.length===null )
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
           return res.status(200).json(singlechildcategory);
           
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getSingleSubCategoryImageSlider = async (req,res)=>{

    try{
        const id = req.params.id;
        const singlechildcategory = await SubCategoryImageSlider.findOne({_id:id});  //it will not fetch password colom
        //console.log(singlechildcategory);
        if(!singlechildcategory || singlechildcategory.length===0 || singlechildcategory.length==="" || singlechildcategory.length===null )
        {
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
           return res.status(200).json(singlechildcategory);
           
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getSingleSubChildCategory = async (req,res)=>{
    
    try{
        const id = req.params.id;
       
        const singlesubchildcategory = await SubChildCategory.findOne({_id:id});  //it will not fetch password colom
        //console.log(singlesubchildcategory);
        if(!singlesubchildcategory || singlesubchildcategory.length===0 || singlesubchildcategory.length==="" )
        {  
            res.status(404).json({msg:"No record found!"});
            return;
        }
        else
        {
           return res.status(200).json(singlesubchildcategory);
           
        }
        
    }
    catch(error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};


const getUpdateUser = async (req,res)=>{

    try
    {
        
        const id = req.params.id;
        const updatedUserData = req.body;
        const{fullname,email,mobileno,usertype,status} = req.body;
      
        if(fullname === '' || fullname === null || fullname === undefined)
        {
            return res.status(401).json({msg:"Please enter full name !"})
        }
        else if(email === '' || email === null || email === undefined)
        {
            return res.status(401).json({msg:"Please enter email !"})
        }
        else if(!validator.validate(email))
        {
            return res.status(401).json({msg:"Please enter valid email !"})
        }
        else if(mobileno === '' || mobileno === null || mobileno === undefined)
        {
            return res.status(401).json({msg:"Please enter mobile number !"})
        }
        else if(!Number(mobileno))
        {
            return res.status(401).json({msg:"Mobile number must be digits only !"})
        }
        else if(mobileno.toString().length !== 10 )
        {
           return res.status(401).json({msg:"Please enter 10 digit mobile number !"});
        }
        else if(usertype === '' || usertype === null || usertype === undefined)
        {
            return res.status(401).json({msg:"Please select user type !"})
        }
        else if(status === '' || status === null || status === undefined)
        {
            return res.status(401).json({msg:"Please select status !"})
        }
        else
        {
            //const chkexistingemail = await RegisteredUsers.findOne({$and:[{email:email},{_id: { $ne: id }}]});
            const chkexistingmobileno = await RegisteredUsers.findOne({$and:[{mobileno:mobileno},{_id: { $ne: id }}]});

            var chkexistingemail=false;
            const getexistingemail= await RegisteredUsers.find({_id: { $ne: id }});
            getexistingemail.forEach(key => {
             
                if(key.email.toLowerCase()===email.toLowerCase())
                {
                    chkexistingemail = true;
                    return;
                }
              
            });
            
            if(chkexistingemail)
            {
                return res.status(401).json({msg:'Email already exist !'});
            }
            else if(chkexistingmobileno)
            {
                return res.status(401).json({msg:'Mobile number already exist !'});
            }
            else
            {
                let updatedData = '';
                if(usertype === 'user')
                {
                    updatedData = await RegisteredUsers.updateOne({ _id:id },{ $set:{fullname:fullname,email:email,mobileno:mobileno,usertype:usertype,status:status,isAdmin:false} });
                }
                else if(usertype === 'subadmin')
                {
                    updatedData = await RegisteredUsers.updateOne({ _id:id },{ $set:{fullname:fullname,email:email,mobileno:mobileno,usertype:usertype,status:status,isAdmin:true} });
                }
                //const updatedData = await RegisteredUsers.updateOne({ _id:id },{ $set:updatedUserData });
            
                if(updatedData)
                {
                    return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
                }
                else
                {
                    return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                }
            }
            
        }
       
       
        //return res.status(200).json(updatedData);
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }


};

const getUpdateSubadmin = async (req,res)=>{

    try
    {

        const id = req.params.id;
        const updatedUserData = req.body;
        const{fullname,email,mobileno,usertype,status} = req.body;
      
        if(fullname === '' || fullname === null || fullname === undefined)
        {
            return res.status(401).json({msg:"Please enter full name !"})
        }
        else if(email === '' || email === null || email === undefined)
        {
            return res.status(401).json({msg:"Please enter email !"})
        }
        else if(!validator.validate(email))
        {
            return res.status(401).json({msg:"Please enter valid email !"})
        }
        else if(mobileno === '' || mobileno === null || mobileno === undefined)
        {
            return res.status(401).json({msg:"Please enter mobile number !"})
        }
        else if(!Number(mobileno))
        {
            return res.status(401).json({msg:"Mobile number must be digits only !"})
        }
        else if(mobileno.toString().length !== 10 )
        {
           return res.status(401).json({msg:"Please enter 10 digit mobile number !"});
        }
        else if(usertype === '' || usertype === null || usertype === undefined)
        {
            return res.status(401).json({msg:"Please select user type !"})
        }
        else if(status === '' || status === null || status === undefined)
        {
            return res.status(401).json({msg:"Please select status !"})
        }
        else
        {
            //const chkexistingemail = await RegisteredUsers.findOne({$and:[{email:email},{_id: { $ne: id }}]});
            const chkexistingmobileno = await RegisteredUsers.findOne({$and:[{mobileno:mobileno},{_id: { $ne: id }}]});

            var chkexistingemail=false;
            const getexistingemail= await RegisteredUsers.find({_id: { $ne: id }});
            getexistingemail.forEach(key => {
             
                if(key.email.toLowerCase()===email.toLowerCase())
                {
                    chkexistingemail = true;
                    return;
                }
              
            });	
            
            if(chkexistingemail)
            {
                return res.status(401).json({msg:'Email already exist !'});
            }
            else if(chkexistingmobileno)
            {
                return res.status(401).json({msg:'Mobile number already exist !'});
            }
            else
            {
                let updatedData = '';
                if(usertype === 'user')
                {
                    updatedData = await RegisteredUsers.updateOne({ _id:id },{ $set:{fullname:fullname,email:email,mobileno:mobileno,usertype:usertype,status:status,isAdmin:false} });
                }
                else if(usertype === 'subadmin')
                {
                    updatedData = await RegisteredUsers.updateOne({ _id:id },{ $set:{fullname:fullname,email:email,mobileno:mobileno,usertype:usertype,status:status,isAdmin:true} });
                }
                //const updatedData = await RegisteredUsers.updateOne({ _id:id },{ $set:updatedUserData });
                
                if(updatedData)
                {
                    return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
                }
                else
                {
                    return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                }
            }

    
        }
       
       
        //return res.status(200).json(updatedData);
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }


};

const getUpdateBrand = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const{brandname,status, imagesrc, imagename, imageext, imagestatus, imagesize} = req.body;
        //const updatedUserData = req.body;
        //const chkexistingbrand = await Brand.findOne({$and:[{brandname:brandname},{_id: { $ne: id }}]});
        
        var chkexistingbrand=false;
        const getexistingbrand = await Brand.find({_id: { $ne: id }});
        getexistingbrand.forEach(key => {
         
            if(key.brandname.toLowerCase()===brandname.toLowerCase())
            {
                chkexistingbrand = true;
                return;
            }
          
        });

        if(brandname === '' || brandname === null || brandname === undefined)
        {
            return res.status(401).json({msg:"Please enter brand name !"})
        }
        else if(chkexistingbrand)
        {
            return res.status(401).json({msg:'Brand name already exist !'});
        }
        else if(status === '' || status === null || status === undefined)
        {
            return res.status(401).json({msg:"Please select status !"})
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                const updatedData = await Brand.updateOne({ _id:id },{ $set:{brandname:brandname, imagesrc: imagesrc, imagename: imagename, status:status} });
                if(updatedData)
                {
                    return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
                }
                else
                {
                    return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                }
                    
            } 
        }
        else 
        {
            const updatedData = await Brand.updateOne({ _id:id },{ $set:{brandname:brandname, status:status} });
            if(updatedData)
            {
                return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
            }
            else
            {
                return res.status(401).json({msg:process.env.ERROR_MESSAGE})
            }
            
        }
       
       
        //return res.status(200).json(updatedData);
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
       //console.log("err:",error)
    }


};

const getUpdateScale = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const{scalename,status, imagesrc, imagename, imageext, imagestatus, imagesize} = req.body;
        const updatedUserData = req.body;
        //const chkexistingscale = await Scale.findOne({$and:[{scalename:scalename},{_id: { $ne: id }}]});
        
        var chkexistingscale=false;
        const getexistingscale = await Scale.find({_id: { $ne: id }});
        getexistingscale.forEach(key => {
         
            if(key.scalename.toLowerCase()===scalename.toLowerCase())
            {
                chkexistingscale = true;
                return;
            }
          
        });

        if(scalename === '' || scalename === null || scalename === undefined)
        {
            return res.status(401).json({msg:"Please enter scale name !"})
        }
        else if(chkexistingscale)
        {
            return res.status(401).json({msg:'Scale name already exist !'});
        }
        else if(status === '' || status === null || status === undefined)
        {
            return res.status(401).json({msg:"Please select status !"})
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                const updatedData = await Scale.updateOne({ _id:id },{ $set:{scalename:scalename, imagesrc: imagesrc, imagename: imagename, status:status} });
                if(updatedData)
                {
                    return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
                }
                else
                {
                    return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                }
                    
            } 
        }
        else 
        {
            const updatedData = await Scale.updateOne({ _id:id },{ $set:{scalename:scalename, status:status} });
            if(updatedData)
            {
                return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
            }
            else
            {
                return res.status(401).json({msg:process.env.ERROR_MESSAGE})
            }
            
        }
       
       
        //return res.status(200).json(updatedData);
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }


};

const getUpdateCategory = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const{categoryname,status, imagesrc, imagename, imageext, imagestatus, imagesize} = req.body;
        const updatedUserData = req.body;
        //const chkexistingcategory = await Category.findOne({$and:[{categoryname:categoryname},{_id: { $ne: id }}]});
              
        var chkexistingcategory=false;
        const getexistingcategory= await Category.find({_id: { $ne: id }});
        getexistingcategory.forEach(key => {
         
            if(key.categoryname.toLowerCase()===categoryname.toLowerCase())
            {
                chkexistingcategory = true;
                return;
            }
          
        });
        
        if(categoryname === '' || categoryname === null || categoryname === undefined)
        {
            return res.status(401).json({msg:"Please enter category name !"})
        }
        else if(chkexistingcategory)
        {
            return res.status(401).json({msg:'Category name already exist !'});
        }
        else if(status === '' || status === null || status === undefined)
        {
            return res.status(401).json({msg:"Please select status !"})
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                const updatedData = await Category.updateOne({ _id:id },{ $set:{categoryname:categoryname, imagesrc: imagesrc, imagename: imagename, status:status} });
                if(updatedData)
                {
                    return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
                }
                else
                {
                    return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                }
                    
            } 
        }
        else 
        {
            const updatedData = await Category.updateOne({ _id:id },{ $set:{categoryname:categoryname, status:status} });
            if(updatedData)
            {
                return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
            }
            else
            {
                return res.status(401).json({msg:process.env.ERROR_MESSAGE})
            }
            
        }
       
       
        //return res.status(200).json(updatedData);
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }


};
const getUpdateSubCategory = async (req,res)=>{

    try
    {

        const id = req.params.id;
        //const updatedUserData = req.body;
        const{categoryid,subcategoryname, imagesrc, imagename, imageext, imagestatus, imagesize, status} = req.body;
        //const chkexistingsubcategory = await SubCategory.findOne({$and:[{subcategoryname:subcategoryname},{_id: { $ne: id }}]});
        var chkexistingsubcategory=false;
        const getexistingsubcategory = await SubCategory.find({_id: { $ne: id }});
        getexistingsubcategory.forEach(key => {
         
            if(key.subcategoryname.toLowerCase()===subcategoryname.toLowerCase())
            {
                chkexistingsubcategory = true;
                return;
            }
          
        });      
       
        if(categoryid === '' || categoryid === null || categoryid === undefined)
        {
            return res.status(401).json({msg:"Please select category !"})
        }
        else if(subcategoryname === '' || subcategoryname === null || subcategoryname === undefined)
        {
            return res.status(401).json({msg:"Please enter sub-category name !"})
        }
        else if(chkexistingsubcategory)
        {
            return res.status(401).json({msg:'sub-category name already exist !'});
        }
        else if(status === '' || status === null || status === undefined)
        {
            return res.status(401).json({msg:"Please select status !"})
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                const updatedData = await SubCategory.updateOne({ _id:id },{ $set:{categoryid:categoryid,subcategoryname:subcategoryname, imagesrc: imagesrc, imagename: imagename, status:status} });
                if(updatedData)
                {
                    return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
                }
                else
                {
                    return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                }
            }
        }
        else
        {
            const updatedData = await SubCategory.updateOne({ _id:id },{ $set:{categoryid:categoryid,subcategoryname:subcategoryname, status:status} });
            if(updatedData)
            {
                return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
            }
            else
            {
                return res.status(401).json({msg:process.env.ERROR_MESSAGE})
            }
        }
       
       
        //return res.status(200).json(updatedData);
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }


};

const getUpdateCategoryImageSlider = async (req,res)=>{

    try
    {

        const id = req.params.id;
        //const updatedUserData = req.body;
        const{categoryid, imagesrc, imagename, imageext, imagestatus, imagesize, status} = req.body;
      
        if(categoryid === '' || categoryid === null || categoryid === undefined)
        {
            return res.status(401).json({msg:"Please select category !"})
        }
        else if(status === '' || status === null || status === undefined)
        {
            return res.status(401).json({msg:"Please select status !"})
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                const updatedData = await CategoryImageSlider.updateOne({ _id:id },{ $set:{categoryid:categoryid, imagesrc: imagesrc, imagename: imagename, status:status} });
                if(updatedData)
                {
                    return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
                }
                else
                {
                    return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                }
            }
        }
        else
        {
            const updatedData = await CategoryImageSlider.updateOne({ _id:id },{ $set:{categoryid:categoryid, status:status} });
            if(updatedData)
            {
                return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
            }
            else
            {
                return res.status(401).json({msg:process.env.ERROR_MESSAGE})
            }
        }
       
       
        //return res.status(200).json(updatedData);
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }


};

const getUpdateChildCategory = async (req,res)=>{

    try
    {

        const id = req.params.id;
  
        const{categoryid,subcategoryid,childcategoryname, imagesrc, imagename, imageext, imagestatus, imagesize, status} = req.body;
        //const chkexistingchildcategory = await ChildCategory.findOne({$and:[{childcategoryname:childcategoryname},{_id: { $ne: id }}]});
        var chkexistingchildcategory=false;
        const getexistingchildcategory = await ChildCategory.find({_id: { $ne: id }});
        getexistingchildcategory.forEach(key => {
         
            if(key.childcategoryname.toLowerCase()===childcategoryname.toLowerCase())
            {
                chkexistingchildcategory = true;
                return;
            }
          
        });      
       

        if(categoryid === '' || categoryid === null || categoryid === undefined)
        {
            return res.status(401).json({msg:"Please select category !"})
        }
        else if(subcategoryid === '' || subcategoryid === null || subcategoryid === undefined)
        {
            return res.status(401).json({msg:"Please select sub-category !"})
        }
        else if(childcategoryname === '' || childcategoryname === null || childcategoryname === undefined)
        {
            return res.status(401).json({msg:"Please enter child-category name !"})
        }
        else if(chkexistingchildcategory)
        {
            return res.status(401).json({msg:'child-category name already exist !'});
        }
        else if(status === '' || status === null || status === undefined)
        {
            return res.status(401).json({msg:"Please select status !"})
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                const updatedData = await ChildCategory.updateOne({ _id:id },{ $set:{categoryid:categoryid,subcategoryid:subcategoryid,childcategoryname:childcategoryname,imagesrc: imagesrc, imagename: imagename,status:status} });
                if(updatedData)
                {
                    return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
                }
                else
                {
                    return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                }
            }
        }
        else
        {
            const updatedData = await ChildCategory.updateOne({ _id:id },{ $set:{categoryid:categoryid,subcategoryid:subcategoryid,childcategoryname:childcategoryname,status:status} });
            if(updatedData)
            {
                return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
            }
            else
            {
                return res.status(401).json({msg:process.env.ERROR_MESSAGE})
            }
        }
       
       
        //return res.status(200).json(updatedData);
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }


};

const getUpdateSubCategoryImageSlider = async (req,res)=>{

    try
    {

        const id = req.params.id;
        //const updatedUserData = req.body;
        //console.log("edited-data",updatedUserData)
        const{categoryid,subcategoryid,imagesrc, imagename, imageext, imagestatus, imagesize, status} = req.body;
      
        if(categoryid === '' || categoryid === null || categoryid === undefined)
        {
            return res.status(401).json({msg:"Please select category !"})
        }
        else if(subcategoryid === '' || subcategoryid === null || subcategoryid === undefined)
        {
            return res.status(401).json({msg:"Please select sub-category !"})
        }
        else if(status === '' || status === null || status === undefined)
        {
            return res.status(401).json({msg:"Please select status !"})
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                const updatedData = await SubCategoryImageSlider.updateOne({ _id:id },{ $set:{categoryid:categoryid,subcategoryid:subcategoryid,imagesrc: imagesrc, imagename: imagename,status:status} });
                if(updatedData)
                {
                    return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
                }
                else
                {
                    return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                }
            }
        }
        else
        {
            const updatedData = await SubCategoryImageSlider.updateOne({ _id:id },{ $set:{categoryid:categoryid,subcategoryid:subcategoryid,status:status} });
            if(updatedData)
            {
                return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
            }
            else
            {
                return res.status(401).json({msg:process.env.ERROR_MESSAGE})
            }
        }
       
       
        //return res.status(200).json(updatedData);
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }


};

const getUpdateSubChildCategory = async (req,res)=>{

    try
    {

        const id = req.params.id;
        const{categoryid,subcategoryid,childcategoryid,subchildcategoryname,
            brandid,modelnumber,weight,size,color,scaleid,height,width,length,heightid,widthid,lengthid,mrp,discount,price,availablequantity,bodymaterial,battery,
			warranty,description,
              imagestatus, imagesize,status} = req.body;
        
        //const chkexistingsubchildcatname = await SubChildCategory.findOne({$and:[{subchildcategoryname:subchildcategoryname},{_id: { $ne: id }}]});
        var chkexistingsubchildcatname=false;
        const getexistingsubchildcatname = await SubChildCategory.find({_id: { $ne: id }});
        getexistingsubchildcatname.forEach(key => {
         
            if(key.subchildcategoryname.toLowerCase()===subchildcategoryname.toLowerCase())
            {
                chkexistingsubchildcatname = true;
                return;
            }
          
        });            
             
      
        if(categoryid === '' || categoryid === null || categoryid === undefined)
        {
            return res.status(401).json({msg:"Please select category !"})
        }
        else if(subcategoryid === '' || subcategoryid === null || subcategoryid === undefined)
        {
            return res.status(401).json({msg:"Please select sub-category !"})
        }
        else if(childcategoryid === '' || childcategoryid === null || childcategoryid === undefined)
        {
            return res.status(401).json({msg:"Please select child-category !"})
        }
        else if(subchildcategoryname === '' || subchildcategoryname === null || subchildcategoryname === undefined)
        {
            return res.status(401).json({msg:"Please enter product name !"})
        }
        else if(chkexistingsubchildcatname)
        {
            return res.status(401).json({msg:'Product name already exist !'});
        }
        else if(mrp === "" || mrp === null || mrp === undefined)
        {
            res.status(401).json({ msg: "Please enter M.R.P. !" });
            return;
        }
        else if(discount === "" || discount === null || discount === undefined)
        {
            res.status(401).json({ msg: "Please enter discount !" });
            return;
        }
        else if(price === "" || price === null || price === undefined)
        {
            res.status(401).json({ msg: "Please enter price !" });
            return;
        }
        else if(availablequantity === "" || availablequantity === null || availablequantity === undefined)
        {
            res.status(401).json({ msg: "Please enter available quantity !" });
            return;
        }
        else if(status === '' || status === null || status === undefined)
        {
            return res.status(401).json({msg:"Please select status !"})
        }
        else if(imagestatus === "selected")
        {
               
                if(imagesize === "LIMIT_FILE_SIZE")
                {
                    res.status(401).json({ msg: "Maximum file size is 512kb !" });
                    return;
                }
                else if(imagesize === "LIMIT_UNEXPECTED_FILE")
                {
                    res.status(401).json({ msg: "Please upload maximum 10 files !" });
                    return;
                }
                else
                {
                    const updatedData = await SubChildCategory.updateOne({ _id:id },{ $set:{categoryid:categoryid,subcategoryid:subcategoryid,childcategoryid:childcategoryid,subchildcategoryname:subchildcategoryname,
                        brandid:brandid,modelnumber:modelnumber,weight:weight,size:size,color:color,scaleid:scaleid,height:height,width:width,length:length,heightid:heightid,widthid:widthid,lengthid:lengthid,mrp:mrp,discount:discount,
                        price:price,availablequantity:availablequantity,bodymaterial:bodymaterial,battery:battery,
                        warranty:warranty,description:description,
                        status:status} });
                    if(updatedData)
                    {
                        for (let x in req.body.files) 
                        {
                            let getfilename = req.body.files[x].filename;
                            let getfilepath = req.body.files[x].path;
                            await MultiImages.create({ subchildcategoryid:id, imagesrc:getfilepath, imagename:getfilename });   
                        }
                        /*for (let x in req.body.sizetasksedit) 
                            {
                                let size = req.body.sizetasksedit[x].size;
                                if(size !== '' && size !== null && size !== undefined)
                                {
                                    await ProductSize.create({ productid:id,size:size });
                                }
                                      
                            }*/
                            /*for (let x in req.body.colortasksedit) 
                            {
                                let color = req.body.colortasksedit[x].color;
                                if(color !== '' && color !== null && color !== undefined)
                                {
                                    await ProductColor.create({ productid:id,color:color });
                                }      
                            }*/
                            for (let x in req.body.offertasksedit) 
                            {
                                let offer = req.body.offertasksedit[x].offer;
                                if(offer !== '' && offer !== null && offer !== undefined)
                                {
                                    await ProductOffer.create({ productid:id,offer:offer });
                                }      
                            }			
                        return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
                    }
                    else
                    {
                        return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                    }
                }
               
        }
        else
        {
            const updatedData = await SubChildCategory.updateOne({ _id:id },{ $set:{categoryid:categoryid,subcategoryid:subcategoryid,childcategoryid:childcategoryid,subchildcategoryname:subchildcategoryname,
                brandid:brandid,modelnumber:modelnumber,weight:weight,size:size,color:color,scaleid:scaleid,height:height,width:width,length:length,heightid:heightid,widthid:widthid,lengthid:lengthid,mrp:mrp,discount:discount,
                price:price,availablequantity:availablequantity,bodymaterial:bodymaterial,battery:battery,
                warranty:warranty,description:description,
                status:status} });
            if(updatedData)
            {
                /*for(let x in req.body.sizetasksedit) 
                    {
                        let size = req.body.sizetasksedit[x].size;
                        if(size !== '' && size !== null && size !== undefined)
                        {
                            await ProductSize.create({ productid:id,size:size });
                        }
                                  
                    }*/
                    /*for(let x in req.body.colortasksedit) 
                    {
                        let color = req.body.colortasksedit[x].color;
                        if(color !== '' && color !== null && color !== undefined)
                        {
                            await ProductColor.create({ productid:id,color:color });
                        }      
                    }*/
                    for(let x in req.body.offertasksedit) 
                    {
                        let offer = req.body.offertasksedit[x].offer;
                        if(offer !== '' && offer !== null && offer !== undefined)
                        {
                            await ProductOffer.create({ productid:id,offer:offer });
                        }      
                    }			
                return res.status(200).json({msg:process.env.SUCCESS_MSG_UPDATE})
            }
            else
            {
                return res.status(401).json({msg:process.env.ERROR_MESSAGE})
            }
        }
       
       
        //return res.status(200).json(updatedData);
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }


};

const getUpdateAdminPassword = async (req,res)=>{

    try
    {

        const id = req.params.id;
        const updatedAdminData = req.body;
        const{oldpassword,newpassword,confirmnewpassword} = req.body;
      
        if(oldpassword === '' || oldpassword === null || oldpassword === undefined)
        {
            return res.status(401).json({msg:"Please enter old password !"})
        }
        else if(newpassword === '' || newpassword === null || newpassword === undefined)
        {
            return res.status(401).json({msg:"Please enter new password !"})
        }
        else if(confirmnewpassword === '' || confirmnewpassword === null || confirmnewpassword === undefined)
        {
            return res.status(401).json({msg:"Please enter confirm new password !"})
        }
        else if(newpassword !== confirmnewpassword)
        {
            return res.status(401).json({msg:"New password and confirm new password did not match !"})
        }
        else
        {
            const getUpdatedAdminData = await RegisteredUsers.findOne({ _id:id });
            const checkpassword = await bcrypt.compare(oldpassword, getUpdatedAdminData.password);
            //const getUpdatedAdminData = await RegisteredUsers.updateOne({ _id:id },{ $set:updatedUserData });
            
            if(checkpassword)
            {
                const saltround = 10;
                const has_pwd = await bcrypt.hash(newpassword, saltround);

                const UpdatedAdminpwd = await RegisteredUsers.updateOne({ _id:id },{ $set:{ password:has_pwd } });
                if(UpdatedAdminpwd)
                {
                    return res.status(200).json({msg:"Password has been successfully updated !"})
                    
                }
                else
                {
                    return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                }
                
            }
            else
            {
                return res.status(401).json({msg:"Please enter correct old password !"})
            }
        }
       
       
        //return res.status(200).json(updatedData);
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }


};

const getUpdateAdminProfile = async (req,res)=>{

    try
    {

        const id = req.params.id;
        const updatedAdminData = req.body;
        const{fullname, email, mobileno,imagesrc, imagename, imageext, imagestatus, imagesize} = req.body;
        
        if(fullname === '' || fullname === null || fullname === undefined)
        {
            return res.status(401).json({msg:"Please enter full name !"})
        }
        else if(email === '' || email === null || email === undefined)
        {
            return res.status(401).json({msg:"Please enter email !"})
        }
        else if(!validator.validate(email))
        {
            res.status(401).json({msg:"Please enter valid email !"});
            return;
        }
        else if(mobileno === '' || mobileno === null || mobileno === undefined)
        {
            res.status(401).json({msg:"Please enter mobile number !"});
            return;
        }
        else if(!Number(mobileno))
        {
            res.status(401).json({msg:"Mobile number must be digits only !"});
            return;
        }
        else if(mobileno.toString().length !== 10 )
        {
            res.status(401).json({msg:"Please enter 10 digit mobile number !"});
            return;
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                //const chkexistingemail = await RegisteredUsers.findOne({$and:[{email:email},{_id: { $ne: id }}]});
                const chkexistingmobileno = await RegisteredUsers.findOne({$and:[{mobileno:mobileno},{_id: { $ne: id }}]});

                var chkexistingemail=false;
                const getexistingemail = await RegisteredUsers.find({_id: { $ne: id }});
                getexistingemail.forEach(key => {
                 
                    if(key.email.toLowerCase()===email.toLowerCase())
                    {
                        chkexistingemail = true;
                        return;
                    }
                  
                });
                
                
                if(chkexistingemail)
                {
                    return res.status(401).json({msg:'Email already exist !'});
                }
                else if(chkexistingmobileno)
                {
                    return res.status(401).json({msg:'Mobile number already exist !'});
                }
                else
                {
                    //const updatedData = await User.updateOne({ _id:id },{ $set:{fullname:fullname, email:email, mobileno:mobileno, imagesrc: imagesrc, imagename: imagename} });
                    const updatedData = await RegisteredUsers.findOneAndUpdate({ _id:id },{ $set:{fullname:fullname, email:email, mobileno:mobileno, imagesrc: imagesrc, imagename: imagename} },{ new: true, runValidators: true });
                    if(updatedData)
                    {
                        return res.status(200).json({msg:"Successfully updated your profile.", user: updatedData})
                    }
                    else
                    {
                        return res.status(401).json({msg:process.env.ERROR_MESSAGE})
                    }
                }
                
            } 
        }
        else 
        {
            const chkexistingemail = await RegisteredUsers.findOne({$and:[{email:email},{_id: { $ne: id }}]});
            const chkexistingmobileno = await RegisteredUsers.findOne({$and:[{mobileno:mobileno},{_id: { $ne: id }}]});

            if(chkexistingemail)
            {
                return res.status(401).json({msg:'Email already exist !'});
            }
            else if(chkexistingmobileno)
            {
                return res.status(401).json({msg:'Mobile number already exist !'});
            }
            else
            {
                //const updatedData = await RegisteredUsers.updateOne({ _id:id },{ $set:{fullname:fullname, email:email, mobileno:mobileno} },{ new: true, runValidators: true });
                const updatedData = await RegisteredUsers.findOneAndUpdate({ _id:id },{ $set:{fullname:fullname, email:email, mobileno:mobileno} },{ new: true, runValidators: true });
                /*const user = await RegisteredUsers.findById(id);
                user.fullname = fullname;
                user.email = email;
                user.mobileno = mobileno;
                const updateduser = await user.save();*/
                if(updatedData)
                {
                    return res.status(200).json({msg:"Successfully updated your profile.", user: updatedData})
                }
                else
                {
                    return res.status(401).json({msg:process.env.ERROR_MESSAGE});
                }
            }
           
                
        }
       
    }
    catch(error)
    {
       // next(error);
       res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }


};

const getDeleteUser = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deleteddata = await RegisteredUsers.deleteOne({ _id:id });
        if(deleteddata)
        {
            return res.status(200).json({ msg:process.env.SUCCESS_MSG_DELETE });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({msg:process.env.ERROR_MESSAGE})
    }



};

const getDeleteSubAdmin = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deleteddata = await RegisteredUsers.deleteOne({ _id:id });
        if(deleteddata)
        {
            return res.status(200).json({ msg:process.env.SUCCESS_MSG_DELETE });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({msg:process.env.ERROR_MESSAGE});
    }



};

const getDeleteContactedUser = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deleteddata = await ContactUs.deleteOne({ _id:id });
        if(deleteddata)
        {
            return res.status(200).json({ msg:process.env.SUCCESS_MSG_DELETE });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({msg:process.env.ERROR_MESSAGE});
    }



};

const getDeleteBrand = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deletedbrand = await Brand.deleteOne({ _id:id });
       
        if(deletedbrand)
        {
            return res.status(200).json({ msg:process.env.SUCCESS_MSG_DELETE });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }



};

const getDeleteScale = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deletedscale = await Scale.deleteOne({ _id:id });
       
        if(deletedscale)
        {
            return res.status(200).json({ msg:process.env.SUCCESS_MSG_DELETE });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }



};

const getDeleteCategory = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deletedcategory = await Category.deleteOne({ _id:id });
        const deletedsubcategory = await SubCategory.deleteMany({ categoryid:id });
        const deletedchildcategory = await ChildCategory.deleteMany({ categoryid:id });
        const deletedsubchildcategory = await SubChildCategory.deleteMany({ categoryid:id });
        const deletedmultiimages = await MultiImages.deleteMany({ categoryid:id });
        const deletecategoryimgslider = await CategoryImageSlider.deleteMany({ categoryid:id });
        const deletesubcategoryimgslider = await SubCategoryImageSlider.deleteMany({ categoryid:id });
        if(deletedcategory)
        {
            return res.status(200).json({ msg:process.env.SUCCESS_MSG_DELETE });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }



};

const getDeleteSubCategory = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deletedsubcategory = await SubCategory.deleteOne({ _id:id });
        const deletedchildcategory = await ChildCategory.deleteMany({ subcategoryid:id });
        const deletedsubchildcategory = await SubChildCategory.deleteMany({ subcategoryid:id });
        const deletedmultiimages = await MultiImages.deleteMany({ subcategoryid:id });
        const deletesubcategoryimgslider = await SubCategoryImageSlider.deleteMany({ subcategoryid:id });
        if(deletedsubcategory)
        {
            return res.status(200).json({ msg:process.env.SUCCESS_MSG_DELETE });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }



};

const getDeleteCategoryImageSlider = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deletedsubcategory = await CategoryImageSlider.deleteOne({ _id:id });
        if(deletedsubcategory)
        {
            return res.status(200).json({ msg:process.env.SUCCESS_MSG_DELETE });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }



};

const getDeleteChildCategory = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deleteddata = await ChildCategory.deleteOne({ _id:id });
        const deletedsubchildcategory = await SubChildCategory.deleteMany({ childcategoryid:id });
        const deletedmultiimages = await MultiImages.deleteMany({ childcategoryid:id });
        if(deleteddata)
        {
            return res.status(200).json({ msg:process.env.SUCCESS_MSG_DELETE });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }



};

const getDeleteSubCategoryImageSlider = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deleteddata = await SubCategoryImageSlider.deleteOne({ _id:id });
       
        if(deleteddata)
        {
            return res.status(200).json({ msg:process.env.SUCCESS_MSG_DELETE });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }



};


const getDeleteSubChildCategory = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deleteddata = await SubChildCategory.deleteOne({ _id:id });
        const deletedmutiimage = await MultiImages.deleteMany({ subchildcategoryid:id });
        const deletedmutisize =  await ProductSize.deleteMany({ productid:id });
        const deletedmuticolor = await ProductColor.deleteMany({ productid:id });
        const deletedmutioffer = await ProductOffer.deleteMany({ productid:id });
        if(deleteddata)
        {
            return res.status(200).json({ msg:process.env.SUCCESS_MSG_DELETE });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

};

const getDeleteMultiImage = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deleteddata = await MultiImages.deleteOne({ _id:id });
        if(deleteddata)
        {
            return res.status(200).json({ msg:"Successfully deleted image !" });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const getDeleteProductSize = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deleteddata = await ProductSize.deleteOne({ _id:id });
        if(deleteddata)
        {
            return res.status(200).json({ msg:"Successfully deleted size !" });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const getDeleteProductColor = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deleteddata = await ProductColor.deleteOne({ _id:id });
        if(deleteddata)
        {
            return res.status(200).json({ msg:"Successfully deleted color !" });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const getDeleteProductOffer = async (req,res)=>{

    try
    {
        const id = req.params.id;
        const deleteddata = await ProductOffer.deleteOne({ _id:id });
        if(deleteddata)
        {
            return res.status(200).json({ msg:"Successfully deleted offer !" });
        }
        else
        {
            return res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        }
       
    }
    catch(error)
    {
        //next(error);
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const createBrand = async (req, res) => {     //for postman
    try 
    {   
        const { brandname, status, imagesrc, imagename, imageext, imagestatus, imagesize } = req.body;
        if(brandname === "" || brandname === null || brandname === undefined)
        {
            res.status(401).json({ msg: "Please enter brand name !" });
            return;
        }
        else if(status === "" || status === null || status === undefined)
        {
            res.status(401).json({ msg: "Please select status !" });
            return;
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                //const brandexist = await Brand.findOne({ brandname: brandname });
                var brandexist=false;
                const getexistingbrand = await Brand.find();
                if(getexistingbrand.length !== "" && getexistingbrand.length !== 0 && getexistingbrand.length !== null && getexistingbrand.length !== undefined)
                {
                    getexistingbrand.forEach(key => {
             
                    if(key.brandname.toLowerCase()===brandname.toLowerCase())
                    {
                        brandexist = true;
                        return;
                    }
                  
                    });
                }
              
                
                
                if (brandexist) 
                {
                    res.status(401).json({ msg: "Brand name already exist !" });
                    return;
                }
                else 
                {
                    const data = { brandname: brandname, imagesrc: imagesrc, imagename: imagename, status: status };
                    const brandCreated = await Brand.create(data);
                    if(brandCreated)
                    {
                        res.status(202).json({ msg: process.env.SUCCESS_MSG_CREATE });
                        singleimagesrc="";
                        singleimagename="";
                    }
                    else
                    {
                        res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                    }
                 
                }
            } 
        }
        else
        {
            //const brandexist = await Brand.findOne({ brandname: brandname });
            var brandexist=false;
            const getexistingbrand = await Brand.find();
            if(getexistingbrand.length !== "" && getexistingbrand.length !== 0 && getexistingbrand.length !== null && getexistingbrand.length !== undefined)
            {
                getexistingbrand.forEach(key => {
             
                    if(key.brandname.toLowerCase()===brandname.toLowerCase())
                    {
                        brandexist = true;
                        return;
                    }
                  
                });
            }
           
           

            if(brandexist) 
            {
                res.status(401).json({ msg: "Brand name already exist !" });
                return;
            }
            else 
            {
                const data = { brandname: brandname, status: status };
                const brandCreated = await Brand.create(data);
                if(brandCreated)
                {
                    res.status(202).json({ msg: process.env.SUCCESS_MSG_CREATE });
                    singleimagesrc="";
                    singleimagename="";
                }
                else
                {
                    res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                }
             
            }
        } 
     
    }
    catch (error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const createScale = async (req, res) => {     //for postman
    try 
    {   
        const { scalename, status, imagesrc, imagename, imageext, imagestatus, imagesize } = req.body;
        if(scalename === "" || scalename === null || scalename === undefined)
        {
            res.status(401).json({ msg: "Please enter scale name !" });
            return;
        }
        else if(status === "" || status === null || status === undefined)
        {
            res.status(401).json({ msg: "Please select status !" });
            return;
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                //const scaleexist = await Scale.findOne({ scalename: scalename });
                var scaleexist=false;
                const getexistingscale = await Scale.find();
                if(getexistingscale.length !== "" && getexistingscale.length !== 0 && getexistingscale.length !== null && getexistingscale.length !== undefined)
                {
                    getexistingscale.forEach(key => {
             
                    if(key.scalename.toLowerCase()===scalename.toLowerCase())
                    {
                        scaleexist = true;
                        return;
                    }
                  
                    });
                }
                
                
                
                if(scaleexist) 
                {
                    res.status(401).json({ msg: "Scale name already exist !" });
                    return;
                }
                else 
                {
                    const data = { scalename: scalename, imagesrc: imagesrc, imagename: imagename, status: status };
                    const scaleCreated = await Scale.create(data);
                    if(scaleCreated)
                    {
                        res.status(202).json({ msg: process.env.SUCCESS_MSG_CREATE });
                        singleimagesrc="";
                        singleimagename="";
                    }
                    else
                    {
                        res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                    }
                 
                }
            } 
        }
        else
        {
            //const scaleexist = await Scale.findOne({ scalename: scalename });
            var scaleexist=false;
            const getexistingscale = await Scale.find();
            if(getexistingscale.length !== "" && getexistingscale.length !== 0 && getexistingscale.length !== null && getexistingscale.length !== undefined)
            {
                getexistingscale.forEach(key => {
         
                if(key.scalename.toLowerCase()===scalename.toLowerCase())
                {
                    scaleexist = true;
                    return;
                }
              
                });
            }
            
            if(scaleexist) 
            {
                res.status(401).json({ msg: "Scale name already exist !" });
                return;
            }
            else 
            {
                const data = { scalename: scalename, imagesrc: imagesrc, imagename: imagename, status: status };
                const scaleCreated = await Scale.create(data);
                if(scaleCreated)
                {
                    res.status(202).json({ msg: process.env.SUCCESS_MSG_CREATE });
                    singleimagesrc="";
                    singleimagename="";
                }
                else
                {
                    res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                }
             
            }
        } 
     
    }
    catch (error)
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const createCategory = async (req, res) => {     //for postman
    try 
    {   
        const { categoryname, status, imagesrc, imagename, imageext, imagestatus, imagesize } = req.body;
        if(categoryname === "" || categoryname === null || categoryname === undefined )
        {
            res.status(401).json({ msg: "Please enter category !" });
            return;
        }
        else if(status === "" || status === null || status === undefined)
        {
            res.status(401).json({ msg: "Please select status !" });
            return;
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                //const categoryexist = await Category.findOne({ categoryname: categoryname });
                var categoryexist=false;
                const getexistingcategory = await Category.find();
                if(getexistingcategory.length !== "" && getexistingcategory.length !== 0 && getexistingcategory.length !== null && getexistingcategory.length !== undefined)
                {
                    getexistingcategory.forEach(key => {
             
                    if(key.categoryname.toLowerCase()===categoryname.toLowerCase())
                    {
                        categoryexist = true;
                        return;
                    }
                  
                    });
                }
                
                if (categoryexist) 
                {
                    res.status(401).json({ msg: "Category already exist !" });
                    return;
                }
                else 
                {
                    const data = { categoryname: categoryname, imagesrc: imagesrc, imagename: imagename, status: status };
                    const categoryCreated = await Category.create(data);
                    if(categoryCreated)
                    {
                        res.status(202).json({ msg: process.env.SUCCESS_MSG_CREATE });
                        singleimagesrc="";
                        singleimagename="";
                    }
                    else
                    {
                        res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                    }
                 
                }
            } 
        }
        else
        {
            //const categoryexist = await Category.findOne({ categoryname: categoryname });
            var categoryexist=false;
                const getexistingcategory = await Category.find();
                if(getexistingcategory.length !== "" && getexistingcategory.length !== 0 && getexistingcategory.length !== null && getexistingcategory.length !== undefined)
                {
                    getexistingcategory.forEach(key => {
             
                    if(key.categoryname.toLowerCase()===categoryname.toLowerCase())
                    {
                        categoryexist = true;
                        return;
                    }
                  
                    });
                }
            
            if(categoryexist) 
            {
                res.status(401).json({ msg: "Category already exist !" });
                return;
            }
            else 
            {
                const data = { categoryname: categoryname, imagesrc: imagesrc, imagename: imagename, status: status };
                const categoryCreated = await Category.create(data);
                if(categoryCreated)
                {
                    res.status(202).json({ msg: process.env.SUCCESS_MSG_CREATE });
                    singleimagesrc="";
                    singleimagename="";
                }
                else
                {
                    res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                }
             
            }
        } 
     
    }
    catch (error) 
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const createSubCategory = async (req, res) => {     //for postman
    try 
    {
        const { categoryid, subcategoryname, status, imagesrc, imagename, imageext, imagestatus, imagesize } = req.body;
        if(categoryid === "" || categoryid === null || categoryid === undefined)
        {
            res.status(401).json({ msg: "Please select category !" });
            return;
        }
        else if(subcategoryname === "" || subcategoryname === null || subcategoryname === undefined)
        {
            res.status(401).json({ msg: "Please enter subcategory !" });
            return;
        }
        else if(status === "" || status === null || status === undefined)
        {
            res.status(401).json({ msg: "Please select status !" });
            return;
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                //const subcategoryexist = await SubCategory.findOne({ subcategoryname: subcategoryname });
                var subcategoryexist=false;
                const getexistingsubcategory = await SubCategory.find();
                if(getexistingsubcategory.length !== "" && getexistingsubcategory.length !== 0 && getexistingsubcategory.length !== null && getexistingsubcategory.length !== undefined)
                {
                    getexistingsubcategory.forEach(key => {
                 
                        if(key.subcategoryname.toLowerCase()===subcategoryname.toLowerCase())
                        {
                            subcategoryexist = true;
                            return;
                        }
                      
                    });
                }
                
                
                if(subcategoryexist) 
                {
                    res.status(401).json({ msg: "Sub-category already exist !" });
                    return;
                }
                else 
                {
                   
                    const data = { categoryid: categoryid, subcategoryname:subcategoryname, imagesrc: imagesrc, imagename: imagename, status: status };
                  
                    const subcategoryCreated = await SubCategory.create(data);
                    if(subcategoryCreated)
                    {
                        res.status(202).json({ msg: process.env.SUCCESS_MSG_CREATE });
                    }
                    else
                    {
                        res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                    }
                 
                }
            }
        }
        else
        {
            //const subcategoryexist = await SubCategory.findOne({ subcategoryname: subcategoryname });
            var subcategoryexist=false;
            const getexistingsubcategory = await SubCategory.find();
            if(getexistingsubcategory.length !== "" && getexistingsubcategory.length !== 0 && getexistingsubcategory.length !== null && getexistingsubcategory.length !== undefined)
            {
                getexistingsubcategory.forEach(key => {
             
                    if(key.subcategoryname.toLowerCase()===subcategoryname.toLowerCase())
                    {
                        subcategoryexist = true;
                        return;
                    }
                  
                });
            }
            
            if(subcategoryexist) 
            {
                res.status(401).json({ msg: "Sub-category already exist !" });
                return;
            }
            else 
            {
               
                const data = { categoryid: categoryid, subcategoryname:subcategoryname,  status: status };
              
                const subcategoryCreated = await SubCategory.create(data);
                if(subcategoryCreated)
                {
                    res.status(202).json({ msg:process.env.SUCCESS_MSG_CREATE });
                }
                else
                {
                    res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                }
             
            }
        }
     

    }
    catch (error) 
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const createCategoryImageSlider = async (req, res) => {     //for postman
    try 
    {
        const { categoryid, status, imagesrc, imagename, imageext, imagestatus, imagesize } = req.body;
       
        if(categoryid === "" || categoryid === null || categoryid === undefined)
        {
            res.status(401).json({ msg: "Please select category !" });
            return;
        }
        else if(status === "" || status === null || status === undefined)
        {
            res.status(401).json({ msg: "Please select status !" });
            return;
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                    const data = { categoryid: categoryid, imagesrc: imagesrc, imagename: imagename, status: status };
                  
                    const categorysliderCreated = await CategoryImageSlider.create(data);
                    if(categorysliderCreated)
                    {
                        res.status(202).json({ msg: process.env.SUCCESS_MSG_CREATE });
                    }
                    else
                    {
                        res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                    }
                 
                
            }
        }
        else
        {
                const data = { categoryid: categoryid, status: status };
              
                const categorysliderCreated = await CategoryImageSlider.create(data);
                if(categorysliderCreated)
                {
                    res.status(202).json({ msg:process.env.SUCCESS_MSG_CREATE });
                }
                else
                {
                    res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                }
             
            
        }
     

    }
    catch (error) 
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const createChildCategory = async (req, res) => {     //for postman
    try 
    {
        const { categoryid,subcategoryid, childcategoryname, imagesrc, imagename, imageext, imagestatus, imagesize, status } = req.body;
        if(categoryid === "" || categoryid === null || categoryid === undefined)
        {
            res.status(401).json({ msg: "Please select category !" });
            return;
        }
        else if(subcategoryid === "" || subcategoryid === null || subcategoryid === undefined)
        {
            res.status(401).json({ msg: "Please select subcategory !" });
            return;
        }
        else if(childcategoryname === "" || childcategoryname === null || childcategoryname === undefined)
        {
            res.status(401).json({ msg: "Please enter child-category !" });
            return;
        }
        else if(status === "" || status === null || status === undefined)
        {
            res.status(401).json({ msg: "Please select status !" });
            return;
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                //const childcategoryexist = await ChildCategory.findOne({ childcategoryname: childcategoryname });
                var childcategoryexist=false;
                const getexistingchildcategory = await ChildCategory.find();
                if(getexistingchildcategory.length !== "" && getexistingchildcategory.length !== 0 && getexistingchildcategory.length !== null && getexistingchildcategory.length !== undefined)
                {
                    getexistingchildcategory.forEach(key => {
                 
                        if(key.childcategoryname.toLowerCase()===childcategoryname.toLowerCase())
                        {
                            childcategoryexist = true;
                            return;
                        }
                      
                    });
                }
                
                
                if(childcategoryexist) 
                {
                    res.status(401).json({ msg: "Child-category already exist !" });
                    return;
                }
                else 
                {
                   
                    const data = { categoryid: categoryid,subcategoryid: subcategoryid, childcategoryname:childcategoryname, imagesrc: imagesrc, imagename: imagename, status: status };
                  
                    const childcategoryCreated = await ChildCategory.create(data);
                    if(childcategoryCreated)
                    {
                        res.status(202).json({ msg:process.env.SUCCESS_MSG_CREATE });
                    }
                    else
                    {
                        res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                    }
                 
                }
            } 
        }
        else
        {
            //const childcategoryexist = await ChildCategory.findOne({ childcategoryname: childcategoryname });
            var childcategoryexist=false;
            const getexistingchildcategory = await ChildCategory.find();
            if(getexistingchildcategory.length !== "" && getexistingchildcategory.length !== 0 && getexistingchildcategory.length !== null && getexistingchildcategory.length !== undefined)
            {
                getexistingchildcategory.forEach(key => {
             
                    if(key.childcategoryname.toLowerCase()===childcategoryname.toLowerCase())
                    {
                        childcategoryexist = true;
                        return;
                    }
                  
                });
            }
            
            if(childcategoryexist) 
            {
                res.status(401).json({ msg: "Child-category already exist !" });
                return;
            }
            else 
            {
               
                const data = { categoryid: categoryid,subcategoryid: subcategoryid, childcategoryname:childcategoryname,  status: status };
              
                const childcategoryCreated = await ChildCategory.create(data);
                if(childcategoryCreated)
                {
                    res.status(202).json({ msg:process.env.SUCCESS_MSG_CREATE });
                }
                else
                {
                    res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                }
             
            }
        }
     

    }
    catch (error) 
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const createSubCategoryImageSlider = async (req, res) => {     //for postman
    try 
    {
        const { categoryid,subcategoryid,imagesrc, imagename, imageext, imagestatus, imagesize, status } = req.body;
        if(categoryid === "" || categoryid === null || categoryid === undefined)
        {
            res.status(401).json({ msg: "Please select category !" });
            return;
        }
        else if(subcategoryid === "" || subcategoryid === null || subcategoryid === undefined)
        {
            res.status(401).json({ msg: "Please select subcategory !" });
            return;
        }
        else if(status === "" || status === null || status === undefined)
        {
            res.status(401).json({ msg: "Please select status !" });
            return;
        }
        else if(imagestatus === "selected")
        {
            if(imagesize === "exceed")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imageext !== 'png' && imageext !== 'jpg' && imageext !== 'jpeg' && imageext !== 'svg' && imageext !== 'gif')
            {
                res.status(401).json({ msg: "Please upload png,jpg,jpeg,svg and gif image only !" });
                return;
            }
            else
            {
                    const data = { categoryid: categoryid,subcategoryid: subcategoryid,imagesrc: imagesrc, imagename: imagename, status: status };
                  
                    const childcategoryCreated = await SubCategoryImageSlider.create(data);
                    if(childcategoryCreated)
                    {
                        res.status(202).json({ msg:process.env.SUCCESS_MSG_CREATE });
                    }
                    else
                    {
                        res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                    }
                 
                
            } 
        }
        else
        {
                     
                const data = { categoryid: categoryid,subcategoryid: subcategoryid,status: status };
              
                const childcategoryCreated = await SubCategoryImageSlider.create(data);
                if(childcategoryCreated)
                {
                    res.status(202).json({ msg:process.env.SUCCESS_MSG_CREATE });
                }
                else
                {
                    res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                }
             
            
        }
     

    }
    catch (error) 
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const createSubChildCategory = async (req, res) => {     //for postman
   try 
    {
        const { categoryid,subcategoryid,childcategoryid,subchildcategoryname,brandid,modelnumber,
            weight,size,color,scaleid,height,width,length,heightid,widthid,lengthid,mrp,discount,price,availablequantity,bodymaterial,battery,warranty,description,
                imagestatus, imagesize, status } = req.body;
      
        
        if(categoryid === "" || categoryid === null || categoryid === undefined)
        {
            res.status(401).json({ msg: "Please select category !" });
            return;
        }
        else if(subcategoryid === "" || subcategoryid === null || subcategoryid === undefined)
        {
            res.status(401).json({ msg: "Please select sub-category !" });
            return;
        }
        else if(childcategoryid === "" || childcategoryid === null || childcategoryid === undefined)
        {
            res.status(401).json({ msg: "Please select child-category !" });
            return;
        }
        else if(subchildcategoryname === "" || subchildcategoryname === null || subchildcategoryname === undefined)
        {
            res.status(401).json({ msg: "Please enter product name !" });
            return;
        }
        else if(mrp === "" || mrp === null || mrp === undefined)
        {
            res.status(401).json({ msg: "Please enter M.R.P. !" });
            return;
        }
        else if(discount === "" || discount === null || discount === undefined)
        {
            res.status(401).json({ msg: "Please enter discount !" });
            return;
        }
        else if(price === "" || price === null || price === undefined)
        {
            res.status(401).json({ msg: "Please enter price !" });
            return;
        }
        else if(availablequantity === "" || availablequantity === null || availablequantity === undefined)
        {
            res.status(401).json({ msg: "Please enter available quantity !" });
            return;
        }
        else if(status === "" || status === null || status === undefined)
        {
            res.status(401).json({ msg: "Please select status !" });
            return;
        }
        else if(imagestatus === "selected")
        {
           
            if(imagesize === "LIMIT_FILE_SIZE")
            {
                res.status(401).json({ msg: "Maximum file size is 512kb !" });
                return;
            }
            else if(imagesize === "LIMIT_UNEXPECTED_FILE")
            {
                res.status(401).json({ msg: "Please upload maximum 10 files !" });
                return;
            }
            else
            {
                //const subchildcategoryexist = await SubChildCategory.findOne({ subchildcategoryname: subchildcategoryname });
                var subchildcategoryexist=false;
            const getexistingsubchildcategory = await SubChildCategory.find();
            if(getexistingsubchildcategory.length !== "" && getexistingsubchildcategory.length !== 0 && getexistingsubchildcategory.length !== null && getexistingsubchildcategory.length !== undefined)
            {
                getexistingsubchildcategory.forEach(key => {
             
                    if(key.subchildcategoryname.toLowerCase()===subchildcategoryname.toLowerCase())
                    {
                        subchildcategoryexist = true;
                        return;
                    }
                  
                });
            }
                
                
                if(subchildcategoryexist) 
                {
                    res.status(401).json({ msg: "Product name already exist !" });
                    return;
                }
                else 
                {
                    const data = { categoryid: categoryid,subcategoryid: subcategoryid,childcategoryid: childcategoryid, subchildcategoryname:subchildcategoryname,
                                   brandid:brandid,modelnumber:modelnumber,weight:weight,size:size,color:color,scaleid:scaleid,height:height,width:width,length:length,heightid:heightid,widthid:widthid,lengthid:lengthid,mrp:mrp,discount:discount,
                                   price:price,availablequantity:availablequantity,bodymaterial:bodymaterial,battery:battery,
                                   warranty:warranty,description:description, 
                                   status: status };
                      
                    const subchildcategoryCreated = await SubChildCategory.create(data);
                    if(subchildcategoryCreated)
                    {
                        for (let x in req.body.files) 
                        {
                            let getfilename = req.body.files[x].filename;
                            let getfilepath = req.body.files[x].path;
                            await MultiImages.create({ categoryid:subchildcategoryCreated.categoryid,subcategoryid:subchildcategoryCreated.subcategoryid,childcategoryid:subchildcategoryCreated.childcategoryid,subchildcategoryid:subchildcategoryCreated._id, imagesrc:getfilepath, imagename:getfilename });   
                        }
                        /*for (let x in req.body.sizetasks) 
                        {
                            let size = req.body.sizetasks[x].size;
                            if(size !== '' && size !== null && size !== undefined)
                            {
                                await ProductSize.create({ productid:subchildcategoryCreated._id,size:size });
                            }
                                  
                        }*/
                        /*for (let x in req.body.colortasks) 
                        {
                            let color = req.body.colortasks[x].color;
                            if(color !== '' && color !== null && color !== undefined)
                            {
                                await ProductColor.create({ productid:subchildcategoryCreated._id,color:color });
                            }      
                        }*/
                        for (let x in req.body.offertasks) 
                        {
                            let offer = req.body.offertasks[x].offer;
                            if(offer !== '' && offer !== null && offer !== undefined)
                            {
                                await ProductOffer.create({ productid:subchildcategoryCreated._id,offer:offer });
                            }      
                        }
                        res.status(202).json({ msg:process.env.SUCCESS_MSG_CREATE });
                    }
                    else
                    {
                        res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                    }
                }
            }
           
        }
        else
        {
            //const subchildcategoryexist = await SubChildCategory.findOne({ subchildcategoryname: subchildcategoryname });
            var subchildcategoryexist=false;
            const getexistingsubchildcategory = await SubChildCategory.find();
            if(getexistingsubchildcategory.length !== "" && getexistingsubchildcategory.length !== 0 && getexistingsubchildcategory.length !== null && getexistingsubchildcategory.length !== undefined)
            {
                getexistingsubchildcategory.forEach(key => {
             
                    if(key.subchildcategoryname.toLowerCase()===subchildcategoryname.toLowerCase())
                    {
                        subchildcategoryexist = true;
                        return;
                    }
                  
                });
            }
            
            if(subchildcategoryexist) 
            {
                res.status(401).json({ msg: "Product name already exist !" });
                return;
            }
            else 
            {
               
                const data = { categoryid: categoryid,subcategoryid: subcategoryid,childcategoryid: childcategoryid, subchildcategoryname:subchildcategoryname,
                               brandid:brandid,modelnumber:modelnumber,weight:weight,size:size,color:color,scaleid:scaleid,height:height,width:width,length:length,heightid:heightid,widthid:widthid,lengthid:lengthid,mrp:mrp,discount:discount,
                               price:price,availablequantity:availablequantity,bodymaterial:bodymaterial,battery:battery,
                               warranty:warranty,description:description,
                               status: status };
              
                const subchildcategoryCreated = await SubChildCategory.create(data);
                if(subchildcategoryCreated)
                {
                    /*for(let x in req.body.sizetasks) 
                    {
                        let size = req.body.sizetasks[x].size;
                        if(size !== '' && size !== null && size !== undefined)
                        {
                            await ProductSize.create({ productid:subchildcategoryCreated._id,size:size });
                        }
                                  
                    }*/
                    /*for(let x in req.body.colortasks) 
                    {
                        let color = req.body.colortasks[x].color;
                        if(color !== '' && color !== null && color !== undefined)
                        {
                            await ProductColor.create({ productid:subchildcategoryCreated._id,color:color });
                        }      
                    }*/
                    for(let x in req.body.offertasks) 
                    {
                        let offer = req.body.offertasks[x].offer;
                        if(offer !== '' && offer !== null && offer !== undefined)
                        {
                            await ProductOffer.create({ productid:subchildcategoryCreated._id,offer:offer });
                        }      
                    }
                    res.status(202).json({ msg:process.env.SUCCESS_MSG_CREATE });
                }
                else
                {
                    res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                }
             
            }
        }
    }
    catch (error) 
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const createSubAdmin = async (req, res) => {     //for postman
    try 
    {
       
        const { fullname, email, mobileno, password, cnfpassword, usertype, status } = req.body;
        if(fullname === "" || fullname === null || fullname === undefined)
        {
            res.status(401).json({ msg: "Please enter full name !" });
            return;
        }
        else if(email === "" || email === null || email === undefined)
        {
            res.status(401).json({ msg: "Please enter email !" });
            return;
        }
        else if(!validator.validate(email))
        {
            res.status(401).json({msg:"Please enter valid email !"});
            return;
        }
        else if(mobileno === '' || mobileno === null || mobileno === undefined)
        {
            res.status(401).json({msg:"Please enter mobile number !"});
            return;
        }
        else if(!Number(mobileno))
        {
            res.status(401).json({msg:"Mobile number must be digits only !"});
            return;
        }
        else if(mobileno.toString().length !== 10 )
        {
            res.status(401).json({msg:"Please enter 10 digit mobile number !"});
            return;
        }
        else if(password === "" || password === null || password === undefined)
        {
            res.status(401).json({ msg: "Please enter password !" });
            return;
        }
        else if(cnfpassword === "" || cnfpassword === null || cnfpassword === undefined)
        {
            res.status(401).json({ msg: "Please enter confirm password !" });
            return;
        }
        else if(password != cnfpassword)
        {
            res.status(401).json({ msg: "Password and confirm password did not match !" });
            return;
        }
        else if(usertype === '' || usertype === null || usertype === undefined)
        {
            res.status(401).json({msg:"Please select user type !"});
            return;
        }
        else if(status === '' || status === null || status === undefined)
        {
           res.status(401).json({msg:"Please select status !"})
           return;
        }
        else
        {
            //const userexist = await RegisteredUsers.findOne({ email: email });
            var userexist=false;
            const getexistinguser = await RegisteredUsers.find();
            if(getexistinguser.length !== "" && getexistinguser.length !== 0 && getexistinguser.length !== null && getexistinguser.length !== undefined)
            {
                getexistinguser.forEach(key => {
         
                if(key.email.toLowerCase()===email.toLowerCase())
                {
                    userexist = true;
                    return;
                }
              
                });
            }
            const mobilenoexist = await RegisteredUsers.findOne({ mobileno: mobileno });

            if (userexist) 
            {
                res.status(401).json({ msg: "Email already exist !" });
                return;
            }
            else if (mobilenoexist) 
            {
                res.status(401).json({ msg: "Mobile number already exist !" });
                return;
            }
            else 
            {
                const saltround = 10;
                const has_pwd = await bcrypt.hash(password, saltround);
                let data='';
                if(usertype === 'user')
                {
                    data = { fullname: fullname, email: email, mobileno: mobileno, password: has_pwd, usertype:usertype, status:status, isAdmin:false };
                }
                else if(usertype === 'subadmin')
                {
                    data = { fullname: fullname, email: email, mobileno: mobileno, password: has_pwd, usertype:usertype, status:status, isAdmin:true };
                }
                
                
                /* for without token */
                //const userCreated = await RegisteredUsers.create(data).then((result) => {res.status(202).json({ msg: "Registration Successful"  })}).catch((error) => { res.status(400).json({ msg: "Registration Failed" })});
                 /* for without token */
    
            
                /* to generate token */
                const userCreated = await RegisteredUsers.create(data);
                if(userCreated)
                {
                    /* //enable for sending email
                    
                        const transporter = nodemailer.createTransport({
                        service: process.env.SERVICE_NAME,                   //sender service name
                        host: process.env.HOST_NAME,            //sender host name
                        port: 587,
                        secure: false, // Use `true` for port 465, `false` for all other ports
                        auth: {
                          user: process.env.EMAIL_ID,      //sender email address
                          pass: process.env.EMAIL_PASS,    //this is app password of email account
                        },
                      });

                      
                    const info = await transporter.sendMail({
                        from: "videshi",
                        to: "videshi.muduli1989@gmail.com", // list of receivers
                        subject: "Test", // Subject line
                        text: "Hello world?", // plain text body
                        html: "<b>This is test message</b>", 
                    });
                    console.log("Message sent: %s", info);
                    console.log("Message sent: %s", info.messageId);  */
        

                    res.status(202).json({ msg: "Successfully created sub-admin !"});
                }
                else
                {
                    res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                }
                /* to generate token */
    
            }
        }
     

    }
    catch (error) 
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}



module.exports = { 
                   getAllRegisteredusers, getSingleUser, getUpdateUser, getDeleteUser, 
                   getUpdateAdminPassword, createCategory, getAllCategory, getSingleCategory, 
                   getUpdateCategory, getDeleteCategory, createSubCategory, getAllSubCategory,
                   getSingleSubCategory,getDeleteSubCategory,getUpdateSubCategory,
                   getAllSubCategoryByCategoryid, createChildCategory, getAllChildCategory,
                   getSingleChildCategory, getDeleteChildCategory, getUpdateChildCategory,
                   getAllChildCategoryBySubCategoryid, createSubChildCategory, getAllSubChildCategory,
                   getSingleSubChildCategory, getUpdateSubChildCategory, getDeleteSubChildCategory,
                   uploadSingleImage,uploadMultipleImage,getMultiImages,getDeleteMultiImage,getAdminDetails,
                   filterCategoryByDate,filterSubCategoryByDate,filterChildCategoryByDate,filterSubChildCategoryByDate,
                   filterRegisteredUsersByDate,getAllContectedusers,getSingleContactedUser,filterContactedUsersByDate,
                   getDeleteContactedUser,getAllSubAdminList,getUpdateSubadmin,createSubAdmin,getDeleteSubAdmin,
                   getUpdateAdminProfile,getAllCategoryAccordingStatus,createCategoryImageSlider,
                   getAllCategoryImageSlider,getSingleCategoryImageSlider,getUpdateCategoryImageSlider,
                   getDeleteCategoryImageSlider,createSubCategoryImageSlider,getAllSubCategoryImageSlider,
                   getSingleSubCategoryImageSlider,getUpdateSubCategoryImageSlider,getDeleteSubCategoryImageSlider,
                   filterCategoryImageSliderByDate,filterSubCategoryImageSliderByDate,createBrand,getAllBrand,
                   getSingleBrand,getUpdateBrand,getDeleteBrand,filterBrandByDate,getAllBrandAccordingStatus,
                   getMultiSizes,getMultiColors,getMultiOffers,getDeleteProductSize,getDeleteProductColor,getDeleteProductOffer,
                   createScale,getAllScale,filterScaleByDate,getSingleScale,getUpdateScale,getDeleteScale,
                   getAllScaleAccordingStatus
                  
                };