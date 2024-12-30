// src/hooks/useSections.js
import { useCallback } from 'react';
import useChronicleStore from '../store/chronicleStore';

export const useSections = () => {
    const store = useChronicleStore();

    const getSectionById = useCallback((sectionId) => {
        return store.sections.find(section => section.id === sectionId);
    }, [store.sections]);

    const getOrderedSections = useCallback(() => {
        return [...store.sections].sort((a, b) => a.order - b.order);
    }, [store.sections]);

    return {
        sections: store.sections,
        currentSection: store.currentSection,
        addSection: store.addSection,
        removeSection: store.removeSection,
        updateSection: store.updateSection,
        setCurrentSection: store.setCurrentSection,
        reorderSections: store.reorderSections,
        getSectionById,
        getOrderedSections,
    };
};