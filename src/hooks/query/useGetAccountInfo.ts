import meApi from '@/apis/me/meApi';
import QueryKeys from '@/constants/queryKey';
import { useAccountInfoStore } from '@/hooks/zustand/useAccountInfo';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function useGetAccountInfo() {
  const setAccountInfo = useAccountInfoStore((state) => state.setAccountInfo);

  const query = useQuery({
    queryKey: [QueryKeys.AccountInfo],
    queryFn: meApi.GET_ACCOUNT_INFO
  });

  useEffect(() => {
    if (query.data) {
      setAccountInfo(query.data.name, query.data.githubHandle);
    }
  }, [query.data, setAccountInfo]);

  return query;
}
