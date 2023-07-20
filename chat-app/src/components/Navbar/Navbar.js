import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { faHeadSideCough } from '@fortawesome/free-solid-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import './Navbar.scss';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        // setAuthenticated(false);
        navigate('/login');
        // toast.success('Đăng xuất thành công');
    };

    return (
        <div className="wrapper">
            <div className="navbar">
                <div className="action">
                    <Link className="icon" to="/layout">
                        <FontAwesomeIcon icon={faHome} />
                        <div className="content">Home</div>
                    </Link>
                    <Link className="icon" to="/layout">
                        <FontAwesomeIcon icon={faUser} />
                        <div className="content">Profile</div>
                    </Link>
                    <Link className="icon" to="/messenger">
                        <FontAwesomeIcon icon={faMessage} />
                        <div className="content">Messengers</div>
                    </Link>
                    <Link className="icon" to="/layout">
                        <FontAwesomeIcon icon={faSearch} />
                        <div className="content">Search</div>
                    </Link>
                    <Link className="icon" to="/layout">
                        <FontAwesomeIcon icon={faRectangleList} />
                        <div className="content">Reels</div>
                    </Link>
                    <Link className="icon" to="/layout">
                        <FontAwesomeIcon icon={faHeadSideCough} />
                        <div className="content">Notifications</div>
                    </Link>
                    <Link className="icon" to="/layout">
                        <FontAwesomeIcon icon={faCertificate} />
                        <div className="content">Create</div>
                    </Link>
                    <Link className="icon" to="/layout">
                        <FontAwesomeIcon icon={faHeadphones} />
                        <div className="content">Exprore</div>
                    </Link>
                    <Link className="icon" to="/layout">
                        <FontAwesomeIcon icon={faCertificate} />
                        <div className="content">Theme</div>
                    </Link>
                    <Link className="icon" to="/layout">
                        <FontAwesomeIcon icon={faHeart} />
                        <div className="content">ThanhTong</div>
                    </Link>
                    <Link className="icon" to="/layout">
                        <FontAwesomeIcon icon={faSmile} />
                        <div className="content">ThienTri</div>
                    </Link>
                    <div className="icon" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <div className="content">Logout</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
