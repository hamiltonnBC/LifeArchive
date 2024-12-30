// src/pages/Home.jsx
import React from 'react';
import { Calendar, Book, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription } from "../components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const Home = () => {
    const features = [
        {
            icon: <Calendar className="h-5 w-5 text-blue-500" />,
            title: "Daily Journal",
            description: "Track your daily experiences, moods, and medications. Add multimedia content and rate your day."
        },
        {
            icon: <Book className="h-5 w-5 text-green-500" />,
            title: "Life Chronicle",
            description: "Document your life story with rich text and multimedia in organized sections."
        },
        {
            icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
            title: "AI Assistant",
            description: "Get insights and analyze patterns in your journals with private, local AI processing."
        }
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <Alert className="mb-8 bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-800">
                    Welcome to LifeArchive! Your personal digital sanctuary for memories, documents, and daily reflections.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {feature.icon}
                                {feature.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                            <Calendar className="h-8 w-8 text-blue-500" />
                            <div>
                                <h3 className="font-medium">Daily Entry Added</h3>
                                <p className="text-sm text-slate-500">Today at 2:30 PM</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                            <Book className="h-8 w-8 text-green-500" />
                            <div>
                                <h3 className="font-medium">Life Chronicle Updated</h3>
                                <p className="text-sm text-slate-500">Yesterday at 4:15 PM</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;