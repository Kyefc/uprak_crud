import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout = () => {
return (
<React.Fragment>
<Navbar />
<div className="columns mt-6" style={{ minHeight: "100vh" }}>
<div className="column is-2">
<Sidebar />
</div>
<div className="column is-10">
<div className="container mt-5">
<Outlet />
</div>
</div>
</div>
</React.Fragment>
);
};

export default Layout;