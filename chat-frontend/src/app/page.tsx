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
   <main className="w-[100vw] h-[100vh] flex items-center justify-center"><h1 className="text-9xl self-center">hello</h1> </main>
  );
};

export default HomePage;
