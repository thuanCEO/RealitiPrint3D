import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie'



export default function UseToken() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const getToken = () => {
        try {
            const userToken = cookies.user
            if (userToken) {
                if (jwtDecode(userToken).id) return userToken
            }
            return null
        } catch (error) {
            console.log(error);
            removeCookie("user")
        }

    }

    const setToken = (token) => {
        setCookie("user", token)
    }
    const removeToken = () => {
        removeCookie("user")
        // navigate('/login')
    }
    return {
        setToken,
        getToken,
        removeToken

    }
}
