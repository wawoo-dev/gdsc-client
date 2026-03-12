import { Flex, MobileBreak, Space, Text } from '@/components/common/Wrapper';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from 'wowds-ui/Button';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import usePostOrder from '@/hooks/mutation/usePostOrder';
import RoutePath from '@/routes/routePath';
import { media } from '@/styles';
import { css } from '@emotion/react';
import { isAxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { color, typography } from 'wowds-tokens';

export function PaymentsSuccess() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const isCalledRef = useRef(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { postOrder } = usePostOrder();

  useEffect(() => {
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

    if (isCalledRef.current) return;
    isCalledRef.current = true;

    postOrder(
      {
        paymentKey: requestData.paymentKey,
        orderNanoId: requestData.orderId,
        amount: +requestData.amount
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['member'] });
          setIsConfirmed(true);
        },
        onError: (error) => {
          // 409 Conflict는 이미 처리된 요청이므로 성공으로 간주
          if (isAxiosError(error) && error.response?.status === 409) {
            setIsConfirmed(true);
            return;
          }
          navigate(RoutePath.PaymentsFail);
        }
      }
    );
  }, []);

  if (!isConfirmed) {
    return <LoadingSpinner />;
  }

  return (
    <Wrapper direction="column" justify="space-between">
      <Flex
        direction="column"
        justify="space-between"
        css={css`
          height: 100%;
          ${media.pc} {
            justify-content: center;
            gap: 100px;
            max-width: 500px;
          }
        `}>
        <Flex direction="column" gap="lg" align="flex-start">
          <Heading typo="h1" color="black">
            회비 결제 완료
          </Heading>
          <Flex direction="column" align="start">
            <Text
              css={css`
                ${media.pc} {
                  text-align: center;
                  width: 100%;
                }
              `}>
              이번 학기 회비 결제를 완료했어요.
              <br />
              이제 <strong>GDG Hongik Univ. 정회원</strong>으로
              <MobileBreak />
              이번 학기에 활동하실 수 있어요!
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
      </Flex>
    </Wrapper>
  );
}

const Heading = styled(Text)`
  padding-top: 40px;
  ${media.pc} {
    ${typography.display2}
    text-align: center;
    width: 100%;
  }
`;

const Wrapper = styled(Flex)`
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  padding: 0px 16px;
  background-color: ${color.backgroundAlternative};
  ${media.pc} {
    height: calc(100vh - var(--header-height, 0px));
  }
`;
