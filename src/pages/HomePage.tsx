import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container } from 'reactstrap';
import IPageProps from '../interfaces/page';

const HomePage: React.FC<IPageProps> = (props) => {
  return (
    <Container>
      <Card>
        <CardBody>
          <p>Welcome to this page that is protected by Friebase auth!</p>
          <p>
            <Link to="/change">비밀번호 변경</Link>
          </p>
          <p>
            <Link to="/logout">로그아웃</Link>
          </p>
        </CardBody>
      </Card>
    </Container>
  );
};

export default HomePage;
