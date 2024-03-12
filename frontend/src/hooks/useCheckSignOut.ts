import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckSignOut = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const useEffectAsync = async () => {
      if (!localStorage.token) {
        return navigate("/");
      }
      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    useEffectAsync();
  }, [navigate]);
  return navigate;
};
export default useCheckSignOut;
