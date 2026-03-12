import { DesktopOnly, Flex, MobileOnly } from '@/components/common/Wrapper';
import { AccountDescription } from '@/components/discordGuide/AccountDescription';
import { DiscordDescription } from '@/components/discordGuide/DiscordDescription';
import { NameDescription } from '@/components/discordGuide/NameDescription';
import useCustomBack from '@/hooks/common/useCutomBack';
import { useFunnel } from '@/hooks/common/useFunnel';
import { media } from '@/styles';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { color } from 'wowds-tokens';

const steps = ['디스코드 설명', '이름 설명', '계정 생성 설명'];

export const DiscordGuide = () => {
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);
  const [searchParams] = useSearchParams();
  const isReconnect = searchParams.get('reconnect') === 'true';

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
    <Wrapper>
      <DesktopOnlyWrapper>
        <DiscordDescription onNext={() => {}} />
        <NameDescription onNext={() => {}} />
        <AccountDescription isReconnect={isReconnect} />
      </DesktopOnlyWrapper>

      <MobileOnlyWrapper>
        <Funnel>
          <Step name="디스코드 설명">
            <DiscordDescription onNext={() => nextClickHandler(steps[1])} />
          </Step>

          <Step name="이름 설명">
            <NameDescription onNext={() => nextClickHandler(steps[2])} />
          </Step>
          <Step name="계정 생성 설명">
            <AccountDescription isReconnect={isReconnect} />
          </Step>
        </Funnel>
      </MobileOnlyWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  width: 100%;
  min-height: 100vh;
  background-color: ${color.backgroundAlternative};
`;

const DesktopOnlyWrapper = styled(DesktopOnly)`
  ${media.pc} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 100px;
    max-width: 826px;
    margin: 100px auto;
  }
`;

const MobileOnlyWrapper = styled(MobileOnly)`
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: calc(100vh - var(--header-height, 0px));
    width: 100vw;
    margin: 0px -16px;
    padding: 20px 16px 40px 16px;
    background-color: ${color.backgroundAlternative};
  }
`;
