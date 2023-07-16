// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...props }) => {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? (
        <Route {...props} element={element} />
    ) : (
        <Navigate to="/login" replace state={{ from: props.location.pathname }} />
    );
};

export default ProtectedRoute;
