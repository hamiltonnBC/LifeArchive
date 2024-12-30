import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useChronicleStore = create(
    persist(
        (set, get) => ({
            // Existing state
            sections: [],
            currentSection: null,

            // Existing section actions
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

            // New state
            entries: [],
            currentPage: 1,
            isEntryEditorOpen: false,
            editingEntry: null,

            // New actions
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
        }),
        {
            name: 'chronicle-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useChronicleStore;
