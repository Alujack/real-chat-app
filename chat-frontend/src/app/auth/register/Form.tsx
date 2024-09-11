"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from "@/components/Spinner";
import { useRegister } from '@/hooks';
import styles from '../../../styles/RegisterForm.module.css'; // Ensure styles are updated in this file

const RegisterPage: React.FC = () => {
  const { email, username, password, isloading, onChange, onSubmit } = useRegister();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Add your registration logic here (e.g., call an API)
    if (username && email && password) {
      // Simulate successful registration
      router.push('/auth/login');
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <h2 className={styles.title}>Signup</h2>
        <p className={styles.subtitle}>Create your free account</p>
        <form onSubmit={handleRegister} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}
          {isloading && <Spinner />}

          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            placeholder="Enter Your Username"
            className={styles.inputField}
            required
          />

          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter Your Email"
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
            <span className={styles.passwordToggleIcon}>👁️</span> {/* Placeholder icon */}
          </div>

          <button type="submit" className={styles.button}>Signup</button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <Link href="/login" className={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
