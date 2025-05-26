import React, { useEffect, useState } from 'react';
import { Api_Path } from '../Pages/Link';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function Productspage() {
  const [data, setdata] = useState([]);
  const [Cart, setCart] = useState();
  const [Count, setCount] = useState({}); // ✅ Initialize as object
  const { Firmid, Firmname } = useParams();

  // Fetch products by firm ID
  async function Products() {
    try {
      const response = await fetch(`${Api_Path}/Product/getprs/${Firmid}`);
      const Resp = await response.json();
      setdata(Resp.products);
    } catch (error) {
      console.log(error);
    }
  }
  console.log("Firmname===>",Firmname)
  // Handle Add to Cart
  async function Carthandler(ProductId, quantity) {
    const UserId = localStorage.getItem('Userid');

    try {
      const Inresp = await fetch(`${Api_Path}/cart/add-Cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserId, ProductId, quantity })
      });

      const Response = await Inresp.json();

      if (!Inresp.ok) {
        alert(Response.msg || "Error adding to cart");
        return;
      }

      if (Response.cart) {
        setCart(Response);

        // Clear firm if cart becomes empty
        if (
          Array.isArray(Response.cart.items) &&
          Response.cart.items.length === 0 &&
          Response.cart.totalPrice === 0 &&
          Response.cart.firm !== null
        ) {
          await UpdateCart();
        }
      }

      alert("Product Added");
    } catch (error) {
      console.log(error);
    }
  }

  // Set cart firm to null
  async function UpdateCart() {
    const UserId = localStorage.getItem('Userid');

    try {
      const response = await fetch(`${Api_Path}/cart/Firm-null/${UserId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
      });

      const Resp = await response.json();

      if (!response.ok) {
        console.error("❌ UpdateCart failed:", Resp);
      }
    } catch (error) {
      console.error("🛑 UpdateCart error:", error);
    }
  }

  useEffect(() => {
    UpdateCart();
    Products();
  }, []);

  // Increment count
  function Increment(id) {
    setCount((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  }

  // Decrement count (minimum 1)
  function Decrement(id) {
    setCount((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));
  }

  return (
    <>
      <Navbar />
      <div className='products'>
        <div className='firmname'>{Firmname}</div>

        {data.map((a) => (
          <div className='items' key={a._id}>
            <div className='Details'>
              <div className='name'><strong>{a.Productname}</strong></div>
              <div className='price'>{a.Price}₹ / only</div>
              <div className='Cat'>{a.Category}</div>
            </div>

            <div className='image'>
              <img src={`${Api_Path}/uploads/${a.image}`} alt={a.Productname} />
              <div className='btn'>
                <button onClick={() => Carthandler(a._id, Count[a._id] || 1)}>ADD To Cart</button>
                <div className='count'>
                  <button onClick={() => Increment(a._id)}>+</button>
                  <h2>{Count[a._id] || 1}</h2>
                  <button onClick={() => Decrement(a._id)}>-</button>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </>
  );
}

export default Productspage;
