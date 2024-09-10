"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Assuming you check if the user is logged in
    const isLoggedIn = false; // Replace with your actual authentication check

    if (isLoggedIn) {
      router.push('/group-creation');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Welcome to the App</h1>
      <p>Redirecting...</p>
    </div>
  );
};

export default HomePage;
