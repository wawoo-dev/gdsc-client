import { Flex, Text } from '@/components/common/Wrapper';
import { RightArrow } from 'wowds-icons';
import { color } from 'wowds-tokens';

type BoxVariantType = 'arrow' | 'text';

export interface CustomBoxProps<T extends BoxVariantType> {
  variant?: T;
  disabled?: boolean;
  onClick?: T extends 'arrow' ? () => void : never;
  leftElement?: React.ReactNode;
  text: React.ReactNode;
  subTextContent?: React.ReactNode;
  status?: 'default' | 'success' | 'error';
  style?: React.CSSProperties;
  centered?: boolean;
}

const CustomBox = <T extends BoxVariantType>({
  leftElement,
  variant,
  disabled = false,
  text,
  subTextContent,
  status = 'default',
  onClick,
  style,
  centered = false,
  ...rest
}: CustomBoxProps<T>) => {
  const getBorderColor = () => {
    if (disabled) return 'lightDisabled';
    switch (status) {
      case 'error':
        return color.error;
      default:
        return color.outline;
    }
  };

  const getStrokeColor = () => {
    if (disabled) return 'lightDisabled';
    switch (status) {
      case 'error':
        return 'error';
      default:
        return 'sub';
    }
  };

  const handleArrowClick = () => {
    if (variant === 'arrow' && onClick && !disabled) {
      onClick();
    }
  };

  const containerStyle: React.CSSProperties = {
    padding: '24px 20px 20px',
    borderRadius: '8px',
    border: `1px solid ${getBorderColor()}`,
    width: '100%',
    maxWidth: '652px',
    minWidth: '316px',
    backgroundColor:
      disabled || status === 'success'
        ? color.backgroundAlternative
        : color.white,
    cursor: disabled
      ? 'not-allowed'
      : variant === 'arrow'
        ? 'pointer'
        : 'default',
    ...style
  };

  return (
    <Flex
      align="center"
      direction="row"
      gap={variant !== 'text' ? 'lg' : undefined}
      justify={centered ? 'center' : 'space-between'}
      style={containerStyle}
      onClick={handleArrowClick}
      {...rest}>
      <Flex align="center" direction="row" gap="xs" style={{ width: centered ? 'auto' : '100%' }}>
        {leftElement}
        <Flex direction="column" gap="sm">
          {typeof text === 'string' ? (
            <Text
              typo="h3"
              color={disabled ? 'sub' : 'textBlack'}
              style={{ width: '100%' }}>
              {text}
            </Text>
          ) : (
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
              {text}
            </div>
          )}
          {subTextContent}
        </Flex>
      </Flex>
      {!centered && (
        <div>
          {variant === 'arrow' && (
            <RightArrow width={20} height={20} stroke={getStrokeColor()} />
          )}
        </div>
      )}
    </Flex>
  );
};

export default CustomBox;
