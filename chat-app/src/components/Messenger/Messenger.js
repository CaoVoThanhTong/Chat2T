import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Messenger.scss';
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

    const [unreadMessageCounts, setUnreadMessageCounts] = useState({});

    const token = localStorage.getItem('token');

    useEffect(() => {
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
                .catch((error) => console.error('Error:', error));
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            const socket = io.connect('http://localhost:3000', {
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSocket(socket);

            return () => {
                socket.disconnect();
            };
        }
    }, [token]);

    useEffect(() => {
        if (socket) {
            socket.on('allOldMessages', (payload) => {
                console.log('Received old message:', payload.msg);
                setMessages((prevMessages) => [...prevMessages, payload]);
            });
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            const handleNewMessage = (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);

                setUnreadMessageCounts((prevCounts) => ({
                    ...prevCounts,
                    [message.sendID]: (prevCounts[message.sendID] || 0) + 1,
                }));
                console.log('Received new message:', message);
            };

            socket.on('newMessage', handleNewMessage);

            return () => {
                socket.off('newMessage', handleNewMessage);
            };
        }
    }, [socket]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submit button clicked');

        if (socket && selectedUser && message.trim() !== '') {
            try {
                const meResponse = await fetch('http://localhost:3000/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const newMessage = {
                    msg: message,
                    sendTime: Date.now(),
                };

                console.log(newMessage);

                const meData = await meResponse.json();
                const myID = meData.id;

                const roomName = myID <= selectedUser.id ? `${myID}-${selectedUser.id}` : `${selectedUser.id}-${myID}`;

                socket.emit('sendMessage', {
                    roomName,
                    idMe: myID,
                    idReceiver: selectedUser.id,
                    msg: message,
                });

                console.log('test id', myID);
                setMessage('');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);

        if (value.trim() === '') {
            setSearchResults(userList);
        } else {
            const filteredResults = userList.filter((user) =>
                user.userName.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredResults);
        }
    };

    const handleUserClick = async (selectedUserID) => {
        try {
            const response = await fetch(`http://localhost:3000/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const me = await response.json();
            const selectedUser = searchResults.find((user) => user.id === selectedUserID);
            setSelectedUser(selectedUser);

            if (socket && selectedUser) {
                const roomName = `${
                    me.id <= selectedUserID ? `${me.id}-${selectedUserID}` : `${selectedUserID}-${me.id}`
                }`;

                console.log('join room:', roomName);
                socket.emit('joinRoom', roomName);
                socket.emit('oldMessages', { idMe: me.id, idReceiver: selectedUserID });
            }
            setMessages([]);

            const userItems = document.querySelectorAll('.list-user-item');
            userItems.forEach((item) => {
                item.classList.remove('active');
            });

            const selectedUserItem = document.querySelector(`.list-user-item[data-user-id="${selectedUserID}"]`);
            if (selectedUserItem) {
                selectedUserItem.classList.add('active');
            }

            setUnreadMessageCounts((prevCounts) => ({
                ...prevCounts,
                [selectedUserID]: 0,
            }));
        } catch (error) {
            console.error('Error fetching user details:', error);
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
                        <div className="list-user-item" data-user-id={user.id} onClick={() => handleUserClick(user.id)}>
                            <div className="unread-badge">{unreadMessageCounts[user.id] || 0}</div>
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
                                        className={`chat-body-message-item ${
                                            (msg.un && msg.un === selectedUser.id) ||
                                            (msg.sendID && msg.sendID === selectedUser.id)
                                                ? 'my-message'
                                                : (msg.recID && msg.recID === selectedUser.id) ||
                                                  (msg.un && msg.un !== selectedUser.id)
                                                ? 'other-message'
                                                : 'my-message'
                                        }`}
                                        key={index}
                                    >
                                        <div className="chat-body-message-item-message">
                                            {msg.msg ? msg.msg : msg.ms}

                                            <div className="chat-body-message-item-time">
                                                <div className="chat-body-message-item-time">
                                                    {moment(msg.sendTime).format(
                                                        moment(msg.sendTime).isSame(moment(), 'day')
                                                            ? 'HH:mm'
                                                            : 'DD/MM/YYYY HH:mm',
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {console.log('msg.myID:', msg.myID)}
                                        {console.log('msg.recID:', msg.recID)}
                                        {console.log('msg.sendID:', msg.sendID)}
                                        {console.log('msg.un:', msg.un)}
                                        {console.log('selectedUser.id:', selectedUser.id)}
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
                    <div className="chat-placeholder">Chọn một người dùng để bắt đầu cuộc trò chuyện.</div>
                )}
            </div>
        </div>
    );
}

export default Messenger;
