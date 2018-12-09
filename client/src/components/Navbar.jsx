import React from 'react';
import AuthButton from './auth/authButton';

const NavigationBar = () => {
  return (
    <div className="navbar bg-info">
      <h1 className="text-white">Chriper App</h1>
      <AuthButton />
    </div>  
  )
}

export default NavigationBar;