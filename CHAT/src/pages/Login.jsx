//RADHAKRISHNALOVEPERMANLTUUUUUUU
//RADHAKRISHNALOVEUUUMAPERMNANLTUUUUU
//RADHAKRISHNALOVEUUUMAPERMANTLUUUUUU
//LOVESHIVAPARVATHIMALOVEUUUUMAPERMALTUUU
//VINYAKALAKSHMILOVEUUUMAPERMANENLTUUUUU
//JAISITARAMA
//RADHAKRISHNALOVEPERMANTLUUUUU
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";
import Logo from "../assets/react.svg";

// ---- Change these to your preferred color(s) ----
const mainColor = "#4f8cff"; // softer blue accent
const mainGradient = "linear-gradient(135deg, #23272f 60%, #4f8cff 100%)"; // blue gradient
// ------------------------------------------------

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const user = { username, password };
      try {
        const { data } = await axios.post(loginRoute, user);
        if (data) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user_data));
          if (data.user_data.isAvatarImageSet === true) {
            toast.success("🎉 Welcome back! 🎉");
            setTimeout(() => navigate("/chat"), 1200);
          } else {
            navigate("/avatar");
          }
        }
      } catch (error) {
        toast.error("Check the credentials");
      }
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleValidation() {
    if (values.username.trim() === "") {
      toast.error("Enter The Username");
      return false;
    }
    if (values.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }

  return (
    <>
      <StyledBG>
        <GlassCard>
          <AnimatedLogo>
            <img src={Logo} alt="Logo" />
          </AnimatedLogo>
          <h1 className="heading">KSVID_CHAT_APPLICATION</h1>
          <form className="form" onSubmit={handleSubmit}>
            <span className="input-span">
              <label htmlFor="text" className="label">
                Username
              </label>
              <input
                placeholder="Username"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                className="input-field"
                autoComplete="username"
              />
            </span>
            <span className="input-span">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="input-field"
                autoComplete="current-password"
              />
            </span>
            <button className="submit" type="submit">
              <span>Log in</span>
              <span className="glow"></span>
            </button>
            <span className="span">
              Don't have an account? <Link to="/register">Sign up</Link>
            </span>
          </form>
        </GlassCard>
      </StyledBG>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

// --- Styled Components and Animations ---
const spinBounce = keyframes`
  0%   { transform: scale(1) rotate(0deg); }
  30%  { transform: scale(1.15) rotate(12deg); }
  50%  { transform: scale(1.08) rotate(-8deg); }
  70%  { transform: scale(1.12) rotate(8deg);}
  100% { transform: scale(1) rotate(0deg);}
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(40px);}
  100% { opacity: 1; transform: translateY(0);}
`;

const StyledBG = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: ${mainGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const GlassCard = styled.div`
  background: rgba(255,255,255,0.18);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(90, 124, 255, 0.10);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1.5px solid rgba(90,124,255,0.10);
  padding: 2.2rem 1.5rem 1.5rem 1.5rem;
  min-width: 320px;
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInUp} 1s cubic-bezier(.68,-0.55,.27,1.55);

  .heading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #23272f;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 2px;
    margin-bottom: 1.2rem;
    margin-top: 0.2rem;
    text-shadow: 0 2px 12px #bfcaff80;
    text-align: center;
    font-family: 'Josefin Sans', sans-serif;
    animation: ${fadeInUp} 1.2s cubic-bezier(.68,-0.55,.27,1.55);
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    align-items: center;
  }

  .input-span {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .label {
    color: ${mainColor};
    font-weight: 600;
    font-size: 1.08rem;
    margin-bottom: 0.1rem;
    margin-left: 0.2rem;
    letter-spacing: 1px;
  }

  .input-field {
    border-radius: 8px;
    padding: 0.8rem 1rem;
    width: 100%;
    border: 1px solid #e0e4fa;
    background: #f7f8fd;
    color: #23272f;
    font-size: 1.05rem;
    outline: none;
    transition: border 0.2s;
    font-family: inherit;
  }
  .input-field:focus {
    border: 1.5px solid ${mainColor};
    background: #fff;
  }

  .submit {
    margin-top: 0.5rem;
    padding: 0.85rem 0;
    width: 100%;
    border-radius: 10px;
    border: none;
    background: linear-gradient(90deg, ${mainColor} 60%, #bfcaff 100%);
    color: #fff;
    font-size: 1.12rem;
    font-weight: 700;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.2s, color 0.2s, transform 0.2s;
    box-shadow: 0 4px 16px 0 #bfcaff40;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    will-change: transform;
  }
  .submit:hover {
    background: linear-gradient(90deg, #bfcaff 40%, ${mainColor} 100%);
    color: #23272f;
    transform: scale(1.03) perspective(120px) rotateX(4deg);
  }
  .submit .glow {
    display: none;
  }

  .span {
    width: 100%;
    text-align: center;
    color: #23272f;
    font-size: 1rem;
    margin-top: 0.5rem;
    text-shadow: 0 1px 8px #bfcaff40;
  }
  .span a {
    color: ${mainColor};
    text-decoration: none;
    font-weight: 700;
    margin-left: 0.2rem;
    transition: color 0.2s;
  }
  .span a:hover {
    color: #23272f;
    text-shadow: 0 0 8px ${mainColor};
  }

  @media (max-width: 500px) {
    min-width: 0;
    width: 97vw;
    padding: 1.2rem 0.5rem;
    border-radius: 1.2rem;
    .heading { font-size: 1.1rem; }
  }
`;

const AnimatedLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.7rem;
  img {
    width: 60px;
    height: 60px;
    filter: drop-shadow(0 0 16px ${mainColor}80);
    animation: ${spinBounce} 2.2s cubic-bezier(.68,-0.55,.27,1.55) infinite;
    will-change: transform;
  }
`;
export default Login;