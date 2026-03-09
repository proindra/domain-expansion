import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { NOTES } from '../data/notes';
import type { Note } from '../data/notes';

interface NotesContextType {
    notes: Note[];
    filteredNotes: Note[];
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    activeCategory: string;
    setActiveCategory: (c: string) => void;
    favorites: number[];
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
    recentlyViewed: Note[];
    addToRecentlyViewed: (note: Note) => void;
    uploadedNotes: Note[];
    addNote: (note: Note) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notes] = useState<Note[]>(NOTES);
    const [uploadedNotes, setUploadedNotes] = useState<Note[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [favorites, setFavorites] = useState<number[]>(() => {
        try {
            return JSON.parse(localStorage.getItem('notevault-favorites') || '[]');
        } catch { return []; }
    });
    const [recentlyViewed, setRecentlyViewed] = useState<Note[]>(() => {
        try {
            return JSON.parse(localStorage.getItem('notevault-recent') || '[]');
        } catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem('notevault-favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('notevault-recent', JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    const allNotes = [...notes, ...uploadedNotes];

    const filteredNotes = allNotes.filter((note) => {
        const matchesSearch =
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || note.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleFavorite = useCallback((id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    }, []);

    const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

    const addToRecentlyViewed = useCallback((note: Note) => {
        setRecentlyViewed((prev) => {
            const filtered = prev.filter((n) => n.id !== note.id);
            return [note, ...filtered].slice(0, 6);
        });
    }, []);

    const addNote = useCallback((note: Note) => {
        setUploadedNotes((prev) => [...prev, note]);
    }, []);

    return (
        <NotesContext.Provider
            value={{
                notes: allNotes,
                filteredNotes,
                searchQuery,
                setSearchQuery,
                activeCategory,
                setActiveCategory,
                favorites,
                toggleFavorite,
                isFavorite,
                recentlyViewed,
                addToRecentlyViewed,
                uploadedNotes,
                addNote,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const ctx = useContext(NotesContext);
    if (!ctx) throw new Error('useNotes must be used inside NotesProvider');
    return ctx;
};
