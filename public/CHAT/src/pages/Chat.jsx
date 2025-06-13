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

  if (isLoading) return <h2 style={{ color: 'white', textAlign: 'center' }}>Loading...</h2>;

  if (!currentUser) return <h2 style={{ color: 'white', textAlign: 'center' }}>No user found. Please log in.</h2>;

  return (
    <Container chatOpen={!!currentChat}>
      
      <div className="container">
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

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #23272f 0%, #131324 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    height: 90vh;
    width: 95vw;
    max-width: 1300px;
    display: flex;
    background: rgba(0,0,0,0.6);
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .contacts-panel {
    flex: 1;
    transition: all 0.3s ease;
    background: #0d0d2b;
  }

  .chat-box {
    flex: 2;
    position: relative;
    background: linear-gradient(120deg, #1a1a2e 60%, #23272f 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  img {
    max-width: 300px;
    animation: popIn 0.5s ease forwards;
  }

.back-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(76, 0, 255, 0.15);
    border: none;
    color: #fff;
    font-size: 2rem;
    border-radius: 50%;
    width: 2.7rem;
    height: 2.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    cursor: pointer;
    box-shadow: 0 2px 8px #4e0eff44;
    transition: background 0.2s, transform 0.2s;
  }

  .back-btn:hover {
    background: #4e0eff;
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

  @keyframes popIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 900px) {
    .container {
      flex-direction: column;
    }

    .contacts-panel,
    .chat-box {
      width: 100%;
      height: 100%;
    }

    .hide-on-chat {
      display: none;
    }

    .show-chat {
      display: flex;
    }
  }
`;
