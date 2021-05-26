import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Spinner } from 'reactstrap';
import { firestore } from '../../config/firebase';
import logging from '../../config/logging';
import { IUser } from '../../pages/HomePage';

const PostForm: React.FC<IUser> = (props) => {
  const { uid } = props;
  const [text, setText] = useState<string>('');
  const [posting, setPosting] = useState<boolean>(false);

  const submitHandler = useCallback(
    async (event: React.FormEvent) => {
      console.log('submit');
      event.preventDefault();
      setPosting(true);
      try {
        await firestore.collection('post').add({
          createdAt: Date.now(),
          userId: uid,
          text,
        });
        setPosting(false);
      } catch (error) {
        setPosting(false);
        logging.error(error);
      }
      console.log(text);
      setText('');
    },
    [text, uid],
  );

  return (
    <Form onSubmit={submitHandler}>
      <Input type="textarea" value={text} onChange={(event) => setText(event.target.value)} />
      <Button style={{ float: 'right' }}>등록</Button>
      {posting && <Spinner color="info" style={{ float: 'right' }} />}
    </Form>
  );
};

export default PostForm;
