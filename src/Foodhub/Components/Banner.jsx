import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api_Path } from '../Pages/Link';

function Banner() {
  const [data, setData] = useState('');
  const navigate = useNavigate();

  async function searchHandler() {
    if (!data.trim()) return;

    try {
      const response = await fetch(`${Api_Path}/product/getbyname/${data}`);
      const result = await response.json();

      console.log('API Response:', result); // Should show your "msg" + "name" array

      // Make sure result.name exists and is an array
      if (Array.isArray(result.name)) {
        navigate(`/searchpr/${data}`, { state: { data: result.name } });
      } else {
        console.warn('Invalid response structure');
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  return (
    <div className="banner">
      <div className="searchbar">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Search..."
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button onClick={searchHandler}>Search</button>
      </div>
    </div>
  );
}

export default Banner;
