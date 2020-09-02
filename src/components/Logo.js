import React from 'react';

const Logo = props => {
  return (
    <img
      alt="Logo"
      src="/static/images/finallogo.png"
      style={{ maxWidth: '50px' }}
      {...props}
    />
  );
};

export default Logo;
