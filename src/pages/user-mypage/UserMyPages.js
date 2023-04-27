import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyPagesOrders from './MyPagesOrders';
import MyPagesRequests from './MyPagesRequests';
import MyPagesAddressesLists from './MyPagesAddressesLists';
import MyPagesAddressesCreate from './MyPagesAddressesCreate';
import MyPagesAddressesModify from './MyPagesAddressesModify';

const UserMyPages = () => {
  return (
    <Routes>
      <Route path="/mypages/:email/orders" element={<MyPagesOrders />} />
      <Route
        path="/mypages/:email/requests/lists"
        element={<MyPagesRequests />}
      />
      <Route
        path="/mypages/:email/addresses/lists"
        element={<MyPagesAddressesLists />}
      />
      <Route
        path="/mypages/:email/addresses/create"
        element={<MyPagesAddressesCreate />}
      />
      <Route
        path="/mypages/:email/addresses/modify"
        element={<MyPagesAddressesModify />}
      />
    </Routes>
  );
};

export default UserMyPages;
