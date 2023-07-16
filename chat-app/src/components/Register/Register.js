import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.scss';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [againpassword, setagainPassword] = useState('');
    const navigate = useNavigate();

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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);

        // Perform registration logic here
        // Call API, save registration information, etc.

        // Assuming registration is successful
        toast.success('Đăng ký thành công');
        navigate('/login');
    };

    return (
        <div className="bodyy">
            <main className="l-main">
                <div className="l-user">
                    <div className="c-panel group">
                        <img className="c-panel__img" src="" alt="Logo-TwoT" />

                        <div className="c-panel__form">
                            <input
                                type="email"
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
                            <input
                                type="password"
                                className="c-panel__input"
                                value={againpassword}
                                onChange={handleagainPasswordChange}
                                required
                                placeholder="Agian password"
                            />
                            <input
                                type="text"
                                className="c-panel__input"
                                value={name}
                                onChange={handleNameChange}
                                required
                                placeholder="UserName"
                            />
                            <button className="c-btn" onClick={handleSubmit}>
                                Register
                            </button>
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
