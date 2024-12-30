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
            className={`h-screen bg-slate-900 text-white transition-all duration-300 ${
                isSidebarOpen ? 'w-64' : 'w-16'
            } fixed left-0 top-0`}
        >
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                {isSidebarOpen && <span className="text-lg font-semibold">Menu</span>}
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded hover:bg-slate-700"
                >
                    {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            {isSidebarOpen && (
                <div className="p-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ask AI..."
                            className="w-full px-4 py-2 text-sm bg-slate-800 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500"
                        />
                        <button className="absolute right-2 top-2 text-slate-400 hover:text-white">
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}


            <nav className="mt-4">
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white
              ${location.pathname === item.path ? 'bg-slate-800 text-white' : ''}`}
                    >
                        {item.icon}
                        {isSidebarOpen && <span>{item.label}</span>}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;