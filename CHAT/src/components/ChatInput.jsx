// RADHAKRISHNALOVEPERMANTLUUUUUU
// AMMANANNANMKRSPVLIDATAOPERMAENTN
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const emojiPickerRef = useRef(null);
  const emojiBtnRef = useRef(null);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        emojiBtnRef.current &&
        !emojiBtnRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.trim().length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <form className="input-container" onSubmit={sendChat}>
        <div className="emoji">
          <span ref={emojiBtnRef}>
            <BsEmojiSmile onClick={toggleEmojiPicker} />
          </span>
          {showEmojiPicker && (
            <div ref={emojiPickerRef}>
              <Picker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
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
  width: 100%;
  background: rgba(8, 4, 32, 0.95);
  padding: 0;
  border-radius: 0 0 1.2rem 1.2rem;
  box-shadow: 0 -2px 16px 0 rgba(31, 38, 135, 0.13);
  animation: fadeInInput 1.1s cubic-bezier(.39,.575,.565,1) both;

  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(255,255,255,0.13);
    border-radius: 0 0 1.2rem 1.2rem;
    padding: 0.4rem 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    position: relative;
  }

  .emoji {
    position: relative;
    display: flex;
    align-items: center;
    svg {
      font-size: 1.7rem;
      color: #ffe066;
      cursor: pointer;
      transition: transform 0.2s;
      &:hover {
        transform: scale(1.2) rotate(-12deg);
        filter: drop-shadow(0 0 8px #ffe06688);
      }
    }
  }

  .EmojiPickerReact, .emoji-picker-react {
    position: absolute !important;
    bottom: 60px;
    left: 0;
    z-index: 10;
    box-shadow: 0 4px 24px #00000033;
    border-radius: 1rem;
    animation: popInInput 0.5s cubic-bezier(.39,.575,.565,1) both;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    color: white;
    font-size: 1.15rem;
    padding-left: 1rem;
    &::selection {
      background-color: #9186f3;
    }
    &:focus {
      outline: none;
    }
  }

  button {
    background: linear-gradient(135deg, #9a86f3 60%, #58bc82 100%);
    border: none;
    padding: 0.5rem 0.9rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.2s;
    box-shadow: 0 2px 8px #9a86f344;
    svg {
      font-size: 1.3rem;
      color: white;
    }
    &:hover {
      background: linear-gradient(135deg, #58bc82 60%, #9a86f3 100%);
      transform: scale(1.08);
    }
  }

  @keyframes fadeInInput {
    0% { opacity: 0; transform: translateY(30px);}
    100% { opacity: 1; transform: translateY(0);}
  }
  @keyframes popInInput {
    0% { opacity: 0; transform: scale(0.8);}
    80% { opacity: 1; transform: scale(1.08);}
    100% { opacity: 1; transform: scale(1);}
  }

  /* Responsive */
  @media (max-width: 900px) {
    .input-container {
      padding: 0.3rem 0.7rem;
      border-radius: 0 0 0.7rem 0.7rem;
      input {
        font-size: 1rem;
      }
    }
    .emoji svg {
      font-size: 1.3rem;
    }
  }
  @media (max-width: 600px) {
    .input-container {
      padding: 0.2rem 0.2rem;
      border-radius: 0 0 0.3rem 0.3rem;
      input {
        font-size: 0.98rem;
        padding-left: 0.5rem;
      }
      button {
        padding: 0.3rem 0.6rem;
      }
    }
    .emoji svg {
      font-size: 1.1rem;
    }
    .EmojiPickerReact, .emoji-picker-react {
      width: 95vw !important;
      min-width: 0 !important;
      left: 0 !important;
      right: 0 !important;
      border-radius: 0.7rem;
    }
  }
`;
// const Container = styled.div`
//   display: grid;
//   grid-template-columns: 5% 95%;
//   align-items: center;
//   background: #080420;
//   // padding: 0 2rem;
//   padding-bottom: 0.3rem;
// //  position: absolute;
//  width:840px;
//     top: 610px !important;
//     .EmojiPickerReact{
//     height: 450px;
//     width: 350px;
//     top: -490px;
//     }
//   .button-container {
//     display: flex;
//     align-items: center;
//     color: white;
//     gap:1rem;
//     .emoji {
//       position: relative;
//       svg {
//         font-size: 1.5rem;
//         color: yellow;
//         cursor: pointer;
//       }
       
//     }
//   }

//   .input-container {
//   width: 100%;
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//     background-color: #ffffff34;
//     border-radius: 2rem;
//     padding: 0.3rem 1rem;

//     input {
//     width: 90%;
//       flex: 1;
//       background: transparent;
//       border: none;
//       color: white;
//       font-size: 1rem;
//       border:none;
//       padding-left:1rem;
//       font-size:1.2rem
//       &::selection{
//       background-color:#9186f3;
//       }
//       &:focus{
//       outline:none;
//       }
//       outline: none;
//     }

//     button {
//       background: #9a86f3;
//       border: none;
//       padding:-2% .3rem 2rem;
      
//       border-radius: 20%;
//       cursor: pointer;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       svg {
//         font-size: 1.2rem;
//         color: white;
//       }
//     }
//   }
//     .emoji-picker-react{
//     position:absolute;
//     top: -350px;
//     }
// `;
