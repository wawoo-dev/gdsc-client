import {
  CurrentMembershipType,
  CurrentRecruitmentType
} from '@/apis/member/memberType';
import { Flex, Text } from '@/components/common/Wrapper';
import useBottomSheet from '@/hooks/common/useBottomSheet';
import RoutePath from '@/routes/routePath';
import { Status } from '@/types/status';
import { UserRoleType } from '@/types/user';
import {
  convertRecruitmentName,
  convertRecruitmentPeriod
} from '@/utils/mypage/recruitmentNameFormat';
import { useNavigate } from 'react-router-dom';
import CustomBox from './CustomBox';
import StatusBadge from './StatusBadge';

const JoinRegularMember = ({
  role,
  paymentStatus,
  currentMembership,
  currentRecruitment
}: {
  role: UserRoleType;
  paymentStatus?: Status;
  currentMembership: CurrentMembershipType | null;
  currentRecruitment: CurrentRecruitmentType;
}) => {
  const navigate = useNavigate();
  const { handleBottomSheet } = useBottomSheet();
  const handleClickRoute = () => {
    navigate(RoutePath.PaymentsCheckout);
  };

  const statusMessage =
    (paymentStatus === 'UNSATISFIED' || !paymentStatus) && role !== 'REGULAR'
      ? '진행전'
      : '완료';
  return (
    <Flex gap="sm" direction="column">
      <Flex gap="xs" justify="flex-start">
        <Text typo="h2" color="textBlack">
          활동 조건
        </Text>
        <StatusBadge statusMessage={statusMessage} />
      </Flex>
      {(paymentStatus === 'UNSATISFIED' || !paymentStatus) &&
      role !== 'REGULAR' ? (
        !currentRecruitment ? (
          <CustomBox
            text="현재 정회원 모집 기간이 아니예요."
            subTextContent={
              <Text typo="body2" color="sub">
                정회원 모집 기간이 되면 버튼이 활성화 돼요.
              </Text>
            }
            status="success"
          />
        ) : currentMembership ? (
          <CustomBox
            text={'이번 학기 회비를 납부해주세요.'}
            variant={'arrow'}
            status={'error'}
            subTextContent={
              <Text color="sub">
                카드·계좌이체 등 여러 결제수단을 지원해요.
              </Text>
            }
            onClick={() => {
              if (paymentStatus === 'UNSATISFIED' || !paymentStatus)
                handleClickRoute();
            }}
          />
        ) : (
          <CustomBox
            text={
              <Flex direction="column" align="flex-start" gap="sm">
                <Text typo="h3">
                  {convertRecruitmentName(
                    currentRecruitment.name,
                    currentRecruitment.roundTypeValue
                  )}
                </Text>
                <Text color="sub">
                  {convertRecruitmentPeriod(currentRecruitment.period)}
                </Text>
              </Flex>
            }
            variant={'arrow'}
            status="error"
            onClick={() => handleBottomSheet()}
          />
        )
      ) : (
        <CustomBox
          text={'이번 학기 회비를 납부했어요.'}
          variant={'text'}
          status={'success'}
        />
      )}
    </Flex>
  );
};

export default JoinRegularMember;
