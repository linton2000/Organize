import { Outlet, Link } from "react-router-dom";
import ClippedDrawer from "components/ClippedDrawer";

export default function Layout() {
    return (
        <>
            <ClippedDrawer navItems={['Home', 'Schedule', 'Subject Management', 'Analytics']}/>
            <Outlet/>
        </>
    );
}
