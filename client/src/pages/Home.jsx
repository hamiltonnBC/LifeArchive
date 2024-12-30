// src/pages/Home.jsx
import React, { useState } from 'react';
import { Calendar, Book, Lock, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Header from '../components/Header';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const features = [
        {
            icon: <Calendar />,
            title: "Daily Journal",
            description: "Track your daily experiences, moods, and medications. Add multimedia content and rate your day.",
            iconColor: "blue-500"
        },
        {
            icon: <Book />,
            title: "Life Chronicle",
            description: "Document your life story with rich text and multimedia in organized sections.",
            iconColor: "green-500"
        },
        // ... add other features
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
                <Header isSidebarOpen={isSidebarOpen} />

                <main className="pt-24 px-8 pb-8">
                    <div className="max-w-6xl mx-auto">
                        <Alert className="mb-8 bg-blue-50 border-blue-200">
                            <AlertDescription className="text-blue-800">
                                Welcome to LifeArchive! Your personal digital sanctuary for memories, documents, and daily reflections.
                            </AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {features.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>

                        {/* Recent Activity section remains the same */}
                    </div>
                </main>

                <footer className="border-t bg-white py-4 px-8 text-center text-slate-600">
                    <p>© 2024 LifeArchive. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default Home;