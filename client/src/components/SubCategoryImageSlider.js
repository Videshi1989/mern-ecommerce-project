import React,{useState,useEffect} from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import {Link, NavLink} from 'react-router-dom'
import { useAuth } from "../store/auth";
import { Navigation, Pagination, A11y,Autoplay } from './../../node_modules/swiper/modules';    //
import './../../node_modules/swiper/swiper-bundle.min.css'     //
import img1 from './Images/img1.jpg'
import img2 from './Images/img2.jpg'
import img3 from './Images/img3.jpg'
import img4 from './Images/img4.jpg'
import img5 from './Images/img5.jpg'
import img6 from './Images/img6.jpg'

export default function SubcategoryImageSlider()
{
    const[records,setRecords] = useState([]);
    
    const {authorizationToken, USERAPI} = useAuth(); 
    useEffect(()=>{ getAllRecords(); },[]);

    //for mobile view responsive
    var slidecount=4;
    var screenwidth = window.innerWidth;
    if(screenwidth >= 360 && screenwidth <= 767)
    {
        slidecount=1;
    }
    else
    {
        slidecount=4;
    }
    //

         const getAllRecords = async ()=>
        {
                try 
                {
                    const response = await fetch(`${USERAPI}/getallsubcategoryimageslideraccordingstatus`,{
                        method:"GET",
                        headers:{
                                    'Content-Type': 'application/json',
                                    Authorization : authorizationToken 
                                }
                      });
                
                    const data = await response.json();
                    //setSubCatFilter(data);
                    
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
                    
                  }
        }
    
    
    return(
        <>
        <br/>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                <Swiper   modules={[Navigation, Pagination, A11y,Autoplay]}
      spaceBetween={20}
      slidesPerView={slidecount}
      navigation
      autoplay={true}
     
        >

            {/* <SwiperSlide><img loading='lazy'  alt="img" src={img1} className='sliderimg'/></SwiperSlide>
            <SwiperSlide><img loading='lazy'  alt="img"  src={img2} className='sliderimg'/></SwiperSlide>
            <SwiperSlide><img loading='lazy'  alt="img" src={img3} className='sliderimg'/></SwiperSlide>
            <SwiperSlide><img loading='lazy'  alt="img" src={img4} className='sliderimg'/></SwiperSlide>
            <SwiperSlide><img loading='lazy'  alt="img" src={img5} className='sliderimg'/></SwiperSlide>
            <SwiperSlide><img loading='lazy'  alt="img" src={img6} className='sliderimg'/></SwiperSlide>
            <SwiperSlide><img loading='lazy'  alt="img" src={img3} className='sliderimg'/></SwiperSlide>
            <SwiperSlide><img loading='lazy'  alt="img" src={img4} className='sliderimg'/></SwiperSlide> */}
        
             {
                        records.length > 0 ?
						records.map((data,index) => 
                     
                            <SwiperSlide key={index}><Link  to={`/allproductview2/${data.subcategoryid}`}>{data.imagename ? <img loading='lazy'  alt="img" src={`${process.env.REACT_APP_BACK_END_URL}/uploads/${data.imagename}`} className='sliderimg'/> : <img src={`${process.env.REACT_APP_BACK_END_URL}/uploads/noimg.svg`} className='sliderimg' alt="imgage" />}</Link></SwiperSlide>
                            
                        ) : <div className="nosubcatslidermsg">Sorry! No subcategory slider available.</div>
                   
			}
        </Swiper>
                </div>
            </div>
        </div>
       
        </>
    )
}