import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelpers';
// import Moment from 'moment';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToBasketButton = true,
  cartUpdate = false, 
  showRemoveProductButton = false,
  setRun = f => f, // default value of function
  run = undefined // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToBasket = (showAddToBasketButton) => {
    return (
      showAddToBasketButton && (
        <button
          onClick={addToCart}
          className="btn btn-pill btn-secondary btn-block mt-2 mb-2"
        >
          Add to Basket
        </button>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-pill btn-danger btn-block mt-2 mb-2"
        >
          Remove Item
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-info badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
    );
  };

  // const handleChange = (productId) => (event) => {
  //   setCount(event.target.value < 1 ? 1 : event.target.value);
  //   if (event.target.value >= 1) {
  //     updateItem(productId, event.target.value);
  //   }
  // };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return cartUpdate && 
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input 
            type="number" 
            className="form-control" 
            value={count} 
            onChange={handleChange(product._id)}
          />
        </div>
      </div>;
  };
 
  return (
    <div className="card text-center">
      <div className="card-header">
        <strong>{product.brewery.name}</strong>
      </div>
      <div className="card-body">
        {/* {shouldRedirect(redirect)} */}
        <h5 className="class-title mb-3"><strong>{product.name}</strong></h5>
        <Link to={`/product/${product._id}`}>
          <ShowImage item={product} url="product" alt="product image" />
        </Link>

        {/* <p className="lead mt-2">{product.description}</p> */}

        <p>£{product.price} {showStock(product.quantity)}</p>

        {/* <p>{product.category && product.category.name}</p> */}

        {/* Show Date Added */}
        {/* <p>Added {Moment(product.createdAt).fromNow()}</p> */}

        {/* Conditionally Show View Product Button */}
        {/* {showViewButton(showViewProductButton)} */}

        {/*Conditionally Show Add To Basket Button */}
        {showAddToBasket(showAddToBasketButton)}

        {showCartUpdateOptions(cartUpdate)}

        {showRemoveButton(showRemoveProductButton)}
      </div>
    </div>    
  );
};

export default Card;