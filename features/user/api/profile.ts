import { api } from "@/lib/api-client";

export interface UserProfile {
  user_id: string;
  name?: string;
  specialty?: string;
  cover_image?: string;
  connections?: number;
  bio?: string;
  location?: string;
  education?: any[];
  skills?: string[];
  addresses?: any[];
  analytics_views?: number;
  analytics_appointments?: number;
}

export const profileApi = {
  getProfile: () => api.get<UserProfile>("/api/user/profile"),
  updateProfile: (data: Partial<UserProfile>) => api.patch("/api/user/profile", data),
};
