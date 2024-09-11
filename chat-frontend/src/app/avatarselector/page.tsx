"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import styles from "../../styles/AvatarSelector.module.css";

const AvatarSelector: React.FC = () => {
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const router = useRouter(); // Initialize the router

    const avatars = [
        "/image/avatar1.jpg",  // Corrected paths
        "/image/avatar2.jpg",
        "/image/avatar3.jpg",
        "/image/avatar4.jpg",
    ];

    const handleAvatarClick = (avatar: string) => {
        setSelectedAvatar(avatar);
    };

    const handleSaveProfilePicture = () => {
        if (selectedAvatar) {
            // Save profile picture logic here, such as calling an API
            alert(`Profile picture set to: ${selectedAvatar}`);
            router.push('/groupcreation'); // Navigate to the group creation page
        } else {
            alert("Please select an avatar first.");
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Pick an Avatar as your profile picture</h3>
            <div className={styles.avatarContainer}>
                {avatars.map((avatar, index) => (
                    <img
                        key={index}
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className={`${styles.avatar} ${selectedAvatar === avatar ? styles.selected : ""}`}
                        onClick={() => handleAvatarClick(avatar)}
                    />
                ))}
            </div>
            <button className={styles.saveButton} onClick={handleSaveProfilePicture}>
                Set as Profile Picture
            </button>
        </div>
    );
};

export default AvatarSelector;
