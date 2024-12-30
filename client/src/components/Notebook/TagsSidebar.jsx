// src/components/Notebook/TagsSidebar.jsx
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import useChronicleStore from '../../store/chronicleStore';

const TagsSidebar = () => {
    const [isAddTagModalOpen, setAddTagModalOpen] = useState(false);
    const [newTagName, setNewTagName] = useState('');

    const { tags, addTag, removeTag } = useChronicleStore(state => ({
        tags: state.tags,
        addTag: state.addTag,
        removeTag: state.removeTag
    }));

    const handleAddTag = (e) => {
        e.preventDefault();
        if (newTagName.trim()) {
            addTag({
                id: Date.now().toString(),
                name: newTagName.trim()
            });
            setNewTagName('');
            setAddTagModalOpen(false);
        }
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800">Tags</h2>
                <button
                    onClick={() => setAddTagModalOpen(true)}
                    className="p-1 hover:bg-gray-100 rounded"
                >
                    <Plus size={16} />
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag.id}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-pointer flex items-center gap-1"
                    >
            {tag.name}
                        <button
                            onClick={() => removeTag(tag.id)}
                            className="hover:text-red-500 p-0.5 rounded-full"
                        >
              <X size={12} />
            </button>
          </span>
                ))}
            </div>

            {isAddTagModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Add New Tag</h3>
                        <form onSubmit={handleAddTag}>
                            <input
                                type="text"
                                value={newTagName}
                                onChange={(e) => setNewTagName(e.target.value)}
                                placeholder="Enter tag name"
                                className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setAddTagModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Add Tag
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TagsSidebar;