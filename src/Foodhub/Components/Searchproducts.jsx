import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Api_Path } from '../Pages/Link';

function Searchproducts() {
  const location = useLocation();
  const data = location.state?.data || [];

  const [Counter, setCounter] = useState({});

  function Increment(id) {
    setCounter((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function Decrement(id) {
    setCounter((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
  }

  async function ProductToCart(ProductId, quantity) {
    const UserId = localStorage.getItem('Userid');
    try {
      const Response = await fetch(`${Api_Path}/cart/add-Cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserId, ProductId, quantity }),
      });
  
      const result = await Response.json();
  
      if (!Response.ok) {
        if (result.msg === 'Products from different restaurants cannot be added to the cart') {
          alert("Products from different restaurants cannot be added to the cart");
        } else {
          alert("Something went wrong. Please try again.");
        }
        return; // stop further execution
      }
  
      alert("Product added to cart");
      console.log("Cart response:", result);
  
    } catch (error) {
      console.log(error);
      alert("Network error or server not responding.");
    }
  }
  

  return (
    <div className='ProductSearch'>
      <h2>Search Results</h2>
      <div>
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className='prodclass' style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
              <h3>{item.Productname}</h3>
              <p>Price: ₹{item.Price}</p>
              <p>{item.Category[0]}</p>
              <img
                src={`${Api_Path}/uploads/${item.image}`}
                alt={item.Productname}
                style={{ width: '150px', height: '100px', objectFit: 'cover' }}
              />
              <div className='ptbtn'>

                <div className='count'>
                  <button onClick={() => Decrement(item._id)}>-</button>
                  <h2>{Counter[item._id] || 0}</h2>
                  <button onClick={() => Increment(item._id)}>+</button>
                </div>

                <div>
                  <button onClick={() => ProductToCart(item._id, Counter[item._id] || 0)}>ADD TO CART</button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Searchproducts;
