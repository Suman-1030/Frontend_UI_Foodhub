import React, { useState } from 'react';

const Data = [
  { id: 1, itemimg: '/items/Southindian.jpg' },
  { id: 2, itemimg: '/items/Northindian.jpg' },
  { id: 3, itemimg: '/items/Chinese.jpg' },
  { id: 4, itemimg: '/items/westren.jpg' },
  { id: 5, itemimg: '/items/Salads.jpg' },
];

function ItemsDisplay() {
  const [Showitems, setShowitems] = useState(Data);

  return (
    <div className='items'>
      <div>
        {Showitems.map((e) => {
          return (
            <div key={e.id} className="item-card">
              <img src={e.itemimg} alt="item" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemsDisplay;
