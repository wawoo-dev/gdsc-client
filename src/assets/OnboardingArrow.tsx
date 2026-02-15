export const OnboardingArrow = () => {
  return (
    <>
      <style>
        {`
        @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }

      .bounce {
        animation: bounce 1s infinite;
      }
    `}
      </style>
      <svg
        className="bounce"
        width="30"
        height="20"
        viewBox="0 0 30 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 8  L16 13 L30 8"
          stroke="white"
          strokeOpacity="0.7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 14 L16 19 L30 14"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
