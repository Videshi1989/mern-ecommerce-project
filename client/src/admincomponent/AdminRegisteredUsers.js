import React,{useEffect, useState} from 'react'
import closebtn from './Images/closebtn.png'
import AdminSideBar from './AdminSideBar'
import AdminTopbar from './AdminTopbar'
import loader from './../components/Images/loader.png'
import jsPDF from "jspdf";
import "jspdf-autotable";
import './css/admin.scss'

import DataTable from 'react-data-table-component'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiEye } from "react-icons/hi2";

import csv from "./Images/csv.svg";
import pdf from "./Images/pdf.svg";
import exclamation from "./Images/exclamation.svg";
import success from "./Images/success.svg";
import error from "./Images/error.svg";
import loadergif from "./Images/loader.gif";
import { format } from "date-fns";
import { useAuth } from '../store/auth'; 
import { toast } from "react-toastify";  
import { useNavigate } from 'react-router-dom'
var validator = require("email-validator");

const AdminRegisteredUsers = () => {

	const Pageheading = 'Registered Users';
	const Pagesubheading = 'Home / Registered Users';
	
	const[showloader,Setshowloader] = useState(true);     //loading effect

	const { authorizationToken, ADMINAPI } = useAuth();   
	const[allrecords,setAllRecords] = useState([]);
	const[records,setRecords] = useState([]);
	const[viewdata,Setviewdata] = useState([]);
	
	const[loader,setLoader] = useState(false);
	const[datatblloader,setdatatblloader] = useState(true);
	const[popupwait,setpopupwait] = useState(false);
	const[popupsuccess,setpopupsuccess] = useState(false);
	const[popuperror,setpopuperror] = useState(false);
	const[responseheading,setresponseheading] = useState('');
	const[responsemsg,setresponsemsg] = useState('');
	const[resultedit,setResultedit] = useState('');
	const[editid,Seteditid] = useState('');
	const[deleteid,SetDeleteid] = useState('');
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');
	const [search, setSearch] = useState('');

	//const navigate = useNavigate();
	useEffect(()=>{getAllRecords()},[]);

	

	const getAllRecords = async ()=>
	{
		setdatatblloader(true);
		try 
		{
			const response = await fetch(`${ADMINAPI}/registeredusers`,{
				method:"GET",
				headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
			  });
		
			const data = await response.json();
			if(data.length === "" || data.length === 0 || data.length === null || data.length === undefined)
			{
				setRecords([]);
				setAllRecords([]);
			}
			else
			{
				setRecords(data);
				setAllRecords(data);
			}
			
			
			setdatatblloader(false);
		
		  } 
		  catch (error) 
		  {
			//console.log("adminerror",error);
			setdatatblloader(false);
		  }
	}

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

	function ClosepopupAddnew()
	{
	  document.getElementById('popupaddnew').style='display:none';
	}
	async function ShowpopupView(getid)
	{
	  
	  document.getElementById('popupview').style='display:block';
	  try{
		const response = await fetch(`${ADMINAPI}/getsingleuser/${getid}`,{
			method : 'GET',
			headers:{
						'Content-Type': 'application/json',
						Authorization : authorizationToken 
					}
		});
  
		const singleuserdata = await response.json();
		if(singleuserdata)
		{
			Setviewdata(singleuserdata);
		}
		else
		{
			Setviewdata([]);
		}
		
		
  
	  }
	  catch(error)
	  {
		//console.log(error);
	  }
  
	}
	function ClosepopupView()
	{
	  document.getElementById('popupview').style='display:none';
	}
	async function ShowpopupEdit(getid)
	{
		Seteditid(getid);
	  document.getElementById('popupedit').style='display:block';
	 	try
		{
			const response = await fetch(`${ADMINAPI}/getsingleuser/${getid}`,{
			method : 'GET',
			headers:{
						'Content-Type': 'application/json',
						Authorization : authorizationToken 
					}
		});
  
		const singleuserdata = await response.json();
		//console.log("dddata;",singleuserdata);
		if(singleuserdata)
		{
			Setedituserdata(singleuserdata);
		}
		else
		{
			Setedituserdata({fullname:"", email:"", mobileno:"",usertype:"",status:""});
		}
		//console.log("yydata;",edituserdata.status);
		
		
  
	    }
	    catch(error)
	   {
		//console.log(error);
	   }
	}

	function ClosepopupEdit()
	{
		document.getElementById("form-edit-record").reset();
		setLoader(false);
	  	document.getElementById('popupedit').style='display:none';
	}
	function ShowpopupDelete(getid)
	{
	  SetDeleteid(getid);
	  document.getElementById('popupdelete').style='display:block';
	}
	function ClosepopupDelete()
	{
	  document.getElementById('popupdelete').style='display:none';
	}

	//////

	
    const customStyles = {
        headRow: {
            style: {
              color:'#223336',
              backgroundColor: '#e7eef0'
            },
          },
          striped: {
              default: 'red'
          },
        rows: {
          style: {
            minHeight: '45px', // override the row height
          }
        },
        headCells: {
          style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
          },
        },
        cells: {
          style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
          },
        },
      };
    function convertArrayOfObjectsToCSV(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }
function downloadCSV(args) {  
		if(records.length !== undefined && records.length !== null && records.length !== '') 
		{
			var data, filename, link;
			var csv = convertArrayOfObjectsToCSV({
				//data: records     //for getting all data
				data: records.map(({ _id,__v,imagesrc,imagename,password,isAdmin, ...rest }) => rest) //for getting all column data except _id,__v,imagesrc and imagename
			});
			if (csv == null) return;
	
			filename = args.filename || 'Registration.csv';
	
			if (!csv.match(/^data:text\/csv/i)) {
				csv = 'data:text/csv;charset=utf-8,' + csv;
			}
	
	   
			data = encodeURI(csv);
	
			link = document.createElement('a');
			link.setAttribute('href', data);
			link.setAttribute('download', filename);
			link.click();
		}
		else
		{
			toast.error(process.env.REACT_APP_NO_RECORD_DOWNLOAD);
		}

    }
   
    const columns=[
        {
            name:"NAME",
            selector:row=>row.fullname,   //fullname is colum name of table
            sortable:true,
       
        },
        {
            name:"EMAIL",
            selector:row=>row.email,
            sortable:true,
			filter:true
        },
        {
            name:"MOBILE NO.",
            selector:row=>row.mobileno,
            sortable:true
        }
		,
		{
            name:"USER TYPE",
            selector:row=>row.usertype,
			cell: row => <span style={{ textTransform: 'capitalize' }}>{row.usertype}</span>,
            sortable:true
        },
        {
            name:"STATUS",
            selector:row=>row.status,
			cell: row => <span style={{ textTransform: 'capitalize' }}>{row.status}</span>,
            sortable:true
        },
		{
            name:"ACTION", 
			selector:row=>row._id,
			cell: cellinfo =>([<HiEye title='View' className='actioniconview' onClick={()=> ShowpopupView(cellinfo._id)} />,<MdEdit title='Edit'  className='actionicon' onClick={()=> ShowpopupEdit(cellinfo._id)}  />, " ", <RiDeleteBin6Line title='Delete' style={{pointerEvents:'none',opacity:'0.5'}} className='actionicon' onClick={()=> ShowpopupDelete(cellinfo._id)} />]),
		
        }
       ];
	   const columnspdf = [
		{ header: "NAME", dataKey: "fullname" },
		{ header: "EMAIL", dataKey: "email" },
		{ header: "MOBILE", dataKey: "mobileno" },
		{ header: "CREATED", dataKey: "created_date" },
		{ header: "USERTYPE", dataKey: "usertype" },
		{ header: "STATUS", dataKey: "status" }
	  ];  

       function handleFilter(event)
       {
			setdatatblloader(true);
			setSearch(event.target.value.toLowerCase());
			setFromDate('');
			setToDate('');	
            if(allrecords.length === 0 || allrecords.length === undefined || allrecords.length === null)
			{
				setdatatblloader(false);
				return null;
			}
			else
			{
				if(event.target.value !== '')
            	{
                	const newData = allrecords.filter(row=>{
						return(
							   row.fullname.toLowerCase().includes(event.target.value.toLowerCase()) ||
							   row.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
							   row.mobileno.toString().toLowerCase().includes(event.target.value.toLowerCase()) ||
							   row.usertype.toLowerCase().includes(event.target.value.toLowerCase()) ||
							   row.status.toLowerCase().includes(event.target.value.toLowerCase())
							 );
					   });
                	setRecords(newData);
					setdatatblloader(false);
            	}
            	else
				{
                	setRecords(allrecords);
					setdatatblloader(false);
            	}
			}
	
       }

	   const downloadPDF = () =>{
			if(records.length !== undefined && records.length !== null && records.length !== '') 
			{
				const doc = new jsPDF();
				doc.text("Registration-List", 14, 16);
				doc.autoTable({
				  head: [columnspdf.map(col => col.header)],
				  body: records.map(row => columnspdf.map(col => row[col.dataKey])),
				  startY: 20,
				});
				doc.save("Registration-List.pdf");
			}
			else
			{
				toast.error(process.env.REACT_APP_NO_RECORD_DOWNLOAD);
			}
	

	}
	   
	//////for Edit Record
   	const[edituserdata,Setedituserdata] = useState({fullname:"", email:"", mobileno:"",usertype:"",status:""});
    const handleInputEdit = (e)=>{        //calling on typing
        //console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        Setedituserdata({
            ...edituserdata,
            [name]:value
        })

    };
 
    const handleSubmitEdit = async (e) =>{      //calling on submit
		e.preventDefault();       //to stop page refresh
		if(edituserdata.fullname === '' || edituserdata.fullname === null || edituserdata.fullname === undefined)
		{
			toast.error("Please enter full name !");
		}
		else if(edituserdata.email === '' || edituserdata.email === null || edituserdata.email === undefined)
		{
			toast.error("Please enter email !");
		}
		else if(!validator.validate(edituserdata.email))
		{
			toast.error("Please enter valid email !");
		}
		else if(edituserdata.mobileno === '' || edituserdata.mobileno === null || edituserdata.mobileno === undefined)
		{
			toast.error("Please enter mobile number !");
		}
		else if(!Number(edituserdata.mobileno))
		{
			toast.error("Mobile number must be digits only !");
		}
		else if(edituserdata.mobileno.toString().length !== 10 )
		{
			toast.error("Please enter 10 digit mobile number !");
		}
		else if(edituserdata.usertype === '' || edituserdata.usertype === null || edituserdata.usertype === undefined)
		{
			toast.error("Please select user type !");
		}
		else if(edituserdata.status === '' || edituserdata.status === null || edituserdata.status === undefined)
		{
			toast.error("Please select status !");
		}
		else
		{
			setpopupwait(true);
			setLoader(true);
		   
			setResultedit('');
			
			try
			{
			  const response = await fetch(`${ADMINAPI}/getedituser/${editid}`,{
				  method:"PATCH",
				  headers:{
					  'Content-Type': 'application/json',
					  Authorization : authorizationToken 
	
				  },
				  body:JSON.stringify(edituserdata)
			  });
	
			  const res_data = await response.json();
			  //console.log("response data",res_data);
	
			  if(response.ok)
			  { 
				setResultedit(res_data.msg);
				//toast.success(res_data.msg);
				getAllRecords();
				//setTimeout(() => { ClosepopupEdit() }, 3000);
				setLoader(false);
				ClosepopupEdit();
				setpopupsuccess(true);
				setresponseheading(process.env.REACT_APP_SUCCESS_HEADING_UPDATE);
				setresponsemsg(res_data.msg);
				setpopupwait(false);
			  }
			  else
			  {
				setResultedit(res_data.msg);
				toast.error(res_data.msg);
				setLoader(false);
				setpopupwait(false);
			  }
			  //console.log(response);
		  }
		  catch(error)
		  {
			//console.log("update-error",error)
			//setResultedit(res_data.msg);
		   // toast.error(error);
		   setpopuperror(true);
		   setresponseheading(process.env.REACT_APP_ERROR_HEADING)
		   setresponsemsg(process.env.REACT_APP_ERROR_MESSAGE)
		   setLoader(false);
		   setpopupwait(false);
		  }
		}
		
	

    }

	////////
	const DeleteRecord = async(e)=>{
		e.preventDefault();
		ClosepopupDelete();
		setLoader(true);
		setpopupwait(true)
		try
		{
			const response = await fetch(`${ADMINAPI}/deleterecord/${deleteid}`,{
				method : 'DELETE',
				headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
			});
			const res_data = await response.json();
			//console.log("response data",res_data);
			if(response.ok)
			{
				getAllRecords();
				setLoader(false);
			    //toast.success(res_data.msg);
				ClosepopupDelete();
				
				setpopupsuccess(true);
				setresponseheading(process.env.REACT_APP_SUCCESS_HEADING_DELETE);
				setresponsemsg(res_data.msg);
				setpopupwait(false);

			}
			else
			{
				setpopuperror(true);
				setresponseheading(process.env.REACT_APP_ERROR_HEADING);
				setresponsemsg(res_data.msg);
				//toast.error(res_data.msg);
				setLoader(false);
				setpopupwait(false);
			}
	  
		}
		catch(error)
		{
			//console.log("delete-error",error)
			setpopupwait(false);
			setpopuperror(true);
			setresponseheading(process.env.REACT_APP_ERROR_HEADING);
			setresponsemsg(process.env.REACT_APP_ERROR_MESSAGE);
			//toast.error(error);
			setLoader(false);
		}
	  
	}

	const FilterByDate = async ()=>{
		//setdatatblloader(true);
		setSearch('');
		/*var fromDateFomatted = '';
		var toDateFomatted = '';
		if(fromDate)
		{
			fromDateFomatted = format(fromDate, "dd-MM-yyyy");
		}
		if(toDate)
		{
			toDateFomatted = format(toDate, "dd-MM-yyyy");
		}*/

		if(fromDate === '' || fromDate === null || fromDate === undefined)
		{
			toast.error("Please select from date !");
			return;
		}
		else if(toDate === '' || toDate === null || toDate === undefined)
		{
			toast.error("Please select to date !");
			return;
		}
		else
		{
			setdatatblloader(true);
			const filterdates = {fromDate:fromDate,toDate:toDate}
			try
			{
					const response = await fetch(`${ADMINAPI}/filterregisteredusersbydate`,{
					method:"POST",
					headers:{
						'Content-Type':'application/json',
						Authorization : authorizationToken
					},
					body:JSON.stringify(trimSpaces(filterdates))
					
				});
				  const res_data = await response.json();
				//console.log(res_data);
				if(response.ok)
				{
				  setRecords(res_data);
				  setdatatblloader(false);
				}
				else
				{
					toast.error(res_data.msg);
					setdatatblloader(false);
				}
			  
			}
			catch(error)
			{
				setpopuperror(true);
				setresponseheading(process.env.REACT_APP_ERROR_HEADING);
				setresponsemsg(process.env.REACT_APP_ERROR_MESSAGE);
				setdatatblloader(false);
			}
		}
		

   }

   const ResetFilter = async ()=>{
	setFromDate('');
	setToDate('');
	setSearch('');
	getAllRecords();
   }

  return (
    <>
     { showloader  ? <div className='parent-loader'><div className="loading"><img loading='lazy'  src={loader} alt="loader" /></div></div> : null }  
	   
	   <div id="popupview" className="overlayadmin" style={{display:'none'}}>
  <div className="popupview animate-zoom">
    <div className="view-heading"><i className="fa fa-eye" aria-hidden="true"></i> View Details</div>
    <span onClick={ClosepopupView}><img loading='lazy'  src={closebtn} alt="close button" className="close" title="Close"/></span>
    <div className="container-fluid padd_0" >
	 <div className="viewheight viewheightmobile" id="style-scroll2">
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Name:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.fullname}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Email:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.email}</span>
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Mobile No:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.mobileno}</span>
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">User Type:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont" style={{ textTransform: 'capitalize' }}>{viewdata.usertype}</span>
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Status:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont caplater">{viewdata.status}</span>
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Created Date:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				{/* <span className="cont-cont">{viewdata.created_date}</span> */}
				<span className="cont-cont">{viewdata.created_date ? format(viewdata.created_date, "dd-MM-yyyy") : viewdata.created_date}</span>
			</div>
		</div>

		{/* <div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Password:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
			</div>
		</div> */}
		{/* <div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Description:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
			</div>
		</div> */}
		{/* <div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Description:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
			</div>
		</div> */}
		
    </div>
	</div>
  </div>
</div>

    <div id="popupaddnew" className="overlayadmin" style={{display:'none'}}>
  <div className="popupaddnew animate-zoom">
    <div className="view-heading"><i className="fa fa-plus" aria-hidden="true"></i> Add New Record</div>
    <span onClick={ClosepopupAddnew}><img loading='lazy'  src={closebtn} alt="close button" className="close" title="Close"/></span>
    <div className="container-fluid padd_0" >
	 <div className="viewheight" id="style-scroll2">
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Name:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input type="text" className="admin-control" value="" placeholder="Enter your name" />
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Email:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input type="text" className="admin-control" value="" placeholder="Enter your email" />
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Description:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<textarea className="desc-control" placeholder="Type here.. "></textarea>
			</div>
		</div>
			<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Description:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<textarea className="desc-control" placeholder="Type here.. "></textarea>
			</div>
		</div>
	
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">State:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<select className="admin-control">
					<option>Select your state</option>
					<option>Madhyapradesh</option>
					<option>chhatisgarh</option>
					<option>Rajsthan</option>
				</select>
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Gender:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont"><input type="radio" name="gender" /> Male</span>
				<span className="cont-cont gender"><input type="radio" name="gender" /> Female</span>
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Subject:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont"><input type="checkbox"  /> Hindi</span>
				<span className="cont-cont gender"><input type="checkbox"  /> English</span>
				<span className="cont-cont gender"><input type="checkbox"  /> Science</span>
				<span className="cont-cont gender"><input type="checkbox"  /> Math</span>
			</div>
		</div>
		
    </div>
	<div className="row mt-3">
		<div className="col">
			<div className="pull-right bottomeditbtn">
			    <span onClick={ClosepopupAddnew} className="btn btn-dark">Cancel</span>
				<button className="btn btn-success gender">Submit</button>
			</div>
		</div>
	</div>
	</div>
  </div>
</div>

<div id="popupedit" className="overlayadmin" style={{display:'none'}}>
  <div className="popupedit animate-zoom">
    <div className="view-heading"><i className="fa fa-pencil" aria-hidden="true"></i> Edit Deails</div>
    <span onClick={ClosepopupEdit}><img loading='lazy'  src={closebtn} alt="close button" className="close" title="Close"/></span>
    <form onSubmit={handleSubmitEdit} id="form-edit-record">
	<div className="container-fluid padd_0" >
	 <div className="viewheight" id="style-scroll2">
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Name:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input disabled={true} style={{cursor:"not-allowed"}} name="fullname" id="fullname" value={edituserdata.fullname} onChange={handleInputEdit} type="text" className="admin-control"  placeholder="Enter your name" />
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Email:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input disabled={true} style={{cursor:"not-allowed"}} name="email" id="email" value={edituserdata.email} onChange={handleInputEdit} type="text" className="admin-control"  placeholder="Enter your email" />
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Mobile No:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input disabled={true} style={{cursor:"not-allowed"}} name="mobileno" id="mobileno" value={edituserdata.mobileno} onChange={handleInputEdit} type="text" className="admin-control"  placeholder="Enter your mobile number" />
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">User Type:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<select name="usertype" id="usertype" value={edituserdata.usertype} onChange={handleInputEdit} className="admin-control">
						<option value="" >Please select user type</option>
						<option value="user">User</option>
						<option value="subadmin">Subadmin</option>
				</select>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Status:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<select name="status" id="status" value={edituserdata.status} onChange={handleInputEdit} className="admin-control">
						<option value="">Please select status</option>
						<option value="enable">Enable</option>
						<option value="disable">Disable</option>
				</select>
			</div>
		</div>
			{/* <div className="row mt-3">
			<div className="col-2 mobwidth100admin ">
				<span className="cont-heading">Description:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<textarea value="" className="desc-control" placeholder="Type here.. ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</textarea>
			</div>
		</div> */}
	
		{/* <div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">State:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<select className="admin-control">
					<option>Select your state</option>
					<option>Madhyapradesh</option>
					<option>chhatisgarh</option>
					<option>Rajsthan</option>
				</select>
			</div>
		</div> */}
		{/* <div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Gender:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont"><input type="radio" name="gender" /> Male</span>
				<span className="cont-cont gender"><input type="radio" name="gender" /> Female</span>
			</div>
		</div> */}
		{/* <div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Subject:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont"><input type="checkbox"  /> Hindi</span>
				<span className="cont-cont gender"><input type="checkbox"  /> English</span>
				<span className="cont-cont gender"><input type="checkbox"  /> Science</span>
				<span className="cont-cont gender"><input type="checkbox"  /> Math</span>
			</div>
		</div> */}
	
    </div>
	<div className="row mt-3">
		<div className="col">
			<div className="pull-right bottomeditbtn">
			    <span onClick={ClosepopupEdit} className="btn btn-dark">Cancel</span>
				{ loader ? <button type="buton" className="btn btn-success gender">Please wait... <i className="fa fa-spinner fa-pulse fa-3x fa-fw fa-lg loadersize" ></i></button>
				  :
				<button type="submit" className="btn btn-success gender">Update</button>
				}
				
			</div>
		</div>
	</div>
	
	</div>
	</form>
  </div>
</div>

		{/* <div id="popupdelete" className="overlayadmin" style={{display:'none'}}>
  <div className="popupdelete animate-zoom">
    <div className="view-heading"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete Records</div>
    <span onClick={ClosepopupDelete}><img loading='lazy'  src={closebtn} alt="close button" className="close" title="Close"/></span>
   <form onSubmit={DeleteRecord}>
    <div className="container-fluid padd_0" >
	
		<div className="row mt-2">
			<div className="col">
				<span className="delete-heading">Really want to delete this Record ?</span>
				<br/><br/>
			</div>
			
		</div>
	
	<div className="row mt-2">
		<div className="col">
			<div className="text-center">
			    <span onClick={ClosepopupDelete} className="btn btn-secondary">Cancel</span>
				{
					loader ? <button type="button" className="btn btn-danger gender">Please wait... <i className="fa fa-spinner fa-pulse fa-3x fa-fw fa-lg loadersize" ></i></button>
					:
					<button type="submit" className="btn btn-danger gender">Delete</button>
				}
				
			</div>
		</div>
	</div>
	</div>
    </form>
  </div>
</div> */}
	
<div id="popupdelete" className="overlayadmin" style={{display:'none'}}>
  <div className="popupdelete animate-zoom">
  <div className='text-center'>
	<img  src={exclamation} style={{width:'125px'}} />
	<div className="view-delete-heading">{process.env.REACT_APP_DELETE_RECORD_HEADING}</div>
  </div>
    
    
   <form onSubmit={DeleteRecord}>
    <div className="container-fluid padd_0" >
	
		<div className="row mt-2">
			<div className="col text-center">
				<span className="delete-heading">{process.env.REACT_APP_DELETE_RECORD_MESSAGE}</span>
				<br/><br/>
			</div>
			
		</div>
	
	<div className="row mt-2">
		<div className="col">
			<div className="text-center">
			    <span onClick={ClosepopupDelete} className="btn btn-secondary f-weight">Cancel</span>
				{
					loader ? <button type="button" className="btn btn-danger gender f-weight">Please wait... <i className="fa fa-spinner fa-pulse fa-3x fa-fw fa-lg loadersize" ></i></button>
					:
					<button type="submit" className="btn btn-warning gender f-weight">Delete</button>
				}
				
			</div>
		</div>
	</div>
	</div>
    </form>
  </div>
		</div>

		<div id="popupwait" className="overlayadmin" style={{ display: `${popupwait === true ? 'block' : 'none'}` }}
>
  <div className="popupwait animate-zoom">
    <div className="text-center">
	
	<img src={loadergif} style={{width:'50px'}} />
	</div>
   
  
    <div className="container-fluid padd_0" >
	
		<div className="row mt-2">
			<div className="text-center">
				<span className="delete-heading">Please wait...</span>
				
			</div>
			
		</div>
	

	</div>
  
  </div>
		</div>
	 
	    <div id="popupsuccess" className="overlayadmin" style={{ display: `${popupsuccess === true ? 'block' : 'none'}` }}>
  <div className="popupdelete animate-zoom">
  <div className='text-center'>
	<img  src={success} style={{width:'115px'}} />
  </div>
    <div className="view-success-heading text-center">{responseheading}</div>
    
   
    <div className="container-fluid padd_0" >
	
		<div className="row mt-2">
			<div className="col text-center">
				<span className="success-heading">{responsemsg}</span>
				<br/><br/>
			</div>
			
		</div>
	
	<div className="row mt-2">
		<div className="col">
			<div className="text-center">
			    <button onClick={()=>{setpopupsuccess(false)}} className="btn btn-success f-weight">Ok</button>
				
			</div>
		</div>
	</div>
	</div>
    
  </div>
		</div>

		<div id="popuperror" className="overlayadmin" style={{ display: `${popuperror === true ? 'block' : 'none'}` }}>
  <div className="popupdelete animate-zoom">
  <div className='text-center'>
	<img  src={error} style={{width:'115px'}} />
  </div>
    <div className="view-error-heading text-center">{responseheading}</div>
    
   
    <div className="container-fluid padd_0" >
	
		<div className="row mt-2">
			<div className="col text-center">
				<span className="error-heading">{responsemsg}</span>
				<br/><br/>
			</div>
			
		</div>
	
	<div className="row mt-2">
		<div className="col">
			<div className="text-center">
			    <button onClick={()=>{setpopuperror(false)}} className="btn btn-danger f-weight">Ok</button>
				
			</div>
		</div>
	</div>
	</div>
    
  </div>
		</div>		
	
		<div className='container-fluid'>
            <div className='row'>
                
                
			<div className='col-2 left-bg padd_0 mobwidth100admin' > 
                    <div className='mobmenuadmin mobdnoneadmin animate-rightadmin'   id='mobilemenuadmin'>
					<AdminSideBar />
					</div>
					
                </div>
                
 				<div className='col-10 padding_0 mobwidth100admin'>
                       <AdminTopbar />
						
						<div className="container ">
							<div className="parent-row-top">
							<div className="row w-100 mt-2 mb-0">
								 <div className="col">
									<div>
										<span className="page-heading"><i className="fa fa-user" aria-hidden="true"></i> {Pageheading}</span>
										<span  style={{visibility:'hidden'}} className="btn btn-success mt-2 btn-sm pull-right"><i className="fa fa-plus" aria-hidden="true"></i> Add New</span>
									</div>
									<div className='page-heading-bottom'> {Pagesubheading}</div>
								 </div>
							
							</div>
							
							</div>
						
						</div>
						
                
					
						<div className="container ">
							<div className="parent-row parent-rowmob">

							<div className="row mt-4 childrow">
							<div className='download'>
									<div>
									<small>Search</small>
									<input type="text" value={search} onChange={handleFilter} className='form-control' placeholder='Search' />
									</div>
									
								
									<div className='datepk'>
									<small>From date</small>
									<input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)}  className='form-control' placeholder='From date' />
									</div>

									<div>
									<small>To date</small>
									<input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className='form-control' placeholder='To date' />
									</div>

									
									<div className='filtersearchbtn'>
									<div style={{visibility:'hidden'}}>dd</div>
									<button type="button" onClick={FilterByDate} title="search" className='btn btn-light searchbtn'>Search</button>	
									</div>

									<div className='filterresetbtn'>
									<div style={{visibility:'hidden'}}>dd</div>
									<button type="button" onClick={ResetFilter} title="reset" className='btn btn-light searchbtn'><i class="fa fa-undo" aria-hidden="true"></i></button>	
									</div>
								

									<div className='downloadicncenter'>
									<div style={{visibility:'hidden'}}>dd</div>
										<span onClick={downloadPDF}><img title='Download PDF' src={pdf} className='excel'/></span>
										<span onClick={downloadCSV}><img title='Download CSV' src={csv} className='excel'/></span>
										
									</div>
							</div>
							</div>

							<div className="row w-100 mt-4 mobdisplay">
								 <div className="col mobpadright0">
								
								 <div className='table-responsive'>
									{
										datatblloader ? 
										<div className="text-center">
												<img src={loadergif} style={{width:'50px'}} /><br/>
												<span className="delete-heading">Please wait...</span>
										</div>
										:
										<DataTable 
               							data={ records.length === 0 || records.length === "" || records.length === null || records.length === undefined ? '' : records } 
			   							columns={columns}
			   							fixedHeader
			   							pagination  
			   							highlightOnHover
			   							customStyles={customStyles}
			  							/> 
									}
								 

									
										
								 </div>
								 
									{/* <div className="pull-right mt-3">
										<button className="btn btn-secondary btn-sm"><i className="fa fa-angle-double-left" aria-hidden="true"></i> Prev</button><span className="cont-cont"> 1 of 100  </span> <button className="btn btn-secondary btn-sm">Next <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
									</div> */}
								 
								 </div>
								
							
								
								
							</div>
							
						
							
							</div>
						
						</div>
						
                
				
				</div>
            </div>
        </div>
	
	
		{ showloader ? Setshowloader(false) : null } 
    </>
  )
}

export default AdminRegisteredUsers