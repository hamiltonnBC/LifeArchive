import React, { useState } from 'react';
import { Plus, GripVertical, Edit2, Trash2 } from 'lucide-react';
import Modal from '../../components/ui/modal';
import useChronicleStore from '../../store/chronicleStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const SectionsSidebar = () => {
    const [isAddSectionModalOpen, setAddSectionModalOpen] = useState(false);
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [editingSectionId, setEditingSectionId] = useState(null);

    const { sections, addSection, updateSection, removeSection, setCurrentSection } =
        useChronicleStore(state => ({
            sections: state.sections,
            addSection: state.addSection,
            updateSection: state.updateSection,
            removeSection: state.removeSection,
            setCurrentSection: state.setCurrentSection
        }));

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const fromIndex = result.source.index;
        const toIndex = result.destination.index;

        if (fromIndex === toIndex) return;

        useChronicleStore.getState().reorderSections(fromIndex, toIndex);
    };

    const handleAddSection = (e) => {
        e.preventDefault();
        if (newSectionTitle.trim()) {
            addSection({
                id: Date.now().toString(),
                title: newSectionTitle.trim(),
                order: sections.length,
                isExpanded: true,
                entries: []
            });
            setNewSectionTitle('');
            setAddSectionModalOpen(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-800">Sections</h2>
                    <button
                        onClick={() => setAddSectionModalOpen(true)}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="sections">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-1"
                            >
                                {sections
                                    .sort((a, b) => a.order - b.order)
                                    .map((section, index) => (
                                        <Draggable
                                            key={section.id}
                                            draggableId={section.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`
                                                        flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer
                                                        ${useChronicleStore.getState().currentSection === section.id
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'hover:bg-gray-100'
                                                    }
                                                    `}
                                                    onClick={() =>
                                                        setCurrentSection(section.id)
                                                    }
                                                >
                                                    <GripVertical
                                                        className="cursor-grab text-gray-400"
                                                        size={16}
                                                    />
                                                    <span className="flex-1">
                                                        {section.title}
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEditingSectionId(section.id);
                                                            }}
                                                            className="p-1 hover:bg-gray-200 rounded"
                                                        >
                                                            <Edit2 size={14} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeSection(section.id);
                                                            }}
                                                            className="p-1 hover:bg-gray-200 rounded"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <Modal
                isOpen={isAddSectionModalOpen}
                onClose={() => setAddSectionModalOpen(false)}
                title="Add New Section"
            >
                <form onSubmit={handleAddSection}>
                    <input
                        type="text"
                        value={newSectionTitle}
                        onChange={(e) => setNewSectionTitle(e.target.value)}
                        placeholder="Enter section title"
                        className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setAddSectionModalOpen(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Add Section
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default SectionsSidebar;
