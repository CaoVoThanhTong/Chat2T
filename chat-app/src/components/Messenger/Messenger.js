import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Messenger.scss';
// import tong from '../../image/thanhtong.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faVideo, faEllipsisV, faSearch, faPlane } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import logoo from '~/image/logo.png';
import moment from 'moment';

function Messenger() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    const [userList, setUserList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios
                .get('http://localhost:3000/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUserList(response.data);
                    setSearchResults(response.data);
                })
                .catch((error) => console.error('Lỗi:', error));
        }
    }, []);

    useEffect(() => {
        const newSocket = io('http://localhost:5001');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('receiveMessage', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }
    }, [socket]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message.trim() !== '') {
            const newMessage = {
                text: message,
                timestamp: Date.now(),
            };
            socket.emit('sendMessage', newMessage);
            setMessage('');
        }
    };

    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);

        if (value.trim() === '') {
            setSearchResults(userList);
        } else {
            const filteredResults = userList.filter((user) =>
                user.userName.toLowerCase().includes(value.toLowerCase()),
            );
            setSearchResults(filteredResults);
        }
    };

    return (
        <div className="containerr">
            <div className="search-user">
                <div className="search-user-logo">
                    <Link to="/layout">
                        <img src={logoo} alt="Logo" />
                    </Link>
                </div>
                <div className="search-user-input">
                    <input
                        type="text"
                        placeholder="find your friend"
                        value={searchValue}
                        onChange={handleSearchInputChange}
                    />
                    <FontAwesomeIcon className="search-chat" icon={faSearch} />
                </div>
                <div className="list-user-list">
                    {searchResults.map((user) => (
                        <div className="list-user-item" key={user.id} onClick={() => handleUserClick(user)}>
                            <div className="list-user-item-avata">
                                <img src={user.avatar} alt="avatars" />
                            </div>
                            <div className="list-user-item-name">{user.userName}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chat">
                {selectedUser ? (
                    <React.Fragment>
                        <div className="chat-header">
                            <div className="chat-header-user">
                                <div className="chat-header-user-avatar">
                                    <img src={selectedUser.avatar} alt="avatars" />
                                    {/* <img src={tong} alt="avatars" /> */}
                                </div>
                                <div className="chat-header-user-name">{selectedUser.userName}</div>
                                <div className="chat-header-user-action">
                                    <FontAwesomeIcon className="icon-chat" icon={faPhone} />
                                    <FontAwesomeIcon className="icon-chat" icon={faVideo} />
                                    <FontAwesomeIcon className="icon-chat" icon={faEllipsisV} />
                                </div>
                            </div>
                        </div>
                        <div className="chat-body">
                            <div className="chat-body-message">
                                {messages.map((msg, index) => (
                                    <div
                                        className={`chat-body-message-item ${msg.isMyMessage ? 'my-message' : ''}`}
                                        key={index}
                                    >
                                        <div className="chat-body-message-item-message">{msg.text}</div>
                                        <div className="chat-body-message-item-time">
                                            {moment(msg.timestamp).format('HH:mm')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="chat-footer">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={handleMessageChange}
                                    placeholder="Type a message..."
                                />
                                <button type="submit">
                                    <FontAwesomeIcon icon={faPlane} />
                                </button>
                            </form>
                        </div>
                    </React.Fragment>
                ) : (
                        <div className="chat-placeholder">
                            Chọn một người dùng để bắt đầu cuộc trò chuyện.
                        </div>
                )}
            </div>
        </div>
    );
}

export default Messenger;
