## Firebase로 만든 메모 게시판

- Baas(Backend as a Service)를 통해 프로젝트를 완성하고 싶어서 `Firebase`로 프로젝트를 만들었다.
- `firebase`에서 제공하는 `Authentication`을 사용하여 편하고 안전하게 로그인 인증 기능을 사용하였고, 구글 로그인 연동을 시켰다.
- `typescript`를 공부하고, 처음으로 프로젝트에 적용하였다.
- `react-strap` 라이브러리를 사용하여 반응형으로 스타일을 완성해보았다.
- 추가하고 싶은 기능이 많아서 틈틈이 보완할 예정이다.
- 링크: https://freeboard-a11d4.web.app/

### 1. 기능 및 특징

- 기본적인 `CRUD` 기능을 구현하였다.
- db에 있는 글 목록 불러오기, 글쓰기, 수정, 삭제 등의 기능이 있다.
- 이메일 & 비밀번호를 통한 간단한 회원가입과 구글 이메일 연동하여 회원가입하는 방법이 있다.
- `비밀번호 찾기` 기능은 `Firebase`에서 제공하는 기능을 활용하여, 이메일로 전송하여 비밀번호를 새로 설정하도록 했다.
- `내 정보` 페이지에 가면 `비밀번호 변경`과 `로그아웃`이 가능하다.

### 2. 구현 방식

- `src` 폴더 안에 크게 4개의 폴더(`components`, `config`, `interface`, `pages`)로 분류하였다.
- 폴더 이름 그대로, 페이지에 들어가는 컴포넌트들을 각 폴더에 담았고, 인터페이스 타입을 따로 분리하여 필요할 때 가져와서 사용했다.
- 이번엔 라우팅을 할 컴포넌트를 배열에 모두 담고, `map` 메서드를 사용해서 맵핑하였다.

```javascript
// config/routes.ts
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
  ...
```

- 여기서 로그인 여부에 따라 페이지 접근 권한을 분리하였다.

```javascript
// App.tsx
return (
  <div>
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          render={(routeProps: RouteComponentProps<any>) => {
            if (route.protected)
              return (
                <AuthRoute>
                  <route.component {...routeProps} />
                </AuthRoute>
              );

            return <route.component {...routeProps} />;
          }}
        />
      ))}
    </Switch>
  </div>
);
```

- `AuthRoute` 컴포넌트를 통해 로그인하지 않은 경우 로그인 페이지로 이동시켰다.

```javascript
// AuthRoute
const AuthRoute: FC<IAuthRouteProps> = ({ children }) => {
  if (!auth.currentUser) {
    logging.warn('No user detected, redirecting');
    return <Redirect to="/login" />;
  }

  return <div>{children}</div>;
};
```

- 또한, `Route`의 `component`에 들어간 컴포넌트는 `Route`가 주는 `history`, `match`, `location` 등의 요소를 사용할 수 있는데, typescript에서는 이 props를 받을 때 `react-router-dom`에서 제공하는 `ReactComponentProps`를 사용한다는 것을 알게 되었다.
