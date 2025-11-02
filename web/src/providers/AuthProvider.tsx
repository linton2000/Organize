import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useSnackbar } from 'notistack';

import { User } from "scripts/types";
import { getCookie } from "scripts/utils";
import { login as api_login, me as api_me, logout as api_logout } from "scripts/api_methods";


const AuthContext = createContext<AuthContextValue | null>(null);
type AuthContextValue = {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    refresh: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [csrfToken, setCsrfToken] = useState<string | undefined>(getCookie('csrftoken'));
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    useEffect(() => {
        if (csrfToken) {
            axios.defaults.headers.common["X-CSRFToken"] = csrfToken
        }}
    , [csrfToken])

    const login = async (username: string, password: string) => {
        if (user) {
            return;
        }

        try {
            const authenticatedUser = await api_login(username, password);
            setUser(authenticatedUser);
            setCsrfToken(getCookie("csrftoken"));  // Update with new CSRF token
            enqueueSnackbar('Logged In Successfully!', {variant: "success", autoHideDuration: 2000})
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401)
                enqueueSnackbar('Incorrect username or password.', {variant: "warning", autoHideDuration: 2000});
            
            // Unexpected error
            enqueueSnackbar('An error occurred.', {variant: "error", autoHideDuration: 2000});
            console.error("Unexpected login error", error);
            throw error;
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
