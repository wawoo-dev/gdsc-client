import apiClient from '@/apis';
import { MemberInfoResponse, PreviousMemberInfoResponse } from '@/apis/member/memberType';

const memberApi = {
  GET_DASHBOARD: async (): Promise<MemberInfoResponse> => {
    const response = await apiClient.get(`/onboarding/members/me/dashboard`);
    return response.data;
  },
  JOIN_MEMBERSHIP: async (recruitmentRoundId: number): Promise<void> => {
    const response = await apiClient.post(
      `/membership?recruitmentRoundId=${recruitmentRoundId}`
    );
    return response.data;
  },
  CHECK_STUDENT_ID: async (studentId: string): Promise<{ isDuplicate: boolean }> => {
    const response = await apiClient.get(
      `/onboarding/members/check-student-id?studentId=${studentId}`
    );
    return response.data;
  },
  GET_PREVIOUS_MEMBER_INFO: async (studentId: string): Promise<PreviousMemberInfoResponse> => {
    const response = await apiClient.get(
      `/onboarding/members/previous/info?studentId=${studentId}`
    );
    return response.data;
  }
};

export default memberApi;
