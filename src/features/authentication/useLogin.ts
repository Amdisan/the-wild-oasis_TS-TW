import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isLoading, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], () => data.user); //we set to tenstack cach memory manualy user after succsess login
      toast.success('Logged in successfully');
      navigate('/dashboard', { replace: true });
    }, // replace -> eraze place where we were before

    onError: (error) => {
      console.log('ERROR', error);
      toast.error('Provided email or password are incorrect');
    },
  });
  return { isLoading, login };
}
