import { SMSProvider } from "../interface";

export class ConsoleSMSProvider implements SMSProvider {
    name = "console";

    async sendOTP(phoneNumber: string, code: string): Promise<boolean> {
        console.log(`[SMS OTP] To: ${phoneNumber}, Code: ${code}`);
        return true;
    }
}
