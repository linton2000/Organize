import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "src/routes/Login";
import Home from "src/routes/Home";
import Schedule from "src/routes/Schedule";
import SubjectManagement from "src/routes/SubjectManagement";
import Analytics from "src/routes/Analytics";
import ProtectedRoute from "src/routes/ProtectedRoute";
import { AuthProvider } from "src/providers/AuthProvider";
import { ToastProvider } from "src/providers/ToastProvider";

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
