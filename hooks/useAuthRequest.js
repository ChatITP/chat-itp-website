import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * A custom hook to make authenticated requests
 * @param {string} method - HTTP method
 * @param {string} url - API endpoint
 * @param {object} data - Request data
 * @returns {function} - A function to make authenticated requests
 */
function useAuthRequest() {
  const router = useRouter();

  async function request(method, url, data) {
    try {
      const response = await axios({
        method,
        url: url,
        data,
        withCredentials: true,
      });
      return response;
    } catch (error) {
      try {
        await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/refresh", {
          withCredentials: true,
        });
        const response = await axios({
          method,
          url: url,
          data,
          withCredentials: true,
        });
        return response;
      } catch (error) {
        router.replace("/login");
      }
    }
  }
  return (method, url, data) => request(method, url, data);
}

export default useAuthRequest;
