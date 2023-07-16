import React, { useState } from 'react';
import './Contact.scss';
// import './Modal.scss';
import tong from '../../image/thanhtong.jpg';

const Contact = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div className="wrapper">
            <div className="contact">
                <div className="contact-title">
                    <h3>Contacts</h3>
                </div>
                <div className="contact-list">
                    <div className="contact-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                        {isHovered && (
                            <div className="modal">
                                <div className="modal-content">
                                    <img src={tong} alt="" />
                                    <h4>Cao Võ Thanh Tòng</h4>
                                    <p>
                                        Là một con người luôn biết nghĩ cho người khác Là một con người luôn biết nghĩ
                                        cho người khác
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="contact-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                        {isHovered && (
                            <div className="modal">
                                <div className="modal-content">
                                    <img src={tong} alt="" />
                                    <h4>Cao Võ Thanh Tòng</h4>
                                    <p>Bio của bạn ở đây</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-avatar">
                            <img src={tong} alt="" />
                        </div>
                        <div className="contact-info">
                            <div className="contact-name">
                                <h4>Cao Võ Thanh Tòng</h4>
                            </div>
                            <div className="contact-message">
                                <p>Đang hoạt động</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
