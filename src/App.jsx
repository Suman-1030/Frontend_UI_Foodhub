import React from 'react'
import Landingpage from './Foodhub/Pages/Landingpage'
import { Routes,Route } from 'react-router-dom'
import Productspage from './Foodhub/Components/Productspage'
import Cart from './Foodhub/Components/Cart'
import Order from './Foodhub/Components/Order'
import OrderProceed from './Foodhub/Components/OrderProceed'
import Searchproducts from './Foodhub/Components/Searchproducts'
function App() {
  return (
    <div>
      
      <Routes>
            <Route path='/' element={<Landingpage/>}/>
            <Route path='/products/:Firmid/:Firmname' element={<Productspage/>}/>
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/order' element={<Order/>}/>
             
           <Route path="/proceed" element={<OrderProceed />} />
           <Route path="/searchpr/:Data" element={<Searchproducts/>} />

      </Routes>
     
    </div>
  )
}

export default App
