import React, { useEffect, useState } from "react";
import BadgerMessage from "./BadgerMessage";
import { Container, Row, Col, Pagination } from "react-bootstrap";

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

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      {/* TODO: Allow an authenticated user to create a post. */}
      <hr />
      {messages.length > 0 ? (
        <>
          <Container fluid>
            <Row>
              {messages
                .slice((currPage - 1) * 25, currPage * 25)
                .map((message) => {
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

          <Pagination>{buildPagination(messages.length)}</Pagination>
        </>
      ) : (
        <>
          <p>There are no messages on this page yet!</p>
        </>
      )}
    </>
  );
}
