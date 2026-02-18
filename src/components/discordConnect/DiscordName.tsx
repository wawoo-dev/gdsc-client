import { Flex, Space, Text } from '@/components/common/Wrapper';
import { usePostDiscordName } from '@/hooks/mutation/usePostDiscordName';
import RoutePath from '@/routes/routePath';
import { DiscordFormValues } from '@/types/discord';
import { memo, useCallback, useEffect } from 'react';
import { Control, useController, useFormContext } from 'react-hook-form';
import Button from 'wowds-ui/Button';
import Divider from 'wowds-ui/Divider';
import TextButton from 'wowds-ui/TextButton';
import TextField from 'wowds-ui/TextField';
import { Image } from '../common/Image';
import DiscordImage from '/discord/discord-name.png';

export const DiscordName = ({ onNext }: { onNext: () => void }) => {
  const { getValues, control, trigger, setError } =
    useFormContext<DiscordFormValues>();

  const { checkDuplicate, data, isSuccess } = usePostDiscordName();

  useEffect(() => {
    if (isSuccess) {
      if (data?.isDuplicate) {
        setError('discordUsername', {
          type: 'manual',
          message:
            '이미 가입된 사용자명이에요. 이전에 가입한 적이 있으신 경우, 카카오톡 채널로 문의해주세요.'
        });
      } else {
        onNext();
      }
    }
  }, [data?.isDuplicate, isSuccess, onNext, setError]);

  const handleNextClick = useCallback(async () => {
    const isValid = await trigger('discordUsername');
    if (isValid) {
      checkDuplicate(getValues('discordUsername'));
    } else {
      setError('discordUsername', {
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

      <Flex direction="column" style={{ marginTop: 'auto' }}>
        <Button onClick={handleNextClick} style={{ maxWidth: '100%' }}>
          다음으로
        </Button>
        <Space height="xs" />
        <TextButton
          text="디스코드 계정이 없나요?"
          asProp="a"
          target="_blank"
          href={RoutePath.DiscordRegisterLink}
        />
      </Flex>
    </>
  );
};

const TextSection = memo(() => {
  return (
    <>
      <div>
        <Text typo="h1">사용자명을 알려주세요.</Text>
        <Space height="sm" />
        <Text typo="body1">
          GDG Hongik Univ. 디스코드 서버에서는 사용자명을 통해 멤버를 구분해요.
        </Text>
      </div>
      <Image src={DiscordImage} alt="discord-name" align="center" />
      <Text typo="body1">
        본인의 디스코드 사용자명을 아래 규정과 맞게 설정한 후 입력해주세요.
      </Text>
      <Divider />
    </>
  );
});

const NameField = ({ control }: { control: Control<DiscordFormValues> }) => {
  const { field, fieldState } = useController({
    name: 'discordUsername',
    control,
    rules: {
      required: '사용자명을 입력해주세요.',
      pattern: {
        value: /^[a-z0-9_.]{2,32}$/,
        message: '하단 규정에 맞춰 작성해주세요.'
      },
      validate: {
        noSequentialSpecialChar: (value) =>
          !/(__|\.\.)/.test(value) || '하단 규정에 맞춰 작성해주세요.',
        noOfficialNames: (value) =>
          !/discord|nitro|nelly/.test(value) || '하단 규정에 맞춰 작성해주세요.'
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
          <li>최소 2자, 최대 32자까지만 작성 가능</li>
          <li>대문자가 아닌 소문자로만 작성 가능</li>
          <li>밑줄(_)과 마침표(.)가 아닌 특수 문자 사용 불가능</li>
          <li>
            연속적인 밑줄(a__b)과 마침표(a..b)로 이루어진 경우 사용 불가능
          </li>
          <li>discord, nitro, nelly와 같은 디스코드 공식 이름 사용 불가능</li>
        </ul>
      }
      label="디스코드 사용자명"
      placeholder="내용을 입력해주세요."
      error={!!fieldState.error}
    />
  );
};
