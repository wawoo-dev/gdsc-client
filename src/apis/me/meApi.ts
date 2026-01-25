import apiClient from '@/apis';
import { MeResponse } from './meType';

const meApi = {
  GET_USER_INFO: async (): Promise<MeResponse> => {
    const response = await apiClient.get(`/onboarding/members/me/info`);
    return response.data;
  }
};

export default meApi;
