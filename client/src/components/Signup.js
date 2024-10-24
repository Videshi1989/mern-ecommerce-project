import React,{useState} from 'react'
import Header from './Header'
import Footer from './Footer'
import loaderimg from './Images/loader.png'
import loaderouter from './Images/loader_outer.gif'
import { NavLink, useNavigate } from 'react-router-dom'
import userimg from './Images/userimage.png'
import signup from './Images/signup.jpg'

import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
var validator = require("email-validator");

export default function Signup()
{
    const[loader,setLoader] = useState(false);
    const[showloader,Setshowloader] = useState(true);     //loading effect

  function trimSpaces(value) 
	{
		if(typeof value === 'string') 
		{
		  return value.trim();
		} 
		else if(Array.isArray(value)) 
		{
		  return value.map(item => trimSpaces(item));
		} 
		else if(typeof value === 'object' && value !== null) 
		{
		  const trimmedObject = {};
		  Object.keys(value).forEach(key => {
			trimmedObject[key] = trimSpaces(value[key]);
		  });
		  return trimmedObject;
		}
		return value;
	}

    //signup
      //////for signup
      const[resultsignupcart,setResultsignupcart] = useState('');
      const[usersignupcart,setUsersignupcart] = useState({    //calling on pageload
        fullnamecart:"",
        emailcart:"",
        mobilenocart:"",
        otpcart:"",
        passwordcart:"",
        cnfpasswordcart:""
    });
    
    const handleInputSignupcart = (e)=>{        //calling on typing
        //console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUsersignupcart({
            ...usersignupcart,
            [name]:value
        })

    };
    const {storeTokenInLS, USERAPI} = useAuth();
    const navigate = useNavigate();
   
    const handleSubmitSignupcart = async (e) =>{      //calling on submit
       
        e.preventDefault();       //to stop page refresh
       
        //setResultsignupcart('');
          if(usersignupcart.fullnamecart === '' || usersignupcart.fullnamecart === null || usersignupcart.fullnamecart === undefined)
          {
              toast.error("Please enter full name !");
              return;
          }
          else if(usersignupcart.fullnamecart.toString().length > 250 )
          {
              toast.error("Maximum length of full name is 250 characters !");
              return;
          }
          else if(usersignupcart.emailcart === '' || usersignupcart.emailcart === null || usersignupcart.emailcart === undefined)
          {
              toast.error("Please enter email !");
              return;
          }
          else if(!validator.validate(usersignupcart.emailcart))
          {
              toast.error("Please enter valid email !");
              return;
          }
          else if(usersignupcart.emailcart.toString().length > 250 )
          {
              toast.error("Maximum length of email is 250 characters !");
              return;
          }
          else if(usersignupcart.mobilenocart === '' || usersignupcart.mobilenocart === null || usersignupcart.mobilenocart === undefined)
          {
              toast.error("Please enter mobile number !");
              return;
          }
          else if(!Number(usersignupcart.mobilenocart))
          {
              toast.error("Mobile number must be digits only !");
              return;
          }
          else if(usersignupcart.mobilenocart.toString().length !== 10 )
          {
              toast.error("Please enter 10 digit mobile number !");
              return;
          }
          else if(usersignupcart.otpcart === '' || usersignupcart.otpcart === null || usersignupcart.otpcart === undefined)
          {
              toast.error("Please enter OTP !");
              return;
          }
          else if(usersignupcart.otpcart.toString().length !== 6 )
          {
              toast.error("Please enter 6 digit OTP !");
              return;
          }
          else if(usersignupcart.passwordcart === '' || usersignupcart.passwordcart === null || usersignupcart.passwordcart === undefined)
          {
              toast.error("Please enter password !");
              return;
          }
          else if(usersignupcart.passwordcart.toString().length > 250 )
          {
              toast.error("Maximum length of password is 250 characters !");
              return;
          }
          else if(usersignupcart.cnfpasswordcart === '' || usersignupcart.cnfpasswordcart === null || usersignupcart.cnfpasswordcart === undefined)
          {
              toast.error("Please enter confirm password !");
              return;
          }
          else if(usersignupcart.cnfpasswordcart.toString().length > 250 )
          {
              toast.error("Maximum length of confirm password is 250 characters !");
              return;
          }
          
          else if(usersignupcart.passwordcart !== usersignupcart.cnfpasswordcart)
          {
              toast.error("Password and confirm password did not match !");
              return;
          }
          else
          {
            setLoader(true);
            try
            {
              const response = await fetch(`${USERAPI}/registercart`,{
                  method:"POST",
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body:JSON.stringify(trimSpaces(usersignupcart))
              });
    
              const res_data = await response.json();
             //console.log("response data",res_data);
    
              if(response.ok)
              {
                setUsersignupcart({ 
                      fullnamecart:"",
                      emailcart:"",
                      mobilenocart:"",
                      otpcart:"",
                      passwordcart:"",
                      cnfpasswordcart:""
                  });
                  //setResultsignupcart(res_data.msg);
                  setLoader(false);
                  toast.success(res_data.msg);
                  storeTokenInLS(res_data.token);
                  navigate("/placeorder");
                  //setTimeout(() => { navigate("/placeorder") }, 5000);
                  
              }
              else
              {
                //setResultsignupcart(res_data.msg);
                setLoader(false);
                toast.error(res_data.msg);
              }
              //console.log(response);
          }
          catch(error)
          {
              //console.log("Register:", error)
              setLoader(false);
              toast.error(error);
          }
          }
  

    }

    return(
        <>
        { showloader  ? <div className='parent-loader'><div className="loading"><img loading='lazy'  src={loaderimg} alt="loader" /></div></div> : null }
            
            <Header />

          <div className='forgotslidersetup mb-4'>
            <div className='container'>
                <div className='row'>
               
                    <div className='col'>
                    <div className='login-cartdtl-place-order new-parent'>
                    <div className='w-50 mobdnone'>
                       <img loading='lazy'  src={signup} alt="login" className='signup-img'/>
                    </div>
                    <div className="cart-login mw50 mobwidth100">
    <div className="cart-parentuser"><img loading='lazy'  src={userimg} alt="User" className="usericon"/></div>
    <h4 className="cart-heading">Sign up <i className="fa fa-pencil-square-o heading-icon" aria-hidden="true"></i></h4>
    <hr className="cart-hrline" />
   
    <form onSubmit={ handleSubmitSignupcart }>
<div className="mb-3">
<label  className="form-label"><i className="fa fa-pencil" aria-hidden="true"></i> Full name </label>
<input name="fullnamecart" id="fullnamecart" value={usersignupcart.fullnamecart} onChange={handleInputSignupcart} type="text" autoComplete="nope"  className="form-control cart-f-control" title="Enter your full name"  placeholder="Enter your full name" aria-describedby="emailHelp"/>

</div>
<div className="mb-3">
<label  className="form-label"><i className="fa fa-envelope" aria-hidden="true"></i> Email </label>
<input name="emailcart" id="emailcart" value={usersignupcart.emailcart} onChange={handleInputSignupcart} type="text" autoComplete="nope"  className="form-control cart-f-control" title="Enter your email"  placeholder="Enter your email" aria-describedby="emailHelp"/>

</div>

<div className="row">
            <div className="col mobwidth100flxunset">
            <div className="mb-3">
                <label  className="form-label"><i className="fa fa-phone" aria-hidden="true"></i> Mobile No.</label>
                <input name="mobilenocart" id="mobilenocart" value={usersignupcart.mobilenocart} onChange={handleInputSignupcart} type="text" autoComplete="nope" placeholder="Enter mobile no." className="form-control cart-f-control"  aria-describedby="emailHelp"/>

            </div>
            </div>
            <div className="col mobwidth100flxunset">
            <div className="mb-3">
                <label  className="form-label"><i className="fa fa-eye" aria-hidden="true"></i> OTP</label>
                <input name="otpcart" id="otpcart" value={usersignupcart.otpcart} onChange={handleInputSignupcart} type="password" autoComplete="nope" placeholder="Enter otp" className="form-control cart-f-control" />

            </div>
          </div>
        
        </div>
        <div className="row">
            <div className="col mobwidth100flxunset">
            <div className="mb-3">
                <label  className="form-label"><i className="fa fa-unlock-alt" aria-hidden="true"></i> Password</label>
                <input name="passwordcart" id="passwordcart" value={usersignupcart.passwordcart} onChange={handleInputSignupcart} type="password" autoComplete="nope" placeholder="Enter password" className="form-control cart-f-control"  aria-describedby="emailHelp"/>

            </div>
            </div>
            <div className="col mobwidth100flxunset">
            <div className="mb-3">
                <label  className="form-label"><i className="fa fa-unlock-alt" aria-hidden="true"></i> Confirm Password</label>
                <input name="cnfpasswordcart" id="cnfpasswordcart" value={usersignupcart.cnfpasswordcart} onChange={handleInputSignupcart} type="password" autoComplete="nope" placeholder="Confirm password" className="form-control cart-f-control" />

            </div>
          </div>
          
        </div>

<span className="background">{ resultsignupcart }</span><br/>
{
    loader ? <button type="button"  className="btn btn-success btn-bg w-100"><span>Please wait... <img src={loaderouter} className="loadersize" alt="loader"/></span></button>
    :
    <button type="submit"  className="btn btn-success btn-bg w-100">Sign up <i className="fa fa-hand-pointer-o" aria-hidden="true"></i></button>
}


<br/>


<br/>
<NavLink  title="Go to Sign up" to="/signin" className="cart-fgtpwd" style={{float:"left",textDecoration:"underline"}} >Already have an account? Sign in</NavLink>

</form>
                    </div>
                    </div>
                    </div>
                    
                </div>
            </div>
            </div>
            <Footer />
           

        { showloader ? Setshowloader(false) : null } 
        </>
    )
}