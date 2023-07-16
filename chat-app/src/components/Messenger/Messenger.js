import React from 'react';
import Header from '../Header';
import Navbar from '../Navbar';
import './Messenger.scss';
import tong from '../../image/thanhtong.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faVideo, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

function Layout() {
    return (
        <div className="wrapper">
            <div className="Header">
                <Header />
            </div>
            <div className="Container">
                <div className="Navbar">
                    <Navbar />
                </div>
                <div className="Messenger">
                    <div className="chat">
                        <div className="chat__header">
                            <div className="chat__headerInfo">
                                <div className="chat__avatar">
                                    <img src={tong} alt="" />
                                    <span className="chat__name">Nguyễn Văn A</span>
                                </div>
                                <div className="action-icon">
                                    <span className="icon-call">
                                        <FontAwesomeIcon icon={faPhone} style={{ fontSize: '18' }} />
                                    </span>
                                    <span className="icon-call">
                                        <FontAwesomeIcon icon={faVideo} style={{ fontSize: '18' }} />
                                    </span>
                                    <span className="icon-call">
                                        <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '18' }} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="chat__body">
                            <div className="avatar">
                                <img src={tong} alt="" />
                                <div className="content">
                                    <p>hello</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat__footer">
                            <form>
                                <input type="text" placeholder="Type a message" />
                                <button type="submit">Send a message</button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <div className="Contact">
                    <Contact />
                </div> */}
            </div>
        </div>
    );
}

export default Layout;
