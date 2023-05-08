// file: /util/usePermission.js

import { useAuth } from "./AuthProvider";

const usePermission = () => {
  const { user } = useAuth();

  const hasPermission = (allowedRoles) =>
    user?.roles?.some((role) => allowedRoles.includes(role));

    return { hasPermission };
};
export default usePermission;
