import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

//RADHAKRISHNALOVEPERMANLTUUUUUU
//RADHAKRISHNALOVEUUUMAPERMNANLTUUUUU
//RADHAKRISHNALOVEUUUMAPERMANTLUUUUUU
//LOVESHIVAPARVATHIMALOVEUUUUMAPERMALTUUU
//VINYAKALAKSHMILOVEUUUMAPERMANENLTUUUUU
//JAISITARAMA
//RADHAKRISHNALOVEPERMANTLUUUUU

import { regiterRoute } from "../utils/APIRoutes";
import Logo from "../assets/react.svg";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "", email: "", password: "", confirmPassword: ""
  });

  async function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { username, email, password } = values;
        const user = { username, email, password }
        const { data } = await axios.post(regiterRoute, user)
        console.log(data);
        if (data) {
          // console.log("RADHAKRISHNALOVEPERMANLTUUUUUU");
          localStorage.setItem('chat-app-user', JSON.stringify(data.user_saved))
          navigate('/login');
        }
        else {
          toast.error(data.message);
        }
      }
      catch (error) {
        toast.error(error.message);
      }
    }
    console.log("Form submitted successfully");
  }


  function handleChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }


  function handleValidation() {
    if (values.username.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return false;
    }
    if (!values.email.includes("@")) {
      toast.error("Invalid email address");
      return false;
    }
    if (values.password.length < 7) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  }


  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>KSVID_CHAT_APP</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Create Account</button>
          <span>
            Already Have an Account? <Link to="/">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

const FormContainer = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);

  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    height: 200px;
    justify-content: center;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    width: 100%;
  }
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80%;
    color: black;
    font-size: 16px;
    &:focus {
      outline: none;
      border-color: #4caf50;
      background:white;
    }
  }
  button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    width: 80%;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background-color: #45a049;
    }
  }
  span {
    font-size: 14px;
  }

  @media (max-width: 600px) {
    width: 95vw;
    height: auto;
    min-height: 100vh;
    border-radius: 0;
    box-shadow: none;
    padding: 20px 0;
    .brand {
      height: 120px;
    }
    input, button {
      width: 90%;
      font-size: 15px;
    }
    form {
      gap: 8px;
    }
  }
`;

export default Register;
