import React, {useState, useContext } from 'react';
import Header from '../Header';
import Navbar from '../Navbar';
import Home from '../Home';
import Contact from '../Contact';
import Upload from '../Upload';
import './Layout.scss';
import { LightModeContext } from '~/context/lightModeContext';

function Layout() {

    const { lightMode } = useContext(LightModeContext);

    const [searchResults, setSearchResults] = useState([]);
    return (
        <div className={`wrapper ${lightMode ? 'light' : 'dark'}`}>
            <div className="Header">
            <Header setSearchResults={setSearchResults} />
            </div>
            <div className="Container">
                <div className="Navbar">
                    <Navbar />
                </div>
                <div className="Home">
                    <Upload />
                    <Home searchResults={searchResults} />
                </div>
                <div className="Contact">
                    <Contact />
                </div>
            </div>
        </div>
    );
}

export default Layout;
