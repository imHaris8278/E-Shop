import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
const { Navigate } = require("react-router-dom");

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading === true) {
    return <Loader />;
  } else {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};

export default ProtectedRoute;
