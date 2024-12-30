// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Page imports
import Home from './pages/Home';
import DailyJournal from './pages/DailyJournal';
import LifeChronicle from './pages/LifeChronicle/index';
import Settings from './pages/Settings';
import { DragDropContext } from 'react-beautiful-dnd';
import useChronicleStore from './store/chronicleStore';

const App = () => {
    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) {
            return;
        }
        useChronicleStore.getState().reorderSections(source.index, destination.index);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="journal" element={<DailyJournal />} />
                        <Route path="chronicle" element={<LifeChronicle />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </DragDropContext>
    );
};

export default App;