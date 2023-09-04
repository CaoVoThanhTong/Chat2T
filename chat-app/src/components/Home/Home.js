import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
// import { formatDistanceToNow } from 'date-fns';
import { IconButton } from '@mui/material';
import { Comment, Close, Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './Home.scss';
import { LightModeContext } from '~/context/lightModeContext';

const Home = ({ searchResults }) => {

    const { lightMode } = useContext(LightModeContext);

    const [posts, setPosts] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [users, setUsers] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:3000/article/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setPosts(response.data);
                    const userIds = [...new Set(response.data.map((post) => post.userId))];
                    userIds.forEach((userId) => {
                        axios
                            .get(`http://localhost:3000/user/${userId}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            })
                            .then((userResponse) => {
                                setUsers((prevUsers) => ({
                                    ...prevUsers,
                                    [userId]: userResponse.data,
                                }));
                            })
                            .catch((error) => {
                                console.error('Lỗi API user:', error);
                            });
                    });
                })
                .catch((error) => {
                    console.error('Lỗi API posts:', error);
                });
        }
    }, []);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    // const handleComment = () => {
    //     setShowComments(!showComments);
    // };

    // const handleDelete = () => {
    //     setHidden(true);
    // };

    // if (hidden) {
    //     return null;
    // }

    return (
        <div className={lightMode ? 'light' : 'dark'}>
          {searchResults.length > 0 ? (
            searchResults.map((post) => (
                <div className="post" key={post.post_id}>
                <div className="postWrapper">
                  <div className="postTop">
                    <div className="postTopLeft">
                      {users[post.userId] && (
                        <>
                          <Link to="/messenger">
                            <img src={users[post.userId].avatar} alt="" className="postProfileImg" />
                          </Link>
                          <div className='Name_Date'>
                            <span className="postUsername">{users[post.userId].userName}</span>
                            <span className="postDate">{moment(post.timestamp).format('HH:mm')}</span>
                            {/* <span className="postDate">{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span> */}
                          </div>
                        </>
                      )}
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
                      <IconButton onClick={handleLike}>
                        <Favorite className="bottomLeftIcon" style={{ color: isLiked ? 'red' : 'white' }} />
                      </IconButton>
                      <IconButton>
                        <Comment className="bottomLeftIcon" style={{ color: 'white' }} />
                      </IconButton>
                    </div>
                    <div className="postBottomRight">
                      <span className="postCommentText">comments</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            posts.map((post) => (
              <div className="post" key={post.post_id}>
                <div className="postWrapper">
                  <div className="postTop">
                    <div className="postTopLeft">
                      {users[post.userId] && (
                        <>
                          <Link to="/messenger">
                            <img src={users[post.userId].avatar} alt="" className="postProfileImg" />
                          </Link>
                          <div className='Name_Date'>
                            <span className="postUsername">{users[post.userId].userName}</span>
                            <span className="postDate">{moment(post.timestamp).format('HH:mm')}</span>
                            {/* <span className="postDate">{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span> */}
                          </div>
                        </>
                      )}
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
                      <IconButton onClick={handleLike}>
                        <Favorite className="bottomLeftIcon" style={{ color: isLiked ? 'red' : 'white' }} />
                      </IconButton>
                      <IconButton>
                        <Comment className="bottomLeftIcon" style={{ color: 'white' }} />
                      </IconButton>
                    </div>
                    <div className="postBottomRight">
                      <span className="postCommentText">comments</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      );
};

export default Home;
