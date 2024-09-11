"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/GroupCreation.module.css';

const GroupCreationForm: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<string[]>([]);
  const router = useRouter();

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();

    if (groupName.trim() === '') {
      setError('Group name cannot be empty');
      return;
    }

    setGroups([...groups, groupName]);
    setGroupName('');
    setError(null);
  };

  const handleGroupClick = (groupName: string) => {
    router.push(`/chat?group=${encodeURIComponent(groupName)}`);
  };

  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <form onSubmit={handleCreateGroup}>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="text"
            className={styles.inputField}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group Name"
            required
          />
        </form>
        <div className={styles.groupList}>
          <h3>Groups</h3>
          <ul>
            {groups.map((group, index) => (
              <li
                key={index}
                onClick={() => handleGroupClick(group)}
                className={styles.groupItem}
              >
                {group}
              </li>
            ))}
          </ul>
          <button className={styles.addButton} onClick={handleCreateGroup}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupCreationForm;
