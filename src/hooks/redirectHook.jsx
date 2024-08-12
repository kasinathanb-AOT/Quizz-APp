import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const autoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const DToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (DToken.exp < currentTime) {
        localStorage.removeItem("authToken");
        navigate("/");
      } else {
        navigate(`/index/${token}`);
      }
    } else {
      navigate(`/`);
    }
  }, [navigate]);
};

export default autoRedirect;
