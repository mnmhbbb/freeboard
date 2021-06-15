import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Spinner } from 'reactstrap';
import { firestore } from '../../config/firebase';
import logging from '../../config/logging';
import { IUser } from '../../interfaces/post';

const PostForm: React.FC<IUser> = (props) => {
  const { uid } = props;
  const [text, setText] = useState<string>('');
  const [posting, setPosting] = useState<boolean>(false);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }, []);

  const submitHandler = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (text === '') {
        return;
      }
      console.log('submit');
      setPosting(true);

      const addObj = {
        createdAt: Date.now(),
        userId: uid,
        text,
      };

      try {
        console.log(text);
        await firestore.collection('post').add(addObj);
        setText('');
      } catch (error) {
        setPosting(false);
        logging.error(error);
      }
      setPosting(false);
    },
    [text, uid],
  );

  return (
    <Form onSubmit={submitHandler}>
      <Input type="textarea" value={text} onChange={onChange} />
      {posting && <Spinner color="info" style={{ float: 'right' }} />}
      <Button disabled={posting} style={{ float: 'right' }}>
        등록
      </Button>
    </Form>
  );
};

export default PostForm;
