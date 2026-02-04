import { SMSProvider } from "./interface";
import { ConsoleSMSProvider } from "./providers/console";
import { MelliPayamakProvider } from "./providers/melli-payamak";

export function getSMSProvider(): SMSProvider {
    const providerType = process.env.SMS_PROVIDER || "console";

    switch (providerType) {
        case "melli-payamak":
            return new MelliPayamakProvider();
        case "console":
        default:
            return new ConsoleSMSProvider();
    }
}

export const sms = getSMSProvider();
