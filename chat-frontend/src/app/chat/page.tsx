"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ChatWindow from '../../components/ChatWindow';

const ChatPage: React.FC = () => {
  const searchParams = useSearchParams();
  const groupName = searchParams.get('group') || 'Unknown Group';

  return (
    <div>
      <ChatWindow groupName={groupName} />
    </div>
  );
};

export default ChatPage;
