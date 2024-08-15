import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function AuthWrapper({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
    needRedirect: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (authState.needRedirect) {
      router.push("/login");
    }
  }, [authState.needRedirect, router]);

  async function authenticate() {
    setAuthState({
      isAuthenticated: false,
      isLoading: true,
      needRedirect: false,
    });
    try {
      await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/verify", {
        withCredentials: true,
      });
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        needRedirect: false,
      });
    } catch (error) {
      try {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/refresh", {
          withCredentials: true,
        });
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          needRedirect: false,
        });
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          needRedirect: true,
        });
      }
    }
  }

  useEffect(() => {
    authenticate();
  }, []);

  if (authState.isLoading) {
    return <div>Loading...</div>;
  } else if (authState.isAuthenticated) {
    return <>{children}</>;
  }
}

export default AuthWrapper;
