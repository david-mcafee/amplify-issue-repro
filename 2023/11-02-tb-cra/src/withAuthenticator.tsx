/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-useless-fragment */
import { useState, useEffect, FormEvent, ReactNode, FC } from "react";
import { Hub } from "aws-amplify/utils";
import {
  getCurrentUser,
  signIn,
  signUp,
  confirmSignUp,
} from "aws-amplify/auth";

type AuthUser = Awaited<ReturnType<typeof getCurrentUser>>;

const ConfirmationForm: React.FC = () => {
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmSignUp({ username: "d.mcafee712@gmail.com", confirmationCode });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={confirmationCode}
        onChange={(e) => setConfirmationCode(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Here, you can add your login logic
    console.log("Username:", username);
    console.log("Password:", password);
    signIn({ username, password });
  };

  const createAccount = () => {
    signUp({ username: "d.mcafee712@gmail.com", password: "The#test1" });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" id="loginButton">
          Login
        </button>
      </form>
      <button onClick={createAccount}>Create Account</button>
      <ConfirmationForm />
    </>
  );
}

// eslint-disable-next-line react/no-unused-prop-types, react/function-component-definition
const Authenticator: FC<{ children: ReactNode }> = (props) => {
  const [userInfo, setUserInfo] = useState<AuthUser | undefined>(undefined);

  const updateAuth = () => {
    getCurrentUser()
      .then((user) => setUserInfo(user))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    updateAuth();
  }, []);

  Hub.listen("auth", ({ payload }) => {
    updateAuth();
  });

  console.log(userInfo);
  return userInfo ? <>{props.children}</> : <LoginForm />;
};

// eslint-disable-next-line import/prefer-default-export
export function withAuthenticator(App: FC): FC {
  return function (props) {
    return (
      <Authenticator>
        <div>
          <App />
        </div>
      </Authenticator>
    );
  };
}
