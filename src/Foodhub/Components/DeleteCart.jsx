import React, { useEffect } from 'react'

function DelCart() {

async function DeleteCart(){
     const UserId=localStorage.getItem('Userid')
    try{
       const response=await fetch(`${Api_Path}/cart/Del-UserCart/${UserId}`,{
        method:'DELETE',
        headers:{"ContentType":"application/json"},
        body:{UserId}
       })
       const Resp=await response.json()
       if(response.ok){
        console.log("DeletedCart",Resp)
        alert("Cart Deleted")
       }
    }
    catch(error){
      console.log(error)
    } 
}
useEffect(()=>{
    
})


  return (
    <div>
     
    </div>
  )
}

export default DelCart
