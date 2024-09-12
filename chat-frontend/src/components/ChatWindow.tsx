"use client";

import React, { useState } from 'react';
import styles from '../styles/ChatWindow.module.css';

interface ChatMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface ChatWindowProps {
  groupName: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ groupName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: "Anil", content: "Hey There!", timestamp: "Today, 8:30pm", isCurrentUser: false }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newChatMessage: ChatMessage = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
      };
      setMessages([...messages, newChatMessage]);
      setNewMessage("");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.center}>
      <div className={styles.chatWindow}>
        <header className={styles.header}>
          <img src="/image/avatar1.jpg" alt="Avatar" className={styles.avatar} />
          <h2>{groupName}</h2>
          <div className={styles.chatActions}>
            {/* Button to open modal */}
            <button className={styles.actionButton} onClick={toggleModal}>+</button>
          </div>
        </header>
        <div className={styles.messages}>
          {messages.map((message) => (
            <div key={message.id} className={`${styles.message} ${message.isCurrentUser ? styles.currentUser : styles.otherUser}`}>
              <p>{message.content}</p>
              <span className={styles.timestamp}>{message.timestamp}</span>
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className={styles.sendButton} onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <div
          id="crud-modal"
          className="fixed inset-0 z-50 flex items-center justify-center w-full p-4 overflow-y-auto bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Friend
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal Body */}
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="search"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Friend name"
                    required
                  />
                </div>
                
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:bg-blue-800"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  />
                </svg>
                Add New Friend
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
