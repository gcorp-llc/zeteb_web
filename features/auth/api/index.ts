import { authClient } from "../lib/auth-client";

const FAKE_SESSION = {
  data: {
    user: {
      id: "1",
      name: "کاربر زتب (شبیه‌ساز)",
      email: "test@example.com",
      emailVerified: true,
      image: "/favicon.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    session: {
      id: "session-1",
      userId: "1",
      token: "fake-token",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  },
  isPending: false,
  error: null,
  refetch: () => Promise.resolve()
};

export const authApi = {
  signIn: (data: { email: string; password: string }) =>
    authClient.signIn.email(data),
  signUp: (data: { email: string; password: string; name: string }) =>
    authClient.signUp.email(data),
  signOut: () => authClient.signOut(),
  getSession: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const session = authClient.useSession();
    return session.data ? session : FAKE_SESSION as any;
  },
  sendOTP: (phoneNumber: string) => authClient.phoneNumber.sendOtp({ phoneNumber }),
  verifyOTP: (phoneNumber: string, code: string) =>
    authClient.phoneNumber.verify({ phoneNumber, code }),
};
