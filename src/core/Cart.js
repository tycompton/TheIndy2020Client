import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
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
        {/* <h3>Your basket has {`${items.length}`} items</h3> */}
        <h3>Basket</h3>
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
    <h3>
      Your basket is empty <br /> <Link to="/shop">Continue shopping</Link>
    </h3>
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
          <h3 className="mb4">Order Summary</h3>
          <hr />
          <Checkout setRun={setRun} products={items} />
        </div>
      </div>

    </Layout>
  );
};

export default Cart;