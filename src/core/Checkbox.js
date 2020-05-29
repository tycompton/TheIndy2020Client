import React, { useState, useEffect } from 'react';

const CheckBox = ({ categories, handleFilters }) => {

  const [checked, setChecked] = useState([])

  const handleToggle = category => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(category) 
    const newCheckedCategoryId = [...checked]
    // if currently checked was not already in checked state > push
    // else pull/take off
    if(currentCategoryId === -1) {
      newCheckedCategoryId.push(category)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    // console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  }

  return categories.map((category, i) => (
    <li key={i} className="list-styled">
      <input 
        onChange={handleToggle(category._id)} 
        type="checkbox"
        value={checked.indexOf(category._id === -1)} 
        className="form-check-input" />
      <label className="form-check-label">{category.name}</label>
    </li>
  ));
};

export default CheckBox;