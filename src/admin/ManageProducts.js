import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import {getProducts, deleteProduct} from './apiAdmin';

const ManageProducts = () => {

  const [products, setProducts] = useState([]);

  const {user, token} = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts()
  }, [])

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to dashboard
      </Link>
    </div>
  );

  return (
    <Layout title="Manage Products" description="" className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total Products: {products.length}</h2>
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <Link to={`/product/${p._id}`}>
                  <strong>{p.name}</strong>
                </Link>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <Link to="">
                  <span
                    onClick={() => destroy(p._id)}
                    className="badge badge-danger badge-pill"
                  >
                    Delete
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {goBack()}
    </Layout>
  );
};

export default ManageProducts;