import React, { useContext } from 'react';
import Header from '../Header';
import Navbar from '../Navbar';
import Home from '../Home';
import Contact from '../Contact';
import Upload from '../Upload';
import './Layout.scss';
import { LightModeContext } from '~/context/lightModeContext';

function Layout() {

    const { lightMode } = useContext(LightModeContext);


    return (
        <div className={`wrapper ${lightMode ? 'light' : 'dark'}`}>
            <div className="Header">
                <Header />
            </div>
            <div className="Container">
                <div className="Navbar">
                    <Navbar />
                </div>
                <div className="Home">
                    <Upload />
                    <Home />
                </div>
                <div className="Contact">
                    <Contact />
                </div>
            </div>
        </div>
    );
}

export default Layout;
