"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/LoginForm.module.css'; // Ensure styles are updated in this file

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Add your login logic here (e.g., call an API)
    if (username === 'user' && password === 'pass') {
      router.push('/groupcreation');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
        <p className={styles.subtitle}>Welcome back!</p>
        <form onSubmit={handleLogin} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}

          <input
            type="text"
            className={styles.inputField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your Username / Email"
            required
          />

          <div className={styles.passwordContainer}>
            <input
              type="password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
            />
            <span className={styles.passwordToggleIcon}></span> {/* Placeholder icon */}
          </div>

          <button type="submit" className={styles.button}>Login</button>
        </form>

        <p className={styles.footerText}>
          Don't have an account? <a href="/register" className={styles.link}>Signup</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
