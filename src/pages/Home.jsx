import React from 'react';

// Widget component
const Widget = ({ children }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', margin: '10px', borderRadius: '5px' }}>
      {children}
    </div>
  );
};

// Home component
export const Home = () => {
  return (
    <div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap' ,justifyContent:'center'}}>
        <Widget>
          <h3>Home Page</h3>
          <p>Will Be available Soon</p>
        </Widget>
      </div>
    </div>
  );
};

export default Home;
