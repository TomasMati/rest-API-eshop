import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';

// Note: Sidebar state might need to be lifted to App or Context if filtering 
// affects the main view which is routed. 
// For this simple implementation, we'll pass props through if Layout was wrapping everything directly, 
// but since we usually use <Outlet>, the page inside needs to communicate.
// For now, let's keep the Sidebar visual here, but we might need to adjust where it sits 
// relative to the Route. 
// Actually, it's better if the Layout just provides the structure and the Sidebar 
// is either smart (Url parameters) or controlled by the specific page context.
// Let's assume URL params or simple state for this "frontend only" task.

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            <Navbar />
            <div className="main-content-wrapper">
                {/* Sidebar will be part of the specific page layout mostly, or global. 
             If global, we need a way to filter. 
             Let's put the Sidebar here for "look" but we might move it.
             Actually, for a real app, Sidebar usually lives in the Product Listing page.
             But the prompt asked for a general layout. Let's include it.
         */}
                {/* <Sidebar />  We will render Sidebar in the Home page for filtering, 
            or here if we want it global. Let's make it flexible. 
            For now, just the main wrapper. */}
                <div className="page-content">
                    {children || <Outlet />}
                </div>
            </div>
        </div>
    );
};

export default Layout;
