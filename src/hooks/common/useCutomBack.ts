import { useEffect, useRef } from 'react';

function useCustomBack(customBack: () => boolean | void) {
  const customBackRef = useRef(customBack);

  // 항상 최신 customBack 참조 유지
  customBackRef.current = customBack;

  useEffect(() => {
    const handler = () => {
      const shouldPrevent = customBackRef.current();

      if (shouldPrevent === false) {
        // 실제 뒤로가기 허용 - 아무것도 안 함 (브라우저가 알아서 이동)
        return;
      }
      // 뒤로가기 막고 콜백 실행 완료 (setStep에서 pushState 안 함)
    };

    window.addEventListener('popstate', handler);
    return () => {
      window.removeEventListener('popstate', handler);
    };
  }, []);
}

export default useCustomBack;
