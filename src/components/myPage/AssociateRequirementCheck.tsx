import { Discord } from '@/assets/Discord';
import { Flex, Text } from '@/components/common/Wrapper';
import RoutePath from '@/routes/routePath';
import { UnivEmailStatus } from '@/types/status';
import { AssociateRequirement, UserInfo } from '@/types/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { color } from 'wowds-tokens';
import Box from 'wowds-ui/Box';
import Button from 'wowds-ui/Button';
import { Modal } from '../common/Modal';
import CustomBox from './CustomBox';

const AssociateRequirementCheck = ({
  associateRequirement,
  memberInfo
}: {
  associateRequirement: AssociateRequirement;
  memberInfo: UserInfo;
}) => {
  const [discordModalOpen, setDiscordModalOpen] = useState(false);
  const { infoStatus, discordStatus, univStatus } = associateRequirement;
  const navigate = useNavigate();

  const handleClose = () => {
    setDiscordModalOpen(false);
  };

  const univStatusContent = (univStatus: UnivEmailStatus) => {
    if (univStatus === 'UNSATISFIED')
      return (
        <Flex
          direction="column"
          gap="xs"
          justify="flex-start"
          align="flex-start">
          <Text typo="h3" color="textBlack">
            재학생 이메일 인증이 필요해요.
          </Text>
          <Text typo="body1" color="sub">
            홍익대학교 재학생인지 알려주세요.
            <br />
            학교 Gmail을 통해 인증할 수 있어요.
          </Text>
        </Flex>
      );
    if (univStatus === 'IN_PROGRESS')
      return (
        <Flex
          direction="column"
          gap="xs"
          justify="flex-start"
          align="flex-start">
          <Text typo="h3" color="textBlack">
            재학생 이메일 인증이 진행 중이에요.
          </Text>
          <Text typo="body1" color="sub">
            메일함을 확인해주세요.
          </Text>
        </Flex>
      );
    return '홍익대학교 재학생 인증을 완료했어요.';
  };

  return (
    <Flex justify="flex-start" direction="column" align="flex-start" gap="sm">
      <Text typo="h2" color="black">
        준회원 가입 조건
      </Text>
      <Box
        text={
          infoStatus === 'UNSATISFIED'
            ? '기본 회원 정보를 입력해주세요.'
            : '기본 회원 정보를 모두 입력했어요.'
        }
        onClick={() => {
          if (infoStatus === 'UNSATISFIED') navigate(RoutePath.Signup);
        }}
        status={infoStatus === 'UNSATISFIED' ? 'error' : 'success'}
        variant={infoStatus === 'UNSATISFIED' ? 'arrow' : 'text'}
      />

      {
        // 디스코드 해지 모달 (연동된 상태에서 클릭 시)
        <Modal isOpen={discordModalOpen} onClose={handleClose}>
          <Flex justify="cneter" direction="column" gap="md">
            <Text typo="body1" align="center">
              디스코드 계정 연동을 해지하시겠습니까? <br />
              해지 이후에 다시 디스코드 계정을 연동해야 준회원으로 활동이
              가능합니다.
            </Text>
            <Flex align="center" justify="center" gap="xxs">
              <Text typo="label2" color="sub">
                기존 Discord
              </Text>
              <div
                style={{
                  padding: '8px 12px 8px 12px',
                  borderRadius: 40,
                  border: `1px solid ${color.outline}`,
                  display: 'flex',
                  gap: 4,
                  alignItems: 'center'
                }}>
                <Discord width="14" height="14" />
                <Text color="textBlack" typo="label2">
                  {memberInfo.discordUsername}
                </Text>
              </div>
            </Flex>
            {/* //TODO: 백엔드 api 추가 이후 반영 필요 */}
            <Flex gap="xs" style={{ marginTop: 8 }}>
              <Button variant="outline" onClick={handleClose}>
                취소하기
              </Button>
              <Button>해지하기</Button>
            </Flex>
          </Flex>
        </Modal>
      }
      <CustomBox
        text={
          discordStatus === 'UNSATISFIED'
            ? '디스코드 연동이 필요해요.'
            : '디스코드 연동이 완료되었어요.'
        }
        subTextContent={
          discordStatus === 'UNSATISFIED' ? (
            <Text color="sub">
              <Flex justify="flex-start">
                <Discord width="20" height="20" />
                <Text as={'span'} color="discord" style={{ marginLeft: 3 }}>
                  GDG Hongik Univ.
                </Text>{' '}
                서버에
              </Flex>
              본인 계정을 연동하세요.
            </Text>
          ) : (
            <Flex direction="column" gap="sm">
              <Flex justify="flex-start" gap="xs">
                <Text color="outline" typo="label2">
                  디스코드 닉네임
                </Text>
                <Text color="sub" typo="body2">
                  {memberInfo.nickname}
                </Text>
              </Flex>
              <Flex justify="flex-start" gap="xs">
                <Text color="outline" typo="label2">
                  디스코드 사용자명
                </Text>
                <Text color="sub" typo="body2">
                  {memberInfo.discordUsername}
                </Text>
              </Flex>
            </Flex>
          )
        }
        variant={'arrow'}
        status={discordStatus === 'UNSATISFIED' ? 'error' : 'success'}
        onClick={() => {
          if (discordStatus === 'UNSATISFIED') {
            navigate(RoutePath.Discord);
          } else {
            setDiscordModalOpen(true);
          }
        }}
      />
      <Box
        onClick={() => {
          navigate(RoutePath.StudentVerification);
        }}
        text={univStatusContent(univStatus)}
        status={univStatus === 'SATISFIED' ? 'success' : 'error'}
        variant={univStatus === 'SATISFIED' ? 'text' : 'arrow'}
      />
    </Flex>
  );
};

export default AssociateRequirementCheck;
