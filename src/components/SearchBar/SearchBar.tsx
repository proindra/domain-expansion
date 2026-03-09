import React from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotes } from '../../context/NotesContext';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
    const { searchQuery, setSearchQuery } = useNotes();

    return (
        <div className={styles.wrapper}>
            <span className={styles.icon}>
                <SearchRoundedIcon sx={{ fontSize: 18 }} />
            </span>
            <input
                className={styles.input}
                type="text"
                placeholder="Search notes, categories, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search notes"
            />
            <AnimatePresence>
                {searchQuery && (
                    <motion.button
                        className={styles.clearBtn}
                        onClick={() => setSearchQuery('')}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                        aria-label="Clear search"
                    >
                        <CloseRoundedIcon sx={{ fontSize: 16 }} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;
