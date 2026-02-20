import { Flex, Space, Text } from '@/components/common/Wrapper';
import { media } from '@/styles';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from 'wowds-ui/Button';

import GlobalSize from '@/constants/globalSize';
import usePostOrder from '@/hooks/mutation/usePostOrder';
import RoutePath from '@/routes/routePath';
import { useEffect, useRef } from 'react';
import { color } from 'wowds-tokens';
import axios from 'axios';

export function PaymentsSuccess() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const isCalledRef = useRef(false);

  const { postOrderAsync } = usePostOrder();

  useEffect(() => {
    if (isCalledRef.current) return;
    isCalledRef.current = true;

    const executeConfirm = async () => {
      const requestData = {
        orderId: searchParams.get('orderId'),
        amount: searchParams.get('amount'),
        paymentKey: searchParams.get('paymentKey')
      };

      if (
        !requestData.orderId ||
        !requestData.amount ||
        !requestData.paymentKey
      ) {
        navigate(RoutePath.PaymentsFail);
        return;
      }

      try {
        await postOrderAsync({
          paymentKey: requestData.paymentKey,
          orderNanoId: requestData.orderId,
          amount: +requestData.amount
        });
      } catch (error) {
        // 409 Conflict는 이미 처리된 요청이므로 성공으로 간주
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          return;
        }
        navigate(RoutePath.PaymentsFail);
      }
    };

    executeConfirm();
  }, []);

  return (
    <Wrapper direction="column" justify="space-between">
      <Flex direction="column" gap="lg" align="flex-start">
        <Heading typo="h1" color="black">
          회비 결제 완료
        </Heading>
        <Flex direction="column" align="start">
          <Text>이번 학기 회비 결제를 완료했어요.</Text>
          <Text>
            이제 <strong>GDG Hongik Univ. 정회원</strong>으로
            <br /> 이번 학기에 활동하실 수 있어요!
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column">
        <Button
          onClick={() => {
            navigate(RoutePath.Dashboard);
            queryClient.invalidateQueries({ queryKey: ['member'] });
          }}>
          완료하기
        </Button>
        <Space height={28} />
      </Flex>
    </Wrapper>
  );
}

const Heading = styled(Text)`
  padding-top: 40px;
`;

const Wrapper = styled(Flex)`
  box-sizing: border-box;

  height: calc(100vh - var(--header-height, 0px));
  width: ${GlobalSize.width};
  padding: 0px 16px;

  background-color: ${color.backgroundAlternative};

  ${media.mobile} {
    width: 100vw;
  }
`;
