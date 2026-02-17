import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';



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
