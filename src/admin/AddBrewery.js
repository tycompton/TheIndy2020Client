import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createBrewery } from './apiAdmin';

const AddBrewery = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  // destructure user and token from local storage
  const {user, token} = isAuthenticated()

  const handleChange = (e) => {
    setError('')
    setName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
  }

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create brewery
    createBrewery(user._id, token, {name}).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newBreweryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input 
          type="text" 
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">
        Create Brewery
      </button>
    </form>
  )

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{name} is already a brewery</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add Category"
      description={`Hi ${user.name}, let's add a new category, shall we?`}
    >
      <div className="row">
        <div 
          className="col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {newBreweryForm()}
            {goBack()}
        </div>
      </div>
    </Layout>
  );

};

export default AddBrewery;