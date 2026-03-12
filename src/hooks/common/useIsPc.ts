import { useState } from 'react';

const useIsPc = () => {
  const [isPc] = useState(
    () => window.matchMedia('(min-width: 900px)').matches
  );
  return isPc;
};

export default useIsPc;
