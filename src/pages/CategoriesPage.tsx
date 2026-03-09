import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import { CATEGORIES } from '../data/notes';
import { getCategoryColor } from '../utils/helpers';
import styles from './CategoriesPage.module.css';

const catEmojis: Record<string, string> = {
    Mathematics: '∑',
    Physics: 'φ',
    Chemistry: '⚗',
    Biology: '🧬',
    History: '📜',
    'Computer Science': '💻',
};

const CategoriesPage: React.FC = () => {
    const { notes, setActiveCategory } = useNotes();
    const navigate = useNavigate();

    const categories = CATEGORIES.filter((c) => c !== 'All');

    const handleCatClick = (cat: string) => {
        setActiveCategory(cat);
        navigate('/');
    };

    return (
        <div className={styles.page}>
            <h2 className={styles.heading}>📂 Categories</h2>
            <p className={styles.subtext}>Browse notes by subject area</p>

            <div className={styles.grid}>
                {categories.map((cat, i) => {
                    const count = notes.filter((n) => n.category === cat).length;
                    const color = getCategoryColor(cat);
                    return (
                        <motion.div
                            key={cat}
                            className={styles.catCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07, duration: 0.35 }}
                            whileHover={{ y: -5, boxShadow: 'var(--shadow-md)', transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleCatClick(cat)}
                        >
                            <div className={styles.catIcon} style={{ background: color }}>
                                {catEmojis[cat] || '📄'}
                            </div>
                            <div className={styles.catName}>{cat}</div>
                            <div className={styles.catCount}>{count} note{count !== 1 ? 's' : ''}</div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoriesPage;
