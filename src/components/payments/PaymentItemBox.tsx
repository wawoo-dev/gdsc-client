import memberApi from '@/apis/member/memberApi';
import { Flex, Text } from '@/components/common/Wrapper';
import { useProductBase } from '@/hooks/zustand/useProduct';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Box from 'wowds-ui/Box';
import LoadingSpinner from '../common/LoadingSpinner';

export const PaymentItemBox = () => {
  const { name, strAmount, setName, setAmount } = useProductBase();
  const { data: member, isLoading } = useQuery({
    queryKey: ['member'],
    queryFn: memberApi.GET_DASHBOARD
  });

  useEffect(() => {
    setName('만원');
    setAmount(10000);
  }, [setAmount, setName]);

  return (
    <>
      {isLoading || !member ? (
        <LoadingSpinner />
      ) : (
        <Flex
          justify="flex-start"
          direction="column"
          align="flex-start"
          gap="sm">
          <Text typo="label1" color="black">
            결제 항목
          </Text>
          <Box text={name} subText={`금액 ${strAmount}원`} status="success" />
        </Flex>
      )}
    </>
  );
};
