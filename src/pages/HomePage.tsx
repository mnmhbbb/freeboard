import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container, Input } from 'reactstrap';
import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page';

const FirstPage: React.FC<IPageProps> = (props) => {
  return (
    <Container>
      <Card>
        <CardBody>
          <h2>~아무 말 대잔치~</h2>
          {auth.currentUser ? <Link to="/myinfo">내 정보</Link> : <Link to="/login">로그인</Link>}
        </CardBody>
      </Card>
    </Container>
  );
};

export default FirstPage;
