"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { useLogin } from "@/hooks";
import styles from '../../../styles/LoginForm.module.css'; // Ensure styles are updated in this file

const LoginPage: React.FC = () => {
  const { email, password, onChange, onSubmit } = useLogin();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Add your login logic here (e.g., call an API)
    if (email === 'user@example.com' && password === 'pass') {
      // Redirect to the avatar selection page after successful login
      router.push('/avatarselector'); 
    } else {
      setError('Invalid email or password');
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
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter Your Email Address"
            className={styles.inputField}
            required
          />
          
          <div className={styles.passwordContainer}>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter Your Password"
              className={styles.inputField}
              required
            />
            <span className={styles.passwordToggleIcon}></span> {/* Placeholder icon */}
          </div>

          <button type="submit" className={styles.button}>Login</button>
        </form>

        <p className={styles.footerText}>
          Don't have an account? <Link href="/auth/register" className={styles.link}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
