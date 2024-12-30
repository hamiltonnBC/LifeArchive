// // src/pages/LifeChronicle/index.jsx
// // Main LifeChronicle page - handles layout and state management
// import React, { useState } from 'react';
// import AIBar from './components/AIBar';
// import TagsSidebar from './components/TagsSidebar/TagsSidebar';
// import SectionsSidebar from './components/SectionsSidebar';
// import Notebook from './components/Notebook';
//
// const LifeChronicle = () => {
//     return (
//         <div className="min-h-screen bg-gray-100 ml-16 relative">
//             <AIBar />
//             <div className="max-w-6xl mx-auto p-6">
//                 <div className="flex gap-6">
//                     <div className="w-64 space-y-6">
//                         <TagsSidebar />
//                         <SectionsSidebar />
//                     </div>
//                     <Notebook />
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default LifeChronicle;

// src/pages/LifeChronicle/index.jsx
import React from 'react';
import Notebook from '../../components/Notebook';

const LifeChronicle = () => {
    return (
        <div>
            <h1>Life Chronicle Page</h1>
            <Notebook />
        </div>
    );
};

export default LifeChronicle;