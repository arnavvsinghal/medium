import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckSignIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const AsyncUseEffect = async () => {
      if (localStorage.token) {
        try {
          await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.token}`,
              },
            },
          );
          navigate("/blogs");
        } catch (err) {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };
    AsyncUseEffect();
  }, [navigate]);
};
export default useCheckSignIn;
