import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { firestore } from '../../config/firebase';
import logging from '../../config/logging';
import { IUser } from '../../interfaces/post';
import Toggle from '../Toggle';

const Post: React.FC<IUser> = ({ uid }) => {
  const [postList, setPostList] = useState<any[]>([]);

  useEffect(() => {
    firestore
      .collection('post')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPostList(data);
        },
        (error) => {
          logging.error(error);
        },
      );
  }, [postList]);

  return (
    <ul>
      {postList.map((v) => (
        <li key={v.id}>
          <Card>
            <CardBody>
              <CardText style={{ whiteSpace: 'pre-line' }}>{v.text}</CardText>
              {v.userId === uid && <Toggle id={v.id} />}
            </CardBody>
          </Card>
        </li>
      ))}
    </ul>
  );
};
export default Post;
