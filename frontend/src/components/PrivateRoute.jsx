import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, []);

  return isAuthenticated && children;
}
