import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = () => {

  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart())
  }, [run])

  const showItems = (items) => {
    return (
      <div>
        <h2>Your basket has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card 
            key={i} 
            product={product} 
            showAddToBasketButton={false}
            cartUpdate={true}
            showRemoveProductButton={true} 
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your basket is empty <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Checkout"
      description=""
      className="container-fluid"
    >
    
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage() }
        </div>
        <div className="col-6">
          <h2 className="mb4">Your Basket Summary</h2>
          <hr />
          <Checkout setRun={setRun} products={items} />
        </div>
      </div>

    </Layout>
  );
};

export default Cart;