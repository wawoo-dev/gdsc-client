import createInfoApi from '@/apis/member/createInfoApi';
import RoutePath from '@/routes/routePath';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function useCreateUserInfo() {
  const navigation = useNavigate();

  const { mutate: createInfo, ...rest } = useMutation({
    mutationFn: createInfoApi.USER_INFO,
    onSuccess: () => {
      navigation(RoutePath.Dashboard, { replace: true });
    }
  });

  return { createInfo, ...rest };
}
