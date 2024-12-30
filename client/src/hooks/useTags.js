// src/hooks/useTags.js
import { useCallback } from 'react';
import useChronicleStore from '../store/chronicleStore';

export const useTags = () => {
    const store = useChronicleStore();

    const getTagById = useCallback((tagId) => {
        return store.tags.find(tag => tag.id === tagId);
    }, [store.tags]);

    const getTagsByIds = useCallback((tagIds) => {
        return tagIds.map(id => getTagById(id)).filter(Boolean);
    }, [getTagById]);

    const isTagSelected = useCallback((tagId) => {
        return store.selectedTags.includes(tagId);
    }, [store.selectedTags]);

    return {
        tags: store.tags,
        selectedTags: store.selectedTags,
        addTag: store.addTag,
        removeTag: store.removeTag,
        updateTag: store.updateTag,
        toggleTagSelection: store.toggleTagSelection,
        clearTagSelection: store.clearTagSelection,
        getTagById,
        getTagsByIds,
        isTagSelected,
    };
};