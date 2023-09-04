import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { LightModeContext } from '~/context/lightModeContext';

// import user from '../../image/thanhtong.jpg';

import './header.scss';

import '~/style/lightMode.scss';

const Header = ({setSearchResults}) => {
    const { lightMode } = useContext(LightModeContext);

    const [newAvatar, setNewAvatar] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios
                .get('http://localhost:3000/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const userData = response.data;
                    // setId(userData.id);

                    setNewAvatar(userData.avatar);
                })
                .catch((error) => {
                    console.error('Looix API user:', error);
                });
        }
    }, []);

    const [content, setContent] = useState([]);

    const handleSearch = () => {
        if (content.trim() === "") {
            return console.log("Search không thành công"); // Không gọi API nếu nội dung tìm kiếm rỗng
        }
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get(`http://localhost:3000/article/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const matchingPosts = response.data.filter(post =>
                        post.content.includes(content)
                    );
    
                    if (matchingPosts.length > 0) {
                        setSearchResults(matchingPosts);
                        console.log('Search thành công!', matchingPosts);
                    } else {
                        console.log('Không tìm thấy kết quả phù hợp.');
                    }
                })
                .catch((error) => {
                    console.error('Lỗi API user:', error);
                });
        }
    };

    return (
        <div className={`navbarContainer ${lightMode ? 'light' : 'dark'}`}>
            <div className="navbarLeft">
                <Link to="/layout" style={{ textDecoration: 'none' }}>
                    <span className="logo">TowT</span>
                </Link>
            </div>
            <div className="navbarCenter">
                <div className="searchBar">
                    <SearchIcon className="searchIcon" />
                    <input
                        type="text"
                        placeholder="Search post"
                        className="searchInput"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button className="searchButton" onClick={handleSearch}>
                        Search
                    </button>
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
                            <span className="navbarIconBadge">10</span>
                        </div>
                    </Link>
                    <div className="navbarIconItem">
                        <NotificationsIcon />
                        <span className="navbarIconBadge">9+</span>
                    </div>
                </div>
                <Link to="/profile">
                    <img src={newAvatar} alt="" className="navbarImg" />
                </Link>
            </div>
        </div>
    );
};

export default Header;
