import IRoute from '../interfaces/route';
import ChangePasswordPage from '../pages/auth/ChangePasswordPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import LoginPage from '../pages/auth/LoginPage';
import LogoutPage from '../pages/auth/LogoutPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ResetPasswordPage from '../pages/auth/reset';
import HomePage from '../pages/HomePage';

const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    component: HomePage,
    name: 'Home Page',
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
