import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Modal, Box, TextField, Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Navbar from '~/components/Navbar';
import Contact from '~/components/Contact';
// import logo from '~/image/thanhtong.jpg';
import logoo from '~/image/logo.png';
import Image from '~/image/img.png';
import YouPost from './YouPost/YouPost';
import './Profile.scss';

function EditProfileModal({
    isOpen,
    onClose,
    name,
    bio,
    onNameChange,
    onBioChange,
    onSave,
    newAvatar,
    handleAvatarChange,
}) {
    return (
        <Modal className="Modal" open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#999999',
                    color: 'black',
                    boxShadow: 24,
                    p: 4,
                    overflowY: 'auto',
                    maxHeight: '80vh',
                }}
            >
                <h1 className="contentedit">Edit Profile</h1>
                <div className="left" onChange={handleAvatarChange}>
                    <input type="file" id="file" style={{ display: 'none' }} />
                    <label htmlFor="file">
                        <div className="item">
                            <img src={Image} alt="" />
                            <span>Update avata</span>
                        </div>
                    </label>
                </div>
                <TextField label="Name" value={name} onChange={onNameChange} fullWidth sx={{ mt: 2, color: 'white' }} />
                <TextField label="Bio" value={bio || ''} onChange={onBioChange} fullWidth multiline sx={{ mt: 2 }} />
                {newAvatar && <img src={newAvatar} alt="New Avatar" style={{ maxWidth: '100%', marginTop: '10px' }} />}
                <Button onClick={onSave} sx={{ mt: 2 }} variant="contained">
                    Save
                </Button>
            </Box>
        </Modal>
    );
}

function Profile() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newAvatar, setNewAvatar] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios
                .get('http://localhost:3000/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const userData = response.data;
                    setId(userData.id);
                    setName(userData.userName);
                    setBio(userData.bio || ''); // Set giá trị mặc định nếu bio là null
                    setNewAvatar(userData.avatar);
                })
                .catch((error) => {
                    console.error('Error fetching user information:', error);
                });
        }
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleProfileUpdate = () => {
        const token = localStorage.getItem('token');

        if (token) {
            axios
                .patch(
                    'http://localhost:3000/user/' + id,
                    {
                        userName: name,
                        bio: bio,
                        avatar: newAvatar,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .then((response) => {
                    // console.log('Updated Name:', name);
                    // console.log('Updated Bio:', bio);
                    console.log('API Response:', response.data);

                    setIsEditModalOpen(false);
                })
                .catch((error) => {
                    console.error('Error updating profile:', error);
                });
        }
    };

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleAvatarChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64Data = event.target.result;
                setNewAvatar(base64Data);
                localStorage.setItem('newAvatar', base64Data);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    useEffect(() => {
        const storedAvatar = localStorage.getItem('newAvatar');
        if (storedAvatar) {
            setNewAvatar(storedAvatar);
        }
    }, []);

    return (
        <div className="wrapper">
            <div className="info__left">
                <div className="logo__infoo">
                    <Link to="/layout">
                        <img src={logoo} alt="Logo" />
                    </Link>
                </div>
                <Navbar />
            </div>
            <div className="info__center">
                <div className="info">
                    <div className="info__avatar">
                        <img src={newAvatar || ''} alt="Avatar" />
                    </div>
                    <div className="info__content">
                        <div className="info__name">
                            {name}
                            <IconButton className="edit_profile" onClick={openEditModal}>
                                <Edit className="edit_profile" />
                            </IconButton>
                        </div>
                        <div className="info__followew">
                            <span className="info__followew__item">1M Post</span>
                            <span className="info__followew__item">1M Followers</span>
                            <span className="info__followew__item">1M Following</span>
                        </div>
                        <EditProfileModal
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            avata={newAvatar}
                            name={name}
                            bio={bio}
                            onNameChange={handleNameChange}
                            onBioChange={handleBioChange}
                            onSave={handleProfileUpdate}
                            newAvatar={newAvatar}
                            handleAvatarChange={handleAvatarChange}
                        />
                        <div className="info__bio">Bio: {bio}</div>
                    </div>
                </div>
                {/* ... */}
                <YouPost />
            </div>
            <div className="info__right">
                <div className="logo__info">
                    <img src={newAvatar || ''} alt="Avatar" />
                </div>
                <Contact />
            </div>
        </div>
    );
}
export default Profile;
