import memberApi from '@/apis/member/memberApi';
import QueryKeys from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export default function useCheckStudentId(studentId: string) {
  const { data, ...rest } = useQuery({
    queryKey: [QueryKeys.CheckStudentId, studentId],
    queryFn: () => memberApi.CHECK_STUDENT_ID(studentId),
    enabled: studentId.length > 0 && /^[A-Z]{1}[0-9]{6}$/.test(studentId)
  });

  return { data, ...rest };
}
