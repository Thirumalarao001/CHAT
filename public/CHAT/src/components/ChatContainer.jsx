// radhakrishnalovepermanentluuuuashivaparvathivinyaka
// # radhakrishnalovepermanentluuuuashivaparvathivinyaka



import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Logout from '../components/Logout';
import ChatInput from './ChatInput';
import { sendMessageRoute, getMessagesRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat && currentUser) {
        try {
          const response = await axios.post(getMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      }
    };

    fetchMessages();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    try {
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });

      socket.current.emit('send-msg', {
        to: currentChat._id,
        from: currentUser._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      // console.log(mes)
      console.log(msgs);
      setMessages(msgs);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    currentChat && (
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
          <Logout />
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              ref={scrollRef}
              key={index}
              className={`message ${message.fromSelf ? 'sended' : 'received'}`}
            >
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          ))}
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    )
  );
}

const Container = styled.div`
  display: grid
;
    grid-template-rows: 10% 78% 12%;
    gap: 0.1rem;
    overflow: hidden;
    height: 90VH;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 0.5rem;
    height: 100%;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    position: absolute;
    width: 100%;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background: linear-gradient(to right, #4b6cb7, #182848);
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .user-details {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .avatar {
        img {
          height: 3.5rem;
          width: 3.5rem;
          border-radius: 50%;
          border: 2px solid #9b59b6;
          object-fit: cover;
          transition: all 0.3s ease;
          
          &:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(155, 89, 182, 0.5);
          }
        }
      }

      .username {
        h3 {
          color: white;
          margin: 0;
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
      }
    }
  }

  .chat-messages {
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;
    background: rgba(10, 10, 20, 0.5);
    backdrop-filter: blur(5px);
    
    &::-webkit-scrollbar {
      width: 0.4rem;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: rgba(106, 90, 205, 0.6);
      border-radius: 1rem;
    }

    .message {
      display: flex;
      align-items: center;
      animation: fadeIn 0.3s ease;

      .content {
        max-width: 65%;
        overflow-wrap: break-word;
        padding: 1rem 1.5rem;
        font-size: 1.1rem;
        border-radius: 1.5rem;
        position: relative;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;

        p {
          margin: 0;
          line-height: 1.5;
        }
      }

      &.sended {
        justify-content: flex-end;
        
        .content {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          border-top-right-radius: 0.5rem;
        }
      }

      &.received {
        justify-content: flex-start;
        
        .content {
          background: linear-gradient(135deg, #3a1c71 0%, #d76d77 100%);
          color: white;
          border-top-left-radius: 0.5rem;
        }
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  }
`;