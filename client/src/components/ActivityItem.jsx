// src/components/ActivityItem.jsx
import React from 'react';

const ActivityItem = ({ icon, title, timestamp }) => {
    return (
        <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
            {icon}
            <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-slate-500">{timestamp}</p>
            </div>
        </div>
    );
};

export default ActivityItem;