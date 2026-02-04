export interface SMSProvider {
    name: string;
    sendOTP(phoneNumber: string, code: string): Promise<boolean>;
}

export interface SMSConfig {
    provider: string;
    // other global configs
}
