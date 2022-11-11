import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "routes/Layout";
import Home from "routes/Home";
import Schedule from "routes/Schedule";
import SubjectManagement from "routes/SubjectManagement";
import Analytics from "routes/Analytics";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="subject-management" element={<SubjectManagement />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
