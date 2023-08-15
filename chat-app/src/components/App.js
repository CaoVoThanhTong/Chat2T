// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './Header';
import Messenger from './Messenger';
import Login from './Login';
import Register from './Register';
import Layout from './Layout/layout';
import Navbar from './Navbar';
import Contact from './Contact';
import Profile from '~/Profile';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
                <Route path="/register" element={<Register />} />

                {authenticated ? (
                    <>
                        <Route path="/layout" element={<Layout />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/messenger" element={<Messenger />} />
                        <Route path="/profile" element={<Profile />} />
                        {/* <Route path="/header" element={<Header />} /> */}
                        <Route path="/navbar" element={<Navbar />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" replace />} />
                )}
            </Routes>
        </Router>
    );
};

export default App;
