import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormGroup, Input, Spinner } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { auth, Providers } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import firebase from 'firebase';
import { SignInWithSocialMedia } from './modules';

const LoginPage: React.FC<IPageProps> = (props) => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const history = useHistory();

  const signInWithEmailAndPassword = () => {
    if (error !== '') setError('');

    setAuthenticating(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        logging.info(result);
        history.push('/');
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== '') setError('');

    setAuthenticating(true);

    SignInWithSocialMedia(provider)
      .then((result) => {
        logging.info(result);
        history.push('/');
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  return (
    <AuthContainer header="로그인">
      <FormGroup>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="이메일"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </FormGroup>
      <FormGroup>
        <Input
          autoComplete="new-password"
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormGroup>
      <Button disabled={authenticating} color="success" block onClick={signInWithEmailAndPassword}>
        로그인
      </Button>
      {authenticating && <Spinner color="info" />}
      <small>
        <p className="m-1 text-center">
          <Link to="/register">회원가입</Link>
        </p>
        <p className="m-1 text-center">
          <Link to="/forget">비밀번호 찾기</Link>
        </p>
      </small>
      <ErrorText error={error} />
      <hr className="bg-info m-3" />
      <Button
        block
        disabled={authenticating}
        onClick={() => signInWithSocialMedia(Providers.google)}
        style={{ backgroundColor: '#ea4335', borderColor: '#ea4335' }}
      >
        <i className="fab fa-google mr-2"></i>구글 계정으로 로그인
      </Button>
    </AuthContainer>
  );
};

export default LoginPage;
