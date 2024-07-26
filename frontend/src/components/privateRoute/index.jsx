import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to={"/auth/login"} />;
  }
};

export default PrivateRoute;
