import { verifyStudentApi } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function useSendVerifyEmail() {
  const { mutate: sendVerifyEmail, ...rest } = useMutation({
    mutationFn: verifyStudentApi.SEND_VERIFY_EMAIL,
    onSuccess: () => {
      toast('메일 전송이 완료되었습니다.');
    }
  });

  return { sendVerifyEmail, ...rest };
}
