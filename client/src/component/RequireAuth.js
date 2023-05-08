// file: /component/RequireAuth.js
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import Spinner from "./Spinner";
import usePermission from "../utils/usePermission";

const RequireAuth = ({ allowedRoles }) => {

  const auth = useAuth();
  const {hasPermission} = usePermission();
  const location = useLocation();
  const hasRequiredRole =hasPermission(allowedRoles);
  
  if (auth?.isLoading) {
    return <Spinner />; // or loading indicator/spinner/etc
  }
  else if (auth.user?.email) {
    if (hasRequiredRole) {
        return <Outlet />
    } else {
        return <Navigate to="/unauthorize" replace />
    }
  }
  return <Navigate to="/login" state={{ from: location.pathname }} replace />  
}
export default RequireAuth;

