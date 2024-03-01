import React, { useContext, useEffect, useState, useRef } from "react";
import BadgerMessage from "./BadgerMessage";
import { Container, Row, Col, Pagination, Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import axios from "axios";

export default function BadgerChatroom(props) {
  const [messages, setMessages] = useState([]);

  const loadMessages = () => {
    fetch(
      `https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=1`,
      {
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.messages);
      });
  };

  console.log(messages);

  //reload message after post
  const [post, setPost] = useState(false);

  // Why can't we just say []?
  // The BadgerChatroom doesn't unload/reload when switching
  // chatrooms, only its props change! Try it yourself.
  useEffect(loadMessages, [props, post]);

  const [currPage, setcurrPage] = useState(1);

  let totalPage;

  const buildPagination = (length) => {
    let page = [];
    totalPage = Math.ceil(length / 25);

    for (let number = 1; number <= totalPage; number++) {
      page.push(
        <Pagination.Item
          key={number}
          active={currPage === number}
          onClick={() => {
            setcurrPage(number);
          }}
        >
          {" "}
          {number}
        </Pagination.Item>
      );
    }
    return page;
  };

  // Check user authentication
  const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

  //post content
  const title = useRef();
  const content = useRef();

  const urlCur =
    "https://cs571.org/api/f23/hw6/messages?chatroom=" + props.name;

  const postChat = async () => {
    try {
      const response = await axios({
        method: "post",
        url: urlCur,
        withCredentials: true,
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
          "Content-Type": "application/json",
        },
        data: {
          title: title.current.value,
          content: content.current.value,
        },
      });

      console.log(response);
      return response;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  const handlePost = async () => {
    console.log(content.current.value);
    if (
      title.current.value.trim() === "" ||
      content.current.value.trim() === ""
    ) {
      alert("You must provide both a title and a content!");
    } else {
      let response = await postChat();
      if (response.data.msg === "Successfully posted message!") {
        setPost((oldvalue) => !oldvalue);
        alert("Successfully posted!");
      }
    }
  };

  //alert login
  useEffect(() => {
    if (loginStatus[0] === false) {
      alert("You must be logged in to post!");
    }
  }, [props]);

  //check UserName
  const [currentUser, SetcurrentUser] = useState("");
  const getkUserName = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://cs571.org/api/f23/hw6/whoami",
        withCredentials: true,
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      return response;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  };

  const userCheck = async () => {
    if (loginStatus[0] == true) {
      let response = await getkUserName();

      SetcurrentUser(response.data.user.username);
    }
  };

  useEffect(() => {
    userCheck();
  }, [loginStatus]);

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      <hr />

      {messages.length > 0 ? (
        <>
          <Container fluid>
            <Row>
              {loginStatus[0] ? (
                <Col xs={12} sm={10} md={6} lg={4} xl={4}>
                  <Form>
                    <Form.Label htmlFor="title">Post Title</Form.Label>
                    <Form.Control id="title" ref={title} />
                    <Form.Label htmlFor="content">Post Content</Form.Label>
                    <Form.Control id="content" ref={content} />

                    <br />
                    <Button variant="primary" onClick={handlePost}>
                      Create Post
                    </Button>
                    <br />
                    <br />
                  </Form>
                </Col>
              ) : (
                <></>
              )}

              <Col>
                <Row>
                  {messages
                    .slice((currPage - 1) * 25, currPage * 25)
                    .map((message) => {
                      return (
                        <Col
                          key={message.id}
                          xs={12}
                          sm={10}
                          md={8}
                          lg={6}
                          xl={4}
                        >
                          <BadgerMessage
                            title={message.title}
                            poster={message.poster}
                            content={message.content}
                            created={message.created}
                            currentUser={currentUser}
                            loginStatus={loginStatus}
                          />
                          <br />
                        </Col>
                      );
                    })}
                </Row>

                <br />
                <Col>
                  <Pagination>{buildPagination(messages.length)}</Pagination>
                </Col>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <>
          <Container fluid>
            <Row>
              {loginStatus[0] ? (
                <Col xs={12} sm={10} md={6} lg={4} xl={4}>
                  <Form>
                    <Form.Label htmlFor="title">Post Title</Form.Label>
                    <Form.Control id="title" ref={title} />
                    <Form.Label htmlFor="content">Post Content</Form.Label>
                    <Form.Control id="content" ref={content} />

                    <br />
                    <Button variant="primary" onClick={handlePost}>
                      Create Post
                    </Button>
                    <br />
                    <br />
                  </Form>
                </Col>
              ) : (
                <></>
              )}
              <Col xs={12} sm={10} md={6} lg={4} xl={4}>
                <p>There are no messages on this page yet!</p>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
