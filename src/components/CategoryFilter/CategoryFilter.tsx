import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../../data/notes';
import { useNotes } from '../../context/NotesContext';
import styles from './CategoryFilter.module.css';

const CategoryFilter: React.FC = () => {
    const { activeCategory, setActiveCategory } = useNotes();

    return (
        <div className={styles.filters} role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
                <motion.button
                    key={cat}
                    className={`${styles.pill} ${activeCategory === cat ? styles.active : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    layout
                >
                    {cat}
                    <AnimatePresence>
                        {activeCategory === cat && (
                            <motion.div
                                layoutId="activePill"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: 9999,
                                    background: 'var(--accent)',
                                    zIndex: -1,
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </AnimatePresence>
                </motion.button>
            ))}
        </div>
    );
};

export default CategoryFilter;
