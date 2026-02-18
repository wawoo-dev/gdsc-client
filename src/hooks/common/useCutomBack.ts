import { useEffect, useRef } from 'react';

function useCustomBack(customBack: () => boolean | void) {
  const customBackRef = useRef(customBack);

  // 항상 최신 customBack 참조 유지
  customBackRef.current = customBack;

  useEffect(() => {
    const handler = () => {
      const shouldPrevent = customBackRef.current();

      if (shouldPrevent === false) {
        // 실제 뒤로가기 허용
        return;
      }
    };

    window.addEventListener('popstate', handler);
    return () => {
      window.removeEventListener('popstate', handler);
    };
  }, []);
}

export default useCustomBack;
