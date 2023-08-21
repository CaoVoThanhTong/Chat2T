import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import logo from '../../image/logo.png';
import 'react-toastify/dist/ReactToastify.css';
import './Register.scss';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [againpassword, setagainPassword] = useState('');
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationError, setVerificationError] = useState('');
    const navigate = useNavigate();

    // Chặn điều hướng trái phép vào bên trong
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/layout');
        }
    }, [navigate]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleagainPasswordChange = (event) => {
        setagainPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== againpassword) {
            toast.error('Mật khẩu không khớp');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                email: email,
                hashPassword: password,
                userName: name,
            });
            // console.log('status:', response.status);
            // console.log('data:', response.data);
            if (response.status === 200 || response.status === 201) {
                toast.warning('Vui lòng kiểm tra email để xác thực tài khoản');
                setShowVerification(true);
            }
        } catch (error) {
            // console.error('Lỗi:', error);
            toast.error('Email đã tồn tại');
        }
    };

    const handleVerificationSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/verify', {
                email: email,
                verifycode: verificationCode,
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('Đăng ký thành công');
                navigate('/login');
            } else {
                setVerificationError('Mã nhập không đúng');
            }
        } catch (error) {
            // console.error('Lỗi ', error);
            toast.error('Mã nhập không đúng');
            setVerificationError('Mã nhập không đúng');
        }
    };

    return (
        <div className="bodyy">
            <main className="l-main">
                <div className="l-user">
                    <div className="c-panel group">
                        <img className="c-panel__img" src={logo} alt="Logo-TwoT" />

                        <div className="c-panel__form">
                            <input
                                type="email"
                                className="c-panel__input"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                placeholder="example@gmail.com"
                            />
                            <input
                                type="password"
                                className="c-panel__input"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                placeholder="Password"
                            />
                            <input
                                type="password"
                                className="c-panel__input"
                                value={againpassword}
                                onChange={handleagainPasswordChange}
                                required
                                placeholder="Again password"
                            />
                            <input
                                type="text"
                                className="c-panel__input"
                                value={name}
                                onChange={handleNameChange}
                                required
                                placeholder="Full Name"
                            />
                            {!showVerification ? (
                                <button className="c-btn" onClick={handleSubmit}>
                                    Register
                                </button>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        className="c-panel__input"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        required
                                        placeholder="Verification Code"
                                    />
                                    {verificationError && <p className="error-message">{verificationError}</p>}
                                    <button className="c-btn" onClick={handleVerificationSubmit}>
                                        Submit Verification
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="c-signup group">
                        <p>
                            Do you already have an account?{' '}
                            <Link to="/login" className="Register">
                                Login
                            </Link>
                        </p>
                    </div>
                    <div className="c-app">
                        <p></p>
                        <div className="c-app__download"></div>
                    </div>
                </div>
                <ToastContainer position="top-right" />
            </main>
        </div>
    );
};

export default Register;
