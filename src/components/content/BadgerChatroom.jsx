import React, { useEffect, useState } from "react";
import BadgerMessage from "./BadgerMessage";
import { Container, Row, Col } from "react-bootstrap";

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
  // Why can't we just say []?
  // The BadgerChatroom doesn't unload/reload when switching
  // chatrooms, only its props change! Try it yourself.
  useEffect(loadMessages, [props]);

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      {/* TODO: Allow an authenticated user to create a post. */}
      <hr />
      {messages.length > 0 ? (
        <>
          <Container fluid>
            <Row>
              {messages.map((message) => {
                return (
                  <Col key={message.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                    <BadgerMessage
                      title={message.title}
                      poster={message.poster}
                      content={message.content}
                      created={message.created}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      ) : (
        <>
          <p>There are no messages on this page yet!</p>
        </>
      )}
    </>
  );
}
