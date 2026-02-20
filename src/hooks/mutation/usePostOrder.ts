import { useMutation } from '@tanstack/react-query';
import ordersApi from '@/apis/orders/ordersApi';

const usePostOrder = () => {
  const { mutate: postOrder, mutateAsync: postOrderAsync, ...rest } = useMutation({
    mutationFn: ordersApi.POST_ORDER
  });

  return { postOrder, postOrderAsync, ...rest };
};

export default usePostOrder;
