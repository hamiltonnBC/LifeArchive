// src/components/Notebook/index.jsx
import React, { useMemo } from 'react';  // Add useMemo import
import { MessageSquare } from 'lucide-react';
import NotebookHeader from './NotebookHeader';
import NotebookContent from './NotebookContent';
import NotebookFooter from './NotebookFooter';
import TagsSidebar from './TagsSidebar';
import SectionsSidebar from './SectionsSidebar';
import useChronicleStore from '../../store/chronicleStore';

const Notebook = () => {
    // Memoize the selector function
    const selector = useMemo(
        () => (state) => ({
            currentPage: state.currentPage,
            totalPages: state.entries.length > 0 ? Math.ceil(state.entries.length / 5) : 1
        }),
        []
    );

    // Use the memoized selector
    const { currentPage, totalPages } = useChronicleStore(selector);

    return (
        <div className="min-h-screen bg-gray-100 relative">
            {/* Top AI Bar */}
            <div className="bg-slate-800 text-white p-4 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto flex items-center gap-4">
                    <MessageSquare size={20} />
                    <input
                        type="text"
                        placeholder="Ask AI about your life chronicles..."
                        className="flex-1 bg-slate-700 border-none rounded-lg px-4 py-2 text-white placeholder-slate-400"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex gap-6">
                    {/* Left Sidebar - Tags & Sections */}
                    <div className="w-64 space-y-6">
                        <TagsSidebar />
                        <SectionsSidebar />
                    </div>

                    {/* Notebook */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <NotebookHeader />
                            <NotebookContent />
                            <NotebookFooter currentPage={currentPage} totalPages={totalPages} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notebook;