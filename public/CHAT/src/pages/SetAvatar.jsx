// radhakrishnalovepermanentshivaparvathivinyakasitaramalovepermanenltuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
// RADHAKRISHNALOVEPERMANELTUUUUUU
// SITAMARAMAVINYBAKALAKSHMIPARVATHIVINYAKALOVEPERMANLTUUUUUU


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import multiavatar from "@multiavatar/multiavatar";



export default function SetAvatar() {

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  function next() {

    navigate('/chat');
  }

  const setProfilePicture = async () => {
    console.log("KRSPVLID");
    const User = await JSON.parse(localStorage.getItem('chat-app-user'));

    const { data } = await axios.post(`${setAvatarRoute}/${User._id}`, {
      image: avatars[selectedAvatar]
    });

    if (data.isSet) {
      User.isAvatarImageSet = true;
      User.avatarImage = avatars[selectedAvatar];
      localStorage.setItem('chat-app-user', JSON.stringify(User));
      console.log("RADHAKRISHNALOVEPERMANENTLUUUUUDONE")
    }
    next();

  }

  useEffect(() => {
    const local = localStorage.getItem('chat-app-user');

    if (local === null) {
      navigate('/login');
    }
    const generateAvatars = () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const randomId = Math.floor(Math.random() * 1000);
        const svg = multiavatar(randomId.toString());
        const base64 = btoa(unescape(encodeURIComponent(svg)));
        data.push(base64);
      }
      setAvatars(data);
      setLoading(false);

    };

    generateAvatars();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleUnload = () => {
    localStorage.removeItem('chat-app-user');
  };

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an Avatar as your Profile Picture</h1>
        </div>
        <div className="avatars">
          <div className="avatar_log">
            {isLoading ? (<img src={loader} alt="Loading..." className="loader" />) :
              (avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt={`avatar-${index}`}
                  />
                </div>
              ))
              )}
          </div>
          <button onClick={() => setProfilePicture()}>Set Profile Picture</button>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}
const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #23272f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title-container {
    margin-bottom: 2rem;
    color: #fff;
    text-align: center;
  }

  .avatars {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
  }

  .avatar_log {
    display: flex;
    gap: 1.2rem;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .avatar {
    border: 2px solid transparent;
    padding: 0.3rem;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar.selected {
    border-color: #4e0eff;
    box-shadow: 0 0 8px #4e0eff55;
  }
  .avatar img {
    height: 6rem;
    width: 6rem;
    object-fit: contain;
    border-radius: 50%;
    background: #f5f5f5;
  }

  .loader {
    height: 6rem;
  }

  button {
    color: white;
    border-radius: 10px;
    border: none;
    height: 48px;
    width: 200px;
    background: linear-gradient(90deg, #4e0eff 60%, #58bc82 100%);
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
    transition: background 0.2s, transform 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  button:hover {
    background: linear-gradient(90deg, #58bc82 60%, #4e0eff 100%);
    transform: translateY(-2px) scale(1.03);
  }

  @media (max-width: 700px) {
    .avatar_log {
      gap: 0.7rem;
    }
    .avatar img {
      height: 4.5rem;
      width: 4.5rem;
    }
    button {
      width: 90vw;
      max-width: 220px;
      font-size: 1rem;
    }
  }

  @media (max-width: 500px) {
    .title-container h1 {
      font-size: 1.2rem;
    }
    .avatar_log {
      gap: 0.5rem;
    }
    .avatar img {
      height: 3.2rem;
      width: 3.2rem;
    }
    button {
      width: 95vw;
      max-width: 180px;
      font-size: 0.98rem;
    }
  }
`;
// const Container = styled.div`
//   min-height: 100vh;
//   width: 100vw;
//   background: #23272f;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   .title-container {
//     margin-bottom: 2rem;
//     color: #fff;
//     text-align: center;
//   }

//   .avatars {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 1.5rem;
//     width: 100%;
//   }

//   .avatar_log {
//     display: flex;
//     gap: 1.2rem;
//     flex-wrap: wrap;
//     justify-content: center;
//     width: 100%;
//   }

//   .avatar {
//     border: 2px solid transparent;
//     padding: 0.3rem;
//     border-radius: 50%;
//     cursor: pointer;
//     transition: 0.3s;
//     background: #fff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .avatar.selected {
//     border-color: #4e0eff;
//     box-shadow: 0 0 8px #4e0eff55;
//   }
//   .avatar img {
//     height: 6rem;
//     width: 6rem;
//     object-fit: contain;
//     border-radius: 50%;
//     background: #f5f5f5;
//   }

//   .loader {
//     height: 6rem;
//   }

//   button {
//     color: white;
//     border-radius: 10px;
//     border: none;
//     height: 48px;
//     width: 200px;
//     background: linear-gradient(90deg, #4e0eff 60%, #58bc82 100%);
//     font-size: 1.1rem;
//     font-weight: 600;
//     cursor: pointer;
//     margin-top: 1rem;
//     transition: background 0.2s, transform 0.2s;
//     box-shadow: 0 2px 8px rgba(0,0,0,0.08);
//   }
//   button:hover {
//     background: linear-gradient(90deg, #58bc82 60%, #4e0eff 100%);
//     transform: translateY(-2px) scale(1.03);
//   }

//   @media (max-width: 700px) {
//     .avatar_log {
//       gap: 0.7rem;
//     }
//     .avatar img {
//       height: 4.5rem;
//       width: 4.5rem;
//     }
//     button {
//       width: 90vw;
//       max-width: 220px;
//       font-size: 1rem;
//     }
//   }

//   @media (max-width: 500px) {
//     .title-container h1 {
//       font-size: 1.2rem;
//     }
//     .avatar_log {
//       gap: 0.5rem;
//     }
//     .avatar img {
//       height: 3.2rem;
//       width: 3.2rem;
//     }
//     button {
//       width: 95vw;
//       max-width: 180px;
//       font-size: 0.98rem;
//     }
//   }
// `;