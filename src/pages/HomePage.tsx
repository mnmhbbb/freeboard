import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container } from 'reactstrap';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page';

const FirstPage: React.FC<IPageProps> = (props) => {
  const [userInfo, setUserInfo] = useState<string>('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user.uid);
      } else {
        setUserInfo('');
      }
    });
  }, []);

  return (
    <Container>
      <Card>
        <CardBody>
          <p>~천방지축 얼렁뚱땅 빙글빙글 돌아가는~</p>
          {auth.currentUser ? <Link to="/myinfo">내 정보</Link> : <Link to="/login">로그인</Link>}
        </CardBody>
        {auth.currentUser && <PostForm uid={userInfo} />}
        <Post uid={userInfo} />
      </Card>
    </Container>
  );
};

export default FirstPage;
