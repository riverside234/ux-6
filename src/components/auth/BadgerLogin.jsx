import axios from "axios";
import React, { useContext, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useNavigate } from "react-router";

export default function BadgerLogin() {
  //Check login Context
  const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
  const navigate = useNavigate();

  // TODO Create the login component.
  const userInput = useRef();
  const passwordInput = useRef();

  const login = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "https://cs571.org/api/f23/hw6/login",
        withCredentials: true,
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
          "Content-Type": "application/json",
        },
        data: {
          username: userInput.current.value,
          password: passwordInput.current.value,
        },
      });

      console.log(response);
      return response;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  const handleLogin = async () => {
    console.log(userInput.current.value);
    if (
      userInput.current.value.trim() === "" ||
      passwordInput.current.value.trim() === ""
    ) {
      alert("You must provide both a username and password!");
    } else {
      let response = await login();
      if (response.data.msg === "That username or password is incorrect!") {
        alert("Incorrect username or password!");
      } else if (response.data.msg === "Successfully authenticated.") {
        alert("Successfully Login.");
        sessionStorage.setItem("checkLogin", JSON.stringify([true]));
        setLoginStatus([true]);
        navigate("/");
      }
    }
  };

  return (
    <>
      <h1>Login</h1>
      <Form>
        <Form.Label htmlFor="Username">Username</Form.Label>
        <Form.Control id="Username" ref={userInput} />
        <Form.Label htmlFor="Password">Password</Form.Label>
        <Form.Control id="Password" type="password" ref={passwordInput} />

        <br />
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </>
  );
}
