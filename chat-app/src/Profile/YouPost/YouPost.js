import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Close, Comment, Favorite } from '@mui/icons-material';
import '../Profile.scss';
// import logo from '~/image/thanhtong.jpg';
import axios from 'axios';

function YouPost() {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const authToken = localStorage.getItem('token');

        if (authToken) {
            // danh sách người dùng
            axios
                .get('http://localhost:3000/user/me', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error('Lỗi khi gọi API:', error);
                });

            // danh sách bài viết
            axios
                .get('http://localhost:3000/article/', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((response) => {
                    setPosts(response.data);
                })
                .catch((error) => {
                    console.error('Lỗi khi gọi API:', error);
                });
        }
    }, []);

    return (
        <div>
            <div className="youpost">
                <div className="youpost__item">Your Post</div>
            </div>
            {posts.map((post) => (
                <div className="post" key={post.post_id}>
                    <div className="postWrapper">
                        <div className="postTop">
                            <div className="postTopLeft">
                                <Link to="/profile">
                                    <img src={userData.avatar} alt="" className="postProfileImg" />
                                </Link>
                                <span className="postUsername">{userData.userName}</span>
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
                                {post.content}
                            </span>
                            {post.image && <img src={post.image} alt="" className="postImg" />}
                        </div>
                        <div className="postBottom">
                            <div className="postBottomLeft">
                                <Favorite className="bottomLeftIcon" style={{ color: 'red' }} />
                                <Comment className="bottomLeftIcon" style={{ color: 'white' }} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default YouPost;
