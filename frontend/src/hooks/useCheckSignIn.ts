import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckSignIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const useEffectAsync = async () => {
      if (localStorage.token) {
        try {
          await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          });
          navigate("/blogs");
        } catch (err) {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };
    useEffectAsync();
  }, [navigate]);
};
export default useCheckSignIn;
