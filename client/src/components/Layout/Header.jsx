import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Bell, LogOut, Settings, User, ChevronDown, Search, X, Command } from 'lucide-react';
import useDarkMode from '../../utils/useDarkMode';

const Header = () => {
    const [theme, toggleTheme] = useDarkMode();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [notificationCount, setNotificationCount] = useState(3);
    const dropdownRef = useRef();
    const searchRef = useRef();

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
                setTimeout(() => {
                    searchRef.current?.querySelector('input')?.focus();
                }, 100);
            }
            if (e.key === 'Escape' && searchOpen) {
                setSearchOpen(false);
                setSearchQuery('');
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [searchOpen]);

    const handleNotificationClick = () => {
        setNotificationCount(0);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Search query:', searchQuery);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        searchRef.current?.querySelector('input')?.focus();
    };

    const searchSuggestions = [
        { type: 'recent', text: 'Employee onboarding', icon: '🔍' },
        { type: 'recent', text: 'Training modules', icon: '🔍' },
        { type: 'suggestion', text: 'Dashboard analytics', icon: '📊' },
        { type: 'suggestion', text: 'User management', icon: '👥' },
        { type: 'suggestion', text: 'Settings', icon: '⚙️' },
    ];

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20 transition-all duration-300">
                <div className="flex items-center justify-between px-6 py-4">

                    <div className="flex items-center space-x-3">
                        <div className="text-2xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Onboard
                            </span>
                            <span className="text-gray-800 dark:text-white">AI</span>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-md mx-8" ref={searchRef}>
                        <div className="relative w-full">
                            <form onSubmit={handleSearchSubmit} className="w-full">
                                <div className="relative">
                                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setSearchOpen(true)}
                                        placeholder="Search anything..."
                                        className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-700/50 border border-gray-200/20 dark:border-gray-600/20 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                        {searchQuery && (
                                            <button
                                                type="button"
                                                onClick={clearSearch}
                                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                                            >
                                                <X size={14} className="text-gray-400" />
                                            </button>
                                        )}
                                        <div className="flex items-center space-x-0.5 text-xs text-gray-400 bg-gray-200/50 dark:bg-gray-600/50 rounded-md px-1.5 py-0.5">
                                            <Command size={10} />
                                            <span>K</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {searchOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-gray-200/20 dark:border-gray-700/20 shadow-xl rounded-2xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                                    <div className="p-4">
                                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                            {searchQuery ? 'Search Results' : 'Recent Searches'}
                                        </div>
                                        <div className="space-y-1">
                                            {searchSuggestions
                                                .filter(item => !searchQuery || item.text.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .map((item, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            setSearchQuery(item.text);
                                                            setSearchOpen(false);
                                                        }}
                                                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-150"
                                                    >
                                                        <span className="text-base">{item.icon}</span>
                                                        <span>{item.text}</span>
                                                        {item.type === 'recent' && (
                                                            <span className="ml-auto text-xs text-gray-400">Recent</span>
                                                        )}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={toggleTheme}
                            className="group relative p-2.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-700/50 transition-all duration-200 hover:scale-105 active:scale-95"
                            aria-label="Toggle Theme"
                        >
                            <div className="relative">
                                {theme === 'dark' ? (
                                    <Sun size={20} className="text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
                                ) : (
                                    <Moon size={20} className="text-gray-700 dark:text-gray-300 group-hover:-rotate-12 transition-transform duration-300" />
                                )}
                            </div>
                        </button>
                        <div className="relative">
                            <button
                                onClick={handleNotificationClick}
                                className="group relative p-2.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-700/50 transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <Bell size={20} className="text-gray-700 dark:text-gray-300 group-hover:animate-pulse" />
                                {notificationCount > 0 && (
                                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>
                        </div>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="group flex items-center space-x-2 p-1.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-700/50 transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-semibold text-white shadow-lg ring-2 ring-transparent group-hover:ring-indigo-500/30 transition-all duration-200">
                                    SP
                                </div>
                                <ChevronDown
                                    size={14}
                                    className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {dropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />

                                    <div className="absolute right-0 mt-3 w-56 z-20 animate-in slide-in-from-top-2 duration-200">
                                        <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-gray-200/20 dark:border-gray-700/20 shadow-xl rounded-2xl overflow-hidden">
                                            <div className="px-4 py-3 border-b border-gray-200/20 dark:border-gray-700/20">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                                                        SP
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800 dark:text-white">Sarah Parker</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">sarah@onboardai.com</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-2">
                                                <MenuItem icon={<User size={16} />} text="My Profile" />
                                                {/* <MenuItem icon={<Settings size={16} />} text="Settings" /> */}
                                                <div className="mx-2 my-2 border-t border-gray-200/20 dark:border-gray-700/20"></div>
                                                <MenuItem icon={<LogOut size={16} />} text="Logout" isLogout />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {searchOpen && (
                    <div className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
                        <div className="bg-white dark:bg-gray-900 p-4 shadow-xl">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="flex-1 relative">
                                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search anything..."
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100/80 dark:bg-gray-700/50 border border-gray-200/20 dark:border-gray-600/20 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        setSearchOpen(false);
                                        setSearchQuery('');
                                    }}
                                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="space-y-1">
                                {searchSuggestions
                                    .filter(item => !searchQuery || item.text.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSearchQuery(item.text);
                                                setSearchOpen(false);
                                            }}
                                            className="w-full flex items-center space-x-3 px-3 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-150"
                                        >
                                            <span className="text-base">{item.icon}</span>
                                            <span>{item.text}</span>
                                            {item.type === 'recent' && (
                                                <span className="ml-auto text-xs text-gray-400">Recent</span>
                                            )}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
};

const MenuItem = ({ icon, text, isLogout = false }) => (
    <button className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 ${isLogout ? 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300' : 'text-gray-700 dark:text-gray-300'
        }`}>
        <span className={`transition-transform duration-150 group-hover:scale-110 ${isLogout ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
            }`}>
            {icon}
        </span>
        <span className="font-medium">{text}</span>
    </button>
);

export default Header;