import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function BadgerRegister() {
  // TODO Create the register component.

  const [username, setusername] = useState("");
  const handleUsername = (e) => {
    setusername(e.target.value);
  };

  const [password, setpassword] = useState("");
  const handlePassword = (e) => {
    setpassword(e.target.value);
  };

  const [repeatPassword, setrepeatPassword] = useState("");
  const handleRepeatPassword = (e) => {
    setrepeatPassword(e.target.value);
  };

  const createUser = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "https://cs571.org/api/f23/hw6/register",
        withCredentials: true,
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
          "Content-Type": "application/json",
        },
        data: {
          username: username,
          password: password,
        },
      });

      console.log(response);
      return response;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  const handleRegister = async () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("You must provide both a username and password!");
    } else if (!(repeatPassword === password)) {
      alert("Your passwords do not match!");
    } else {
      let response = await createUser();
      if (response.data.msg === "The user already exists!") {
        alert("The user already exists!");
      } else if (response.data.msg === "Successfully authenticated.") {
        alert("Successfully authenticated.");
      }
    }
  };

  return (
    <>
      <h1>Register</h1>
      <Form>
        <Form.Label htmlFor="Username">Username</Form.Label>
        <Form.Control
          id="Username"
          value={username}
          onChange={handleUsername}
        />
        <Form.Label htmlFor="Password">Password</Form.Label>
        <Form.Control
          id="Password"
          value={password}
          onChange={handlePassword}
          type="password"
        />
        <Form.Label htmlFor="RepeatPassword">Repeat Password</Form.Label>
        <Form.Control
          id="RepeatPassword"
          value={repeatPassword}
          onChange={handleRepeatPassword}
          type="password"
        />
        <br />
        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </>
  );
}
