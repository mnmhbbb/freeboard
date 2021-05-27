import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'reactstrap';
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
      console.log('submit');
      setPosting(true);

      const addObj = {
        createdAt: Date.now(),
        userId: uid,
        text,
      };

      try {
        console.log(text);
        setText('');
        await firestore.collection('post').add(addObj);
      } catch (error) {
        setPosting(false);
        logging.error(error);
      }
      return setPosting(false);
    },
    [text, uid],
  );

  return (
    <Form onSubmit={submitHandler}>
      <Input type="textarea" value={text} onChange={onChange} />
      <Button disabled={posting} style={{ float: 'right' }}>
        등록
      </Button>
      {/* {posting && <Spinner color="info" style={{ float: 'right' }} />} */}
    </Form>
  );
};

export default PostForm;
