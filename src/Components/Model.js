import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function Model(props) {
  const navigate = useNavigate();
  return (
    <>
     <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.data.message}</Modal.Title>
        </Modal.Header>
        <Modal.Body> <h6>your session is expired please login again</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
          window.localStorage.removeItem("token")
          window.localStorage.removeItem("id")
          props.handleClose()
          navigate("/")}} >
             <img src="./img/logout1.png" alt="logout" className='size'  /> {""}Logout
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
          <img src="./img/connection.png" alt="connection" className='size'  /> {""}Stay Connect
          </Button>
        </Modal.Footer>
      </Modal></>
  )
}

export default Model