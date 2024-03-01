import { FormEvent, useState } from 'react';
import { useLogin } from './useLogin.js';
import Button from '../../ui/Button.jsx';
import FormRowVertical from '../../ui/FormRowVertical.jsx';
import SpinnerMini from '../../ui/SpinnerMini.tsx';

function LoginForm() {
  const [email, setEmail] = useState('user@mail.com');
  const [password, setPassword] = useState('123456');

  const { isLoading, login } = useLogin();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('handle login');
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail(''), setPassword(''); //makes form fields empty
        },
      },
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <input
          className="input"
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <input
          className="input"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" isDisabled={isLoading} type="submit">
          {!isLoading ? 'Log in' : <SpinnerMini />}
        </Button>        
      </FormRowVertical>
    </form>
  );
}

export default LoginForm;
