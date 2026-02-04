import { SMSProvider } from "../interface";

export class MelliPayamakProvider implements SMSProvider {
  name = "melli-payamak";

  async sendOTP(phoneNumber: string, code: string): Promise<boolean> {
    const username = process.env.MELLI_PAYAMAK_USERNAME;
    const password = process.env.MELLI_PAYAMAK_PASSWORD;
    const bodyId = process.env.MELLI_PAYAMAK_BODY_ID;

    if (!username || !password || !bodyId) {
      console.warn("Melli Payamak credentials or BodyId not configured. Falling back to console log.");
      console.log(`[SMS OTP Fallback] To: ${phoneNumber}, Code: ${code}`);
      return true;
    }

    try {
      const response = await fetch("https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          text: code,
          to: phoneNumber,
          bodyId: parseInt(bodyId),
        }),
      });

      const result = await response.json();
      // Melli Payamak returns a long number on success (the message ID)
      // or a small negative number on error.
      return typeof result === 'number' && result > 1000;
    } catch (error) {
      console.error("Melli Payamak Error:", error);
      return false;
    }
  }
}
