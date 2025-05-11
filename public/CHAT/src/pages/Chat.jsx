// radhakrishnalovepermanentshivaparavathivinyakasitaramalovepermanenltuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu

// import React, { useEffect, useState } from 'react';
// import styled from "styled-components";
// import { useNavigate } from 'react-router-dom';
// import Contacts from '../components/Contacts';
// import axios from 'axios'; // Don't forget this import!

// import { allUsersRoute } from "../utils/APIRoutes";
// export default function Chat() {
//     const navigate = useNavigate();
//     const [contacts, setContacts] = useState([]);
//     const [currentUser, setCurrentUser] = useState(undefined);

//     useEffect(() => {
//         const checkUser = async () => {
//             if (!localStorage.getItem('chat-app-user')) {
//                 navigate('/login');
//             } else {
//                 const storedUser = JSON.parse(localStorage.getItem('chat-app-user'));
//                 setCurrentUser(storedUser);
//             }

//         };

//         checkUser();
//     }, [navigate]); // ✅ Add dependencies


//     useEffect(() => {
//         const fetchContacts = async () => {
//             if (currentUser) {
//                 if (currentUser.isAvatarImageSet) {
//                     try {
//                         const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
//                         setContacts(data.data);    
//                 //   console.log(data.message);
//                 //     console.log(data.data);
//                                 } 

//                         catch (error) {
//                         console.error('Failed to fetch contacts', error);
//                     }
//                 } else {
//                     navigate('/avatar');
//                 }
//             }
//         };
//         fetchContacts();

//     }, [currentUser, navigate]); // ✅ Depends on currentUser

//     return (
//         <>
//             <h1>Chat</h1>

//             <Contacts contacts={contacts} currentUser={currentUser} />
//         </>
//     );
// }

// // ⚡ Small note: you had typos in your styled component (e.g., "backgorund", "mnin-width"), here is the fixed version:

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 1rem;
//   background: #131324; /* fixed typo */

//   .container {
//     height: 85vh;
//     width: 85vw;
//     background: #00000076;
//     display: grid;
//     grid-template-columns: 25% 75%; /* fixed typo */
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       grid-template-columns: 35% 65%; /* fixed typo */
//     }
//   }
// `;
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
    const [isLoading, setIsLoading] = useState(true); // optional loading

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login');
            } else {
                const storedUser = JSON.parse(localStorage.getItem('chat-app-user'));
                setCurrentUser(storedUser);
                setIsLoading(false);
            }
        };
        checkUser();
    }, [navigate]);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host)
            socket.current.emit('add-user', currentUser._id);

            // return () => {
            //     socket.current.disconnect(); // clean up
            // };
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchContacts = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    try {
                        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                        setContacts(data.data);
                    } catch (error) {
                        console.error('Failed to fetch contacts', error);
                    }
                } else {
                    navigate('/avatar');
                }
            }
        };
        fetchContacts();
    }, [currentUser, navigate]);

    if (isLoading || !currentUser) {
        return <h2 style={{ color: 'white', textAlign: 'center' }}>Loading...</h2>;
    }

    return (
        <Container>
            <div className="container">
                <Contacts
                    contacts={contacts}
                    currentUser={currentUser}
                    changeChat={handleChatChange}
                />
                <div className="chat-box">
                    {currentChat ? (
                        <ChatContainer
                            currentChat={currentChat}
                            currentUser={currentUser}
                            socket={socket}
                        />
                    ) : (
                        <img src={robot} alt='robot' />
                    )}
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #131324;

  .container {
    height: 85vh;
    width: 100vw;
    background: #00000076;
    display: grid;
    grid-template-columns: 40% 60%;
  }

  .chat-box {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a1a2e;
    position: relative;
    // height: 90%;
    width: 100%;
  }

  img {
    max-height: 300px;
    max-width: 300px;
    object-fit: contain;
  }
`;
