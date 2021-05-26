import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { firestore } from '../../config/firebase';

interface Props {
  id: string;
}

const Toggle: React.FC<Props> = ({ id }) => {
  const [newText, setNewText] = useState<string>('');
  const [editing, setEditing] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const toggleEdit = useCallback(() => {
    setEditing(!editing);
    console.log('toggleedit');
  }, [editing]);

  const toggleModal = useCallback(() => {
    setModal(!modal);
    console.log('togglemodal');
  }, [modal]);

  const editHandler = useCallback(async () => {
    await firestore.doc(`post/${id}`).update({
      text: newText,
    });
    setEditing(false);
    console.log('edit');
  }, [id, newText]);

  const deleteHandler = useCallback(async () => {
    await firestore.doc(`post/${id}`).delete();
    console.log('deletehandle');
    return () => setModal(false);
  }, [id]);

  return (
    <>
      {editing ? (
        <Form>
          <Input
            type="textarea"
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
          />
          <Button style={{ float: 'right' }} onClick={toggleEdit}>
            취소
          </Button>
          <Button style={{ float: 'right' }} onClick={editHandler}>
            수정
          </Button>
        </Form>
      ) : (
        <>
          <Button onClick={toggleEdit}>수정</Button>
          <Button onClick={toggleModal}>삭제</Button>
        </>
      )}
      <Modal isOpen={modal} onClick={toggleModal}>
        <ModalBody>정말 삭제하시겠습니까?</ModalBody>
        <ModalFooter>
          <Button onClick={deleteHandler}>삭제</Button>
          <Button onClick={toggleModal}>취소</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Toggle;
