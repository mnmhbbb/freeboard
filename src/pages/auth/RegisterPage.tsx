import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';

const RegisterPage: React.FC<IPageProps> = (props) => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const history = useHistory();

  const signUpWithEmailAndPassword = () => {
    if (password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (error !== '') setError('');

    setRegistering(true);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        logging.info(result);
        history.push('/login');
      })
      .catch((error) => {
        logging.error(error);

        if (error.code.includes('auth/weak-password')) {
          setError('비밀번호는 6자리 이상 입력하세요.');
        } else if (error.code.includes('auth/email-already-in-use')) {
          setError('이미 등록된 이메일입니다.');
        } else {
          setError('등록할 수 없습니다. 다시 시도해 주십시오.');
        }

        setRegistering(false);
      });
  };

  return (
    <AuthContainer header="회원가입">
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
      <FormGroup>
        <Input
          autoComplete="new-password"
          type="password"
          name="confirm"
          id="confirm"
          placeholder="비밀번호 확인"
          onChange={(event) => setConfirm(event.target.value)}
          value={confirm}
        />
      </FormGroup>
      <Button
        disabled={registering}
        color="success"
        block
        onClick={() => signUpWithEmailAndPassword()}
      >
        가입하기
      </Button>
      <small>
        <p className="m-1 text-center">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </small>
      <ErrorText error={error} />
    </AuthContainer>
  );
};

export default RegisterPage;
