import React from 'react';
import { Button, Form, Modal } from "react-bootstrap";

function ConfirmModal(props) {
  return (
    <Modal
    show={props.show}
    onHide={() => props.setShowModal(false)}
    className="form-modal"
    >
        <Modal.Header closeButton>
        <Modal.Title>Confirm Changes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <p>Enter your current password to confirm your changes:</p>
        <Form.Control
            className="form-control"
            type="password"
            placeholder="Enter your password"
            value={props.modalPassword}
            onChange={(e) => props.setModalPassword(e.target.value)}
        />
        </Modal.Body>

        <Modal.Footer>
        <Button
            variant="secondary"
            onClick={() => props.setShowModal(false)}
            className="form-modal-cancel"
        >
            Cancel
        </Button>
        <Button
            variant="primary"
            onClick={props.handleModalConfirm}
            className="form-modal-confirm"
        >
            Confirm
        </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal