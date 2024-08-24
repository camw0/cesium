import './app.css';
import React from 'react';
import Layout from './elements/Layout';
import Login from './pages/auth/Login';
import { createRoot } from 'react-dom/client';
import ProtectedRoute from './elements/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Layout>
        <Router>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path={'/'} element={<>Secure Route</>} />
                </Route>
                <Route path={'/auth/login'} element={<Login />} />
                <Route path={'*'} element={<>Not Found</>} />
            </Routes>
        </Router>
        </Layout>
    </React.StrictMode>
);
