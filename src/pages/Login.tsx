import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';

function Login() {
  return (
    <main className="grid-col-[48rem] grid min-h-dvh content-center justify-center gap-14 bg-gray-50 dark:bg-slate-900 dark:text-slate-50">
      <Logo />
      <h4 className="h4">Login in to your account</h4>
      <LoginForm />
    </main>
  );
}

export default Login;
