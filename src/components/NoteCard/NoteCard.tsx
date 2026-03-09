import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import type { Note } from '../../data/notes';
import { useNotes } from '../../context/NotesContext';
import { formatDate } from '../../utils/helpers';
import styles from './NoteCard.module.css';

interface NoteCardProps {
    note: Note;
    index?: number;
}

const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' as const },
    }),
};

const NoteCard: React.FC<NoteCardProps> = ({ note, index = 0 }) => {
    const { toggleFavorite, isFavorite, addToRecentlyViewed } = useNotes();
    const navigate = useNavigate();
    const bookmarked = isFavorite(note.id);

    const handleView = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToRecentlyViewed(note);
        navigate(`/viewer/${note.id}`);
    };

    const handleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(note.id);
    };

    return (
        <motion.div
            className={styles.card}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            custom={index}
            whileHover={{
                y: -6,
                boxShadow: 'var(--shadow-card-hover)',
                transition: { duration: 0.25, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleView}
        >
            {/* Preview Area */}
            <div className={styles.preview}>
                <div
                    className={styles.previewGradient}
                    style={{ background: `linear-gradient(135deg, ${note.color}, transparent)` }}
                />
                <div className={styles.previewIcon}>
                    <span className={styles.pdfBadge}>📄</span>
                    <span className={styles.pageCount}>{note.pages} pages</span>
                </div>
            </div>

            {/* Card Body */}
            <div className={styles.body}>
                <div className={styles.topRow}>
                    <h3 className={styles.title}>{note.title}</h3>
                    <motion.button
                        className={`${styles.bookmarkBtn} ${bookmarked ? styles.bookmarked : ''}`}
                        onClick={handleBookmark}
                        whileTap={{ scale: 0.8 }}
                        title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
                    >
                        <motion.div
                            animate={{ scale: bookmarked ? [1, 1.3, 1] : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {bookmarked ? (
                                <BookmarkRoundedIcon sx={{ fontSize: 18 }} />
                            ) : (
                                <BookmarkBorderRoundedIcon sx={{ fontSize: 18 }} />
                            )}
                        </motion.div>
                    </motion.button>
                </div>

                <div className={styles.meta}>
                    <span
                        className={styles.category}
                        style={{ background: note.color }}
                    >
                        {note.category}
                    </span>
                    <span className={styles.date}>{formatDate(note.date)}</span>
                </div>

                <p className={styles.description}>{note.description}</p>

                <div className={styles.author}>
                    <PersonRoundedIcon sx={{ fontSize: 13 }} />
                    {note.author}
                </div>
            </div>

            {/* View Button */}
            <motion.button
                className={styles.viewBtn}
                onClick={handleView}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
            >
                View PDF →
            </motion.button>
        </motion.div>
    );
};

export default NoteCard;
