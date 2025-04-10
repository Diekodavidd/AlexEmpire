import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        // Simple email format validation
        if (!/\S+@\S+\.\S+/.test(emailValue)) {
            setEmailError('Please enter a valid email');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError) {
            return; // Prevent submission if email is invalid
        }

        setLoading(true);
        try {
            const res = await axios.post("https://backend-details-0xik.onrender.com/customer/forgot-password", { email });
            setMsg(res.data.message);
        } catch (err) {
            setMsg(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
            {msg && <p className={msg.includes('success') ? 'success-msg' : 'error-msg'}>{msg}</p>}
        </div>
    );
};

export default ForgotPassword;
