import memberApi from '@/apis/member/memberApi';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Flex, Space } from '@/components/common/Wrapper';
import AssociateRequirementCheck from '@/components/myPage/AssociateRequirementCheck';
import JoinRegularMember from '@/components/myPage/JoinRegularMember';
import JoinStatus from '@/components/myPage/JoinStatus';
import UserInfo from '@/components/myPage/UserInfo';
import GlobalSize from '@/constants/globalSize';
import useBottomSheet from '@/hooks/common/useBottomSheet';
import { media } from '@/styles';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { color } from 'wowds-tokens';
import JoinRegularMemberBottomSheet from '../components/bottomsheet/JoinRegularMemberBottomSheet';

export const Dashboard = () => {
  const { isOpen } = useBottomSheet();
  const { data } = useQuery({
    queryKey: ['member'],
    queryFn: memberApi.GET_DASHBOARD
  });

  if (!data) {
    return (
      <Wrapper direction="column" justify="flex-start">
        <LoadingSpinner />
      </Wrapper>
    );
  }

  const { member, currentRecruitmentRound, currentMembership } = data;

  return (
    <div style={{ height: '100%' }}>
      <Wrapper direction="column" justify="flex-start">
        <Space height={20} />
        <Flex justify="flex-start" direction="column" align="flex-start">
          <UserInfo member={member} />
          <JoinStatus role={member.role} member={member} />
        </Flex>
        {member.role !== 'GUEST' && (
          <JoinRegularMember
            currentRecruitment={currentRecruitmentRound}
            paymentStatus={currentMembership?.regularRequirement.paymentStatus}
          />
        )}
        <AssociateRequirementCheck
          associateRequirement={member.associateRequirement}
          memberInfo={member.info}
        />

        <Space height={104} />
      </Wrapper>
      {isOpen && (
        <JoinRegularMemberBottomSheet
          currentMembership={currentMembership}
          currentRecruitment={currentRecruitmentRound}
        />
      )}
    </div>
  );
};

const Wrapper = styled(Flex)`
  min-height: 100vh;
  width: ${GlobalSize.width};
  margin: 0px -16px;
  padding: 0px 16px;
  gap: 40px;
  background-color: ${color.mono50};

  ${media.mobile} {
    width: 100vw;
  }
`;
