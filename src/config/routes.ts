import IRoute from '../interfaces/route';
import ChangePasswordPage from '../pages/auth/ChangePasswordPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import LoginPage from '../pages/auth/LoginPage';
import LogoutPage from '../pages/auth/LogoutPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ResetPasswordPage from '../pages/auth/reset';
import FirstPage from '../pages/HomePage';
import MyPage from '../pages/auth/MyPage';

const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    component: FirstPage,
    name: 'First Page',
    protected: false,
  },
  {
    path: '/myinfo',
    exact: true,
    component: MyPage,
    name: 'My Page',
    protected: true,
  },
  {
    path: '/register',
    exact: true,
    component: RegisterPage,
    name: 'Register Page',
    protected: false,
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
    name: 'Login Page',
    protected: false,
  },
  {
    path: '/change',
    exact: true,
    component: ChangePasswordPage,
    name: 'Change Password Page',
    protected: true,
  },
  {
    path: '/logout',
    exact: true,
    component: LogoutPage,
    name: 'Logout Page',
    protected: true,
  },
  {
    path: '/forget',
    exact: true,
    component: ForgotPasswordPage,
    name: 'Forgot Password Page',
    protected: false,
  },
  {
    path: '/reset',
    exact: true,
    component: ResetPasswordPage,
    name: 'Reset Password Page',
    protected: false,
  },
];

export default routes;
