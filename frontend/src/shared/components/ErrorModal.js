import React from 'react';
import Modal from '../../UI/Modal';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Error"
      show={!!props.error}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;