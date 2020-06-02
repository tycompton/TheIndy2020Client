import React, { useState } from 'react';

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleFilters(e.target.value)
    setValue(e.target.value)
  };

  return prices.map((price, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        type="radio"
        name={price}
        value={`${price._id}`}
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{price.name}</label>
    </div>
  ));
};

export default RadioBox;