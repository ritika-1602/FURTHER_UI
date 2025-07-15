
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",  // Helps with session authentication
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.text(); // Get response as text
                console.error("Server Response:", errorData);
                setError("Login failed! Check credentials.");
                return;
            }

            const data = await response.json();
            console.log("Response:", data);

            localStorage.setItem("isAuthenticated", "true");
            navigate("/dashboard");  // Redirect without alert

        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={styles.loginForm}>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className={styles.button} type="submit">Login</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default LoginForm;
