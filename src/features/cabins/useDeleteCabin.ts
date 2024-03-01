import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully deleted');
      //invalidateQueries refetches data immediately after success delete for UI update
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteCabin };
}
