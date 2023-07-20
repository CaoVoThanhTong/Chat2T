import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Comment, Close, Favorite, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Navbar from '~/components/Navbar';
import Contact from '~/components/Contact';
import logo from '~/image/thanhtong.jpg';
import './Profile.scss';

function Profile() {
    const [name, setName] = useState('Cao Vo Thanh Tong');
    const [bio, setBio] = useState('Thanh Tòng đẹp trai vãi');
    const [isEditing, setIsEditing] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleProfileUpdate = () => {
        // Thực hiện cập nhật thông tin hồ sơ vào cơ sở dữ liệu tại đây (tùy thuộc vào cách bạn triển khai cơ sở dữ liệu)
        console.log('Updated Name:', name);
        console.log('Updated Bio:', bio);
        // Có thể gọi API để cập nhật thông tin hồ sơ vào cơ sở dữ liệu của bạn ở đây.

        // Khi cập nhật xong, đặt trạng thái chỉnh sửa về false để thoát chế độ chỉnh sửa
        setIsEditing(false);
    };

    return (
        <div className="wrapper">
            <div className="info__left">
                <div className="logo__info">
                    <Link to="/layout">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>
                <Navbar />
            </div>
            <div className="info__center">
                <div className="info">
                    <div className="info__avatar">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="info__content">
                        {isEditing ? (
                            <input type="text" value={name} onChange={handleNameChange} className="profileInput" />
                        ) : (
                            <div className="info__name">
                                {name}
                                <IconButton className="edit_profile" onClick={() => setIsEditing(true)}>
                                    <Edit className="edit_profile" />
                                </IconButton>
                            </div>
                        )}
                        <div className="info__followew">
                            <span className="info__followew__item">1M Post</span>
                            <span className="info__followew__item">1M Followers</span>
                            <span className="info__followew__item">1M Following</span>
                        </div>
                        {isEditing ? (
                            <textarea value={bio} onChange={handleBioChange} className="profileTextArea" />
                        ) : (
                            <div className="info__bio">Bio:{bio}</div>
                        )}
                        {isEditing ? (
                            <button onClick={handleProfileUpdate} className="profileUpdateButton">
                                Save
                            </button>
                        ) : null}
                    </div>
                </div>
                <div className="youpost">
                    <div className="youpost__item">Your Post</div>
                </div>
                <div className="post">
                    <div className="postWrapper">
                        <div className="postTop">
                            <div className="postTopLeft">
                                <Link to="/profile">
                                    <img src={logo} alt="" className="postProfileImg" />
                                </Link>
                                <span className="postUsername">Cao Võ Thanh Tòng</span>
                                <span className="postDate">14h36</span>
                            </div>
                            <div className="postTopRight">
                                <IconButton>
                                    <Close className="postVertButton" />
                                </IconButton>
                            </div>
                        </div>
                        <div className="postCenter">
                            <span className="postText" style={{ color: 'ccc' }}>
                                Thanh Tòng đẹp trai vãi
                            </span>
                            <img src="{post.photo}" alt="" className="postImg" />
                        </div>
                        <div className="postBottom">
                            <div className="postBottomLeft">
                                <Favorite className="bottomLeftIcon" style={{ color: 'red' }} />
                                <Comment className="bottomLeftIcon" style={{ color: 'white' }} />
                            </div>
                            <div className="postBottomRight">
                                {/* <span className="postCommentText">3 · comments · share</span> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Thêm các bài đăng khác của người dùng ở đây */}
            </div>
            <div className="info__right">
                <div className="logo__info">
                    <img src={logo} alt="Logo" />
                </div>
                <Contact />
            </div>
        </div>
    );
}

export default Profile;
