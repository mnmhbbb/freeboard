import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container } from 'reactstrap';
import IPageProps from '../../interfaces/page';

const MyPage: React.FC<IPageProps> = (props) => {
  return (
    <Container>
      <Card>
        <CardBody>
          <h3>내 정보</h3>
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

export default MyPage;
