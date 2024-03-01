import React, { useContext, useEffect } from "react";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogout() {
  //Check login Context
  const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw6/logout", {
      method: "POST",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        alert("You have been logged out!");
        sessionStorage.setItem("checkLogin", JSON.stringify([false]));
        setLoginStatus([false]);
      });
  }, []);

  return (
    <>
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
    </>
  );
}
