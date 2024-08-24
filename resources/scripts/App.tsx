import React from 'react';
import Layout from './elements/Layout';
import Login from './pages/auth/Login';
import ProtectedRoute from './elements/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './state';

interface ExtendedWindow extends Window {
    AuthenticatedUser?: {
        name: string;
        email: string;
        avatar: string;
        discord_id: number;
        created_at: Date;
        updated_at: Date;
    };
}

function App () {
    const { AuthenticatedUser } = window as ExtendedWindow;

    if (AuthenticatedUser && !store.getState().user.data) {
        store.getActions().user.setUserData({
            name: AuthenticatedUser.name,
            email: AuthenticatedUser.email,
            avatar: AuthenticatedUser.avatar,
            discordId: AuthenticatedUser.discord_id,
            createdAt: new Date(AuthenticatedUser.created_at),
            updatedAt: new Date(AuthenticatedUser.updated_at),
        });
    }

    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path={'/'} element={<>Secure Route</>} />
                    </Route>
                    <Route path={'/auth/login'} element={<Login />} />
                    <Route path={'*'} element={<>Not Found</>} />
                </Routes>
            </BrowserRouter>
        </Layout>
    );
};

export { App };
