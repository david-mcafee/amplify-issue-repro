import { AmplifyAuth } from "@aws-amplify/auth-construct-alpha";
import { defineAuth } from "@aws-amplify/backend-auth";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Welcome 👋 verify your email!",
    },
  },
  // userAttributes: [
  //   AmplifyAuth.attribute('preferredUsername').required(),
  //   AmplifyAuth.attribute('email').required()
  // ]
});
