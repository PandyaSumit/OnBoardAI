import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden dark:bg-gray-900 text-gray-800 dark:text-white">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="flex flex-col flex-1 relative overflow-y-auto">
                <Header toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-all duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
