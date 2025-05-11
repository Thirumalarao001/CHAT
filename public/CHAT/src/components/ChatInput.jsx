// RADHAKRISHNALOVEPERMANTLUUUUUU

import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg(prevMsg => prevMsg + emojiObject.emoji);
  };

  const sendChat = (e) => {
    e.preventDefault();

    if (msg.trim().length > 0) {
      console.log("Sending message:", msg);
      handleSendMsg(msg);
      setMsg(""); // clear input after sending
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmile onClick={toggleEmojiPicker} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background: #080420;
  // padding: 0 2rem;
  padding-bottom: 0.3rem;
//  position: absolute;
 width:840px;
    top: 610px !important;
    .EmojiPickerReact{
    height: 450px;
    width: 350px;
    top: -490px;
    }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap:1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: yellow;
        cursor: pointer;
      }
       
    }
  }

  .input-container {
  width: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    border-radius: 2rem;
    padding: 0.3rem 1rem;

    input {
    width: 90%;
      flex: 1;
      background: transparent;
      border: none;
      color: white;
      font-size: 1rem;
      border:none;
      padding-left:1rem;
      font-size:1.2rem
      &::selection{
      background-color:#9186f3;
      }
      &:focus{
      outline:none;
      }
      outline: none;
    }

    button {
      background: #9a86f3;
      border: none;
      padding:-2% .3rem 2rem;
      
      border-radius: 20%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        font-size: 1.2rem;
        color: white;
      }
    }
  }
    .emoji-picker-react{
    position:absolute;
    top: -350px;
    }
`;
