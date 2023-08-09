import React, { useState } from 'react';
import './Home.scss';
import { IconButton } from '@mui/material';
import { Comment, Close, Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import tong from '../../image/thanhtong.jpg';

const Home = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const [hidden, setHidden] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleComment = () => {
        setShowComments(!showComments);
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
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
