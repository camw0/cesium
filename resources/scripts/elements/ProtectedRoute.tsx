import React from 'react';
import { Outlet } from 'react-router';
import { useStoreState } from '../state/hooks';
import { Navigate, useLocation } from 'react-router';

export default () => {
    const location = useLocation();
    const isAuthenticated = useStoreState(state => !!state.user.data!.email);

    return (
        isAuthenticated ? <Outlet /> : <Navigate to={'/auth/login'} state={{ from: location.pathname }} />
    );
};