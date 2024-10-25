import React,{useEffect, useState} from 'react'
import closebtn from './Images/closebtn.png'
import AdminSideBar from './AdminSideBar'
import AdminTopbar from './AdminTopbar'
import loader from './../components/Images/loader.png'
import './css/admin.scss'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

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
import { useAuth } from '../store/auth'; 
import { toast } from "react-toastify";  
import { useNavigate } from 'react-router-dom'


const AdminSubChildCategory = () => {
	const[showloader,Setshowloader] = useState(true);     //loading effect
	const Pageheading = 'Subchild Categories';
	const Pagesubheading = 'Home / Subchild Categories';
	//const[img,setImg] = useState('');
	//const[previewimg,setpreviewimg] = useState('');
	const [images, setImages] = useState([]);
	const [preview, setPreview] = useState([]);
	const [noImgPreview, setNoImgPreview] = useState(false);
	const[displaypreviewimg,setdisplaypreviewimg] = useState(true);
	const { authorizationToken, ADMINAPI } = useAuth();   
	const[allrecords,setAllRecords] = useState([]);
	const[records,setRecords] = useState([]);
	const[categorydata,setcategorydata] = useState([]);
	const[subcategorydata,setsubcategorydata] = useState([]);
	const[childcategorydata,setchildcategorydata] = useState([]);
	const[branddata,setbranddata] = useState([]);
	const[scaledata,setscaledata] = useState([]);
	const[heightdata,setheightdata] = useState([]);
	const[widthdata,setwidthdata] = useState([]);
	const[lengthdata,setlengthdata] = useState([]);
	const[getallcategory,setgetallcategory] = useState([]);
	const[getbrand,setbrand] = useState([]);
	const[getscale,setscale] = useState([]);
	const[getheight,setheight] = useState([]);
	const[getwidth,setwidth] = useState([]);
	const[getlength,setlength] = useState([]);
	const[viewdata,Setviewdata] = useState([]);
	const[getallsubcategory,setallsubcategory] = useState([]);
	const[getallchildcategory,setallchildcategory] = useState([]);
	const[multiimagedata,setmultiimagedata] = useState([]);
	//const[getallsubcat,setgetallsubcat] = useState([]);
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
	const[search, setSearch] = useState('');
	const[catFilter,setCatFilter] = useState([]);
	const[subCatFilter,setSubCatFilter] = useState([]);
	const[childCatFilter,setChildCatFilter] = useState([]);

	const[mrp, setmrp] = useState('');
	const[discount, setdiscount] = useState('');
	const[price, setprice] = useState('');

	//const [sizetasks, setsizeTasks] = useState([{ size: "" }]);
	//const [colortasks, setcolorTasks] = useState([{ color: "" }]);
	const [offertasks, setofferTasks] = useState([{ offer: "" }]);

	//const [sizetasksedit, setsizeTasksedit] = useState([]);
	//const [colortasksedit, setcolorTasksedit] = useState([]);
	const [offertasksedit, setofferTasksedit] = useState([]);

	const[size, setsize] = useState([]);
	const[color, setcolor] = useState([]);
	const[offer, setoffer] = useState([]);

	
 //const[chk,setchk]=useState([])
	

	//const navigate = useNavigate();
	useEffect(()=>{ getAllCategory(); getAllBrand(); getAllScale(); getAllRecords(); },[]);
	
	const getAllRecords = async ()=>
	{
		try 
		{
			const response = await fetch(`${ADMINAPI}/getallsubchildcategory`,{
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
				setdatatblloader(false);
			 	//console.log(data);
			 }
			 else
			 {
				const response2 = await fetch(`${ADMINAPI}/getallcategory`,{
					method:"GET",
					headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
				  });
				const data2 = await response2.json();
				if(data2.length === "" || data2.length === 0 || data2.length === null || data2.length === undefined)
				{
					setCatFilter([]);
				}
				else
				{
					setCatFilter(data2);
				}
				
	
				const response3 = await fetch(`${ADMINAPI}/getallsubcategory`,{
					method:"GET",
					headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
				  });
				const data3 = await response3.json();
				if(data3.length === "" || data3.length === 0 || data3.length === null || data3.length === undefined)
				{
					setSubCatFilter([]);
				}
				else
				{
					setSubCatFilter(data3);
				}
				


				const response4 = await fetch(`${ADMINAPI}/getallchildcategory`,{
					method:"GET",
					headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
				  });
				const data4 = await response4.json();
				if(data4.length === "" || data4.length === 0 || data4.length === null || data4.length === undefined)
				{
					setChildCatFilter([]);
				}
				else
				{
					setChildCatFilter(data4);
					let seasonsList = [];
					data.forEach(async (season, index) => {
				 	seasonsList.push({categoryname:data2.find((result)=> result._id===season.categoryid).categoryname, subcategoryname:data3.find((result)=> result._id===season.subcategoryid).subcategoryname, childcategoryname:data4.find((result)=> result._id===season.childcategoryid).childcategoryname, subchildcategoryname:season.subchildcategoryname, created_date:season.created_date, status:season.status,_id:season._id});
			
					});
	
					setRecords(seasonsList);
					setAllRecords(seasonsList);
				}
				
				setdatatblloader(false);
				// console.log(data);
			 }
		
		
		  } 
		  catch (error) 
		  {
			 //console.log("adminerror",error);
			 setdatatblloader(false);
		  }
	}

		const getAllCategory = async ()=>
		{
			try 
			{
				const response = await fetch(`${ADMINAPI}/getallcategoryaccordingstatus`,{
					method:"GET",
					headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
				  });
			
				const data = await response.json();
				if(data.length === "" || data.length === 0 || data.length === null || data.length === undefined)
				{
					setgetallcategory([]);
				}
				else
				{
					setgetallcategory(data);
					//console.log("all category",data);
				}
				
			
			  } 
			  catch (error) 
			  {
				 //console.log("adminerror",error);
			  }
		}

		const getAllBrand = async ()=>
			{
				try 
				{
					const response = await fetch(`${ADMINAPI}/getallbrandaccordingstatus`,{
						method:"GET",
						headers:{
								'Content-Type': 'application/json',
								Authorization : authorizationToken 
							}
					  });
				
					const data = await response.json();
					if(data.length === "" || data.length === 0 || data.length === null || data.length === undefined)
					{
						setbrand([]);
					}
					else
					{
						setbrand(data);
						//console.log("all category",data);
					}
					
				
				  } 
				  catch (error) 
				  {
					 //console.log("adminerror",error);
				  }
			}

			const getAllScale = async ()=>
			{
					try 
					{
						const response = await fetch(`${ADMINAPI}/getallscaleaccordingstatus`,{
							method:"GET",
							headers:{
									'Content-Type': 'application/json',
									Authorization : authorizationToken 
								}
						  });
					
						const data = await response.json();
						if(data.length === "" || data.length === 0 || data.length === null || data.length === undefined)
						{
							setscale([]);
						}
						else
						{
							setscale(data);
							//console.log("all category",data);
						}
						
					
					  } 
					  catch (error) 
					  {
						 //console.log("adminerror",error);
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

	const GetMRP = async(e)=>{
		setmrp(e.target.value);
		
		if(discount !== 0)
		{
			setprice((e.target.value - ((e.target.value*discount)/100)).toFixed(2));
		}
		
		
		// if(price !== 0)
		// {
		// 	setdiscount(100 - ((price*100)/e.target.value));
		// }
		
	}
	const GetDiscount = async(e)=>{
		setdiscount(e.target.value);
		setprice((mrp - (mrp*e.target.value)/100).toFixed(2));
	}

	const GetPrice = async(e)=>{
		setprice(e.target.value);
		setdiscount((100 - (e.target.value*100)/mrp).toFixed(2));
	}

	function ShowpopupAddnew()
	{
	  document.getElementById('popupaddnew').style='display:block';
	}
	function ClosepopupAddnew()  
	{
	  document.getElementById("form-add-new-record").reset();
	  
	  setsubchildcategory({ categoryid:"",subcategoryid:"",childcategoryid:"",subchildcategoryname:"",description:"",status:"" });
	  setImages([]);
	  setPreview([]);
	  //setsizeTasks([{ size: "" }]);
	  //setcolorTasks([{ color: "" }]);
	  setofferTasks([{ offer: "" }]);
	  setmrp('');
	  setdiscount('');
	  setprice('');
	  setLoader(false);
	  document.getElementById('popupaddnew').style='display:none';
	}
	async function ShowpopupView(getid)
	{
	  setscaledata([]);	
	  setheightdata([]);
	  setwidthdata([]);
	  setlengthdata([]);	
	  document.getElementById('popupview').style='display:block';
	  try{
		const response = await fetch(`${ADMINAPI}/getsinglesubchildcategory/${getid}`,{
			method : 'GET',
			headers:{
						'Content-Type': 'application/json',
						Authorization : authorizationToken 
					}
		});
  
		const singlesubchildcategorydata = await response.json();
		if(singlesubchildcategorydata)
		{
			Setviewdata(singlesubchildcategorydata);
		}
		else
		{
			Setviewdata([]);
		}
		
	
		
		const response2 = await fetch(`${ADMINAPI}/getsinglecategory/${singlesubchildcategorydata.categoryid}`,{
			method : 'GET',
			headers:{
						'Content-Type': 'application/json',
						Authorization : authorizationToken 
					}
		});
  		const singlecategorydata = await response2.json();
		if(singlecategorydata)
		{
			setcategorydata(singlecategorydata);
		}
		else
		{
			setcategorydata([]);
		}
		

		
		const response3 = await fetch(`${ADMINAPI}/getsinglesubcategory/${singlesubchildcategorydata.subcategoryid}`,{
			method : 'GET',
			headers:{
						'Content-Type': 'application/json',
						Authorization : authorizationToken 
					}
		});
  		const singlesubcategorydata = await response3.json();
		if(singlesubcategorydata)
		{
			setsubcategorydata(singlesubcategorydata);
		}
		else
		{
			setsubcategorydata([]);
		}
		

		
		const response4 = await fetch(`${ADMINAPI}/getsinglechildcategory/${singlesubchildcategorydata.childcategoryid}`,{
			method : 'GET',
			headers:{
						'Content-Type': 'application/json',
						Authorization : authorizationToken 
					}
		});
  		const singlechildcategorydata = await response4.json();
		if(singlechildcategorydata)
		{
			setchildcategorydata(singlechildcategorydata);
		}
		else
		{
			setchildcategorydata([]);
		}
		

		
		if(singlesubchildcategorydata.brandid !== null && singlesubchildcategorydata.brandid !== "" && singlesubchildcategorydata.brandid !== undefined)
		{
			const brandresponse = await fetch(`${ADMINAPI}/getsinglebrand/${singlesubchildcategorydata.brandid}`,{
				method : 'GET',
				headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
			});
			const singlebranddata = await brandresponse.json();
			if(singlebranddata)
			{
				setbranddata(singlebranddata);
			}
			else
			{
				setbranddata([]);
			}
			
		}
		
	
		
		if(singlesubchildcategorydata.scaleid !== null && singlesubchildcategorydata.scaleid !== "" && singlesubchildcategorydata.scaleid !== undefined)
		{
			const scaleresponse = await fetch(`${ADMINAPI}/getsinglescale/${singlesubchildcategorydata.scaleid}`,{
				method : 'GET',
				headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
			});
			const singlescaledata = await scaleresponse.json();
			if(singlescaledata)
			{
				setscaledata(singlescaledata);
			}
			else
			{
				setscaledata(singlescaledata);
			}
			
		}

		if(singlesubchildcategorydata.heightid !== null && singlesubchildcategorydata.heightid !== "" && singlesubchildcategorydata.heightid !== undefined)
		{
				const heightresponse = await fetch(`${ADMINAPI}/getsinglescale/${singlesubchildcategorydata.heightid}`,{
					method : 'GET',
					headers:{
								'Content-Type': 'application/json',
								Authorization : authorizationToken 
							}
				});
				const singleheightdata = await heightresponse.json();
				if(singleheightdata)
				{
					setheightdata(singleheightdata);
				}
				else
				{
					setheightdata([]);
				}
				
		}

		if(singlesubchildcategorydata.widthid !== null && singlesubchildcategorydata.widthid !== "" && singlesubchildcategorydata.widthid !== undefined)
		{
				const widthresponse = await fetch(`${ADMINAPI}/getsinglescale/${singlesubchildcategorydata.widthid}`,{
					method : 'GET',
					headers:{
								'Content-Type': 'application/json',
								Authorization : authorizationToken 
							}
				});
				const singlewidthdata = await widthresponse.json();
				if(singlewidthdata)
				{
					setwidthdata(singlewidthdata);
				}
				else
				{
					setwidthdata([]);
				}
				
		}

		if(singlesubchildcategorydata.lengthid !== null && singlesubchildcategorydata.lengthid !== "" && singlesubchildcategorydata.lengthid !== undefined)
		{
				const lengthresponse = await fetch(`${ADMINAPI}/getsinglescale/${singlesubchildcategorydata.lengthid}`,{
					method : 'GET',
					headers:{
								'Content-Type': 'application/json',
								Authorization : authorizationToken 
							}
				});
				const singlelengthdata = await lengthresponse.json();
				if(singlelengthdata)
				{
					setlengthdata(singlelengthdata);
				}
				else
				{
					setlengthdata([]);
				}
				
		}
		
		

		//alert("singlesubchildcategorydata._id");
		const response5 = await fetch(`${ADMINAPI}/getmultiimages/${getid}`,{
			method : 'GET',
			headers:{
						'Content-Type': 'application/json',
						Authorization : authorizationToken 
					}
		});
  		const multiimagedata = await response5.json();
		if(multiimagedata)
		{
			setmultiimagedata(multiimagedata);
		}
		else
		{
			setmultiimagedata([]);
		}
		
		

		
		/*const response6 = await fetch(`${ADMINAPI}/getmultisizes/${getid}`,{
			method : 'GET',
			headers:{
						'Content-Type': 'application/json',
						Authorization : authorizationToken 
					}
		});
  		const sizedata = await response6.json();
		setsize(sizedata);*/


		/*const response7 = await fetch(`${ADMINAPI}/getmulticolors/${getid}`,{
			method : 'GET',
			headers:{
						'Content-Type': 'application/json',
						Authorization : authorizationToken 
					}
		});
  		const colordata = await response7.json();
		setcolor(colordata);*/


		const response8 = await fetch(`${ADMINAPI}/getmultioffers/${getid}`,{
			method : 'GET',
			headers:{
						'Content-Type': 'application/json',
						Authorization : authorizationToken 
					}
		});
  		const offerdata = await response8.json();
		if(offerdata)
		{
			setoffer(offerdata);
		}
		else
		{
			setoffer([]);
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

	////////
async function ShowpopupEdit(getid)
{
	Seteditid(getid);

	
  document.getElementById('popupedit').style='display:block';
	try
	{
		const imageresponse = await fetch(`${ADMINAPI}/getmultiimages/${getid}`,{
			method : 'GET',
			headers:{
						'Content-Type': 'application/json',
						Authorization : authorizationToken 
					}
		});
  		const multiimagedata = await imageresponse.json();
		 
		if(multiimagedata)
		{ 
			setmultiimagedata(multiimagedata);
		}
		else
		{
			setmultiimagedata([]);
		}
		if(multiimagedata.length > 0)
		{
			setdisplaypreviewimg(true);
			setNoImgPreview(false);
		}
		else
		{
			setdisplaypreviewimg(false);
			setNoImgPreview(true);
		}
		


		const response = await fetch(`${ADMINAPI}/getsinglesubchildcategory/${getid}`,{
		method : 'GET',
		headers:{
					'Content-Type': 'application/json',
					Authorization : authorizationToken 
				}
		});

	const singlesubchildcategorydata = await response.json();
	if(singlesubchildcategorydata)
	{
		Setedituserdata(singlesubchildcategorydata);
		setmrp(singlesubchildcategorydata.mrp);
		setdiscount(singlesubchildcategorydata.discount);
		setprice(singlesubchildcategorydata.price);
		showSubcategory(singlesubchildcategorydata.categoryid);
		showChildcategory(singlesubchildcategorydata.subcategoryid);
	}
	else
	{
		Setedituserdata({categoryid:"",subcategoryid:"",childcategoryid:"",subchildcategoryname:"",description:"", status:""});
		setmrp('');
		setdiscount('');
		setprice('');	
	}
	
	//console.log("editdatayu",singlesubchildcategorydata);


	/*const response6 = await fetch(`${ADMINAPI}/getmultisizes/${getid}`,{
		method : 'GET',
		headers:{
					'Content-Type': 'application/json',
					Authorization : authorizationToken 
				}
	});
	const sizedata = await response6.json();
	if(sizedata.length === "" || sizedata.length === 0 || sizedata.length === null || sizedata.length === undefined)
	{
		setsize([]);
	}
	else
	{
		setsize(sizedata);
	}
	*/


	/*const response7 = await fetch(`${ADMINAPI}/getmulticolors/${getid}`,{
		method : 'GET',
		headers:{
					'Content-Type': 'application/json',
					Authorization : authorizationToken 
				}
	});
	const colordata = await response7.json();
	if(colordata.length === "" || colordata.length === 0 || colordata.length === null || colordata.length === undefined)
	{
		setcolor([]);
	}
	else
	{
		setcolor(colordata);
	}
	*/


	const response8 = await fetch(`${ADMINAPI}/getmultioffers/${getid}`,{
		method : 'GET',
		headers:{
					'Content-Type': 'application/json',
					Authorization : authorizationToken 
				}
	});
	const offerdata = await response8.json();
	if(offerdata.length === "" || offerdata.length === 0 || offerdata.length === null || offerdata.length === undefined)
	{
		setoffer([]);
	}
	else
	{
		setoffer(offerdata);
	}
	}
	catch(error)
    {
	//console.log(error);
    }
}


	function ClosepopupEdit()
	{
		document.getElementById("form-edit-record").reset();
		setsubchildcategory({ categoryid:"",subcategoryid:"",childcategoryid:"",subchildcategoryname:"",description:"",status:"" });
		setImages([]);
		setPreview([]);
		setNoImgPreview(false);
		setofferTasks([{ offer: "" }]);
		setmrp('');
		setdiscount('');
		setprice('');
		setdisplaypreviewimg(true);
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
					//data: records     //for getting all column data
					data: records.map(({ _id,__v,imagesrc,imagename, ...rest }) => rest)
				});
				if (csv == null) return;
		
				filename = args.filename || 'Subchildcategory-List.csv';
		
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
            name:"CATEGORY",
            selector:row=>row.categoryname,   //categoryname is colum name of table
            sortable:true,
       
        },
		{
            name:"SUB CATEGORY",
            selector:row=>row.subcategoryname,   //subcategoryname is colum name of table
            sortable:true,
       
        },
		{
            name:"CHILD CATEGORY",
            selector:row=>row.childcategoryname,   //childcategoryname is colum name of table
            sortable:true,
       
        },
		{
            name:"SUBCHILD CATEGORY",
            selector:row=>row.subchildcategoryname,   //subchildcategoryname is colum name of table
            sortable:true,
       
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
			cell: cellinfo =>([<HiEye title='View' className='actioniconview' onClick={()=> ShowpopupView(cellinfo._id)} />,<MdEdit title='Edit' className='actionicon' onClick={()=> ShowpopupEdit(cellinfo._id)}  />, " ", <RiDeleteBin6Line title='Delete' className='actionicon' onClick={()=> ShowpopupDelete(cellinfo._id)} />]),
		
        }
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
							row.categoryname.toLowerCase().includes(event.target.value.toLowerCase()) ||
							row.subcategoryname.toLowerCase().includes(event.target.value.toLowerCase()) ||
							row.childcategoryname.toLowerCase().includes(event.target.value.toLowerCase()) ||
							row.subchildcategoryname.toLowerCase().includes(event.target.value.toLowerCase()) ||
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

	   const columnspdf = [
		{ header: "CATEGORY", dataKey: "categoryname" },
		{ header: "SUB CATEGORY", dataKey: "subcategoryname" },
		{ header: "CHILD CATEGORY", dataKey: "childcategoryname" },
		{ header: "SUBCHILD CATEGORY", dataKey: "subchildcategoryname" },
		{ header: "CREATED", dataKey: "created_date" },
		{ header: "STATUS", dataKey: "status" },
	  ]; 
	   //////////////////
	   const showSubcategory = async (getid)=>{
		try
		{
			const response = await fetch(`${ADMINAPI}/getallsubcategorybycategoryid/${getid}`,{
				method:"GET",
				headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
			  });
		
			 if(response.ok)
			 {
				const data = await response.json();
				setallsubcategory(data);
				
			 }
			 else
			 {
				setallsubcategory([]);
			 }
			 
		}
		catch(error)
		{

		}

	} 

	const showChildcategory = async (getid)=>{
		
		try
		{
			const response = await fetch(`${ADMINAPI}/getallchildcategorybysubcategoryid/${getid}`,{
				method:"GET",
				headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
			  });
		
			 if(response.ok)
			 {
				const data = await response.json();
				setallchildcategory(data);
				
			 }
			 else
			 {
				setallsubcategory([]);
			 }
			 
		}
		catch(error)
		{

		}

	} 

	///////////
	//const[edituserdata,Setedituserdata] = useState({categoryid:"",subcategoryid:"",childcategoryname:"", status:""});
	const showSubcategoryOnchange = async (e)=>{
		const getid = e.target.value;
		edituserdata.subcategoryid="";

		subchildcategory.subcategoryid="";
		setallsubcategory([]);
		subchildcategory.childcategoryid="";
		setallchildcategory([]);
	
		try
		{
			const response = await fetch(`${ADMINAPI}/getallsubcategorybycategoryid/${getid}`,{
				method:"GET",
				headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
			  });
		
			 if(response.ok)
			 {
				const data = await response.json();
				setallsubcategory(data);
				
			 }
			 else
			 {
				setallsubcategory([]);
			 }
			 
		}
		catch(error)
		{

		}

	} 

	const showChildcategoryOnchange = async (e)=>{
		const getid = e.target.value;
		edituserdata.subcategoryid="";
		edituserdata.childcategoryid="";
		setallchildcategory([]);
		subchildcategory.childcategoryid="";
	
		try
		{
			const response = await fetch(`${ADMINAPI}/getallchildcategorybysubcategoryid/${getid}`,{
				method:"GET",
				headers:{
							'Content-Type': 'application/json',
							Authorization : authorizationToken 
						}
			  });
		
			 if(response.ok)
			 {
				const data = await response.json();
				setallchildcategory(data);
				
			 }
			 else
			 {
				setallchildcategory([]);
			 }
			 
		}
		catch(error)
		{

		}

	} 

	const downloadPDF = () =>{
			if(records.length !== undefined && records.length !== null && records.length !== '') 
			{
				const doc = new jsPDF();
				doc.text("Subchildcategory-List", 14, 16);
				doc.autoTable({
				  head: [columnspdf.map(col => col.header)],
				  body: records.map(row => columnspdf.map(col => row[col.dataKey])),
				  startY: 20,
				});
				doc.save("Subchildcategory-List.pdf");
			}
			else
			{
				toast.error(process.env.REACT_APP_NO_RECORD_DOWNLOAD);
			}
	

	}

	  //////for adding new product
	  const[subchildcategory,setsubchildcategory] = useState({    //calling on pageload
        categoryid:"",
		subcategoryid:"",
		childcategoryid:"",
		subchildcategoryname:"",
		description:"",
        status:""
       
    });
    
    const handleInput = (e)=>{        //calling on typing
       // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setsubchildcategory({
            ...subchildcategory,
            [name]:value
        })

    };

	const ReadMultiImages = (e)=>{
	const files = Array.from(e);
    const validImages = [];
	
	if(files.length > 0)
	{
		setNoImgPreview(false);
	}
	else
	{
		setNoImgPreview(true);
	}	

    //const errorMessages = [];
	//setPreview(files);
    files.forEach((file) => {
     
      /*if (!file.type.startsWith('image/')) {
        errorMessages.push(`${file.name} is not a valid image file.`);
        return;
      } */

     
      /*if (file.size > 2 * 1024 * 1024) {
        errorMessages.push(`${file.name} exceeds the 2MB size limit.`);
        return;
      }*/

      validImages.push(file);
	  
      
    });

    setImages((prevImages) => [...prevImages, ...validImages]);   //to send images data in backend
}


   
	const DeletePreviewImages = (indexToRemove) => {
		setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
		//to send images data in backend
		console.log("test:", multiimagedata.length)
		if(indexToRemove === 0 && (multiimagedata.length < 0 || multiimagedata.length === undefined || multiimagedata.length === "" || multiimagedata.length === null))
		{
			setNoImgPreview(true);  
		}
		else
		{
			setNoImgPreview(false);
		}
	  
	};

    const handleSubmit = async (e) =>{      //calling on submit
        e.preventDefault();       //to stop page refresh
		
		if(subchildcategory.categoryid === "" || subchildcategory.categoryid === null || subchildcategory.categoryid === undefined)
		{
			toast.error("Please select category !");
			return;
		}
		else if(subchildcategory.subcategoryid === "" || subchildcategory.subcategoryid === null || subchildcategory.subcategoryid === undefined)
		{
			toast.error("Please select sub-category !");
			return;
		}
		else if(subchildcategory.childcategoryid === "" || subchildcategory.childcategoryid === null || subchildcategory.childcategoryid === undefined)
		{
			toast.error("Please select child-category !");
			return;
		}
		else if(subchildcategory.subchildcategoryname === "" || subchildcategory.subchildcategoryname === null || subchildcategory.subchildcategoryname === undefined)
		{
			toast.error("Please enter product name !" );
			return;
		}
		else if(mrp === "" || mrp === null || mrp === undefined)
		{
			toast.error("Please enter M.R.P. !" );
			return;
		}
		else if(discount === "" || discount === null || discount === undefined)
		{
			toast.error("Please enter discount !" );
			return;
		}
		else if(price === "" || price === null || price === undefined)
		{
			toast.error("Please enter price !" );
			return;
		}
		else if(subchildcategory.availablequantity === "" || subchildcategory.availablequantity === null || subchildcategory.availablequantity === undefined)
		{
			toast.error("Please enter available quantity !" );
			return;
		}
		else if(subchildcategory.status === "" || subchildcategory.status === null || subchildcategory.status === undefined)
		{
			toast.error("Please select status !" );
			return;
		}
		else
		{
			setpopupwait(true);
			setLoader(true);
	
			const formdata = new FormData();
			images.forEach((image) => {
				formdata.append('images', image);
				
			});
	
			//console.log("original length: ",images.length)
			const imgresponse = await fetch(`${ADMINAPI}/multipleproductimage`,
				{
				  method:"POST",
				  'Content-Type': 'multipart/form-data',
				  body:formdata
				});
				const imgfeedback = await imgresponse.json();
			   
				//const subchildcategorywithimgstatus = {...subchildcategory, ...imgfeedback,mrp,discount,price,offertasks, colortasks, sizetasks}
				const subchildcategorywithimgstatus = {...subchildcategory, ...imgfeedback,mrp,discount,price,offertasks}
				
	
			try
			{
			  const response = await fetch(`${ADMINAPI}/createsubchildcategory`,{
				  method:"POST",
				  headers:{
								'Content-Type': 'application/json',
								Authorization : authorizationToken 
							},
				  body:JSON.stringify(trimSpaces(subchildcategorywithimgstatus))
			  });
	
			  const res_data = await response.json();
			  //console.log("response data",res_data);
	
			if(response.ok)
			{
				  setsubchildcategory({ 
					  categoryid:"",
					  subcategoryid:"",
					  childcategoryid:"",
					  subchildcategoryname:"",
					  color:"",
					  size:"",
					  description:"",
					  status:""
					  
					});
					//setsizeTasks([{ size: "" }]);
					//setcolorTasks([{ color: "" }]);
					setofferTasks([{ offer: "" }]);
					setmrp('');
					setdiscount('');
					setprice('');
					//setResultsignup(res_data.msg);
					document.getElementById("form-add-new-record").reset();
					
					setpopupsuccess(true);
					setresponseheading(process.env.REACT_APP_SUCCESS_HEADING_CREATE)
					setresponsemsg(res_data.msg);
				   
	  
					//toast.success(res_data.msg);
					setLoader(false);
					getAllRecords();
					ClosepopupAddnew();
					setpopupwait(false);
					
			}
			else
			{
				setpopupwait(false);
				toast.error(res_data.msg);
				setLoader(false);
			}
			  //console.log(response);
		  }
		  catch(error)
		  {
			setpopuperror(true);
			setresponseheading(process.env.REACT_APP_ERROR_HEADING)
			setresponsemsg(process.env.REACT_APP_ERROR_MESSAGE)
			setLoader(false);
			setpopupwait(false);
			//toast.error(error);
		  }
		}
		


    }



	//////for Edit Record
   	const[edituserdata,Setedituserdata] = useState({categoryid:"",subcategoryid:"",childcategoryid:"",subchildcategoryname:"",description:"", status:""});
    const handleInputEdit = (e)=>{        //calling on typing
       // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        Setedituserdata({
            ...edituserdata,
            [name]:value
        })
		//console.log("usereditdataoo",edituserdata);
    };
 
    const handleSubmitEdit = async (e) =>{      //calling on submit
		e.preventDefault();       //to stop page refresh
		if(edituserdata.categoryid === "" || edituserdata.categoryid === null || edituserdata.categoryid === undefined)
			{
				toast.error("Please select category !");
				return;
			}
			else if(edituserdata.subcategoryid === "" || edituserdata.subcategoryid === null || edituserdata.subcategoryid === undefined)
			{
				toast.error("Please select sub-category !");
				return;
			}
			else if(edituserdata.childcategoryid === "" || edituserdata.childcategoryid === null || edituserdata.childcategoryid === undefined)
			{
				toast.error("Please select child-category !");
				return;
			}
			else if(edituserdata.subchildcategoryname === "" || edituserdata.subchildcategoryname === null || edituserdata.subchildcategoryname === undefined)
			{
				toast.error("Please enter product name !" );
				return;
			}
			else if(edituserdata.mrp === "" || edituserdata.mrp === null || edituserdata.mrp === undefined)
			{
				toast.error("Please enter M.R.P. !" );
				return;
			}
			else if(edituserdata.discount === "" || edituserdata.discount === null || edituserdata.discount === undefined)
			{
				toast.error("Please enter discount !" );
				return;
			}
			else if(edituserdata.price === "" || edituserdata.price === null || edituserdata.price === undefined)
			{
				toast.error("Please enter price !");
				return;
			}
			else if(edituserdata.availablequantity === "" || edituserdata.availablequantity === null || edituserdata.availablequantity === undefined)
			{
				toast.error("Please enter available quantity !" );
				return;
			}
			else if(edituserdata.status === "" || edituserdata.status === null || edituserdata.status === undefined)
			{
				toast.error("Please select status !" );
				return;
			}

		
		setpopupwait(true);
		setLoader(true);
        setResultedit('');
		//alert(edituserdata.subcategoryid)

		const formdata = new FormData();
        images.forEach((image) => {
            formdata.append('images', image);
			
        });

		//console.log("original length: ",images.length)
		const imgresponse = await fetch(`${ADMINAPI}/multipleproductimage`,
			{
			  method:"POST",
			  'Content-Type': 'multipart/form-data',
			  body:formdata
			});
			const imgfeedback = await imgresponse.json();
			setImages([]);
			setPreview([]);
          	//const subchildcategorywithimgstatus = {...edituserdata,...imgfeedback,mrp,discount,price,offertasksedit,colortasksedit,sizetasksedit}
			const subchildcategorywithimgstatus = {...edituserdata,...imgfeedback,mrp,discount,price,offertasksedit}


        try
        {
          const response = await fetch(`${ADMINAPI}/geteditsubchildcategory/${editid}`,{
              method:"PATCH",
              headers:{
                  'Content-Type': 'application/json',
                  Authorization : authorizationToken 

              },
              body:JSON.stringify(trimSpaces(subchildcategorywithimgstatus))
          });

          const res_data = await response.json();
          //console.log("response data",res_data);

          if(response.ok)
          { 
			document.getElementById("form-edit-record").reset();
		  	Setedituserdata({ 
				categoryid:"",
				subcategoryid:"",
				childcategoryid:"",
				subchildcategoryname:"",
				color:"",
				size:"",
				description:"",
				status:""
                
              });
			  //setsizeTasksedit([]);
			  //setcolorTasksedit([]);
			  setofferTasksedit([]);
			  setmrp('');
			  setdiscount('');
			  setprice('');
			setResultedit(res_data.msg);
           // toast.success(res_data.msg);
            getAllRecords();
			ClosepopupEdit();
            //setTimeout(() => { ClosepopupEdit() }, 3000);
            setLoader(false);

			setpopupsuccess(true);
			setresponseheading(process.env.REACT_APP_SUCCESS_HEADING_UPDATE);
			setresponsemsg(res_data.msg);
			setpopupwait(false);
          }
          else
          {
			setpopupwait(false);
			setLoader(false);
            setResultedit(res_data.msg);
            toast.error(res_data.msg);
          }
          //console.log(response);
      }
      catch(error)
      {
		 //toast.error(error);
		 setpopuperror(true);
		 setresponseheading(process.env.REACT_APP_ERROR_HEADING)
		 setresponsemsg(process.env.REACT_APP_ERROR_MESSAGE)
		 setLoader(false);
		 setpopupwait(false);
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
			const response = await fetch(`${ADMINAPI}/deletesubchildcategory/${deleteid}`,{
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
					setpopupwait(false);
					setpopupsuccess(true);
					setresponseheading(process.env.REACT_APP_SUCCESS_HEADING_DELETE);
					setresponsemsg(res_data.msg);
					//toast.success(res_data.msg);
					//ClosepopupDelete();
					//setTimeout(() => { ClosepopupDelete() }, 2000);
	
				}
				else
				{
					setpopupwait(false);
					setpopuperror(true);
					setresponseheading(process.env.REACT_APP_ERROR_HEADING);
					setresponsemsg(res_data.msg);
					//toast.error(res_data.msg);
					setLoader(false);
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

	const DeleteMultiImage = async(deleteid)=>{
		//setpopupwait(true);
		try
		{
			const response = await fetch(`${ADMINAPI}/deletemultiimage/${deleteid}`,{
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
				ShowpopupEdit(editid); 
				setImages([]);
				setPreview([]);  
				//setpopupwait(false);
				//toast.success(res_data.msg);
			}
			else
			{
				setImages([]);
				setPreview([]);
				toast.error(res_data.msg);
				//setpopupwait(false);
			}
	  
		}
		catch(error)
		{
			//console.log("delete-error",error)
			//toast.error(error);
			setImages([]);
			setPreview([]);
			setpopuperror(true);
			setresponseheading(process.env.REACT_APP_ERROR_HEADING);
			setresponsemsg(error.msg);
			setLoader(false);
			//setpopupwait(false);
		}
	}

	const FilterByDate = async ()=>{
		
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
				const response = await fetch(`${ADMINAPI}/filtersubchildcategorybydate`,{
					method:"POST",
					headers:{
								'Content-Type': 'application/json',
								Authorization : authorizationToken 
							},
					body:JSON.stringify(trimSpaces(filterdates))
					
				});
				  const res_data = await response.json();
				//console.log("ffdata:",res_data)
				if(response.ok)
				{
				  /*let seasonsList = [];
				  res_data.forEach(async (season, index) => {
				   seasonsList.push({categoryname:catFilter.find((result)=> result._id===season.categoryid).categoryname, subcategoryname:subCatFilter.find((result)=> result._id===season.subcategoryid).subcategoryname, childcategoryname:season.childcategoryname, created_date:season.created_date ,status:season.status,_id:season._id});
			  
				  });*/
				  let seasonsList = [];
				  res_data.forEach(async (season, index) => {
				   seasonsList.push({categoryname:catFilter.find((result)=> result._id===season.categoryid).categoryname, subcategoryname:subCatFilter.find((result)=> result._id===season.subcategoryid).subcategoryname, childcategoryname:childCatFilter.find((result)=> result._id===season.childcategoryid).childcategoryname, subchildcategoryname:season.subchildcategoryname, created_date:season.created_date, status:season.status,_id:season._id});
			  
				  });
				  setRecords(seasonsList);
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

    // Handle input changes for individual tasks
    const handleTaskChange = (index, event) => {
        const updatedTasks = offertasks.map((task, idx) => 
            idx === index ? { ...task, [event.target.name]: event.target.value } : task
        );
        setofferTasks(updatedTasks);
    };

    // Add a new empty task row
    const addTaskRow = () => {
        setofferTasks([...offertasks, { offer: "" }]);
		
    };

    // Remove a specific task row
    const removeTaskRow = (index) => {
        setofferTasks(offertasks.filter((_, idx) => idx !== index));
    };

	//////////////////////////////////

	    // Handle input changes for individual tasks
		/*const handleColorChange = (index, event) => {
			const updatedTasks = colortasks.map((task, idx) => 
				idx === index ? { ...task, [event.target.name]: event.target.value } : task
			);
			setcolorTasks(updatedTasks);
		};*/
	
		// Add a new empty task row
		/*const addColorTaskRow = () => {
			setcolorTasks([...colortasks, { color: "" }]);
			
		};*/
	
		// Remove a specific task row
		/*const removeColorTaskRow = (index) => {
			setcolorTasks(colortasks.filter((_, idx) => idx !== index));
		};*/

	//////////////////////////////////

	    // Handle input changes for individual tasks
		/*const handleSizeChange = (index, event) => {
			const updatedTasks = sizetasks.map((task, idx) => 
				idx === index ? { ...task, [event.target.name]: event.target.value } : task
			);
			setsizeTasks(updatedTasks);
		};*/
	
		// Add a new empty task row
		/*const addSizeTaskRow = () => {
			setsizeTasks([...sizetasks, { size: "" }]);
			
		};*/
	
		// Remove a specific task row
		/*const removeSizeTaskRow = (index) => {
			setsizeTasks(sizetasks.filter((_, idx) => idx !== index));
		};*/	

		//////////////////////////////

			    // Handle input changes for individual tasks         //for edit time
				/*const handleSizeChangeEdit = (index, event) => {
					const updatedTasks = sizetasksedit.map((task, idx) => 
						idx === index ? { ...task, [event.target.name]: event.target.value } : task
					);
					setsizeTasksedit(updatedTasks);
				};*/
			
				// Add a new empty task row
				/*const addSizeTaskRowEdit = () => {
					setsizeTasksedit([...sizetasksedit, { size: "" }]);
					
				};*/
			
				// Remove a specific task row
				/*const removeSizeTaskRowEdit = (index) => {
					setsizeTasksedit(sizetasksedit.filter((_, idx) => idx !== index));
				};	*/

		/////////////////////////////   

		       // Handle input changes for individual tasks           //on edit time
		/*const handleColorChangeEdit = (index, event) => {
			const updatedTasks = colortasksedit.map((task, idx) => 
				idx === index ? { ...task, [event.target.name]: event.target.value } : task
			);
			setcolorTasksedit(updatedTasks);
		};*/
	
		// Add a new empty task row
		/*const addColorTaskRowEdit = () => {
			setcolorTasksedit([...colortasksedit, { color: "" }]);
			
		};*/
	
		// Remove a specific task row
		/*const removeColorTaskRowEdit = (index) => {
			setcolorTasksedit(colortasksedit.filter((_, idx) => idx !== index));
		};*/

		/////////////////////////////

		    // Handle input changes for individual tasks          //on edit time
			const handleOfferTaskChangeEdit = (index, event) => {
				const updatedTasks = offertasksedit.map((task, idx) => 
					idx === index ? { ...task, [event.target.name]: event.target.value } : task
				);
				setofferTasksedit(updatedTasks);
			};
		
			// Add a new empty task row
			const addOfferTaskRowEdit = () => {
				setofferTasksedit([...offertasksedit, { offer: "" }]);
				
			};
		
			// Remove a specific task row
			const removeOfferTaskRowEdit = (index) => {
				setofferTasksedit(offertasksedit.filter((_, idx) => idx !== index));
			};

		////////////////////////////

		/*const DeleteProductSize = async(deleteid) =>{
			setpopupwait(true);
			try
			{
				const response = await fetch(`${ADMINAPI}/deleteproductsize/${deleteid}`,{
					method : 'DELETE',
					headers:{
								'Content-Type': 'application/json',
								Authorization : authorizationToken 
							}
				});
				const res_data = await response.json();
				if(response.ok)
				{
					ShowpopupEdit(editid); 
					setpopupwait(false);
					
				}
				else
				{
					toast.error(res_data.msg);
					setpopupwait(false);
				}
		  
			}
			catch(error)
			{
				setpopuperror(true);
				setresponseheading(process.env.REACT_APP_ERROR_HEADING);
				setresponsemsg(error.msg);
				setLoader(false);
				setpopupwait(false);
			}
		}*/

		/*const DeleteProductColor = async(deleteid) =>{
			setpopupwait(true);
			try
			{
				const response = await fetch(`${ADMINAPI}/deleteproductcolor/${deleteid}`,{
					method : 'DELETE',
					headers:{
								'Content-Type': 'application/json',
								Authorization : authorizationToken 
							}
				});
				const res_data = await response.json();
				if(response.ok)
				{
					ShowpopupEdit(editid); 
					setpopupwait(false);
				}
				else
				{
					toast.error(res_data.msg);
					setpopupwait(false);
				}
		  
			}
			catch(error)
			{
				setpopuperror(true);
				setresponseheading(process.env.REACT_APP_ERROR_HEADING);
				setresponsemsg(error.msg);
				setLoader(false);
				setpopupwait(false);
			}
		}*/

		const DeleteProductOffer = async(deleteid) =>{
			setpopupwait(true);
			try
			{
				const response = await fetch(`${ADMINAPI}/deleteproductoffer/${deleteid}`,{
					method : 'DELETE',
					headers:{
								'Content-Type': 'application/json',
								Authorization : authorizationToken 
							}
				});
				const res_data = await response.json();
				if(response.ok)
				{
					ShowpopupEdit(editid); 
					setpopupwait(false);
				}
				else
				{
					toast.error(res_data.msg);
					setpopupwait(false);
				}
		  
			}
			catch(error)
			{
				setpopuperror(true);
				setresponseheading(process.env.REACT_APP_ERROR_HEADING);
				setresponsemsg(error.msg);
				setLoader(false);
				setpopupwait(false);
			}
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
				<span className="cont-heading">Category:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
			  <span className="cont-cont">{categorydata.categoryname}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Sub category:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{subcategorydata.subcategoryname}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Child category:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{childcategorydata.childcategoryname}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Product name:</span>
				<div style={{fontSize:'11px'}}>(Sub Child category)</div>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.subchildcategoryname}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Brand:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{branddata.brandname ? branddata.brandname : ''}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Model number:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.modelnumber ? viewdata.modelnumber : ''}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Weight/Volume:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.weight ? viewdata.weight : ''}&nbsp;{scaledata.scalename ? scaledata.scalename : ''}</span>
			</div>
			
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Height:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.height ? viewdata.height : ''}&nbsp;{heightdata.scalename ? heightdata.scalename : ''}</span>
			</div>
			
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Width:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.width ? viewdata.width : ''}&nbsp;{widthdata.scalename ? widthdata.scalename : ''}</span>
			</div>
			
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Length:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.length ? viewdata.length : ''}&nbsp;{lengthdata.scalename ? lengthdata.scalename : ''}</span>
			</div>
			
		</div>
		
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">MRP(Rs.):</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.mrp}/-</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Discount(%):</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.discount ? viewdata.discount : ''}%</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Price:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.price}/-</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Available quantity:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.availablequantity ? viewdata.availablequantity : ''}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Body material:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.bodymaterial ? viewdata.bodymaterial : ''}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Battery:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.battery ? viewdata.battery+'mah' : ''}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Warranty:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.warranty ? viewdata.warranty : ''}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Size/Capacity:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
			<span className="cont-cont">{viewdata.size ? viewdata.size : ''}</span>
				{/* {
					
					size.length > 0 ? 
						size.map((data,index) =>
							<span key={index} className="cont-cont">{data.size}{(size.length - index)!==1 && <small>,&nbsp;&nbsp;</small>}</span>
  										
						) : 'There are no size!'
				} */}
				
				
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Color:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
			<span className="cont-cont">{viewdata.color ? viewdata.color : ''}</span>
				{/* {
					
					color.length > 0 ? 
						color.map((data,index) =>
							<span key={index} className="cont-cont">{data.color}{(color.length - index)!==1 && <small>,&nbsp;&nbsp;</small>}</span>
  										
						) : 'There are no color!'
				} */}
				
				
			</div>
			
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Offer:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				
				{
					
					offer.length > 0 ? 
						offer.map((data,index) =>
							<div key={index} className="cont-cont">{data.offer}</div>
  										
						) : 'There are no offer!'
				}
				
				
			</div>
			
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Description:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">{viewdata.description ? viewdata.description : ''}</span>
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Images:</span>
			</div> 
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont">
				{
					multiimagedata.length > 0 ? 
						multiimagedata.map((data,index) =>
							<img key={index} src={`${process.env.REACT_APP_BACK_END_URL}/uploads/${data.imagename}`} style={{width:'100px',height:'100px',marginRight:'5px',marginBottom:'5px'}} alt="image" />
  										
						) : <img src={`${process.env.REACT_APP_BACK_END_URL}/uploads/noimg.svg`} style={{width:'100px'}} alt="image" />
				}
				</span>
				
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Status:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<span className="cont-cont" style={{ textTransform: 'capitalize' }}>{viewdata.status}</span>
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
    <form onSubmit={handleSubmit} id="form-add-new-record">
	<div className="container-fluid padd_0" >
	 <div className="viewheight" id="style-scroll2">
	 
	 	<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Select category <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				<select id="categoryid" name="categoryid" className="admin-control" onChange={(e)=>{ showSubcategoryOnchange(e);showChildcategoryOnchange(e);handleInput(e) }}>
					<option value="">Select category</option>
				
					{
						getallcategory
                 		.map((user,index) => 
                				<option key={index} value={user._id}> 
                				{user.categoryname}</option>)
					}
					
				</select>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Select sub category <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				 <select id="subcategoryid" name="subcategoryid" className="admin-control" onChange={(e)=>{ showChildcategoryOnchange(e);handleInput(e) }}>
					<option value="">Select sub category</option>
					{
						getallsubcategory
                 		.map((user,index) => 
                				<option key={index} value={user._id}> 
                				{user.subcategoryname}</option>)
					}
					
				</select>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Select child cate.. <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				 <select id="childcategoryid" name="childcategoryid" className="admin-control" onChange={handleInput}>
					<option value="">Select child category</option>
					{
						getallchildcategory
                 		.map((user,index) => 
                				<option key={index} value={user._id}> 
                				{user.childcategoryname}</option>)
					}
					
				</select>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Product Name <span className='red'>*</span></span>
				<div style={{fontSize:'11px'}}>(Sub Child category)</div>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="subchildcategoryname" id="subchildcategoryname" onChange={handleInput} type="text" className="admin-control" value={subchildcategory.subchildcategoryname} placeholder="Enter product name" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Select brand</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<select id="brandid" name="brandid" className="admin-control" onChange={handleInput}>
					<option value="">Select brand</option>
				
					{
						getbrand
                 		.map((user,index) => 
                				<option key={index} value={user._id}> 
                				{user.brandname}</option>)
					}
					
				</select>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Model Number</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="modelnumber" id="modelnumber" onChange={handleInput} type="text" className="admin-control" value={subchildcategory.modelnumber} placeholder="Enter model number" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Weight/Volume</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<div className='row'>
					<div className='col-8'>
					<input name="weight" id="weight" onChange={handleInput} type="number" className="admin-control" value={subchildcategory.weight} placeholder="Enter weight" />
					</div>
					<div className='col-4'>
					<select id="scaleid" name="scaleid" className="admin-control" onChange={handleInput}>
					<option value="">Scale</option>
					{
					    getscale.length > 0 ?
						getscale.map((data,index) => 
                				<option key={index} value={data._id}> 
                				{data.scalename}</option>)
						: ''			
					}
					
				</select>
					</div>
				</div>	
				
			</div>
		</div>

			
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Height</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<div className='row'>
					<div className='col-8'>
					<input name="height" id="height" onChange={handleInput} type="number" className="admin-control" value={subchildcategory.height} placeholder="Enter height" />
					</div>
					<div className='col-4'>
					<select id="heightid" name="heightid" className="admin-control" onChange={handleInput}>
					<option value="">Scale</option>
					{
					    getscale.length > 0 ?
						getscale.map((data,index) => 
                				<option key={index} value={data._id}> 
                				{data.scalename}</option>)
						: ''			
					}
					
				</select>
					</div>
				</div>	
				
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Width</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<div className='row'>
					<div className='col-8'>
					<input name="width" id="width" onChange={handleInput} type="number" className="admin-control" value={subchildcategory.width} placeholder="Enter width" />
					</div>
					<div className='col-4'>
					<select id="widthid" name="widthid" className="admin-control" onChange={handleInput}>
					<option value="">Scale</option>
					{
					    getscale.length > 0 ?
						getscale.map((data,index) => 
                				<option key={index} value={data._id}> 
                				{data.scalename}</option>)
						: ''			
					}
					
				</select>
					</div>
				</div>	
				
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Length</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<div className='row'>
					<div className='col-8'>
					<input name="length" id="length" onChange={handleInput} type="number" className="admin-control" value={subchildcategory.length} placeholder="Enter length" />
					</div>
					<div className='col-4'>
					<select id="lengthid" name="lengthid" className="admin-control" onChange={handleInput}>
					<option value="">Scale</option>
					{
					    getscale.length > 0 ?
						getscale.map((data,index) => 
                				<option key={index} value={data._id}> 
                				{data.scalename}</option>)
						: ''			
					}
					
				</select>
					</div>
				</div>	
				
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Size/Capacity</span>
			</div>
			<div className="col-10 mobwidth100admin">
			<input name="size" id="size" onChange={handleInput} type="text" className="admin-control" value={subchildcategory.size} placeholder="Enter size" />	
				{/* {sizetasks.map((task, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <label className='admin-control-label'>                   
                        <input
                            type="text"
							id={index}
							className="admin-control"
							placeholder="Enter size"
                            name="size"
                            value={task.size}
                            onChange={(e) => handleSizeChange(index, e)}
                            
                        />
                    </label>
                  
                    <button title="Remove" className='btn btn-light' type="button" onClick={() => removeSizeTaskRow(index)}>
                        Remove
                    </button>
                </div>
            ))}
			<button title="Add" className='btn btn-light' type="button" onClick={addSizeTaskRow}>Add</button> */}
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Color</span>
			</div>
			<div className="col-10 mobwidth100admin">
			<input name="color" id="color" onChange={handleInput} type="text" className="admin-control" value={subchildcategory.color} placeholder="Enter color" />
				{/* {colortasks.map((task, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <label className='admin-control-label'>                   
                        <input
                            type="text"
							id={index}
							className="admin-control"
							placeholder="Enter color name"
                            name="color"
                            value={task.color}
                            onChange={(e) => handleColorChange(index, e)}
                            
                        />
                    </label>
                  
                    <button title="Remove" className='btn btn-light' type="button" onClick={() => removeColorTaskRow(index)}>
                        Remove
                    </button>
                </div>
            ))}
			<button title="Add" className='btn btn-light' type="button" onClick={addColorTaskRow}>Add</button> */}
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Offer</span>
			</div>
			<div className="col-10 mobwidth100admin">
				
				{offertasks.map((task, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <label className='admin-control-label'>                   
                        <input
                            type="text"
							id={index}
							className="admin-control"
							placeholder="Enter offer details"
                            name="offer"
                            value={task.offer}
                            onChange={(e) => handleTaskChange(index, e)}
                            
                        />
                    </label>
                  
                    <button title="Remove" className='btn btn-light' type="button" onClick={() => removeTaskRow(index)}>
                        Remove
                    </button>
                </div>
            ))}
			<button title="Add" className='btn btn-light' type="button" onClick={addTaskRow}>Add</button>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">MRP(Rs.) <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input  onChange={GetMRP} type="number" className="admin-control" value={mrp} placeholder="Enter M.R.P." />
			</div>
		</div>
		

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Discount(%) <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input  onChange={GetDiscount} type="number" className="admin-control" value={discount} placeholder="Enter discount(%)" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Price(Rs.) <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input  onChange={GetPrice} type="number" className="admin-control" value={price} placeholder="Enter price" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Available Quantity <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="availablequantity" id="availablequantity" onChange={handleInput} type="number" className="admin-control" value={subchildcategory.availablequantity} placeholder="Enter available quantity" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Body Material</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="bodymaterial" id="bodymaterial" onChange={handleInput} type="text" className="admin-control" value={subchildcategory.bodymaterial} placeholder="Metal,Iron,Plastic,Cloth" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Battery(mah)</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="battery" id="battery" onChange={handleInput} type="number" className="admin-control" value={subchildcategory.battery} placeholder="Ex: 5000" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Warranty</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="warranty" id="warranty" onChange={handleInput} type="text" className="admin-control" value={subchildcategory.warranty} placeholder="Enter warranty" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Description</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<textarea name="description" id="description" onChange={handleInput} className="admin-control" value={subchildcategory.description} placeholder="Enter description"></textarea>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Images</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="subchildcategoryimg" id="subchildcategoryimg" onChange={ (e)=>{  ReadMultiImages([...e.target.files]); }} type="file" accept="image/png,image/jpg,image/jpeg,image/svg+xml,image/gif" multiple="multiple" className="admin-control"  />
				<span className='imginst'>upload only png,jpg,jpeg,svg and gif file.</span>
				{
					images.length > 0 && (
          				<div style={{ display: 'flex', flexWrap: 'wrap', marginTop:'10px' }}>
            				{
								images.map((image, index) => (
              					<div key={index} style={{ marginRight: '5px', position: 'relative' }}>
                					<img src={URL.createObjectURL(image)} alt={`image-${index}`} width="100px" height="100px" style={{ objectFit: 'cover',marginBottom:'5px' }} />
                					<button type="button" onClick={() => DeletePreviewImages(index)} title='Remove' style={{ position: 'absolute',top: 0,right: 0,backgroundColor: 'red',color: 'white',border: 'none',borderRadius: '50%',cursor: 'pointer' }}>
                  						&times;
                					</button>
              					</div>
            					))
							}
          				</div>
        			)
				}
				
			</div>
			
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Status <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				<select name="status" id="status" onChange={handleInput} className="admin-control">
						<option value="" >Please select status</option>
						<option value="enable" >Enable</option>
						<option value="disable" >Disable</option>
				</select>
			</div>
		</div>
	
    </div>
	<div className="row mt-3">
		<div className="col">
			<div className="pull-right bottomeditbtn">
			    <span onClick={ClosepopupAddnew} className="btn btn-dark">Cancel</span>
				{
					loader ?  <button type="button" className="btn btn-success gender"><span>Please wait... <i className="fa fa-spinner fa-pulse fa-3x fa-fw fa-lg loadersize" ></i></span></button>
					:
					<button type="submit" className="btn btn-success gender">Submit</button>
				}
				
			</div>
		</div>
	</div>
	</div>
	</form>
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
				<span className="cont-heading">Select category</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<select id="categoryid" name="categoryid" value={edituserdata.categoryid} className="admin-control" onChange={(e)=>{ showSubcategoryOnchange(e);handleInputEdit(e) }}>
					<option value="">Select category</option>
					{
						getallcategory.map((user,index) => 
                				<option key={index} value={user._id}> 
                				{user.categoryname}</option>)
					}
					
				</select>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Select sub category</span>
			</div>
			<div className="col-10 mobwidth100admin">
				 <select id="subcategoryid" name="subcategoryid" value={edituserdata.subcategoryid} className="admin-control" onChange={(e)=>{ showChildcategoryOnchange(e);handleInputEdit(e) }}>
					<option value="">Select sub category</option>
					{
						getallsubcategory.map((user,index) => 
                				<option key={index} value={user._id}>{user.subcategoryname}</option>)
					}
					
				</select>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Select child category</span>
			</div>
			<div className="col-10 mobwidth100admin">
				 <select id="childcategoryid" name="childcategoryid" value={edituserdata.childcategoryid} className="admin-control" onChange={handleInputEdit}>
					<option value="">Select child category</option>
					{
						getallchildcategory.map((user,index) => 
                				<option key={index} value={user._id}>{user.childcategoryname}</option>)
					}
					
				</select>
			</div>
		</div>

		

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Product Name</span>
				<div style={{fontSize:'11px'}}>(Sub Child category)</div>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="subchildcategoryname" id="subchildcategoryname" value={edituserdata.subchildcategoryname} onChange={handleInputEdit} type="text" className="admin-control"  placeholder="Enter your name" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Select brand</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<select id="brandid" name="brandid" value={edituserdata.brandid} className="admin-control" onChange={handleInputEdit}>
					<option value="">Select brand</option>
				
					{
						getbrand.length > 0 ?
						getbrand
                 		.map((data,index) => 
                				<option key={index} value={data._id}> 
                				{data.brandname}</option>)

						: ''		
					}
					
				</select>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Model Number</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="modelnumber" id="modelnumber" onChange={handleInputEdit} type="text" className="admin-control" value={edituserdata.modelnumber} placeholder="Enter model number" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Weight/Volume</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<div className='row'>
					<div className='col-8'>
					<input name="weight" id="weight" onChange={handleInputEdit} type="number" className="admin-control" value={edituserdata.weight} placeholder="Enter weight" />
					</div>
					<div className='col-4'>
					<select id="scaleid" name="scaleid" value={edituserdata.scaleid} className="admin-control" onChange={handleInputEdit}>
					<option value="">Scale</option>
					{
						getscale.length > 0 ?
						getscale
                 		.map((data,index) => 
                				<option key={index} value={data._id}> 
                				{data.scalename}</option>)
						: ''		
					}
					
				</select>
					</div>
				</div>	
				
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Height</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<div className='row'>
					<div className='col-8'>
					<input name="height" id="height" onChange={handleInputEdit} type="number" className="admin-control" value={edituserdata.height} placeholder="Enter height" />
					</div>
					<div className='col-4'>
					<select id="heightid" name="heightid" value={edituserdata.heightid} className="admin-control" onChange={handleInputEdit}>
					<option value="">Scale</option>
					{
					    getscale.length > 0 ?
						getscale.map((data,index) => 
							<option key={index} value={data._id}> 
						{data.scalename}</option>)
						: ''			
					}
					
				</select>
					</div>
				</div>	
				
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Width</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<div className='row'>
					<div className='col-8'>
					<input name="width" id="width" onChange={handleInputEdit} type="number" className="admin-control" value={edituserdata.width} placeholder="Enter width" />
					</div>
					<div className='col-4'>
					<select id="widthid" name="widthid" value={edituserdata.widthid} className="admin-control" onChange={handleInputEdit}>
					<option value="">Scale</option>
					{
					    getscale.length > 0 ?
						getscale.map((data,index) => 
							<option key={index} value={data._id}> 
						{data.scalename}</option>)
						: ''			
					}
					
				</select>
					</div>
				</div>	
				
			</div>
		</div>
		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Length</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<div className='row'>
					<div className='col-8'>
					<input name="length" id="length" onChange={handleInputEdit} type="number" className="admin-control" value={edituserdata.length} placeholder="Enter length" />
					</div>
					<div className='col-4'>
					<select id="lengthid" name="lengthid" value={edituserdata.lengthid} className="admin-control" onChange={handleInputEdit}>
					<option value="">Scale</option>
					{
					    getscale.length > 0 ?
						getscale.map((data,index) => 
							<option key={index} value={data._id}> 
						{data.scalename}</option>)
						: ''			
					}
					
				</select>
					</div>
				</div>	
				
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Size/Capacity</span>
			</div>
			<div className="col-10 mobwidth100admin">
			<input name="size" id="size" onChange={handleInputEdit} type="text" className="admin-control" value={edituserdata.size} placeholder="Enter size" />
				{/* {size.map((task, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <label className='admin-control-label'>                   
                        <input
                            type="text"
							disabled={true} 
							style={{cursor:"not-allowed"}}
							id={index}
							className="admin-control"
							placeholder="Enter size"
                            name="size"
                            value={task.size}
                            
                            
                        />
                    </label>
                  
                    <button title="Remove" className='btn btn-light' type="button" onClick={() => DeleteProductSize(task._id)}>
                        Remove
                    </button>
                </div>
            ))}


			{sizetasksedit.map((task, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <label className='admin-control-label'>                   
                        <input
                            type="text"
							id={index}
							className="admin-control"
							placeholder="Enter size"
                            name="size"
                            value={task.size}
                            onChange={(e) => handleSizeChangeEdit(index, e)}
                            
                        />
                    </label>
                  
                    <button title="Remove" className='btn btn-light' type="button" onClick={() => removeSizeTaskRowEdit(index)}>
                        Remove
                    </button>
                </div>
            ))}


			<button title="Add" className='btn btn-light' type="button" onClick={addSizeTaskRowEdit}>Add</button> */}
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Color</span>
			</div>
			<div className="col-10 mobwidth100admin">
			<input name="color" id="color" onChange={handleInputEdit} type="text" className="admin-control" value={edituserdata.color} placeholder="Enter color" />
				{/* {color.map((task, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <label className='admin-control-label'>                   
                        <input
                            type="text"
							disabled={true} 
							style={{cursor:"not-allowed"}}
							id={index}
							className="admin-control"
							placeholder="Enter color"
                            name="color"
                            value={task.color}
                           
                            
                        />
                    </label>
                  
                    <button title="Remove" className='btn btn-light' type="button" onClick={() => DeleteProductColor(task._id)}>
                        Remove
                    </button>
                </div>
            ))}


			{colortasksedit.map((task, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <label className='admin-control-label'>                   
                        <input
                            type="text"
							id={index}
							className="admin-control"
							placeholder="Enter color"
                            name="color"
                            value={task.color}
                            onChange={(e) => handleColorChangeEdit(index, e)}
                            
                        />
                    </label>
                  
                    <button title="Remove" className='btn btn-light' type="button" onClick={() => removeColorTaskRowEdit(index)}>
                        Remove
                    </button>
                </div>
            ))}


			<button title="Add" className='btn btn-light' type="button" onClick={addColorTaskRowEdit}>Add</button> */}
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Available Offer</span>
			</div>
			<div className="col-10 mobwidth100admin">
				
				 { offer.length > 0 ?

					offer.map((task, index) => (
                	<div key={index} style={{ marginBottom: "10px" }}>
                    <label className='admin-control-label'>                   
                        <input
                            type="text"
							disabled={true} 
							style={{cursor:"not-allowed"}}
							id={index}
							className="admin-control"
							placeholder="Enter offer"
                            name="offer"
                            value={task.offer}
                           
                            
                        />
                    </label>
                  
                    <button title="Remove" className='btn btn-light' type="button" onClick={() => DeleteProductOffer(task._id)}>
                        Remove
                    </button>
                </div>
            ))
				 
				 : ''
		
			} 


			{offertasksedit.map((task, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <label className='admin-control-label'>                   
                        <input
                            type="text"
							id={index}
							className="admin-control"
							placeholder="Enter offer"
                            name="offer"
                            value={task.offer}
                            onChange={(e) => handleOfferTaskChangeEdit(index, e)}
                            
                        />
                    </label>
                  
                    <button title="Remove" className='btn btn-light' type="button" onClick={() => removeOfferTaskRowEdit(index)}>
                        Remove
                    </button>
                </div>
            ))}


			<button title="Add" className='btn btn-light' type="button" onClick={addOfferTaskRowEdit}>Add</button>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">MRP(Rs.) <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input  onChange={GetMRP} type="number" className="admin-control" value={mrp} placeholder="Enter M.R.P." />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Discount(%) <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input  onChange={GetDiscount} type="number" className="admin-control" value={discount} placeholder="Enter discount(%)" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Price(Rs.) <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input  onChange={GetPrice} type="number" className="admin-control" value={price} placeholder="Enter price" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Available Quantity <span className='red'>*</span></span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="availablequantity" id="availablequantity" onChange={handleInputEdit} type="number" className="admin-control" value={edituserdata.availablequantity} placeholder="Enter available quantity" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Body Material</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="bodymaterial" id="bodymaterial" onChange={handleInputEdit} type="text" className="admin-control" value={edituserdata.bodymaterial} placeholder="Metal,Iron,Plastic,Cloth" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Battery(mah)</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="battery" id="battery" onChange={handleInputEdit} type="number" className="admin-control" value={edituserdata.battery} placeholder="Ex: 5000" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Warranty</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="warranty" id="warranty" onChange={handleInputEdit} type="text" className="admin-control" value={edituserdata.warranty} placeholder="Enter warranty" />
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Description</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<textarea name="description" id="description" onChange={handleInputEdit} className="admin-control" value={edituserdata.description} placeholder="Enter description"></textarea>
			</div>
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Images:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<input name="subchildcategoryimg" id="subchildcategoryimg" onChange={ (e)=>{ ReadMultiImages([...e.target.files]); }} type="file" accept="image/png,image/jpg,image/jpeg,image/svg+xml,image/gif" multiple="multiple" className="admin-control"  />
		    	<div className='imginstadmin'>upload only png,jpg,jpeg,svg and gif file.</div>
				<div style={{ display: `${displaypreviewimg === true ? 'block' : 'none'}` }}>
				
				<div style={{ display: 'flex', flexWrap: 'wrap', marginTop:'2px',float:'left' }}>
				{
					multiimagedata.length > 0 ? 
						multiimagedata.map((data,index) =>
						<div key={index} style={{position: 'relative'}}>
							<img src={`${process.env.REACT_APP_BACK_END_URL}/uploads/${data.imagename}`} style={{width:'100px',height:'100px',marginRight:'5px',marginBottom:'5px'}} alt="image" />
						<button type="button" onClick={() => DeleteMultiImage(data._id)} title='Remove' style={{ position: 'absolute',top: 0,right: 0,backgroundColor: 'red',color: 'white',border: 'none',borderRadius: '50%',cursor: 'pointer' }}>
                  						&times;
                					</button>
						</div>
  										
						) : <img src={`${process.env.REACT_APP_BACK_END_URL}/uploads/noimg.svg`} style={{width:'100px'}} alt="image" />
				}
				</div>
			
				</div>
				<div  style={{ display: `${noImgPreview === false ? 'block' : 'none'}`,float:'left' }}>
				{
					images.length > 0 && (
          				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
            				{
								images.map((image, index) => (
              					<div key={index} style={{ marginRight: '5px', position: 'relative', marginTop:'2px' }}>
                					<img src={URL.createObjectURL(image)} alt={`image-${index}`} width="100px" height="100px" style={{ objectFit: 'cover',marginBottom:'5px' }} />
                					<button type="button" onClick={() => DeletePreviewImages(index)} title='Remove' style={{ position: 'absolute',top: 0,right: 0,backgroundColor: 'red',color: 'white',border: 'none',borderRadius: '50%',cursor: 'pointer' }}>
                  						&times;
                					</button>
              					</div>
            					))
							}
          				</div>
        			)
				}
				</div>
				<div>
					{
						noImgPreview === true ? <img src={`${process.env.REACT_APP_BACK_END_URL}/uploads/noimg.svg`} style={{width:'100px'}} alt="image" /> : ''
					}
				</div>

			

				
				
			</div>
			
		</div>

		<div className="row mt-3">
			<div className="col-2 mobwidth100admin">
				<span className="cont-heading">Status:</span>
			</div>
			<div className="col-10 mobwidth100admin">
				<select name="status" id="status" value={edituserdata.status} onChange={handleInputEdit} className="admin-control">
						<option value="" >Please select status</option>
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
				{ loader ? <button type="button" className="btn btn-success gender">Please wait... <i className="fa fa-spinner fa-pulse fa-3x fa-fw fa-lg loadersize" ></i></button>
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

<div id="popupdelete" className="overlayadmin" style={{display:'none'}}>
  <div className="popupdelete animate-zoom">
  <div className='text-center'>
	<img  src={exclamation} style={{width:'125px'}} alt="image" />
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
	
	<img src={loadergif} style={{width:'50px'}} alt="image" />
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
	<img  src={success} style={{width:'115px'}} alt="image" />
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
	<img  src={error} style={{width:'115px'}} alt="image" />
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
										<span onClick={ShowpopupAddnew} className="btn btn-success mt-2 btn-sm pull-right"><i className="fa fa-plus" aria-hidden="true"></i> Add New</span>
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
									<button type="button" onClick={ResetFilter} title="reset" className='btn btn-light searchbtn'><i className="fa fa-undo" aria-hidden="true"></i></button>	
									</div>
								

									<div className='downloadicncenter'>
									<div style={{visibility:'hidden'}}>dd</div>
										<span onClick={downloadPDF}><img title='Download PDF' src={pdf} className='excel' alt="image" /></span>
										<span onClick={downloadCSV}><img title='Download CSV' src={csv} className='excel' alt="image" /></span>
										
									</div>
							</div>
							</div>

							<div className="row w-100 mt-4 mobdisplay">
								 <div className="col mobpadright0">
								
								 <div className='table-responsive'>
								 {
										datatblloader ? 
										<div className="text-center">
												<img src={loadergif} style={{width:'50px'}} alt="image" /><br/>
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

export default AdminSubChildCategory