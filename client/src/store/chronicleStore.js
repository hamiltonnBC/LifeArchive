import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useChronicleStore = create(
    persist(
        (set, get) => ({
            // Sections state & actions
            sections: [],
            currentSection: null,
            addSection: (section) =>
                set((state) => ({
                    sections: [...state.sections, section]
                })),
            removeSection: (sectionId) =>
                set((state) => ({
                    sections: state.sections.filter(section => section.id !== sectionId),
                    currentSection: state.currentSection === sectionId ? null : state.currentSection
                })),
            updateSection: (sectionId, updates) =>
                set((state) => ({
                    sections: state.sections.map(section =>
                        section.id === sectionId ? { ...section, ...updates } : section
                    )
                })),
            setCurrentSection: (sectionId) =>
                set({ currentSection: sectionId }),
            reorderSections: (fromIndex, toIndex) =>
                set((state) => {
                    const sections = [...state.sections];
                    const [removed] = sections.splice(fromIndex, 1);
                    sections.splice(toIndex, 0, removed);

                    return {
                        sections: sections.map((section, index) => ({
                            ...section,
                            order: index
                        }))
                    };
                }),

            // Tags state & actions
            tags: [],
            selectedTags: [],
            addTag: (tag) =>
                set((state) => ({
                    tags: [...state.tags, tag]
                })),
            removeTag: (tagId) =>
                set((state) => ({
                    tags: state.tags.filter(tag => tag.id !== tagId),
                    // Also remove the tag from any entries that have it
                    entries: state.entries.map(entry => ({
                        ...entry,
                        tags: entry.tags.filter(t => t !== tagId)
                    }))
                })),
            updateTag: (tagId, newName) =>
                set((state) => ({
                    tags: state.tags.map(tag =>
                        tag.id === tagId ? { ...tag, name: newName } : tag
                    )
                })),
            toggleTagSelection: (tagId) =>
                set((state) => ({
                    selectedTags: state.selectedTags.includes(tagId)
                        ? state.selectedTags.filter(id => id !== tagId)
                        : [...state.selectedTags, tagId]
                })),
            clearTagSelection: () =>
                set({ selectedTags: [] }),

            // Entries state & actions
            entries: [],
            currentPage: 1,
            isEntryEditorOpen: false,
            editingEntry: null,

            setCurrentPage: (page) => set({ currentPage: page }),
            setIsEntryEditorOpen: (isOpen) => set({ isEntryEditorOpen: isOpen }),
            setEditingEntry: (entry) => set({
                editingEntry: entry,
                isEntryEditorOpen: true
            }),
            addEntry: (entry) => set((state) => ({
                entries: [...state.entries, entry].sort((a, b) => new Date(b.date) - new Date(a.date))
            })),
            updateEntry: (entryId, updates) => set((state) => ({
                entries: state.entries.map(entry =>
                    entry.id === entryId ? { ...entry, ...updates } : entry
                ).sort((a, b) => new Date(b.date) - new Date(a.date))
            })),
            deleteEntry: (entryId) => set((state) => ({
                entries: state.entries.filter(entry => entry.id !== entryId)
            })),

            // Helper functions
            getFilteredEntries: () => {
                const state = get();
                return state.entries.filter(entry => {
                    const sectionMatch = !state.currentSection || entry.sectionId === state.currentSection;
                    const tagMatch = state.selectedTags.length === 0 ||
                        state.selectedTags.every(tagId => entry.tags.includes(tagId));
                    return sectionMatch && tagMatch;
                });
            },
        }),
        {
            name: 'chronicle-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useChronicleStore;