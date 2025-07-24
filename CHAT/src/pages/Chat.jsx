// radhakrishnalovepermanentshivaparavathivinyakasitaramalovepermanenltuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu

import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import ChatContainer from '../components/ChatContainer';
import axios from 'axios';
import { allUsersRoute, host } from "../utils/APIRoutes";
import robot from "../assets/robot.gif";
import { io } from 'socket.io-client';

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;

  .chat-shell {
    width: 96vw;
    max-width: 1200px;
    height: 88vh;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px 0 #1e293b22;
    display: flex;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    transition: box-shadow 0.2s;
  }

  .contacts-panel {
    flex: 1;
    background: linear-gradient(135deg, #f1f5f9 60%, #e0e7ef 100%);
    border-right: 1px solid #e5e7eb;
    padding: 1.5rem 0.5rem 1.5rem 0.5rem;
    min-width: 240px;
    max-width: 320px;
    overflow-y: auto;
    transition: background 0.2s;
  }
  .contacts-panel::-webkit-scrollbar {
    width: 7px;
    background: #e5e7eb;
  }
  .contacts-panel::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 8px;
  }

  .chat-box {
    flex: 2;
    background: linear-gradient(120deg, #f8fafc 60%, #e2e8f0 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: background 0.2s;
  }

  img {
    max-width: 260px;
    opacity: 0.9;
    filter: drop-shadow(0 4px 16px #64748b33);
    animation: fadeIn 0.7s;
  }

  .back-btn {
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    background: #2563eb;
    border: none;
    color: #fff;
    font-size: 1.7rem;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    cursor: pointer;
    box-shadow: 0 2px 8px #2563eb33;
    transition: background 0.2s, transform 0.2s;
  }
  .back-btn:hover {
    background: #1e40af;
  }
  .back-btn:active {
    transform: scale(0.95);
  }
  .hide-on-chat {
    display: none;
  }
  .show-chat {
    flex: 1 1 100%;
    width: 100%;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95);}
    to { opacity: 1; transform: scale(1);}
  }

  @media (max-width: 900px) {
    .chat-shell {
      flex-direction: column;
      height: 98vh;
      width: 99vw;
      border-radius: 0;
    }
    .contacts-panel,
    .chat-box {
      width: 100%;
      height: 100%;
      min-width: 0;
      max-width: none;
    }
    .hide-on-chat {
      display: none;
    }
    .show-chat {
      display: flex;
    }
  }
`;

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = localStorage.getItem('chat-app-user');
      if (!user) {
        navigate('/login');
      } else {
        const storedUser = JSON.parse(user);
        setCurrentUser(storedUser);
        setIsLoading(false);
      }
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser && currentUser.isAvatarImageSet) {
        try {
          const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } catch (error) {
          console.error('Failed to fetch contacts', error);
        }
      } else if (currentUser) {
        navigate('/avatar');
      }
    };
    fetchContacts();
  }, [currentUser, navigate]);

  if (isLoading) return <h2 style={{ color: '#2563eb', textAlign: 'center', fontWeight: 500 }}>Loading...</h2>;
  if (!currentUser) return <h2 style={{ color: '#2563eb', textAlign: 'center', fontWeight: 500 }}>No user found. Please log in.</h2>;

  return (
    <Container>
      <div className="chat-shell">
        {/* Contacts List */}
        <div className={`contacts-panel ${currentChat ? 'hide-on-chat' : ''}`}>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        </div>

        {/* Chat Container */}
        <div className={`chat-box ${currentChat ? 'show-chat' : ''}`}>
          {currentChat && (
            <button className="back-btn" onClick={() => setCurrentChat(undefined)}>
              &#8592;
            </button>
          )}
          {currentChat ? (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          ) : (
            <img src={robot} alt="robot" />
          )}
        </div>
      </div>
    </Container>
  );
}
