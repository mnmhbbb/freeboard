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
  const [loading, setLoading] = useState<boolean>(false);

  const toggleEdit = useCallback(async () => {
    const current = await firestore.doc(`post/${id}`).get();
    const data: any = current.data();
    setNewText(data.text); // 수정할 때 기존 내용 불러오기
    setEditmode(!editmode);
  }, [editmode, id]);

  // 수정모드 취소하기
  const cancelBtn = useCallback(() => {
    setEditmode(false);
  }, []);

  const toggleModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const editHandler = useCallback(async () => {
    try {
      setNewText('');
      setEditmode(false);
      await firestore.doc(`post/${id}`).update({
        text: newText,
      });
    } catch (error) {
      logging.error(error);
    }
  }, [id, newText]);

  const deleteHandler = useCallback(async () => {
    try {
      setLoading(true);
      await firestore.doc(`post/${id}`).delete();
    } catch (error) {
      logging.error(error);
    }
    setLoading(false);
    return setModal(false);
  }, [id]);

  return (
    <>
      {loading && <Spinner color="info" />}
      {editmode ? (
        <Form>
          <Input
            type="textarea"
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
          />
          <Button style={{ float: 'right' }} onClick={cancelBtn}>
            취소
          </Button>
          <Button style={{ float: 'right' }} onClick={editHandler}>
            수정
          </Button>
        </Form>
      ) : (
        <>
          {loading && <Spinner color="info" />}
          <Button onClick={toggleEdit} disabled={loading}>
            수정
          </Button>
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
