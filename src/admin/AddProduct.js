import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories, getBreweries, getAll } from './apiAdmin';

const AddProduct = () => {

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    breweries: [],
    brewery: "",
    delivery: "",
    quantity: "",
    image: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    category,
    breweries,
    brewery,
    delivery,
    quantity,
    image,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // load categories and set form data
  // const initCategories = () => {
  //   getCategories().then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setValues({ ...values, categories: data, formData: new FormData() });
  //       console.log(data);
  //     }
  //   });
  // };

  // load breweries and set form data
  // const initBreweries = () => {
  //   getBreweries().then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setValues({ ...values, breweries: data, formData: new FormData() });
  //       console.log(data);
  //     }
  //   });
  // };

  const init = () => {
    getAll().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ 
          ...values, 
          categories: data[0],
          breweries: data[1], 
          formData: new FormData() });
        // console.log(data);
      }
    });
  };
 
  useEffect(() => {
    init(); 
  }, []);


  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          image: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
        setTimeout(() => window.location.reload(), 2000);
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4> Add Image</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("image")}
            type="file"
            className="image"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Brewery</label>
        <select onChange={handleChange("brewery")} className="form-control">
          <option>Select brewery</option>
          {breweries &&
            breweries.map((brewery, i) => <option key={i} value={brewery._id}>{brewery.name}</option>)};
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          defaultValue={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          defaultValue={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          defaultValue={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Select category</option>
          {categories &&
            categories.map((c, i) => <option key={i} value={c._id}>{c.name}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          defaultValue={quantity}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Delivery</label>
        <select onChange={handleChange("delivery")} className="form-control">
          <option>Select option</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>

      <button className="btn btn-primary">Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} created successfully!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );
  
  const reloadWindow = () => {
    window.location.reload();
  }

  const cancelButton = () => (
    <button 
      className="btn btn-secondary mt-2"
      onClick={reloadWindow}
    >
      Cancel
    </button>
  )

  const goBack = () => (
    <div className="mt-5 mb-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add Product"
      description={`Hi ${user.name}, let's add a new product, shall we?`}
    >
      <div className="row">
        <div 
          className="col-md-8 offset-md-2">
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newPostForm()}
            {cancelButton()}
            {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
