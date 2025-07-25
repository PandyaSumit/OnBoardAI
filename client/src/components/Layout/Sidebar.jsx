// components/Sidebar.js
import {
    LayoutDashboard,
    Bot,
    BarChart3,
    Settings2,
    Settings,
    LifeBuoy,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'AI Workflows', icon: Bot, path: '/workflows' },
        { label: 'Insights', icon: BarChart3, path: '/insights' },
        { label: 'Automations', icon: Settings2, path: '/automations' },
        { label: 'Settings', icon: Settings, path: '/settings' },
        { label: 'Help Center', icon: LifeBuoy, path: '/help' },
    ];

    const renderNavItems = () => (
        <nav className="flex-1 mt-6 overflow-y-auto px-2 space-y-1">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`group relative flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all
                        ${isOpen ? 'justify-start' : 'justify-center'}
                        ${isActive
                                ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-700/30 dark:text-indigo-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-800/20'}`}
                    >
                        {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-indigo-600 dark:bg-indigo-400" />
                        )}
                        <Icon size={20} className="shrink-0" />
                        <span
                            className={`ml-3 transition-all duration-200 origin-left
                            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}
                        >
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded-md shadow"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:top-[56px] lg:h-[calc(100vh-56px)] top-0 left-0 z-40 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800
                    border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 ease-in-out
                    ${isOpen ? 'w-64' : 'w-20'} 
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 lg:top-[65px] lg:h-[calc(100vh-65px)]
                `}
            >
                <div className="flex flex-col h-full justify-between">
                    {/* Nav Section */}
                    {renderNavItems()}

                    {/* Profile Footer */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className={`flex items-center justify-between ${!isOpen ? 'flex-col gap-2' : ''}`}>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow">
                                    SP
                                </div>
                                {isOpen && (
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-white">Sarah P.</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">sarah@onboardai.com</p>
                                    </div>
                                )}
                            </div>
                            <button
                                className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Toggle (desktop only) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`absolute hidden lg:flex -right-3 top-4 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-md items-center justify-center hover:rotate-180 transition-transform duration-300`}
                    title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
                >
                    <Menu size={16} />
                </button>
            </aside>

            {/* Overlay for mobile */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
