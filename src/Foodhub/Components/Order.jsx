import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Order() {

const navigate=useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('');

  const indianStates = {
    AN: "Andaman and Nicobar Islands",
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CG: "Chhattisgarh",
    CH: "Chandigarh",
    DN: "Dadra and Nagar Haveli and Daman and Diu",
    DL: "Delhi",
    GA: "Goa",
    GJ: "Gujarat",
    HR: "Haryana",
    HP: "Himachal Pradesh",
    JH: "Jharkhand",
    JK: "Jammu and Kashmir",
    KA: "Karnataka",
    KL: "Kerala",
    LA: "Ladakh",
    LD: "Lakshadweep",
    MP: "Madhya Pradesh",
    MH: "Maharashtra",
    MN: "Manipur",
    ML: "Meghalaya",
    MZ: "Mizoram",
    NL: "Nagaland",
    OD: "Odisha",
    PB: "Punjab",
    PY: "Puducherry",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TN: "Tamil Nadu",
    TS: "Telangana",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UK: "Uttarakhand",
    WB: "West Bengal"
  };

  const worldCountries = {
    AF: "Afghanistan", AL: "Albania", DZ: "Algeria", AD: "Andorra",
    AO: "Angola", AR: "Argentina", AM: "Armenia", AU: "Australia",
    AT: "Austria", AZ: "Azerbaijan", BD: "Bangladesh", BE: "Belgium",
    BR: "Brazil", CA: "Canada", CN: "China", CO: "Colombia",
    DK: "Denmark", EG: "Egypt", FI: "Finland", FR: "France",
    DE: "Germany", GR: "Greece", IN: "India", ID: "Indonesia",
    IR: "Iran", IQ: "Iraq", IE: "Ireland", IL: "Israel",
    IT: "Italy", JP: "Japan", JO: "Jordan", KE: "Kenya",
    KR: "South Korea", KW: "Kuwait", LB: "Lebanon", MY: "Malaysia",
    MX: "Mexico", NP: "Nepal", NL: "Netherlands", NZ: "New Zealand",
    NG: "Nigeria", NO: "Norway", PK: "Pakistan", PH: "Philippines",
    PL: "Poland", PT: "Portugal", QA: "Qatar", RU: "Russia",
    SA: "Saudi Arabia", SG: "Singapore", ZA: "South Africa",
    ES: "Spain", SE: "Sweden", CH: "Switzerland", SY: "Syria",
    TH: "Thailand", TR: "Turkey", UA: "Ukraine", AE: "UAE",
    GB: "United Kingdom", US: "United States", VN: "Vietnam",
    YE: "Yemen", ZW: "Zimbabwe"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      fullName:name,
      email,
      phone,
      street,
      city,
      state,
      country
    };
    navigate('/proceed', { state: { userDetails } });
    console.log("User Details Submitted:", userDetails);
    alert('Redirect to Payment Section ?')
    
  };

  return (
    <div className='UserForm'>
      <form onSubmit={handleSubmit}>
        <div>
        <label>Full Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

         <div>
        <label>Phone</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <div>
        <label>Street</label>
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
        </div>
         
        <div>
        <label>City</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>

        <div>
        <label>State</label>
        <select value={state} onChange={(e) => setState(e.target.value)} required>
          <option value="">-- Select State --</option>
          {Object.entries(indianStates).map(([code, name]) => (
            <option key={code} value={name}>{name}</option>
          ))}
        </select>
          </div>

         <div>
        <label>Country</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)} required>
          <option value="">-- Select Country --</option>
          {Object.entries(worldCountries).map(([code, name]) => (
            <option key={code} value={name}>{name}</option>
          ))}
        </select>
          </div>
        
        <button type="submit ">Submit to pay</button>
        
      </form>
    </div>
  );
}

export default Order;
