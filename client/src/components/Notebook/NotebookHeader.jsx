// src/pages/LifeChronicle/components/Notebook/NotebookHeader.jsx
import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import useChronicleStore from '../../../../store/chronicleStore';

const NotebookHeader = () => {
    const { currentSection } = useChronicleStore(state => ({
        currentSection: state.currentSection
    }));

    return (
        <div className="border-b p-4 bg-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-gray-400" />
                <span className="text-gray-500">Life Chronicle</span>
            </div>
            <button
                onClick={() => useChronicleStore.getState().setIsEntryEditorOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                <Plus size={16} />
                <span>New Entry</span>
            </button>
        </div>
    );
};

export default NotebookHeader;