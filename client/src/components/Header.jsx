// src/components/Header.jsx
import React from 'react';
import { User } from 'lucide-react';

const Header = ({ isSidebarOpen }) => {
    return (
        <header className={`h-16 bg-white border-b flex items-center justify-between px-6 fixed top-0 right-0 ${isSidebarOpen ? 'left-64' : 'left-16'} z-10`}>
            <h1 className="text-xl font-bold text-slate-800">LifeArchive</h1>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 rounded-lg hover:bg-slate-100">
                <User size={20} />
                <span>Logout</span>
            </button>
        </header>
    );
};

export default Header;