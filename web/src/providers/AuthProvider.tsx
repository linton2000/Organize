import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";

import { User } from "scripts/types";
import { getCookie } from "scripts/utils";
import { login as api_login, me as api_me, logout as api_logout } from "scripts/api_methods";
import { useToast } from "providers/ToastProvider";


const AuthContext = createContext<AuthContextValue | null>(null);
type AuthContextValue = {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [csrfToken, setCsrfToken] = useState<string | undefined>(getCookie('csrftoken'));
    const {toast, close} = useToast();

    useEffect(() => {
        if (csrfToken) {
            axios.defaults.headers.common["X-CSRFToken"] = csrfToken
        }}
    , [csrfToken])

    const login = async (username: string, password: string) => {
        if (user)
            return;

        try {
            const authenticatedUser = await api_login(username, password);
            setUser(authenticatedUser);
            setCsrfToken(getCookie("csrftoken"));  // Update with new CSRF token
            toast('Logged In Successfully!', {variant: "success"})
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401)
                toast('Incorrect username or password.', {variant: "warning", autoHideDuration: 2000});
            
            // Unexpected error
            toast('An error occurred.', {variant: "error"});
            console.error("Unexpected login error", error);
        }
    }

    const refresh = async () => {

    }

    const logout = async () => {

    }


    return (
        <AuthContext.Provider value={{ user, login, refresh, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = (): AuthContextValue => {
    const context =  useContext(AuthContext);
    if (!context) {
        throw new Error('Custom hook useAuth received null context.')
    }
    return context;
}