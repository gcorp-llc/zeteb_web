import { betterAuth } from "better-auth";
import { phoneNumber } from "better-auth/plugins/phone-number";
import { mockAdapter } from "./mock-adapter";
import { sms } from "@/lib/sms";

export const auth = betterAuth({
    database: mockAdapter,

    emailAndPassword: {
        enabled: true
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },

    plugins: [
        phoneNumber({
            sendOTP: async ({ phoneNumber, code }) => {
                await sms.sendOTP(phoneNumber, code);
            },
            signUpOnVerification: {
                getTempEmail: (phone) => `${phone}@zeteb.com`,
            }
        })
    ],

    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
