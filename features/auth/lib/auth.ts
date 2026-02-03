import { betterAuth } from "better-auth";
// import { scyllaAdapter } from "./scylla-adapter";

export const auth = betterAuth({
    // Since we don't have a fully implemented adapter yet,
    // we'll keep it commented or use a placeholder
    // database: scyllaAdapter,

    emailAndPassword: {
        enabled: true
    },
    // Add other providers or configurations here
});
