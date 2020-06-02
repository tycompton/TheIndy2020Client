import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
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
    // make request to api to create category
    createCategory(user._id, token, {name}).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setTimeout(() => window.location.reload(), 2000);
        return () => clearTimeout();
      }
    });
  };

  const newCategoryForm = () => (
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
      <button className="btn btn-primary">
        Create Style
      </button>
    </form>
  )

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} created successfully!</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{name} is aleady a style</h3>;
    }
  };

  const reloadWindow = () => {
    window.location.reload();
  }

  const cancelButton = () => (
    <button 
      className="btn btn-secondary mt-3"
      onClick={reloadWindow}
    >
      Cancel
    </button>
  )

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add Style"
      description={`Hi ${user.name}, let's add a new category, shall we?`}
    >
      <div className="row">
        <div 
          className="col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {newCategoryForm()}
            {cancelButton()}
            {goBack()}
        </div>
      </div>
    </Layout>
  );

};

export default AddCategory;