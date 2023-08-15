import React, { useState } from 'react';
import axios from 'axios';
import './Upload.scss';
import Image from '../../image/img.png';
import Map from '../../image/map.png';
import Friend from '../../image/friend.png';
import tong from '../../image/thanhtong.jpg';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/authContext';

const Upload = () => {
    // const { currentUser } = useContext(AuthContext);
    const [content, setContent] = useState('');
    const [imageBase64, setImageBase64] = useState('');

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImageBase64(e.target.result);
        };

        reader.readAsDataURL(selectedImage);
    };

    const handlePostClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const postData = {
                content: content,
                image: imageBase64,
            };

            axios.post(
                'http://localhost:3000/article/',
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                console.log('Upload bài viết thành công!', response.data);
            })
            .catch((error) => {
                console.error('Upload bài viết thất bại:', error);
            });
        }
    };

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img src={tong} alt="loi hinh anh" />
                    <input
                        type="text"
                        placeholder={`What's on your mind Tòng?`}
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                <hr />
                <div className="bottom">
                <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={handlePostClick}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
