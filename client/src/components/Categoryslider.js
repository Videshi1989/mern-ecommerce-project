import React, { useState, useEffect } from "react";
import {Link, NavLink} from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import { useAuth } from "../store/auth";
import { Navigation, Pagination, A11y,Autoplay } from './../../node_modules/swiper/modules';    //
import './../../node_modules/swiper/swiper-bundle.min.css'     //

import closebtn from './Images/closebtn.png'
import grocery from './Images/grocery.png'
import offer from './Images/offer.png'
import desktop from './Images/desktop.png'
import laptop from './Images/laptop.png'
import toy from './Images/toy.png'
import mobile from './Images/mobile.png'
import fashion from './Images/fashion.png'
import electronincs from './Images/electronincs.png'
import furniture from './Images/furniture.png'
import appliences from './Images/appliences.png'
import beauty from './Images/beauty.png'
import category from './Images/category.png'
import footwear from './Images/footwear.png'
import watch from './Images/watch.png'



export default function Categoryslider()
{
   var count = 0;
   const {authorizationToken, USERAPI} = useAuth(); 
   const[records,setRecords] = useState([]);
   const[categoryid,setCategoryid] = useState('');
   const[categoryname,setCategoryName] = useState('');
   const[subcategory,setSubcategory] = useState([]);
   const[getallsubcategory,setallsubcategory] = useState([]);

   useEffect(()=>{getAllCategories(); getAllSubCategories()},[]);

   const getAllCategories = async ()=>
    { 
       try 
       {
          const response = await fetch(`${USERAPI}/getallcategoryaccordingstatus`,{
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
            }
            else
            {
               setRecords(data);
            }
            
       } 
       catch (error) 
       {
         //console.log("caterror:",error)
       }
    }

    const getAllSubCategories = async ()=>
      {
         try 
         {
            const response = await fetch(`${USERAPI}/getallsubcategoryaccordingstatus`,{
               method:"GET",
               headers:{
                        'Content-Type': 'application/json',
                        Authorization : authorizationToken 
                     }
              });
         
            const data = await response.json();
            if(data.length === "" || data.length === 0 || data.length === null || data.length === undefined)
            {
               setSubcategory([]);
            }
            else
            {
               setSubcategory(data);
            }  
           
      
         } 
         catch (error) 
         {
            //console.log("subcaterror:",error)
         }
      }


        //for mobile view responsive
        var slidecount=4;
        var spaceBetween=20;
        var screenwidth = window.innerWidth;
        if(screenwidth >= 360 && screenwidth <= 767)
        {
            slidecount=6;
            spaceBetween=0;
        }
        else
        {
            slidecount=13;
            spaceBetween=10;
        }

        // To show subcategory
        const ShowSubCategory = async (catid,catname) =>
        {
          
          //setCategoryid(catid);
          //setCategoryName(catname);
          try
          {
             const response = await fetch(`${USERAPI}/getallsubcategorybycategoryidaccordingstatus/${catid}`,{
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
                setCategoryName(catname);
              }
              else
              {
                setallsubcategory([]);
              }
              
          }
          catch(error)
          {
    
          }
          document.getElementById('popupsubcategory').style='display:block';
         
        }
        function CloseSubCategory()
        {
          document.getElementById('popupsubcategory').style='display:none';
        }

      /*const CountSubcategory = async (id) =>{
         
         try 
         {
            const response = await fetch(`${USERAPI}/countsubcategory/${id}`,{
               method:"POST",
               headers:{
                        'Content-Type': 'application/json',
                        Authorization : authorizationToken 
                     }
              });
               
              const data = await response.json();
              setRecords(data);
         } 
         catch (error) 
         {
            
         }

        }   */

    return(
        <>
        <br/>
        
        <div id="popupsubcategory" className="overlay" style={{display:'none'}}>

<div className="popup-subcategory animate-zoom">
 
  
  <span onClick={CloseSubCategory}><img loading='lazy'  src={closebtn} alt="close button" className="close" title="Close"/></span>
  <div className="side-nav-categories">
<div className="title"><strong>{categoryname}</strong></div>
      <div className='subcatheight' id='subcat-scroll'>
        <ul className="sub-category-tabs">
            {/* <li><Link to="/allproductview1"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Refrizrator</Link></li>
            <li><hr /></li>
            <li><Link to="/allproductview2"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Cooler</Link></li>
            <li><hr /></li>
            <li><Link to="/allproductview1"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Table Fan</Link></li>
            <li><hr /></li>
            <li><Link to="/allproductview1"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Celling Fan</Link></li>
            <li><hr /></li>
            <li><Link to="/allproductview1"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Mixer</Link></li>
            <li><hr /></li>
            <li><Link to="/allproductview1"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Iron</Link></li> */}

             {
               getallsubcategory.length > 0 ?
						getallsubcategory.map((data,index) => 
                        <li key={index}><span><Link to={`/allproductview2/${data._id}`}><i className="fa fa-angle-double-right" aria-hidden="true"></i> {data.subcategoryname}</Link></span></li>
                        
                        ) : 'Sorry! No subcategory available.'
				} 

        </ul>
      </div>
</div>
</div> 

</div>

        <div className='container-fluid'>
            <div className='row'>
                <div className='col-1 mobdnone'>
                <div className="category-image text-center" style={{border:'none'}}>
                     <div title="Category">
                        <img loading='lazy' title="Category"  src={category} alt="img" />
                     </div>
                     <span>Category</span>
                   </div>
                </div>
                <div className='col-11 mobwidth100'>
                <Swiper className='sswp'  modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={spaceBetween}
      slidesPerView={slidecount}
      navigation
      autoplay={false}
      
        >

               { 
                  records.length > 0 ?
						records.map((data,index) => 
                     
                     <SwiperSlide className='parentcat' key={index}> 
                        <div className="catcountdiv">{count = subcategory.filter((post) => post.categoryid === data._id).length}</div>
                        
                        {
                           count > 1 ? (
                                          <div className="category-image text-center" onClick={()=> {ShowSubCategory(data._id , data.categoryname)}} >
                                             <div title={data.categoryname}>
                                             {
                                                data.imagename.length > 0 ?
                                                <img loading='lazy' title={data.categoryname}  src={`${process.env.REACT_APP_BACK_END_URL}/uploads/${data.imagename}`} alt={data.categoryname} />
                                                : <img src={`${process.env.REACT_APP_BACK_END_URL}/uploads/noimg.svg`} style={{width:'50px'}} alt="image" />
                                             }
                                             
                                             </div>
                                             <span>{data.categoryname} <i className="fa fa-caret-down" aria-hidden="true"></i></span>
                         
                                           </div>
                                       ) : 
                                       (
                                          <Link to={`/allproductview1/${data._id}`} className="catproduct">
                                       <div className="category-image text-center">
                                       <div title={data.categoryname}>
                                             {
                                                data.imagename.length > 0 ?
                                                <img loading='lazy' title={data.categoryname}  src={`${process.env.REACT_APP_BACK_END_URL}/uploads/${data.imagename}`} alt={data.categoryname} />
                                                : <img src={`${process.env.REACT_APP_BACK_END_URL}/uploads/noimg.svg`} style={{width:'50px'}} alt="image" />
                                             }
                                       </div>
                                       <span>{data.categoryname} </span>
                         
                                       </div></Link>
                                      
                                       )
                        }
                  
                  </SwiperSlide>
                     
                  ) : <div className="nocatmsg">Sorry! No categories available.</div>
                   
					}

            {/* <SwiperSlide className='parentcat'>
                <div className="category-image text-center">
                     <div title="Grocery">
                        <img loading='lazy'  src={grocery} alt="grocery" />
                     </div>
                     <span>Grocery</span>
                   </div>
            </SwiperSlide>
            <SwiperSlide className='parentcat' onClick={ShowSubCategory}>
                    <div className="category-image text-center">
                     <div title="Electronics">
                        <img loading='lazy'  src={electronincs} alt="Electronics" />
                     </div>
                     <span>Electronics <i className="fa fa-caret-down" aria-hidden="true"></i></span>
                     </div>
            </SwiperSlide>
            <SwiperSlide className='parentcat'>
            <div className="category-image text-center">
                     <div title="Appliances">
                        <img loading='lazy'  src={appliences} alt="Appliances" />
                     </div>
                     <span>Appliances</span>
                   </div>
            </SwiperSlide>
            <SwiperSlide className='parentcat'>
            <div className="category-image text-center">
                     <div title="Laptops">
                        <img loading='lazy'  src={laptop} alt="Laptops" />
                     </div>
                     <span>Laptops</span>
                   </div>
            </SwiperSlide>
            <SwiperSlide className='parentcat'>
            <div className="category-image text-center">
                     <div title="Beauty">
                        <img loading='lazy'  src={beauty} alt="Beauty" />
                     </div>
                     <span>Beauty</span>
                   </div>
            </SwiperSlide>
            <SwiperSlide className='parentcat'>
            <div className="category-image text-center">
                     <div title="Mobiles">
                        <img loading='lazy'  src={mobile} alt="Mobiles" />
                     </div>
                     <span>Mobiles</span>
                   </div>
            </SwiperSlide>
            <SwiperSlide className='parentcat' onClick={ShowSubCategory}>
                    <div className="category-image text-center">
                     <div title="Fashion">
                        <img loading='lazy'  src={fashion} alt="Fashion" />
                     </div>
                     <span>Fashion <i className="fa fa-caret-down" aria-hidden="true"></i></span>
                   </div>
            </SwiperSlide>
            <SwiperSlide className='parentcat'>
            <div className="category-image text-center">
                     <div title="Furniture">
                        <img loading='lazy'  src={furniture} alt="Furniture" />
                     </div>
                     <span>Furniture <i className="fa fa-caret-down" aria-hidden="true"></i></span>
                   </div>

            </SwiperSlide>
            <SwiperSlide className='parentcat' onClick={ShowSubCategory}>
            <div className="category-image text-center">
                     <div title="Toys">
                        <img loading='lazy'  src={toy} alt="Toys" />
                     </div>
                     <span>Toys <i className="fa fa-caret-down" aria-hidden="true"></i></span>
                   </div>
            </SwiperSlide>
            <SwiperSlide className='parentcat'>
            <div className="category-image text-center">
                     <div title="Computers">
                        <img loading='lazy'  src={desktop} alt="Computers" />
                     </div>
                     <span>Computers</span>
                   </div>
            </SwiperSlide>
            <SwiperSlide className='parentcat'>
            <div className="category-image text-center">
                     <div title="Watch">
                        <img loading='lazy'  src={watch} alt="Watch" />
                     </div>
                     <span>Watch</span>
                   </div>
            </SwiperSlide>
            <SwiperSlide className='parentcat'>
            <div className="category-image text-center">
                     <div title="Footwear">
                        <img loading='lazy'  src={footwear} alt="Footwear" />
                     </div>
                     <span>Footwear</span>
                   </div>
            </SwiperSlide>
            <SwiperSlide className='parentcat'>
            <div className="category-image text-center">
                     <div title="Offers">
                        <img loading='lazy'  src={offer} alt="Offers" />
                     </div>
                     <span>Offers</span>
                   </div>
            </SwiperSlide>   */}
         </Swiper>
                </div>
            </div>
        </div>
       
        </>
    )
}