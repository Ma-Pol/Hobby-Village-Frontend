import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCartItemsPhoto = ({ prodCode, prodName }) => {
  const [prodPicture, setProdPicture] = useState('');

  useEffect(() => {
    axios
      .get(`/carts/getPhoto?prodCode=${prodCode}`)
      .then((res) => {
        setProdPicture(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [prodCode]);

  return (
    <div>
      <img
        src={'http://localhost:8080/carts/viewImage/' + prodPicture}
        alt={prodName}
        style={{
          align: 'center',
          mr: 3,
          width: '120px',
          height: '120px',
        }}
      />
    </div>
  );
};

export default UserCartItemsPhoto;
