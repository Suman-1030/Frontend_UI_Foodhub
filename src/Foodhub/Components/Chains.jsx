import React,{useState,useEffect} from 'react'
import {Api_Path} from '../Pages/Link'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { HashLoader } from "react-spinners";


function Chains() {
   const [Data,setData]=useState([]) 
   const [Scroll, setScroll]=useState(0)
   const [Loading,setLoading]=useState(true)
   
   
   
   
   async function Getdata(){

     try{    
        const response= await fetch(`${Api_Path}/vendor/Vendor-Rec`)
        const dot=await response.json()
        setData(dot.vendors)
        setLoading(false)
        
     }
     catch(error){
        console.log(error)
        setLoading(true)
     }
   }
   useEffect(()=>{
    Getdata()
   },[])

  function Scrollhandler(Direction){
        const gallery=document.getElementById('Chain')
        const Scrollamount=300;

        if (Direction=='Left'){
            gallery.scrollTo({
            left:gallery.scrollLeft-Scrollamount,
            behavior:"smooth"
          })
        }
        else if(Direction=='Right'){
          gallery.scrollTo({
          left:gallery.scrollLeft+Scrollamount,
          behavior:"smooth"
        })
      }

    }


    return (
      <>
        <div className='loadsec'>
          {Loading && (
            <>
              <div className='Loading'>Your 🍜 is Loading...</div>
              <HashLoader
                color="#e15b64"
                size={60}
                aria-label="Loading Spinner"
                loading={true}
              />

            </>
          )}
        </div>
    
        <div className='allchain'>
          <div className='chainup'>
            <h3>Top Restaurants Chain</h3>
            <div className='btns'>
              <button onClick={() => Scrollhandler('Left')}>
                <FaRegArrowAltCircleLeft />
              </button>
              <button onClick={() => Scrollhandler('Right')}>
                <FaRegArrowAltCircleRight />
              </button>
            </div>
          </div>
    
          <div className='chain' id='Chain' onScroll={(e) => setScroll(e.target.scrollLeft)}>
            {Data.map((e, i) => (
              <div key={i}>
                {e.firm.map((d, j) => (
                  <div className='Details' key={j}>
                    <div className='image'>
                      <img src={`${Api_Path}/uploads/${d.image}`} alt={d.Firmname} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </>
    );
    };
    export default Chains;
    