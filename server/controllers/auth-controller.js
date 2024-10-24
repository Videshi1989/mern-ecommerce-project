var validator = require("email-validator"); 
const bcrypt = require("bcryptjs");    // To bcrypt password 
const nodemailer = require('nodemailer');

const RegisteredUsers = require("../models/registeredusers-model.js");
//const ContactUser = require("../models/contact-model.js");
const ContactUs = require("../models/contactus-model.js");
const Category = require("../models/category-model");
const SubCategory = require("../models/subcategory-model");
const CategoryImageSlider = require("../models/categoryimageslider-model");
const SubCategoryImageSlider = require("../models/subcategoryimageslider-model");

const contactus = async (req, res) => {     //for postman
    try 
    {
        //console.log(req.body)
        const { contactname, contactemail, contactmobileno, contactmsg } = req.body;
        const contactdata = { contactname, contactemail, contactmobileno, contactmsg };
        if(contactname === "" || contactname === null || contactname === undefined)
        {
            res.status(401).json({ msg: "Please enter full name !" });
            return;
        }
        else if(contactemail === "" || contactemail === null || contactemail === undefined)
        {
            res.status(401).json({ msg: "Please enter email !" });
            return;
        }
        else if(!validator.validate(contactemail))
        {
            return res.status(401).json({msg:"Please enter valid email !"})
        }
        else if(contactmobileno === "" || contactmobileno === null || contactmobileno === undefined)
        {
            res.status(401).json({ msg: "Please enter mobile number !" });
            return;
        }
        else if(isNaN(contactmobileno))
        {
            res.status(401).json({ msg: "Mobile number must be digits only !" });
            return;
        }
        else if(contactmobileno.toString().length !== 10 )
        {
            res.status(401).json({ msg: "Please enter 10 digit mobile number !" });
            return;
        }
        else if(contactmsg === "" || contactmsg === null || contactmsg === undefined)
        {
            res.status(401).json({ msg: "Please type your message !" });
            return;
        }
        else
        {
            const contactuserCreated = await ContactUs.create(contactdata);
            if(contactuserCreated)
            {
                res.status(202).json({ msg: "Thank you for contacting us !" });
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

const register = async (req, res) => {     //for postman
    try 
    {
        
        const { fullname, email, mobileno,otp, password, cnfpassword } = req.body;
        
        if(fullname === '' || fullname === null || fullname === undefined)
        {
            return res.status(401).json({msg:"Please enter full name !"})
        }
        else if(fullname.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of full name is 250 characters !"});
        }
        else if(email === '' || email === null || email === undefined)
        {
            return res.status(401).json({msg:"Please enter email !"})
        }
        else if(!validator.validate(email))
        {
            return res.status(401).json({msg:"Please enter valid email !"})
        }
        else if(email.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of email is 250 characters !"});
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
        else if(otp === '' || otp === null || otp === undefined)
        {
            return res.status(401).json({msg:"Please enter OTP !"})
        }
        else if(otp.toString().length !== 6 )
        {
            return res.status(401).json({msg:"Please enter 6 digit OTP !"});
        }
        else if(password === '' || password === null || password === undefined)
        {
            return res.status(401).json({msg:"Please enter password !"})
        }
        else if(password.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of password is 250 characters !"});
        }
        else if(cnfpassword === '' || cnfpassword === null || cnfpassword === undefined)
        {
            return res.status(401).json({msg:"Please enter confirm password !"})
        }
        else if(cnfpassword.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of confirm password is 250 characters !"});
        }



        else if(password !== cnfpassword)
        {
            res.status(401).json({ msg: "Password and confirm password did not match !" });
            return;
        }
        else
        {
            //const userexist = await RegisteredUsers.findOne({ email: email });
            const mobilenoexist = await RegisteredUsers.findOne({ mobileno: mobileno });
            
            var userexist=false;
            const getexistingemail = await RegisteredUsers.find();
            if(getexistingemail.length !== "" && getexistingemail.length !== 0 && getexistingemail.length !== null && getexistingemail.length !== undefined)
            {
                getexistingemail.forEach(key => {
         
                if(key.email.toLowerCase() === email.toLowerCase())
                {
                    userexist = true;
                    return;
                }
              
                });
            }
            
            if(userexist) 
            {
                res.status(401).json({ msg: "Email already exist !" });
                return;
            }
            else if(mobilenoexist) 
            {
                res.status(401).json({ msg: "Mobile number already exist !" });
                return;
            }
            else 
            {
                const saltround = 10;
                const has_pwd = await bcrypt.hash(password, saltround);
                const data = { fullname: fullname, email: email, mobileno: mobileno, password: has_pwd };
                
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
        

                    res.status(202).json({ msg: "You have successfully registered.",getdata: userCreated, token: await userCreated.generateToken(), userId: userCreated._id.toString() });
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

const registercart = async (req, res) => {     //for postman
    try 
    {
        const { fullnamecart, emailcart, mobilenocart,otpcart, passwordcart, cnfpasswordcart } = req.body;
        
        if(fullnamecart === '' || fullnamecart === null || fullnamecart === undefined)
        {
            return res.status(401).json({msg:"Please enter full name !"})
        }
        else if(fullnamecart.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of full name is 250 characters !"});
        }
        else if(emailcart === '' || emailcart === null || emailcart === undefined)
        {
            return res.status(401).json({msg:"Please enter email !"})
        }
        else if(!validator.validate(emailcart))
        {
            return res.status(401).json({msg:"Please enter valid email !"})
        }
        else if(emailcart.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of email is 250 characters !"});
        }
        else if(mobilenocart === '' || mobilenocart === null || mobilenocart === undefined)
        {
            return res.status(401).json({msg:"Please enter mobile number !"})
        }
        else if(!Number(mobilenocart))
        {
            return res.status(401).json({msg:"Mobile number must be digits only !"})
        }
        else if(mobilenocart.toString().length !== 10 )
        {
            return res.status(401).json({msg:"Please enter 10 digit mobile number !"});
        }
        else if(otpcart === '' || otpcart === null || otpcart === undefined)
        {
            return res.status(401).json({msg:"Please enter OTP !"})
        }
        else if(otpcart.toString().length !== 6 )
        {
            return res.status(401).json({msg:"Please enter 6 digit OTP !"});
        }
        else if(passwordcart === '' || passwordcart === null || passwordcart === undefined)
        {
            return res.status(401).json({msg:"Please enter password !"})
        }
        else if(passwordcart.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of password is 250 characters !"});
        }
        else if(cnfpasswordcart === '' || cnfpasswordcart === null || cnfpasswordcart === undefined)
        {
            return res.status(401).json({msg:"Please enter confirm password !"})
        }
        else if(cnfpasswordcart.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of confirm password is 250 characters !"});
        }
        
        else if(passwordcart !== cnfpasswordcart)
        {
            res.status(401).json({ msg: "Password and confirm password did not match !" });
            return;
        }
        else
        {
            //const userexist = await RegisteredUsers.findOne({ email: emailcart });
            const mobilenoexist = await RegisteredUsers.findOne({ mobileno: mobilenocart });

            var userexist=false;
            const getexistingemail = await RegisteredUsers.find();
            if(getexistingemail.length !== "" && getexistingemail.length !== 0 && getexistingemail.length !== null && getexistingemail.length !== undefined)
            {
                getexistingemail.forEach(key => {
         
                if(key.email.toLowerCase() === emailcart.toLowerCase())
                {
                    userexist = true;
                    return;
                }
              
                });
            }
            
            if(userexist) 
            {
                res.status(401).json({ msg: "Email already exist !" });
                return;
            }
            else if(mobilenoexist)
            {
                res.status(401).json({ msg: "Mobile number already exist !" });
                return;
            }
            else 
            {
                const saltround = 10;
                const has_pwd = await bcrypt.hash(passwordcart, saltround);
                const data = { fullname: fullnamecart, email: emailcart, mobileno: mobilenocart, password: has_pwd };
                
                /* for without token */
                //const userCreated = await RegisteredUsers.create(data).then((result) => {res.status(202).json({ msg: "Registration Successful"  })}).catch((error) => { res.status(400).json({ msg: "Registration Failed" })});
                 /* for without token */
    
            
                /* to generate token */
                const userCreated = await RegisteredUsers.create(data);
                if(userCreated)
                {
                    res.status(202).json({ msg: "You have successfully registered.",getdata: userCreated, token: await userCreated.generateToken(), userId: userCreated._id.toString() });
                }
                else
                {
                    res.status(401).json({msg:process.env.ERROR_MESSAGE}); 
                }
                /* to generate token */
    
            }
        }
     

    }
    catch(error) 
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }

}

const login = async (req, res) => {
    try 
    {
        const { emailsignin, passwordsignin } = req.body;
        //const userExist = await RegisteredUsers.findOne({ email:emailsignin });
       
        var chkEmailExist=false;
        var userExist;
        const getexistingemail = await RegisteredUsers.find();
        if(getexistingemail.length !== "" && getexistingemail.length !== 0 && getexistingemail.length !== null && getexistingemail.length !== undefined)
        {
            getexistingemail.forEach(key => {
     
            if(key.email.toLowerCase() === emailsignin.toLowerCase())
            {
                chkEmailExist = true;
                userExist = key;
                return;
            }
          
            });
        }


        if(emailsignin === '' || emailsignin === null || emailsignin === undefined)
        {
            return res.status(401).json({msg:"Please enter email !"})
        }
        else if(!validator.validate(emailsignin))
        {
            return res.status(401).json({msg:"Please enter valid email !"})
        }
        else if(emailsignin.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of email is 250 characters !"});
        }
        else if(!chkEmailExist) 
        {
            res.status(401).json({ msg: "Email does not exist !" });
            return;
        }
        else if(userExist.status === 'disable') 
        {
            res.status(401).json({ msg: "Your account has been disabled by Admin !" });
            return;
        }
        else if(passwordsignin === '' || passwordsignin === null || passwordsignin === undefined)
        {
            return res.status(401).json({msg:"Please enter password !"})
        }
        else if(passwordsignin.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of password is 250 characters !"});
        }
        else 
        {
            const checkpassword = await bcrypt.compare(passwordsignin, userExist.password);
            if(checkpassword) 
            {
                res.status(200).json({msg: "You have successfully loggedin.",token: await userExist.generateToken(),userId: userExist._id.toString(),isAdmin: userExist.isAdmin });
            }
            else 
            {
                res.status(401).json({ msg: "Password does not exist !" });
            }
        }

    }
    catch (error) 
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
        //console.log("eerror:",error)
    }
}

const logincart = async (req, res) => {
    try 
    {
        const { emailsignincart, passwordsignincart } = req.body;
        //const userExist = await RegisteredUsers.findOne({ email:emailsignincart });
       
        var chkEmailExist=false;
        var userExist;
        const getexistingemail = await RegisteredUsers.find();
        if(getexistingemail.length !== "" && getexistingemail.length !== 0 && getexistingemail.length !== null && getexistingemail.length !== undefined)
        {
            getexistingemail.forEach(key => {
     
            if(key.email.toLowerCase() === emailsignincart.toLowerCase())
            {
                chkEmailExist = true;
                userExist = key;
                return;
            }
          
            });
        }


        if(emailsignincart === '' || emailsignincart === null || emailsignincart === undefined)
        {
            return res.status(401).json({msg:"Please enter email !"})
        }
        else if(!validator.validate(emailsignincart))
        {
            return res.status(401).json({msg:"Please enter valid email !"})
        }
        else if(emailsignincart.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of email is 250 characters !"});
        }
        else if(!chkEmailExist) 
        {
            res.status(401).json({ msg: "Email does not exist !" });
            return;
        }
        else if(userExist.status === 'disable') 
        {
            res.status(401).json({ msg: "Your account has been disabled by Admin !" });
            return;
        }
        else if(passwordsignincart === '' || passwordsignincart === null || passwordsignincart === undefined)
        {
            return res.status(401).json({msg:"Please enter password !"})
        }
        else if(passwordsignincart.toString().length > 250 )
        {
            return res.status(401).json({msg:"Maximum length of password is 250 characters !"});
        }
        else 
        {
            const checkpassword = await bcrypt.compare(passwordsignincart, userExist.password);
            if(checkpassword) 
            {
                res.status(200).json({msg: "You have successfully loggedin.",token: await userExist.generateToken(),userId: userExist._id.toString(),isAdmin: userExist.isAdmin });
            }
            else 
            {
                res.status(401).json({ msg: "Password does not exist !" });
            }
        }

    }
    catch (error) 
    {
        res.status(401).json({ msg:process.env.ERROR_MESSAGE });
    }
}

const user = async (req,res)=>{
    try{
        const userData = req.user;
        //console.log("inside authcontroller:",userData);
        return res.status(200).json({userData});
    }
    catch(error)
    {
        console.log(`Error from the root: ${error}`);
        
    }
}

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

const getAllSubCategoryAccordingStatus = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const subcategory = await SubCategory.find({status:'enable'}).sort({ _id: -1 });
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

const getAllSubCategoryByCategoryidAccordingStatus = async (req,res)=>{

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

const getAllCategoryImageSliderAccordingStatus = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const subcategory = await CategoryImageSlider.find({status:'enable'}).sort({ _id: -1 });
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

const getAllSubCategoryImageSliderAccordingStatus = async (req,res)=>{

    try{
        //const users = await RegisteredUsers.find({},{password:0}); //it will not fetch password colom
        const subcatimgslider = await SubCategoryImageSlider.find({status:'enable'}).sort({ _id: -1 });
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



module.exports = { 
                   register, registercart, login, logincart, user, contactus,
                   getAllCategoryAccordingStatus,getAllSubCategoryAccordingStatus,getAllSubCategoryByCategoryidAccordingStatus,
                   getAllCategoryImageSliderAccordingStatus,getAllSubCategoryImageSliderAccordingStatus
                 }
