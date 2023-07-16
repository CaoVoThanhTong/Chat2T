import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, provider } from '../../Firebase/Firebaseconfig';
import './Login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/layout'); // Chuyển hướng đến trang Layout nếu có token
        }
    }, [navigate]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFacebookLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem('token', 'your_token_here');
                toast.success('Đăng nhập thành công');
                navigate('/layout');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleGoogleLogin = async () => {};

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            toast.error('Vui lòng nhập đầy đủ email và password');
            return;
        }

        console.log('Email:', email);
        console.log('Password:', password);

        // Xử lý logic đăng nhập ở đây
        // Gọi API, kiểm tra thông tin đăng nhập, xác thực,...
        const isLoggedIn = true; // Giả sử đăng nhập thành công

        if (isLoggedIn) {
            localStorage.setItem('token', 'your_token_here');
            toast.success('Đăng nhập thành công');
            navigate('/layout'); // Chuyển hướng đến trang Layout sau khi đăng nhập thành công
        } else {
            console.log('Đăng nhập không thành công');
        }
    };

    return (
        <div className="bodyy">
            <main className="l-main">
                <div className="l-user">
                    <div className="c-panel group">
                        <img className="c-panel__img" src="" alt="Logo-TwoT" />

                        <div className="c-panel__form">
                            <input
                                type="text"
                                className="c-panel__input"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                className="c-panel__input"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                placeholder="Password"
                            />
                            <button className="c-btn" onClick={handleSubmit}>
                                Log In
                            </button>
                            <span className="c-panel__span">OR</span>
                        </div>
                        <button className="c-panel__facebook" onClick={handleFacebookLogin}>
                            Login with Facebook
                        </button>
                        <button className="c-panel__facebook" onClick={handleGoogleLogin}>
                            Login with Google
                        </button>
                    </div>
                    <div className="c-signup group">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="Register">
                                Register
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

export default Login;