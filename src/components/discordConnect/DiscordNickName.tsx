import { Flex, Space, Text } from '@/components/common/Wrapper';
import { usePostDiscordNickname } from '@/hooks/mutation/usePostDiscordNickname';
import { DiscordFormValues } from '@/types/discord';
import { memo, useCallback, useEffect } from 'react';
import { Control, useController, useFormContext } from 'react-hook-form';
import Button from 'wowds-ui/Button';
import Divider from 'wowds-ui/Divider';
import TextField from 'wowds-ui/TextField';
import { Image } from '../common/Image';
import DiscordImage from '/discord/discord-nickname.png';

export const DiscordNickName = ({ onNext }: { onNext: () => void }) => {
  const { getValues, control, setError, clearErrors, trigger } =
    useFormContext<DiscordFormValues>();
  const { checkDuplicate, data, isSuccess } = usePostDiscordNickname();

  useEffect(() => {
    if (isSuccess) {
      if (data?.isDuplicate) {
        setError('discordNickname', {
          type: 'manual',
          message: '이미 가입된 별명이에요. 다른 별명으로 변경해주세요.'
        });
      } else {
        clearErrors('discordNickname');
        onNext();
      }
    }
  }, [data?.isDuplicate, isSuccess, onNext, setError, clearErrors]);

  const handleNextClick = useCallback(async () => {
    const isValid = await trigger('discordNickname');
    if (isValid) {
      checkDuplicate(getValues('discordNickname'));
    } else {
      setError('discordNickname', {
        type: 'manual',
        message: '하단 규정에 맞춰 작성해주세요.'
      });
    }
  }, [checkDuplicate, getValues, setError, trigger]);

  return (
    <>
      <Flex direction="column" align="flex-start" gap="lg">
        <TextSection />
      </Flex>
      <Space height="lg" />
      <div style={{ width: '100%' }}>
        <NameField control={control} />
      </div>
      <Space height={146} />
      <Flex direction="column">
        <Button onClick={handleNextClick} style={{ maxWidth: '100%' }}>
          다음으로
        </Button>
      </Flex>
    </>
  );
};

const TextSection = memo(() => (
  <>
    <div>
      <Text typo="h1">별명을 설정하세요.</Text>
      <Space height="sm" />
      <Text typo="body1">
        GDG Hongik Univ. 디스코드 서버에서 사용할 별명을 설정해주세요.
      </Text>
    </div>
    <Image src={DiscordImage} alt="discord-nickname" />
    <Text typo="body1">
      가입이 완료되면 가입 신청서에 제출하신 별명으로 자동으로 수정될 거예요.
      추후 별명을 수정하고 싶다면 카카오톡 채널로 코어멤버에게 연락 주세요.
    </Text>
    <Divider />
  </>
));

const NameField = ({ control }: { control: Control<DiscordFormValues> }) => {
  const { field, fieldState } = useController({
    name: 'discordNickname',
    control,
    rules: {
      required: '별명을 입력해주세요.',
      pattern: {
        value: /^[가-힣]{2,6}$/,
        message: '하단 규정에 맞춰 작성해주세요.'
      }
    }
  });

  return (
    <TextField
      {...field}
      helperText={
        <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          {fieldState.error?.message && (
            <>
              <li>{fieldState.error.message}</li>
              <br />
            </>
          )}
          <li>최소 2자, 최대 6자의 한글만 작성 가능</li>
          <li>
            <button
              onClick={() => {
                window.open(
                  'https://www.wawoo.dev/onboard-guide/community-guideline',
                  '_blank',
                  'noopener,noreferrer'
                );
              }}>
              <u>GDG Hongik Univ. 가이드라인</u>
            </button>
            에 어긋나지 않게 작성
          </li>
        </ul>
      }
      label="디스코드 별명"
      placeholder="내용을 입력해주세요"
      error={!!fieldState.error}
    />
  );
};
