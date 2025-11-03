import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "providers/AuthProvider";
import { ToastProvider } from "providers/ToastProvider";
import Login from "routes/Login"
import Layout from "routes/Layout";
import Home from "routes/Home";
import Schedule from "routes/Schedule";
import SubjectManagement from "routes/SubjectManagement";
import Analytics from "routes/Analytics";


export default function App() {

    useEffect(() => {
        document.title = "TimeBoxer";
    }, []);
    
    return (
        <ToastProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route index element={<Login />} />
                        <Route path="/" element={<Layout/>}>
                            <Route path="home" element={<Home />} />
                            <Route path="schedule" element={<Schedule />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="subject-management" element={<SubjectManagement />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ToastProvider>
    );
}
