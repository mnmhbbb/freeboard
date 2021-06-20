import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { firestore } from '../../config/firebase';
import logging from '../../config/logging';
import { IUser } from '../../interfaces/post';
import Toggle from '../Toggle';

function Post({ uid }: IUser) {
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

  const timeCheck = useCallback((value) => {
    const now = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((now.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenHour = Math.floor(betweenTime / 60);
    if (betweenHour < 24) {
      return `${betweenHour}시간 전`;
    }

    const betweenDay = Math.floor(betweenTime / 60 / 24);
    if (betweenDay < 365) {
      return `${betweenDay}일 전`;
    }
  }, []);

  return (
    <ul>
      {postList.map((v) => (
        <li key={v.id}>
          <Card>
            <CardBody>
              <CardText style={{ whiteSpace: 'pre-line' }}>{v.text}</CardText>
              {v.userId === uid && <Toggle id={v.id} />}
              <CardText>{timeCheck(v.createdAt)}</CardText>
            </CardBody>
          </Card>
        </li>
      ))}
    </ul>
  );
}
export default Post;
