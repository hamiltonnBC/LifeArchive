// src/pages/LifeChronicle/components/Notebook/index.jsx
import React from 'react';
import NotebookHeader from './NotebookHeader';
import NotebookContent from './NotebookContent';
import NotebookFooter from './NotebookFooter';
import useChronicleStore from '../../../../store/chronicleStore';

const Notebook = () => {
    const { currentPage, totalPages } = useChronicleStore(state => ({
        currentPage: state.currentPage,
        totalPages: state.entries.length > 0 ? Math.ceil(state.entries.length / 5) : 1
    }));

    return (
        <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <NotebookHeader />
                <NotebookContent />
                <NotebookFooter currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default Notebook;