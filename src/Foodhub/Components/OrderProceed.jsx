import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Api_Path, key_id } from '../Pages/Link';

function OrderProceed() {
  const [payRef, setPayRef] = useState(false);
  const [beforePay, setBeforePay] = useState(true);
  const [orderCreated, setOrderCreated] = useState(false);

  const location = useLocation();
  const { userDetails } = location.state || {};

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (orderCreated) return; // Prevent duplicate orders
    setOrderCreated(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const userId = localStorage.getItem('Userid');

    // Create order in your backend
    const orderResponse = await fetch(`${Api_Path}/order/Order-Pr/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails)
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok || !orderData?.order?.totalPrice) {
      console.error("❌ Order placement failed:", orderData);
      return;
    }

    // Create Razorpay order
    const paymentResponse = await fetch(`${Api_Path}/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: orderData.order.totalPrice })
    });

    const paymentData = await paymentResponse.json();

    // Razorpay checkout options
    const options = {
      key: key_id,
      amount: paymentData.amount,
      currency: paymentData.currency,
      name: "Your Store",
      description: "Order Payment",
      order_id: paymentData.id,
      handler: function (response) {
        console.log("✅ Payment success!", response);
        setPayRef(true);
        setBeforePay(false);
      },
      prefill: {
        name: userDetails.fullName,
        email: userDetails.email,
        contact: userDetails.phone
      },
      theme: { color: "#3399cc" },
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <div>
        {beforePay && (
          <div className="before">
            <h3>Would you like to proceed with the payment?</h3>
            <button onClick={handlePayment}>Proceed to Pay</button>
          </div>
        )}

        {payRef && (
          <div>
            <h3>Order Placed 👍</h3>
            <Link to="/">Back to Home</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderProceed;
