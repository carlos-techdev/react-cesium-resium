import { useEffect } from "react";
import { logout } from "../../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      navigate("/");
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return <h1>You are logging out.</h1>;
};

export default Logout;
