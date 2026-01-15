import apiClient from '@/apis';

import { UserInfo } from '@/types/user';

const createInfoApi = {
  USER_INFO: async (
    payload: Omit<UserInfo, 'discordName' | 'nickname' | 'discordUsername'>
  ) => {
    const response = await apiClient.post(
      '/onboarding/members/me/info',
      payload
    );
    return response.data;
  }
};

export default createInfoApi;
