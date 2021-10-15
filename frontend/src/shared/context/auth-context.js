import { createContext } from "react";
import Auth from "../../auth/Auth";

const AuthContext = createContext({
    isLoggedIn: false,
    login : () => {},
    logout : () => {},
});

export default AuthContext;