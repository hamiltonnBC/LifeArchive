// src/components/FeatureCard.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureCard = ({ icon, title, description, iconColor }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {React.cloneElement(icon, { className: `h-5 w-5 text-${iconColor}` })}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-slate-600">{description}</p>
            </CardContent>
        </Card>
    );
};

export default FeatureCard;