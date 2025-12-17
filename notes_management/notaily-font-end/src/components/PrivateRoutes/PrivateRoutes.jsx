import { Navigate, Outlet } from "react-router-dom";
import { apiAuth } from "../../api/AuthenticationApi";
import { useEffect, useState } from "react";

const PrivateRoutes = () => {
    const [isLogin, setIsLogin] = useState(null); 

    useEffect(() => {
        const checkToken = async () => {
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
                setIsLogin(false);
                return;
            }

            try {
                const response = await apiAuth.introspect({ token: accessToken });

                console.log("Introspect result:", response); 

                setIsLogin(response.result.valid);
            } catch (err) {
                setIsLogin(false);
            }
        };

        checkToken();
    }, []); 

    return isLogin ? <Outlet /> : <Navigate to="/login" />;

}

export default PrivateRoutes;