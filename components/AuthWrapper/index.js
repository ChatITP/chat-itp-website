import { atom, useSetRecoilState } from "recoil";
import axios from "axios";

const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
    isLoading: false,
    error: false,
    message: "",
  },
});

function AuthWrapper({ children }) {
  const setAuthState = useSetRecoilState(authState);

  authenticate();

  async function authenticate() {
    try {
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        error: false,
        message: "Logging in...",
      });
      await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/verify", {
        withCredentials: true,
      });
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        error: false,
        message: "Successfully logged in!",
      });
    } catch (error) {}
  }

  return children;
}

export default AuthWrapper;
export { authState };
