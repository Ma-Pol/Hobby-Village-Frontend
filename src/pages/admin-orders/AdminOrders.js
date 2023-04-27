import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminOrdersLists from './AdminOrdersLists';
import AdminOrdersDetails from './AdminOrdersDetails';

const AdminOrders = () => {
  return (
    <Routes>
      <Route path="/m/orders/lists" element={<AdminOrdersLists />} />
      <Route
        path="/m/orders/details/:odrCode"
        element={<AdminOrdersDetails />}
      />
    </Routes>
  );
};

export default AdminOrders;
