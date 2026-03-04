import { Modal } from '@/components/common/Modal';
import { Flex } from '@/components/common/Wrapper';
import { CompleteDiscordConnect } from '@/components/discordConnect/CompleteDiscordConnect';
import { DiscordName } from '@/components/discordConnect/DiscordName';
import { DiscordNickName } from '@/components/discordConnect/DiscordNickName';
import { JoinServer } from '@/components/discordConnect/JoinServer';
import { ServerConnect } from '@/components/discordConnect/ServerConnect';
import useCustomBack from '@/hooks/common/useCutomBack';
import { useFunnel } from '@/hooks/common/useFunnel';
import useIsPc from '@/hooks/common/useIsPc';
import RoutePath from '@/routes/routePath';
import { media } from '@/styles';
import { DiscordFormValues } from '@/types/discord';
import styled from '@emotion/styled';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { color } from 'wowds-tokens';

const steps = ['이름 설정', '별명 설정', '서버 합류', '서버 연동', '연동 완료'];

export const DiscordConnect = () => {
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);
  const navigate = useNavigate();
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const isPc = useIsPc();

  const methods = useForm<DiscordFormValues>({
    defaultValues: {
      discordUsername: '',
      discordNickname: '',
      code: ''
    }
  });
  const nextClickHandler = (step: string) => {
    setStep(step);
  };

  const handleBack = () => {
    const currentStepIndex = steps.indexOf(currentStep);
    if (currentStepIndex === 0) {
      return false;
    }
    setStep(steps[currentStepIndex - 1], true);
  };

  useCustomBack(handleBack);
  return (
    <>
      <Wrapper direction="column" justify="flex-start">
        <FormProvider {...methods}>
          <Funnel>
            <Step name="이름 설정">
              <DiscordName onNext={() => nextClickHandler(steps[1])} />
            </Step>
            <Step name="별명 설정">
              <DiscordNickName onNext={() => nextClickHandler(steps[2])} />
            </Step>
            <Step name="서버 합류">
              <JoinServer onNext={() => nextClickHandler(steps[3])} />
            </Step>
            <Step name="서버 연동">
              <ServerConnect
                onNext={() => {
                  if (isPc) {
                    setIsCompleteModalOpen(true);
                  } else {
                    nextClickHandler(steps[4]);
                  }
                }}
              />
            </Step>
            <Step name="연동 완료">
              <CompleteDiscordConnect />
            </Step>
          </Funnel>
        </FormProvider>
      </Wrapper>
      <Modal
        isOpen={isCompleteModalOpen}
        onClose={() => {
          setIsCompleteModalOpen(false);
          navigate(RoutePath.Dashboard);
        }}>
        <CompleteDiscordConnect />
      </Modal>
    </>
  );
};

const Wrapper = styled(Flex)`
  margin: 0px -16px;
  padding: 0px 16px;
  background-color: ${color.backgroundAlternative};
  padding-top: 40px;
  padding-bottom: 28px;
  min-height: calc(100vh - var(--header-height, 0px));
  ${media.mobile} {
    height: 100vh;
    width: 100vw;
  }
`;
