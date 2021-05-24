import React, { useState } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';

const ForgotPasswordPage: React.FC<IPageProps> = (props) => {
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const resetPasswordRequest = () => {
    if (error !== '') setError('');

    setSending(true);

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        logging.info('Email sent.');
        setSent(true);
        setSending(false);
      })
      .catch((error) => {
        logging.error(error);
        setError(error.message);
        setSending(false);
      });
  };

  return (
    <AuthContainer header="비밀번호 찾기">
      {sent ? (
        <p>입력한 이메일로 링크를 전송했습니다.</p>
      ) : (
        <>
          <p>이메일을 입력하세요</p>
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
          <Button disabled={sending} color="success" block onClick={resetPasswordRequest}>
            이메일로 링크 보내기
          </Button>
          <ErrorText error={error} />
        </>
      )}
    </AuthContainer>
  );
};

export default ForgotPasswordPage;
