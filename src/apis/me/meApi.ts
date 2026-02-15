import apiClient from '@/apis';
import { AccountInfoResponse, MeResponse } from './meType';

const meApi = {
  GET_USER_INFO: async (): Promise<MeResponse> => {
    const response = await apiClient.get(`/onboarding/members/me/info`);
    return response.data;
  },
  GET_ACCOUNT_INFO: async (): Promise<AccountInfoResponse> => {
    const response = await apiClient.get(`/common/members/me/account-info`);
    console.log(response);
    return response.data;
  }
};

export default meApi;
