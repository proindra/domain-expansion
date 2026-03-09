import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import type { Note } from '../data/notes';
import NoteCard from '../components/NoteCard/NoteCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import SearchBar from '../components/SearchBar/SearchBar';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
    const { filteredNotes, recentlyViewed, addToRecentlyViewed } = useNotes();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(t);
    }, []);

    const handleRecentClick = (note: Note) => {
        addToRecentlyViewed(note);
        navigate(`/viewer/${note.id}`);
    };

    return (
        <div className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.titleRow}>
                    <div>
                        <h2 className={styles.heading}>📚 Your Notes Library</h2>
                        <p className={styles.subtext}>Browse, search and manage all your PDF notes in one place</p>
                    </div>
                    <span className={styles.countBadge}>
                        {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Controls */}
                <div className={styles.controls}>
                    <SearchBar />
                    <CategoryFilter />
                </div>
            </div>

            {/* Recently Viewed */}
            <AnimatePresence>
                {recentlyViewed.length > 0 && (
                    <motion.div
                        className={styles.section}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <h3 className={styles.sectionTitle}>Recently Viewed</h3>
                        <div className={styles.recentGrid}>
                            {recentlyViewed.map((note) => (
                                <motion.div
                                    key={note.id}
                                    className={styles.recentCard}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleRecentClick(note)}
                                >
                                    <span className={styles.recentIcon}>📄</span>
                                    <div className={styles.recentInfo}>
                                        <div className={styles.recentTitle}>{note.title}</div>
                                        <div className={styles.recentCat}>{note.category}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notes Grid */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>All Notes</h3>
                {loading ? (
                    <div className={styles.grid}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : filteredNotes.length === 0 ? (
                    <motion.div
                        className={styles.emptyState}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.emptyIcon}>🔍</div>
                        <div className={styles.emptyTitle}>No notes found</div>
                        <div className={styles.emptyDesc}>Try adjusting your search or category filter</div>
                    </motion.div>
                ) : (
                    <motion.div
                        className={styles.grid}
                        initial="initial"
                        animate="animate"
                    >
                        {filteredNotes.map((note, i) => (
                            <NoteCard key={note.id} note={note} index={i} />
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
