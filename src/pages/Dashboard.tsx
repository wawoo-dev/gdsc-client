import memberApi from '@/apis/member/memberApi';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Modal } from '@/components/common/Modal';
import {
  DesktopOnly,
  Flex,
  MobileOnly,
  Space
} from '@/components/common/Wrapper';
import AssociateRequirementCheck from '@/components/myPage/AssociateRequirementCheck';
import JoinRegularMember from '@/components/myPage/JoinRegularMember';
import JoinStatus from '@/components/myPage/JoinStatus';
import MemberStatusStepper from '@/components/myPage/MemberStatusStepper';
import UserInfo from '@/components/myPage/UserInfo';
import useBottomSheet from '@/hooks/common/useBottomSheet';
import useIsPc from '@/hooks/common/useIsPc';
import { media } from '@/styles';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { color } from 'wowds-tokens';
import JoinRegularMemberBottomSheet from '../components/bottomsheet/JoinRegularMemberBottomSheet';

export const Dashboard = () => {
  const { isOpen, handleBottomSheet } = useBottomSheet();
  const isPc = useIsPc();
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
    <Wrapper direction="column" justify="flex-start" align="center">
      <div>
        <HeaderRow justify="space-between" align="center">
          <UserInfo member={member} />
          <DesktopOnly style={{ paddingTop: 16 }}>
            <MemberStatusStepper member={member} />
          </DesktopOnly>
        </HeaderRow>
        <MobileOnly>
          <JoinStatus role={member.role} member={member} showStepper={true} />
        </MobileOnly>
        <DesktopOnly>
          <JoinStatus role={member.role} member={member} showStepper={false} />
        </DesktopOnly>
        {member.role !== 'GUEST' && (
          <>
            <Space height={40} />
            <JoinRegularMember
              role={member.role}
              currentMembership={currentMembership}
              currentRecruitment={currentRecruitmentRound}
              paymentStatus={
                currentMembership?.regularRequirement.paymentStatus
              }
            />
          </>
        )}
        <Space height={40} />
        <AssociateRequirementCheck
          associateRequirement={member.associateRequirement}
          memberInfo={member.info}
        />
      </div>
      {isPc ? (
        <Modal
          isOpen={isOpen}
          onClose={handleBottomSheet}
          width={500}>
          <JoinRegularMemberBottomSheet
            currentRecruitment={currentRecruitmentRound}
            variant="modal"
          />
        </Modal>
      ) : (
        isOpen && (
          <JoinRegularMemberBottomSheet
            currentRecruitment={currentRecruitmentRound}
          />
        )
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  min-height: 100vh;
  width: '100%';
  padding: 100px 0px;

  background-color: ${color.mono50};
  ${media.mobile} {
    width: 100vw;
    padding: 20px 16px 100px 16px;
  }
`;

const HeaderRow = styled(Flex)`
  width: 100%;
  gap: 130px;
  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;
