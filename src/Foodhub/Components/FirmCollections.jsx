import React, { useEffect, useState } from 'react';
import { Api_Path } from '../Pages/Link';
import { Link } from 'react-router-dom';

function FirmCollections() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('All');

  async function Collection() {
    try {
      const response = await fetch(`${Api_Path}/vendor/Vendor-Rec`);
      const resp = await response.json();
      setData(resp.vendors);
      console.log(resp.vendors);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Collection();
  }, []);

  function filterHandler(region) {
    setFilter(region);
  }

  return (
    <div className="firms">
      <h3>TOP RESTAURANTS IN HYDERABAD</h3>
      <div className='but'>
        <button onClick={() => filterHandler('All')}>All</button>
        <button onClick={() => filterHandler('South-indian')}>South-Indian</button>
        <button onClick={() => filterHandler('North-indian')}>North-Indian</button>
        <button onClick={() => filterHandler('Chinese')}>Chinese</button>
        <button onClick={() => filterHandler('Bekery')}>Bekery</button>
      </div>

      <div className="Firmcollection">
        {data.map((e, f) =>
          e.firm.map((x, y) => {
            if (filter === 'All' || x.Region.includes(filter)) {
              return (
                <Link to={`/products/${x._id}/${x.Firmname}`} key={`${f}-${y}`} className="linked">
                  <div className="coll">
                    <img src={`${Api_Path}/uploads/${x.image}`} alt={x.Firmname} />
                    <div className="Firmoff">{x.Offer}</div>
                    <div className="Firmdetails">
                      <li>{x.Firmname}</li>
                      <li>{x.Region.join(', ')}</li>
                    </div>
                  </div>
                </Link>
              );
            } else {
              return null;
            }
          })
        )}
      </div>
    </div>
  );
}

export default FirmCollections;
