import React, { useState, useEffect } from 'react';
import './Contact.scss';
import axios from 'axios';
// import tong from '../../image/thanhtong.jpg';

const Contact = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredUserId, setHoveredUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    const handleMouseEnter = (userId) => {
        setIsHovered(true);
        setHoveredUserId(userId);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setHoveredUserId(null);
    };

    useEffect(() => {
        const apiUrl = 'http://localhost:3000/user';

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get(apiUrl, config)
            .then(response => {
                const usersData = response.data;
                setAllUsers(usersData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        if (hoveredUserId && isHovered) {
            const apiUrl = `http://localhost:3000/user/${hoveredUserId}`; // Đổi thành URL API cụ thể

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            axios
                .get(apiUrl, config)
                .then(response => {
                    const user = response.data;
                    setUserData(user);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [hoveredUserId, isHovered]);

    return (
        <div className="wrapper">
            <div className="contact">
                <div className="contact-title">
                    <h3>Contacts</h3>
                </div>
                <div className="contact-list">
                    {allUsers.map(user => (
                        <div
                            key={user.id}
                            className="contact-item"
                            onMouseEnter={() => handleMouseEnter(user.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="contact-avatar">
                                <img src={user.avatar} alt="" />
                            </div>
                            <div className="contact-info">
                                <div className="contact-name">
                                    <h4>{user.userName}</h4>
                                </div>
                                <div className="contact-message">
                                    <p>Đang hoạt động</p>
                                </div>
                            </div>
                            {isHovered && hoveredUserId === user.id && userData && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <img src={userData.avatar} alt="" />
                                        <h4>{userData.userName}</h4>
                                        <p>{userData.bio}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;
