import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@routes/Login";
import Home from "@routes/Home";
import Schedule from "@routes/Schedule";
import SubjectManagement from "@routes/SubjectManagement";
import Analytics from "@routes/Analytics";
import ProtectedRoute from "@routes/ProtectedRoute";
import { AuthProvider } from "@providers/AuthProvider";
import { ToastProvider } from "@providers/ToastProvider";

export default function App() {
    useEffect(() => {
        document.title = "TimeBoxer";
    }, []);

    return (
        <ToastProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route element={<ProtectedRoute />}>
                            <Route index element={<Home />} />
                            <Route path="schedule" element={<Schedule />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route
                                path="subject-management"
                                element={<SubjectManagement />}
                            />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ToastProvider>
    );
}
