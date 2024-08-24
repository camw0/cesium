import React from 'react';
import { Outlet } from 'react-router';
import { Navigate } from 'react-router';

export default () => {
    const isAuthenticated = false; // todo: match this to state

    return (
        isAuthenticated ? <Outlet /> : <Navigate to={'/auth/login'} />
    );
};