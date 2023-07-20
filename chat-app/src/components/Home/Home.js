import React from 'react';
import './Home.scss';
// import { Users } from './../../data';
import { IconButton } from '@mui/material';
import { Comment, Close, Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import tong from '../../image/thanhtong.jpg';

const Home = () => {
    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     setUser(null);
    //     toast.success('Đăng xuất thành công');
    //   };
    return (
        <div>
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <Link to="/profile">
                                <img src={tong} alt="" className="postProfileImg" />
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
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <Link to="/profile">
                                <img src={tong} alt="" className="postProfileImg" />
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
                        <img src={tong} alt="" className="postImg" />
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
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <Link to="/profile">
                                <img src={tong} alt="" className="postProfileImg" />
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
        </div>
    );
};

export default Home;
