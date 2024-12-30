import React, { useMemo, useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import useChronicleStore from '../../store/chronicleStore';

const NotebookContent = () => {
    // Use useMemo to create a stable selector function
    const selector = useMemo(
        () => (state) => ({
            entries: state.entries,
            currentPage: state.currentPage,
            deleteEntry: state.deleteEntry,
            setEditingEntry: state.setEditingEntry,
            tags: state.tags, // Ensure this is part of the store if being used
        }),
        []
    );

    const { entries, currentPage, deleteEntry, setEditingEntry, tags } = useChronicleStore(selector);

    const entriesPerPage = 5;
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedEntries = entries.slice(startIndex, startIndex + entriesPerPage);

    return (
        <div
            className="p-8"
            style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, #e5e7eb 28px)',
                backgroundSize: '100% 28px',
                minHeight: '600px',
            }}
        >
            {paginatedEntries.map((entry) => (
                <EntryItem
                    key={entry.id}
                    entry={entry}
                    onEdit={() => setEditingEntry(entry)}
                    onDelete={() => deleteEntry(entry.id)}
                    tags={tags}
                />
            ))}
        </div>
    );
};

const EntryItem = ({ entry, onEdit, onDelete, tags }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="mb-8 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-baseline gap-4 mb-2">
                <span className="text-gray-400 text-sm">{entry.date}</span>
                <h3 className="font-medium text-gray-800">{entry.title}</h3>
                {isHovered && (
                    <div className="absolute right-0 top-0 flex gap-2">
                        <button
                            onClick={onEdit}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Edit2 size={16} className="text-gray-500" />
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Trash2 size={16} className="text-gray-500" />
                        </button>
                    </div>
                )}
            </div>
            <p className="text-gray-600 mb-2 leading-7">{entry.content}</p>
            {entry.tags.length > 0 && (
                <div className="flex gap-2">
                    {entry.tags.map((tagId) => {
                        const tag = tags.find((t) => t.id === tagId);
                        return tag ? (
                            <span
                                key={tagId}
                                className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs"
                            >
                                {tag.name}
                            </span>
                        ) : null;
                    })}
                </div>
            )}
        </div>
    );
};

export default NotebookContent;
