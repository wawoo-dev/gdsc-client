import { BASE_URL } from '@/constants/environment';

const RoutePath = {
  Index: '/',
  Home: '/',

  FAQ: '/faq',

  Dashboard: '/dashboard',
  Discord: '/discord',
  DiscordConnect: '/discord/connect',
  DiscordGuide: '/discord/guide',

  GithubSignin: '/auth',
  StudentVerification: '/student-verification',
  Signup: '/signup',
  EmailVerification: '/email-verification',

  AuthGithubLoginRedirect: `${BASE_URL}/oauth2/authorization/github`,

  AuthServerRedirect: '/social-login/redirect',
  StudentVerificationServerRedirect: '/onboarding/verify-univ-email',
  EmailVerificationServerRedirect: '/onboarding/verify-email',
  GDSCHongikLink: 'https://www.wawoo.dev',
  GDSCHongikDiscord: 'https://discord.gg/dSV6vSEuGU',
  GitHubGuideLink: 'https://www.wawoo.dev/onboard-guide/github',
  StudentEmailLinkGuideLink: 'https://www.wawoo.dev/guide/student-email',
  CommunityGuideLink: 'https://www.wawoo.dev/onboard-guide/community-guideline',
  TermsLink: 'https://www.wawoo.dev/onboard-guide/community-rule',
  PersonalPrivacyLink: 'https://www.wawoo.dev/onboard-guide/privacy-policy',

  InstagramLink: 'https://www.instagram.com/gdsc.hongik/',
  DiscordRegisterLink: 'https://discord.com/register',
  DiscordCodeLink: 'https://discord.gg/dSV6vSEuGU',

  PaymentsCheckout: '/payments/checkout',
  PaymentsSuccess: '/payments/success',
  PaymentsFail: '/payments/fail'
} as const;

export default RoutePath;
