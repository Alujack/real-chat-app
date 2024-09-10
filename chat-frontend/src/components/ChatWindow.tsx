"use client";

import React from 'react';
import styles from '../styles/ChatWindow.module.css';

interface ChatWindowProps {
  groupName: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ groupName }) => {
  return (
    <div className={styles.chatWindow}>
      <h2>Chat Room: {groupName}</h2>
      <div className={styles.messages}>
        {/* Message display logic */}
      </div>
      <input type="text" className={styles.inputField} placeholder="Type a message..." />
      <button className={styles.sendButton}>Send</button>
    </div>
  );
};

export default ChatWindow;
