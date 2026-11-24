import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  return localStorage.getItem("aks_admin_token") ? children : <Navigate to="/admin/login" replace />;
}
