import React from 'react';

function BeforeLogin({ children }) {
  return (
    <div className="beforelogin">
      <h2>Welcome to FoodHub!</h2>
      {children} {/* <- THIS renders Login or Register form */}
    </div>
  );
}

export default BeforeLogin;
