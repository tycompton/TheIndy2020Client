import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Checkout = ({products}) => {
  
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  const showCheckoutButton = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Checkout</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to Checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h2>Total: £{financial(getTotal())}</h2>
      {showCheckoutButton()}
    </div>
  );
};

export default Checkout;