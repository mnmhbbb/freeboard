import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { firestore } from '../../config/firebase';
import { IUser } from '../../pages/HomePage';
import Toggle from '../Toggle/Toggle';

const Post: React.FC<IUser> = ({ uid }) => {
  const [postList, setPostList] = useState<any[]>([]);

  useEffect(() => {
    firestore.collection('post').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostList(data);
    });
  }, [postList]);

  return (
    <ul>
      {postList.map((v) => (
        <li key={v.id}>
          <Card>
            <CardBody>
              <CardText>{v.text}</CardText>
              {v.userId === uid && <Toggle id={v.id} />}
            </CardBody>
          </Card>
        </li>
      ))}
    </ul>
  );
};
export default Post;
