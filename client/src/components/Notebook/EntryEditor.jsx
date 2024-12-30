// src/pages/LifeChronicle/components/Notebook/EntryEditor.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import useChronicleStore from '../../../../store/chronicleStore';

const EntryEditor = ({ entry = null, onClose }) => {
    const [formData, setFormData] = useState({
        title: entry?.title || '',
        content: entry?.content || '',
        date: entry?.date || new Date().toISOString().split('T')[0],
        tags: entry?.tags || [],
        sectionId: entry?.sectionId || useChronicleStore.getState().currentSection
    });

    const { tags, sections, addEntry, updateEntry } = useChronicleStore(state => ({
        tags: state.tags,
        sections: state.sections,
        addEntry: state.addEntry,
        updateEntry: state.updateEntry
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (entry) {
            updateEntry(entry.id, formData);
        } else {
            addEntry({
                id: Date.now().toString(),
                ...formData,
                createdAt: new Date().toISOString()
            });
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        {entry ? 'Edit Entry' : 'New Entry'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-130px)]">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Entry title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 min-h-[200px]"
                            placeholder="Write your entry..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Section
                        </label>
                        <select
                            value={formData.sectionId || ''}
                            onChange={e => setFormData(prev => ({ ...prev, sectionId: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select a section</option>
                            {sections.map(section => (
                                <option key={section.id} value={section.id}>
                                    {section.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                                <label
                                    key={tag.id}
                                    className={`px-3 py-1.5 rounded-full cursor-pointer text-sm
                    ${formData.tags.includes(tag.id)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={formData.tags.includes(tag.id)}
                                        onChange={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                tags: prev.tags.includes(tag.id)
                                                    ? prev.tags.filter(id => id !== tag.id)
                                                    : [...prev.tags, tag.id]
                                            }));
                                        }}
                                    />
                                    {tag.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            {entry ? 'Save Changes' : 'Create Entry'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EntryEditor;