// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import { User } from 'lucide-react';

const MainLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
                <header className={`h-16 bg-white border-b flex items-center justify-between px-6 fixed top-0 right-0 transition-all duration-300 ${
                    isSidebarOpen ? 'left-64' : 'left-16'
                } z-10`}>
                    <h1 className="text-xl font-bold text-slate-800">LifeArchive</h1>
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-600 rounded-lg hover:bg-slate-100">
                        <User size={20} />
                        <span>Logout</span>
                    </button>
                </header>

                <main className="pt-24 px-8 pb-8">
                    <Outlet />
                </main>

                <footer className="border-t bg-white py-4 px-8 text-center text-slate-600">
                    <p>© 2024 LifeArchive. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default MainLayout;