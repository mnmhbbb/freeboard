import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';

const LogoutPage: React.FC<IPageProps> = (props) => {
  const history = useHistory();

  const Logout = () => {
    auth
      .signOut()
      .then(() => history.push('/login'))
      .catch((error) => logging.error(error));
  };

  return (
    <AuthContainer header="Logout">
      <p className="text-center">정말 로그아웃 하시겠습니까?</p>
      <div className="text-center">
        <Button color="danger" className="mr-2" onClick={() => history.goBack()}>
          취소
        </Button>
        <Button color="info" className="mr-2" onClick={() => Logout()}>
          로그아웃
        </Button>
      </div>
    </AuthContainer>
  );
};

export default LogoutPage;
