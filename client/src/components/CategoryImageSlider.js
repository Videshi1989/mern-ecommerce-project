import React,{useState,useEffect} from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import {Link, NavLink} from 'react-router-dom'
import { useAuth } from "../store/auth";
import { Navigation, Pagination, A11y,Autoplay } from './../../node_modules/swiper/modules';    //
import './../../node_modules/swiper/swiper-bundle.min.css'     //
import slider1 from './Images/slider1.jpg'
import slider2 from './Images/slider2.jpg'
import slider3 from './Images/slider3.jpg'
import slider4 from './Images/slider4.jpg'

export default function CategoryImageSlider()
{
    const[records,setRecords] = useState([]);
    
    const {authorizationToken, USERAPI} = useAuth(); 
    useEffect(()=>{ getAllRecords(); },[]);

	const getAllRecords = async ()=>
    {
            try 
            {
                const response = await fetch(`${USERAPI}/getallcategoryimageslideraccordingstatus`,{
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
        <div className='slidersetup'>
        <Swiper   modules={[Navigation, Pagination, A11y,Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay={true}
      
        >

            {/* <SwiperSlide><img loading='lazy'  alt="img" src={slider1} className='topimg'/></SwiperSlide>
            <SwiperSlide><img loading='lazy'  alt="img"  src={slider2} className='topimg' /></SwiperSlide>
            <SwiperSlide><img loading='lazy'  alt="img" src={slider3} className='topimg' /></SwiperSlide>
            <SwiperSlide><img loading='lazy'  alt="img" src={slider4} className='topimg' /></SwiperSlide> */}

                {
                    records.length > 0 ?
						records.map((data,index) => 
                     
                            <SwiperSlide><Link key={index} to={`/allproductview2/${data.categoryid}`}>{data.imagename ? <img loading='lazy'  alt="img" src={`${process.env.REACT_APP_BACK_END_URL}/uploads/${data.imagename}`} className='topimg' /> : <img src={`${process.env.REACT_APP_BACK_END_URL}/uploads/noimg.svg`} className='topimg' />}</Link></SwiperSlide>
                            
                        ) : <div className="nocatslidermsg">Sorry! No category slider available.</div>
                   
				}

        </Swiper>
        </div>
        </>
    )
}