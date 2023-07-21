import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Messenger.scss';
import tong from '../../image/thanhtong.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faVideo, faEllipsisV, faSearch, faPlane } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import moment from 'moment';

function Messenger() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000'); // Thay đổi với URL của máy chủ Socket.io của bạn
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
                timestamp: Date.now(), // Lưu thời gian gửi tin nhắn
            };
            socket.emit('sendMessage', newMessage);
            setMessage('');
        }
    };

    return (
        <div className="containerr">
            <div className="search-user">
                <div className="search-user-logo">
                    <Link to="/layout">
                        <img src="" alt="Logo" />
                    </Link>
                </div>
                <div className="search-user-input">
                    <input type="text" placeholder="find your friend" />
                    <FontAwesomeIcon className="search-chat" icon={faSearch} />
                </div>
                <div className="list-user-list">
                    <div className="list-user-item">
                        <div className="list-user-item-avata">
                            <img src={tong} alt="avatars" />
                        </div>
                        <div className="list-user-item-name">Thien Tri</div>
                    </div>
                    <div className="list-user-item">
                        <div className="list-user-item-avata">
                            <img src={tong} alt="avatars" />
                        </div>
                        <div className="list-user-item-name">Thien Tri</div>
                    </div>
                    <div className="list-user-item">
                        <div className="list-user-item-avata">
                            <img src={tong} alt="avatars" />
                        </div>
                        <div className="list-user-item-name">Thien Tri</div>
                    </div>
                </div>
            </div>
            <div className="chat">
                <div className="chat-header">
                    <div className="chat-header-user">
                        <div className="chat-header-user-avatar">
                            <img src={tong} alt="avatars" />
                        </div>
                        <div className="chat-header-user-name">Trần Lê Thiên Trí</div>
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
            </div>
        </div>
    );
}

export default Messenger;
