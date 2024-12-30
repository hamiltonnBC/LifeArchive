// src/pages/LifeChronicle/components/Notebook/NotebookFooter.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useChronicleStore from '../../../../store/chronicleStore';

const NotebookFooter = ({ currentPage, totalPages }) => {
    const setCurrentPage = useChronicleStore(state => state.setCurrentPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 hover:bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
            >
                <ChevronLeft size={20} className="text-gray-600" />
            </button>

            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={currentPage}
                    onChange={(e) => handlePageChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border rounded p-1"
                    min={1}
                    max={totalPages}
                />
                <span className="text-gray-500">of {totalPages}</span>
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 hover:bg-gray-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages}
            >
                <ChevronRight size={20} className="text-gray-600" />
            </button>
        </div>
    );
};

export default NotebookFooter;