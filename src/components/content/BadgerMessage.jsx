import React from "react";
import { Button, Card, Col, ListGroup } from "react-bootstrap";

function BadgerMessage(props) {
  const dt = new Date(props.created);

  return (
    <Card bg={"light"}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>

        <i>{props.poster}</i>
        <p>{props.content}</p>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}
        </small>
      </Card.Footer>
      {props.loginStatus[0] && props.poster === props.currentUser ? (
        <ListGroup variant="flush">
          <ListGroup.Item style={{ backgroundColor: "#f0f0f0" }}>
            <div className="d-grid gap-2">
              <Button variant="danger">Delete Post</Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <></>
      )}
    </Card>
  );
}

export default BadgerMessage;
