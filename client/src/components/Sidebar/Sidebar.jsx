// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Book, Settings, Send, Home } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: <Home size={20} />, label: 'Home', path: '/' },
        { icon: <Calendar size={20} />, label: 'Daily Journal', path: '/journal' },
        { icon: <Book size={20} />, label: 'Life Chronicle', path: '/chronicle' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' }
    ];

    return (
        <div
            className={`h-screen bg-slate-900 text-white fixed left-0 top-0 
                transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'w-64' : 'w-16'}
                overflow-hidden z-20`}
        >
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <div className={`transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                    {isSidebarOpen && <span className="text-lg font-semibold">Menu</span>}
                </div>
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded hover:bg-slate-700 transition-colors"
                >
                    {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            <div className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                {isSidebarOpen && (
                    <div className="p-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ask AI..."
                                className="w-full px-4 py-2 text-sm bg-slate-800 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500"
                            />
                            <button className="absolute right-2 top-2 text-slate-400 hover:text-white transition-colors">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <nav className="mt-4">
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white
                            transition-colors duration-200
                            ${location.pathname === item.path ? 'bg-slate-800 text-white' : ''}`}
                    >
                        {item.icon}
                        <span className={`transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                            {isSidebarOpen && item.label}
                        </span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;