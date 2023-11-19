import { UserManager } from "oidc-client-ts";

const userManager = new UserManager({
  authority: "https://dev-wfk714pl0dln3oip.us.auth0.com/",
  client_id: "jmdWNLf9mzZVgTXZn6fqd8NbN41QfnX6",
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code", // Use 'code' for Authorization Code flow
  post_logout_redirect_uri: "http://localhost:3000/logout", // Adjust to your post-logout URL
  automaticSilentRenew: true,
  silent_redirect_uri: "http://localhost:3000/silent-renew", // Adjust as needed
  accessTokenExpiringNotificationTime: 10,
  useRefreshTokens: true, // Set to true to use refresh tokens
  scope: "openid profile email", // Adjust scopes as needed
});

export default userManager;
