import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "./getToken";

const isLogin = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
    const loginToken = getToken()
    useEffect(() => {
        if(!loginToken) {
            {location.pathname == '/login' ? '' : navigate('/login')}
        } else {
            {location.pathname == '/login' ? navigate('/home') : ''}
        }
    }, [])
}

export default isLogin