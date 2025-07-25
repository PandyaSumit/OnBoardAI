import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    const toggleMobileSidebar = () => {
        setMobileOpen(prev => !prev);
    };

    return (
        <div className="flex h-screen overflow-hidden dark:bg-gray-900 text-gray-800 dark:text-white">
            <Sidebar
                isOpen={sidebarOpen}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {mobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <div className="flex flex-col flex-1 min-w-0">
                <Header
                    toggleSidebar={toggleSidebar}
                    toggleMobileSidebar={toggleMobileSidebar}
                    sidebarOpen={sidebarOpen}
                    mobileOpen={mobileOpen}
                />

                <main
                    className={`flex-1 overflow-y-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}
                >
                    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
};

export default Layout;