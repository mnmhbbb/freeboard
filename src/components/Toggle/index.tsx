import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Modal, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { firestore } from '../../config/firebase';
import logging from '../../config/logging';

interface Props {
  id: string;
}

const Toggle: React.FC<Props> = ({ id }) => {
  const [newText, setNewText] = useState<string>('');
  const [editmode, setEditmode] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  const toggleEdit = useCallback(async () => {
    const current = await firestore.doc(`post/${id}`).get();
    const data: any = current.data();
    setEditmode(!editmode);
    setNewText(data.text); // 수정할 때 기존 내용 불러오기
  }, [editmode, id]);

  const toggleModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const editHandler = useCallback(async () => {
    setEditing(true);
    try {
      setNewText('');
      setEditmode(false);
      await firestore.doc(`post/${id}`).update({
        text: newText,
      });
      setEditing(false);
    } catch (error) {
      setEditing(false);
      logging.error(error);
    }
    return setEditing(false);
  }, [id, newText]);

  const deleteHandler = useCallback(async () => {
    try {
      await firestore.doc(`post/${id}`).delete();
    } catch (error) {
      logging.error(error);
    }
    return setModal(false);
  }, [id]);

  return (
    <>
      {editmode ? (
        <Form>
          <Input
            type="textarea"
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
          />
          <Button style={{ float: 'right' }} onClick={toggleEdit}>
            취소
          </Button>
          <Button style={{ float: 'right' }} onClick={editHandler} disabled={editing}>
            수정
          </Button>
          {editing && <Spinner color="info" />}
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
