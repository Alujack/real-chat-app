"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/RegisterForm.module.css'; // Ensure styles are updated in this file

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Add your registration logic here (e.g., call an API)

    if (username && email && phoneNumber && password) {
      // Simulate successful registration
      router.push('/login');
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <h2 className={styles.title}>Signup</h2>
        <form onSubmit={handleRegister} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}

          <input
            type="text"
            className={styles.inputField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your Username"
            required
          />

          <input
            type="email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            required
          />

          <input
            type="tel"
            className={styles.inputField}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Your Phone Number"
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
            <span className={styles.passwordToggleIcon}>👁️</span> {/* Placeholder icon */}
          </div>

          <button type="submit" className={styles.button}>Signup</button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <a href="/login" className={styles.link}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
