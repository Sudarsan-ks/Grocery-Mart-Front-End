import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

export const ProtectedRoute = ({ children, allowedRole }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/" />;
    }

    try {
        const decode = jwtDecode(token)
        const userrole = decode.role
        if (allowedRole && !allowedRole.includes(userrole)) {
            return <Navigate to="/unauthorised" />
        }
        return children
    } catch (error) {
        console.log("Invalid token", error)
        return <Navigate to="/" />
    }
}
