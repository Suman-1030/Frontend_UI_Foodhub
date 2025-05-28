import React, { useState } from 'react';

const Data = [
  { id: 1, itemimg: '/items/Southindian.jpg',name: 'South-Indian' },
  { id: 2, itemimg: '/items/Northindian.jpg',name: 'North-Indian' },
  { id: 3, itemimg: '/items/Chinese.jpg',name: 'Chinese' },
  { id: 4, itemimg: '/items/westren.jpg' ,name: 'Westren'},
  { id: 5, itemimg: '/items/Salads.jpg',name: 'Salads' },
];

function ItemsDisplay() {
  const [Showitems, setShowitems] = useState(Data);

  return (
    <div className="items-wrapper">
    <div className="items">
      {Showitems.map((e) => (
        <div key={e.id} className="item-card">
          <div><img src={e.itemimg} alt="item" className="round-img" /></div>
          <div className='itemsname'>{e.name} </div>
        </div>
        
      ))}
    </div>
  </div>
  
  
  );
}

export default ItemsDisplay;
