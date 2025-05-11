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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 20%;
  .title-container {
    margin-bottom: 2rem;
    
  }
    .avatar_log{
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    flex-direction:row
    }
  .avatars {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    .avatar {
      border: 2px solid transparent;
      padding: 0.3rem;
      border-radius: 50%;
      cursor: pointer;
      transition: 0.3s ease-in-out;
    }
    .avatar.selected {
      border-color: #4e0eff;
    }
    img {
      height: 6rem;
    }
  }
  .loader {
    height: 10rem;
  }
  button{
  color:white;
  border-radius:10px;
  border:1px solid black;
  height:100px;
  width:100px;
  background:limegreen;

  }
`;
