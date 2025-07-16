// components/Sidebar.js
import {
    LayoutDashboard,
    Bot,
    Briefcase,
    Users,
    BarChart3,
    Settings2,
    Bell,
    Settings,
    LifeBuoy,
    LogOut,
    Menu
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'AI Workflows', icon: Bot, path: '/workflows' },
        // { label: 'Job Posts', icon: Briefcase, path: '/jobs' },
        // { label: 'Candidates', icon: Users, path: '/candidates' },
        { label: 'Insights', icon: BarChart3, path: '/insights' },
        { label: 'Automations', icon: Settings2, path: '/automations' },
        // { label: 'Notifications', icon: Bell, path: '/notifications' },
        { label: 'Settings', icon: Settings, path: '/settings' },
        { label: 'Help Center', icon: LifeBuoy, path: '/help' },
    ];

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`fixed top-[65px] left-0 h-[calc(100vh-65px)] z-40 bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out
                    ${isOpen ? 'w-64' : 'w-20'} overflow-hidden border-r border-gray-200 dark:border-gray-700`}
            >
                <div className="flex flex-col h-full justify-between">
                    {/* Nav Items */}
                    <nav className="flex-1 mt-6 space-y-1 overflow-y-auto px-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    title={!isOpen ? item.label : ''}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all
                                       ${isOpen ? 'justify-start' : 'justify-center'}
                                        ${isActive
                                            ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-800/40 dark:text-indigo-300'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/30'}
    `}
                                >
                                    <Icon size={20} className="shrink-0" />
                                    <span
                                        className={`ml-3 whitespace-nowrap transition-all duration-200 ease-in-out origin-left
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}
        `}
                                    >
                                        {item.label}
                                    </span>
                                </Link>

                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className={`flex items-center justify-between ${!isOpen ? 'flex-col gap-2' : ''}`}>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold">
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
                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Toggle Button (for all screen sizes) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute -right-3 top-4 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-md flex items-center justify-center hover:scale-105 transition-transform duration-200"
                >
                    <Menu size={16} />
                </button>
            </aside>
        </>
    );
};

export default Sidebar;
