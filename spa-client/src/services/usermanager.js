import { UserManager } from "oidc-client-ts";

const userManager = new UserManager({
  authority: "https://dev-wfk714pl0dln3oip.us.auth0.com/",
  client_id: "jmdWNLf9mzZVgTXZn6fqd8NbN41QfnX6",
  redirect_uri: "http://localhost:3000/callback",
  response_type: "code",
  scope: "openid profile email",
  post_logout_redirect_uri: "http://localhost:3000/",
});

export default userManager;
