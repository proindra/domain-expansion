import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotes } from '../context/NotesContext';
import NoteCard from '../components/NoteCard/NoteCard';
import styles from './FavoritesPage.module.css';

const FavoritesPage: React.FC = () => {
    const { notes, favorites } = useNotes();
    const favoriteNotes = notes.filter((n) => favorites.includes(n.id));

    return (
        <div className={styles.page}>
            <h2 className={styles.heading}>🔖 Favorites</h2>
            <p className={styles.subtext}>Your bookmarked notes, always at hand</p>

            <AnimatePresence mode="wait">
                {favoriteNotes.length === 0 ? (
                    <motion.div
                        className={styles.emptyState}
                        key="empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className={styles.emptyIcon}>🔖</div>
                        <div className={styles.emptyTitle}>No favorites yet</div>
                        <div className={styles.emptyDesc}>
                            Bookmark notes by clicking the 🔖 icon on any card
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        className={styles.grid}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {favoriteNotes.map((note, i) => (
                            <NoteCard key={note.id} note={note} index={i} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FavoritesPage;
