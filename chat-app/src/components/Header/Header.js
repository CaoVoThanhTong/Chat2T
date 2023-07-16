import React from 'react';
// import { Tooltip } from 'react-tippy';
// import 'react-tippy/dist/tippy.css';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';

import user from '../../image/thanhtong.jpg';

import './header.scss';

const Navbar = () => {
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <Link to="/header" style={{ textDecoration: 'none' }}>
                    <span className="logo">TowT</span>
                </Link>
            </div>
            <div className="navbarCenter">
                <div className="searchBar">
                    <SearchIcon className="searchIcon" />
                    <input type="text" placeholder="Search post" className="searchInput" />

                    <button className="searchButton">Search</button>
                </div>
            </div>
            <div className="navbarRight">
                <div className="navbarLinks">
                    <span className="navbarLink">ThienTris</span>
                    <span className="navbarLink">ThanhTongf</span>
                </div>
                <div className="navbarIcons">
                    <div className="navbarIconItem">
                        <PersonIcon />
                        <span className="navbarIconBadge">2</span>
                    </div>
                    <Link to="/Messenger">
                        <div className="navbarIconItem">
                            <ChatBubbleIcon style={{ color: 'fff' }} />
                            {/* <span className="navbarIconBadge">10</span> */}
                        </div>
                    </Link>
                    <div className="navbarIconItem">
                        <NotificationsIcon />
                        <span className="navbarIconBadge">9+</span>
                    </div>
                </div>
                <Link to="/profile">
                    <img src={user} alt="" className="navbarImg" />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;