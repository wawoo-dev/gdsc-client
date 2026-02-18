import { ReactElement, ReactNode, useCallback, useRef, useState } from 'react';
export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export const useFunnel = (defaultStep: string) => {
  const [step, setStepState] = useState(defaultStep);
  const isBackNavigationRef = useRef(false);

  const setStep = useCallback((newStep: string, isBack = false) => {
    isBackNavigationRef.current = isBack;
    setStepState((prevStep) => {
      if (newStep !== prevStep && !isBackNavigationRef.current) {
        history.pushState(null, '', location.href);
      }
      return newStep;
    });
  }, []);

  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find(
      (childStep) => childStep.props.name === step
    );

    return <>{targetStep}</>;
  };

  return { Funnel, Step, setStep, currentStep: step } as const;
};
