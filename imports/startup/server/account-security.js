/*
 * New users with an email address will receive an address verification email.
 */
Accounts.config({ sendVerificationEmail: true });

ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      loginStyle: "popup",
      clientId:
        "463067406549-kmj8k1jfrls7ndcrjoobk83gkhjcfe23.apps.googleusercontent.com", // See table below for correct property name!
      secret: "WSRYdiEcal93tNgrFJiN4NEm"
    }
  }
);
