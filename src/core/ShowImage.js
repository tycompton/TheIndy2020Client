import React from 'react';
import { API } from '../config';

const ShowImage = ({item, url}) => {

  return (
    <div 
      className="product-img" 
      // style={{ width: "100%", height: "300px"}}
      // preserveAspectRatio="xMidYMid slice"
    >
      <img
        src={`${API}/${url}/image/${item._id}`}
        alt={item.name}
        className="mb-3"
        // style={{ maxHeight: "100%", maxWidth: "100%" }}
        style={{ maxWidth: "100%", maxHeight: "100%"}}
        preserveAspectRatio="xMidYMid slice"
      />
    </div>
  );

};

export default ShowImage;