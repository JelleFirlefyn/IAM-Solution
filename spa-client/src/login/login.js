import { useAuth0 } from "@auth0/auth0-react";
import userManager from "../usermanager";

const LoginButton = () => {
  const handleLogin = () => {
    userManager.signinRedirect();
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginButton;
