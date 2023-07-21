import React, { useState } from 'react';
import './Home.scss';
import { IconButton } from '@mui/material';
import { Comment, Close, Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import tong from '../../image/thanhtong.jpg';

const Home = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [userComment, setUserComment] = useState('');
    const [comments, setComments] = useState([]);
    const [hidden, setHidden] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleComment = () => {
        setShowComments(!showComments);
    };

    const handleChange = (event) => {
        setUserComment(event.target.value);
    };

    const handleSubmitComment = () => {
        if (userComment.trim() !== '') {
            setComments([...comments, userComment]);
            setUserComment('');
        }
    };

    const handleDelete = () => {
        setHidden(true);
    };

    if (hidden) {
        return null; // Return nothing to hide the post
    }

    return (
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
                        <IconButton onClick={handleDelete}>
                            <Close className="postVertButton" />
                        </IconButton>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText" style={{ color: '#ccc' }}>
                        Thanh Tòng đẹp trai vãi
                    </span>
                    <img src="{tong}" alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <IconButton onClick={handleLike}>
                            <Favorite className="bottomLeftIcon" style={{ color: isLiked ? 'red' : 'white' }} />
                        </IconButton>
                        <IconButton onClick={handleComment}>
                            <Comment className="bottomLeftIcon" style={{ color: 'white' }} />
                        </IconButton>
                        {showComments && (
                            <div className="commentModal">
                                <div className="modalContent">
                                    <div className="modalHeader">
                                        <h2>Nhập bình luận của bạn</h2>
                                        <IconButton onClick={handleComment}>
                                            <Close />
                                        </IconButton>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Nhập bình luận của bạn..."
                                        value={userComment}
                                        onChange={handleChange}
                                    />
                                    <button onClick={handleSubmitComment}>Gửi</button>
                                    <div className="userComments">
                                        {comments.map((comment, index) => (
                                            <div key={index} className="comment">
                                                {comment}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{comments.length} · comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
