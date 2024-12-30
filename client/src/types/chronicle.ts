// src/types/chronicle.ts
export interface Tag {
    id: string;
    name: string;
}

export interface Section {
    id: string;
    title: string;
    order: number;
}

export interface Entry {
    id: string;
    date: string;
    title: string;
    content: string;
    tags: string[];
    sectionId: string;
}