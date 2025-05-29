import React, { useState, useEffect } from 'react';
import { Api_Path } from '../Pages/Link';
import { Link } from 'react-router-dom';

function Cart() {
  const [Data, setData] = useState([]);
  const [Product, setProduct] = useState([]);

  async function carthandler() {
    const UserId = localStorage.getItem('Userid');
    try {
      // Clear previous product data before fetching new
      setProduct([]);
      
      const Response = await fetch(`${Api_Path}/cart/get-Usercart/${UserId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await Response.json();
      setData(data.cartrec);
      console.log("UserDetails", data.cartrec);
      
      if (data.cartrec?.items) {
        // Create an array of product fetch promises
        const productPromises = data.cartrec.items
          .filter(item => item.product) // Only items with products
          .map(item => productfetch(item.product));
        
        // Wait for all product fetches to complete
        await Promise.all(productPromises);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function productfetch(productId) {
    const Resp = await fetch(`${Api_Path}/Product/Singleproduct/${productId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const ProductResponse = await Resp.json();
    console.log("Fetched ProductResponse:", ProductResponse);
    
    // Use functional update to ensure we're working with latest state
    setProduct(prev => {
      // Check if product already exists to prevent duplicates
      if (!prev.some(p => p._id === ProductResponse.product._id)) {
        return [...prev, ProductResponse.product];
      }
      return prev;
    });
  }

   async function CartDel(UserId,ProductId){

    try{
       const response=await fetch(`${Api_Path}/cart/Del-Cart`,{
        method:'DELETE',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ UserId, ProductId })
       })
       const Resp=await response.json()
       if(response.ok){
        console.log("Deletedproduct",Resp)
        alert("Product removed from cart")
        window.location.reload()
       }
    }

  
    catch(error){
      console.log('error')
    }
   }

   
  useEffect(() => {
    carthandler();
  }, []);

  return (
    <div className='Cart'>
  <h2>Cart</h2>

  {Product.map((e, v) => (
    <div className='items' key={`${e._id}-${v}`}>
      <div className='det'>
        <p className='prname'>Product Name: {e.Productname}</p>
        <p className='prprice'>Price: /{e.Price}₹ Only</p>
        <p>{e.Category[0]}</p>
        <p className='quantity'>
          Quantity: {
            Data.items?.find(item => item.product === e._id)?.quantity || 1
          }
        </p>
      </div>

      <div className='img'>
        <img src={`${Api_Path}/uploads/${e.image}`} alt={e.Productname} />
        <button className='Del' onClick={() => CartDel(localStorage.getItem('Userid'), e._id)}>
          Delete
        </button>
      </div>
    </div>
  ))}
  
  <div className='ord'>

  <div className='total'>Total Price: {Data.totalPrice}</div>

  <Link to={'/order'}>
    <div className='Order'>
      {Data.totalPrice > 0 && <button>Order</button>}
    </div>
  </Link>
</div>
 </div>
  );
}

export default Cart;