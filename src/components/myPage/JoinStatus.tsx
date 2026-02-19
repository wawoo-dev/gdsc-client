import MemberStatusInfoBox from '@/components/myPage/MemberStatusInfoBox';
import { User, UserRoleType } from '@/types/user';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { Help } from 'wowds-icons';
import { space } from 'wowds-tokens';
import { Flex, Space, Text } from '../common/Wrapper';

import MemberStatusStepper from './MemberStatusStepper';
import { StatusBox } from './StatusBox';

const JoinStatus = ({
  role,

  member
}: {
  role: UserRoleType;

  member: User;
}) => {
  const [openInfo, setOpenInfo] = useState(false);
  const helpButtonRef = useRef<HTMLDivElement>(null);
  return (
    <Flex justify="flex-start" direction="column" align="flex-start">
      <Space height={40} />
      <Container>
        <Text typo="label1" color="textBlack">
          현재 회원 상태
        </Text>
        <div
          ref={helpButtonRef}
          onClick={() => {
            setOpenInfo(!openInfo);
          }}>
          <Help
            width={18}
            height={18}
            fill="sub"
            stroke="sub"
            style={{ cursor: 'pointer' }}
          />
        </div>
        {openInfo && (
          <MemberStatusInfoBox
            setOpenInfo={setOpenInfo}
            exceptRef={helpButtonRef}
          />
        )}
      </Container>
      <Space height={40} />

      <MemberStatusStepper member={member} />
      <Space height={20} />
      <StatusBox role={role} />
    </Flex>
  );
};

export default JoinStatus;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: ${space.xxs};
  justify-content: 'flex-start';
  align-items: 'center';
`;
