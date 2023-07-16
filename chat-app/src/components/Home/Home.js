import React from 'react';
import './Home.scss';
// import { Users } from './../../data';
import { IconButton } from '@mui/material';
import { ChatBubbleOutline, MoreVert, Favorite, ThumbUp, ThumbUpAltOutlined, ShareOutlined } from '@mui/icons-material';
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
                            <Link to="/profile/userId">
                                <img src={tong} alt="" className="postProfileImg" />
                            </Link>
                            <span className="postUsername">hihi</span>
                            <span className="postDate">12h12p</span>
                        </div>
                        <div className="postTopRight">
                            <IconButton>
                                <MoreVert className="postVertButton" />
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
                            <ThumbUp className="bottomLeftIcon" style={{ color: '#011631' }} />
                            <span className="postLikeCounter">Like</span>
                        </div>
                        <div className="postBottomRight">
                            <span className="postCommentText">3 · comments · share</span>
                        </div>
                    </div>

                    <hr className="footerHr" />
                    <div className="postBottomFooter">
                        <div className="postBottomFooterItem">
                            <ThumbUpAltOutlined className="footerIcon" />
                            <span className="footerText">Like</span>
                        </div>
                        <div className="postBottomFooterItem">
                            <ChatBubbleOutline className="footerIcon" />
                            <span className="footerText">Comment</span>
                        </div>
                        <div className="postBottomFooterItem">
                            <ShareOutlined className="footerIcon" />
                            <span className="footerText">Share</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <Link to="/profile/userId">
                                <img src={tong} alt="" className="postProfileImg" />
                            </Link>
                            <span className="postUsername">hihi</span>
                            <span className="postDate">12h12p</span>
                        </div>
                        <div className="postTopRight">
                            <IconButton>
                                <MoreVert className="postVertButton" />
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
                            <ThumbUp className="bottomLeftIcon" style={{ color: '#011631' }} />
                            <span className="postLikeCounter">Like</span>
                        </div>
                        <div className="postBottomRight">
                            <span className="postCommentText">Thanh Tòng quá đẹp trai · comments · share</span>
                        </div>
                    </div>

                    <hr className="footerHr" />
                    <div className="postBottomFooter">
                        <div className="postBottomFooterItem">
                            <ThumbUpAltOutlined className="footerIcon" />
                            <span className="footerText">Like</span>
                        </div>
                        <div className="postBottomFooterItem">
                            <ChatBubbleOutline className="footerIcon" />
                            <span className="footerText">Comment</span>
                        </div>
                        <div className="postBottomFooterItem">
                            <ShareOutlined className="footerIcon" />
                            <span className="footerText">Share</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <Link to="/profile/userId">
                                <img src={tong} alt="" className="postProfileImg" />
                            </Link>
                            <span className="postUsername">hihi</span>
                            <span className="postDate">12h12p</span>
                        </div>
                        <div className="postTopRight">
                            <IconButton>
                                <MoreVert className="postVertButton" />
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
                            <ThumbUp className="bottomLeftIcon" style={{ color: '#011631' }} />
                            <span className="postLikeCounter">Like</span>
                        </div>
                        <div className="postBottomRight">
                            <span className="postCommentText">Thanh Tòng quá đẹp trai · comments · share</span>
                        </div>
                    </div>

                    <hr className="footerHr" />
                    <div className="postBottomFooter">
                        <div className="postBottomFooterItem">
                            <ThumbUpAltOutlined className="footerIcon" />
                            <span className="footerText">Like</span>
                        </div>
                        <div className="postBottomFooterItem">
                            <ChatBubbleOutline className="footerIcon" />
                            <span className="footerText">Comment</span>
                        </div>
                        <div className="postBottomFooterItem">
                            <ShareOutlined className="footerIcon" />
                            <span className="footerText">Share</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <Link to="/profile/userId">
                                <img src={tong} alt="" className="postProfileImg" />
                            </Link>
                            <span className="postUsername">hihi</span>
                            <span className="postDate">12h12p</span>
                        </div>
                        <div className="postTopRight">
                            <IconButton>
                                <MoreVert className="postVertButton" />
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
                            <ThumbUp className="bottomLeftIcon" style={{ color: '#011631' }} />
                            <span className="postLikeCounter">Like</span>
                        </div>
                        <div className="postBottomRight">
                            <span className="postCommentText">Thanh Tòng quá đẹp trai · comments · share</span>
                        </div>
                    </div>

                    <hr className="footerHr" />
                    <div className="postBottomFooter">
                        <div className="postBottomFooterItem">
                            <ThumbUpAltOutlined className="footerIcon" />
                            <span className="footerText">Like</span>
                        </div>
                        <div className="postBottomFooterItem">
                            <ChatBubbleOutline className="footerIcon" />
                            <span className="footerText">Comment</span>
                        </div>
                        <div className="postBottomFooterItem">
                            <ShareOutlined className="footerIcon" />
                            <span className="footerText">Share</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post">
                <div className="postWrapper">
                    <div className="postTop">
                        <div className="postTopLeft">
                            <Link to="/profile/userId">
                                <img src={tong} alt="" className="postProfileImg" />
                            </Link>
                            <span className="postUsername">hihi</span>
                            <span className="postDate">12h12p</span>
                        </div>
                        <div className="postTopRight">
                            <IconButton>
                                <MoreVert className="postVertButton" />
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
                            <ThumbUp className="bottomLeftIcon" style={{ color: '#011631' }} />
                            <span className="postLikeCounter">Like</span>
                        </div>
                        <div className="postBottomRight">
                            <span className="postCommentText">Thanh Tòng quá đẹp trai · comments · share</span>
                        </div>
                    </div>

                    <hr className="footerHr" />
                    <div className="postBottomFooter">
                        <div className="postBottomFooterItem">
                            <ThumbUpAltOutlined className="footerIcon" />
                            <span className="footerText">Like</span>
                        </div>
                        <div className="postBottomFooterItem">
                            <ChatBubbleOutline className="footerIcon" />
                            <span className="footerText">Comment</span>
                        </div>
                        <div className="postBottomFooterItem">
                            <ShareOutlined className="footerIcon" />
                            <span className="footerText">Share</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
