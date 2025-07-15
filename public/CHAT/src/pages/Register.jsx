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
          navigate('/');
        }
        else {
          toast.error(data.message);
          console.log("Registration failed");
        }
      }
      catch (error) {
        toast.error(error.message,"HII");
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
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #131324 60%, #4caf50 100%);
  font-family: 'Josefin Sans', sans-serif;

  form {
    background: #fff;
    padding: 2.5rem 2rem 2rem 2rem;
    border-radius: 18px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 320px;
    max-width: 350px;
    width: 100%;
    gap: 1.1rem;
  }

  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    img {
      height: 60px;
      width: 60px;
    }
    h1 {
      font-size: 1.7rem;
      color: #131324;
      letter-spacing: 2px;
      margin: 0;
    }
  }

  input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #d1d1d1;
    border-radius: 7px;
    font-size: 1rem;
    background: #f7f7f7;
    color: #131324;
    transition: border 0.2s;
    &:focus {
      border: 1.5px solid #4caf50;
      background: #fff;
      outline: none;
    }
  }

  button {
    width: 100%;
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 7px;
    background: linear-gradient(90deg, #4caf50 60%, #388e3c 100%);
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background 0.2s;
    &:hover {
      background: linear-gradient(90deg, #388e3c 60%, #4caf50 100%);
    }
  }

  span {
    font-size: 0.97rem;
    color: #333;
    margin-top: 0.5rem;
    a {
      color: #4caf50;
      text-decoration: none;
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 600px) {
    form {
      min-width: 90vw;
      max-width: 95vw;
      padding: 1.5rem 0.5rem;
    }
    .brand img {
      height: 45px;
      width: 45px;
    }
    .brand h1 {
      font-size: 1.2rem;
    }
  }
`;

export default Register;
