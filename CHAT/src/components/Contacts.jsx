// RADHAKRISHNASHIVAPARVATHIVINYAKALOVEPERMANENLTUUUUU
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import multiavatar from "@multiavatar/multiavatar";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const handleContactClick = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              const avatar = contact.avatarImage || btoa(unescape(encodeURIComponent(multiavatar(contact._id))));
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""}`}
                  onClick={() => handleContactClick(index, contact)}
                >
                  <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="contact avatar" />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="current user avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex
;
    grid-template-rows: 12% 73% 15%;
    overflow: hidden;
    height: 100%;
    flex-direction: column;
    background: linear-gradient(135deg, #0d0d30 0%, #23272f 100%);
    border-radius: 1.2rem 0 0 1.2rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
    border-right: 1.5px solid rgba(255, 255, 255, 0.08);
    min-width: 270px;
    max-width: 370px;
    justify-content: space-between;
    animation: fadeInSidebar 1.1s cubic-bezier(.39,.575,.565,1) both;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: rgba(20, 20, 60, 0.7);
    box-shadow: 0 2px 12px #4e0eff22;
    border-bottom: 1px solid #23272f44;
    animation: fadeInDown 1s cubic-bezier(.39,.575,.565,1);

    img {
      height: 2.2rem;
      filter: drop-shadow(0 0 8px #58bc82cc);
      animation: popInLogo 1.2s cubic-bezier(.39,.575,.565,1) both;
    }

    h3 {
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 700;
      font-size: 1.3rem;
      text-shadow: 0 2px 8px #23272f44;
      margin: 0;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    overflow-y: auto;
    padding: 1.2rem 0 1rem 0;
    scrollbar-width: thin;
    scrollbar-color: #9a86f3 #23272f;

    &::-webkit-scrollbar {
      width: 0.25rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #9a86f3;
      border-radius: 1rem;
    }

    .contact {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.7rem 1rem;
      margin-bottom: 0.5rem;
      border-radius: 0.7rem;
      background: transparent;
      cursor: pointer;
      transition: background 0.2s;

      .avatar img {
        height: 2.7rem;
        width: 2.7rem;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 2px 8px #4e0eff22;
        transition: transform 0.2s;
      }

      .username h3 {
        color: #fff;
        font-size: 1.08rem;
        font-weight: 600;
        margin: 0;
        letter-spacing: 0.5px;
        text-shadow: 0 2px 8px #23272f22;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 150px;
      }

      &:hover {
        background: linear-gradient(90deg, #23272f 60%, #4e0eff33 100%);
        box-shadow: 0 4px 16px #4e0eff22;
        transform: scale(1.03);
      }
    }

    .contact.selected {
      background: linear-gradient(90deg, #9a86f3 60%, #58bc82 100%);
      border: 2px solid #58bc82;
      box-shadow: 0 4px 16px #58bc8244;
      .username h3 {
        color: #23272f;
      }
    }
  }

  .current-user {
    background: linear-gradient(90deg, #181929 60%, #23272f 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
    border-top: 1px solid #23272f44;
    box-shadow: 0 -2px 12px #4e0eff11;
    padding: 1.1rem 0 1.1rem 0;
    animation: fadeInUp 1.1s cubic-bezier(.39,.575,.565,1);

    .avatar img {
      height: 3.2rem;
      width: 3.2rem;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 2px 8px #58bc8244;
      border: 2px solid #9a86f3;
      transition: transform 0.2s;
    }

    .username h2 {
      color: #fff;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px #23272f44;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 150px;
    }
  }

  /* Animations */
  @keyframes fadeInSidebar {
    0% { opacity: 0; transform: translateX(-30px);}
    100% { opacity: 1; transform: translateX(0);}
  }
  @keyframes fadeInDown {
    0% { opacity: 0; transform: translateY(-30px);}
    100% { opacity: 1; transform: translateY(0);}
  }
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(30px);}
    100% { opacity: 1; transform: translateY(0);}
  }
  @keyframes popInLogo {
    0% { opacity: 0; transform: scale(0.7);}
    80% { opacity: 1; transform: scale(1.08);}
    100% { opacity: 1; transform: scale(1);}
  }
  @keyframes fadeInContact {
    0% { opacity: 0; transform: translateY(10px);}
    100% { opacity: 1; transform: translateY(0);}
  }

  /* Responsive */
  @media (max-width: 900px) {
    min-width: 180px;
    max-width: 240px;
    border-radius: 0.7rem 0 0 0.7rem;
    .brand h3 { font-size: 1.05rem; }
    .contacts .contact .username h3,
    .current-user .username h2 { max-width: 80px; font-size: 1rem; }
    .contacts .contact .avatar img,
    .current-user .avatar img { height: 2.1rem; width: 2.1rem; }
  }
  @media (max-width: 600px) {
    min-width: 90px;
    max-width: 100vw;
    border-radius: 0.3rem 0 0 0.3rem;
    .brand h3 { font-size: 0.9rem; }
    .contacts .contact .username h3,
    .current-user .username h2 { max-width: 50px; font-size: 0.85rem; }
    .contacts .contact .avatar img,
    .current-user .avatar img { height: 1.3rem; width: 1.3rem; }
    .contacts { padding: 0.5rem 0 0.5rem 0; }
    .current-user { padding: 0.5rem 0 0.5rem 0; }
  }
`;
