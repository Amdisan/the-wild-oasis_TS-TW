import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  //1 load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2 if there is NO authenticated user, redirect to the /login

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate],
  );

  //3 while loading, show a spinner

  if (isLoading)
    return (
      <div className="flex h-dvh items-center justify-center bg-secondary_color">
        <Spinner />
      </div>
    );

  //4 if there is a user. render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
