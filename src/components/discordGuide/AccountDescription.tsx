import { Flex, Text } from '@/components/common/Wrapper';
import RoutePath from '@/routes/routePath';
import { useNavigate } from 'react-router-dom';
import Button from 'wowds-ui/Button';
import { Image } from '../common/Image';
import DiscordImage from '/discord/discord-guide-account.png';

export const AccountDescription = ({
  isReconnect = false
}: {
  isReconnect?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex direction="column" align="flex-start" gap="lg">
        <Text typo="h1">계정은 어떻게 만드나요?</Text>
        <Image
          src={DiscordImage}
          alt="discord-guide-account"
          style={{ padding: '0 27px' }}
        />
        <Text typo="body1">
          디스코드 계정을 만들기 위해서는 위와 같은 정보를 입력해야 해요. 계정을
          생성하고 다음 연동 절차를 진행해주세요!
        </Text>
      </Flex>
      <Flex gap="sm">
        <Button
          asProp="a"
          href={RoutePath.DiscordRegisterLink}
          target="_blank"
          variant="outline">
          계정 생성하기
        </Button>
        <Button
          onClick={() => {
            const path = isReconnect
              ? `${RoutePath.DiscordConnect}?reconnect=true`
              : RoutePath.DiscordConnect;
            navigate(path);
          }}>
          연동하기
        </Button>
      </Flex>
    </>
  );
};
