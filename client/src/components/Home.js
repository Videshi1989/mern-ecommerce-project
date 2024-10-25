import React,{useState} from 'react'
import Header from './Header'
import CategoryImageSlider from './CategoryImageSlider'
import SubCategoryImageSlider from './SubCategoryImageSlider'
import Thirdslider from './Thirdslider'
import Offerslider1 from './Offerslider1'
import Electronicslider from './Electronicslider'
import Laptopslider from './Laptopslider'
import Footer from './Footer'
import loader from './Images/loader.png'


export default function Home()
{
    const[showloader,Setshowloader] = useState(true);     //loading effect
    
    return(
        <>
        { showloader  ? <div className='parent-loader'><div className="loading"><img loading='lazy'  src={loader} alt="loader" /></div></div> : null }
            
            <Header />
            <CategoryImageSlider />
            <SubCategoryImageSlider />
            <Offerslider1 />
            <Thirdslider />
            <Electronicslider />
            <Laptopslider />
            <Footer />
           

        { showloader ? Setshowloader(false) : null } 
        </>
    )
}