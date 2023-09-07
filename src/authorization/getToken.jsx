import { useSelector } from "react-redux";

const getToken = () => {    
    const isToken = sessionStorage.getItem("userToken");
    const userToken = isToken
    
    return userToken
}
export {
    getToken
}