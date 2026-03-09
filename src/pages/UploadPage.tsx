import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import { CATEGORIES } from '../data/notes';
import type { Note } from '../data/notes';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import styles from './UploadPage.module.css';

const CATEGORY_OPTIONS = CATEGORIES.filter((c) => c !== 'All');

const UploadPage: React.FC = () => {
    const { addNote } = useNotes();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({ title: '', description: '', category: '' });
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [success, setSuccess] = useState(false);
    const [dragging, setDragging] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) setFile(f);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (f?.type === 'application/pdf') setFile(f);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.category) return;

        setUploading(true);
        setProgress(0);

        // Simulate upload progress
        for (let i = 0; i <= 100; i += 5) {
            await new Promise((r) => setTimeout(r, 60));
            setProgress(i);
        }

        // Add to notes store
        const newNote: Note = {
            id: Date.now(),
            title: form.title,
            category: form.category,
            description: form.description || 'Uploaded note',
            file: file ? URL.createObjectURL(file) : '/pdfs/sample.pdf',
            date: new Date().toISOString().split('T')[0],
            pages: Math.floor(Math.random() * 80) + 10,
            author: 'You',
            color: '#4a74f2',
        };
        addNote(newNote);
        setUploading(false);
        setSuccess(true);
    };

    const handleReset = () => {
        setForm({ title: '', description: '', category: '' });
        setFile(null);
        setProgress(0);
        setSuccess(false);
    };

    return (
        <div className={styles.page}>
            <h2 className={styles.heading}>⬆️ Upload Notes</h2>
            <p className={styles.subtext}>Share your PDF notes with the library</p>

            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
            >
                <AnimatePresence mode="wait">
                    {success ? (
                        <motion.div
                            key="success"
                            className={styles.success}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className={styles.successIcon}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                            >
                                <CheckCircleOutlineIcon className={styles.successIcon} style={{ color: 'var(--success)' }} />
                            </motion.div>
                            <div className={styles.successTitle}>Upload Successful!</div>
                            <div className={styles.successDesc}>
                                "{form.title}" has been added to your library.
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                <motion.button
                                    className={styles.resetBtn}
                                    onClick={handleReset}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    Upload Another
                                </motion.button>
                                <motion.button
                                    className={styles.submitBtn}
                                    onClick={() => navigate('/')}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    View Library →
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            className={styles.form}
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {/* Title & Category Row */}
                            <div className={styles.row}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>
                                        Title <span className={styles.required}>*</span>
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        className={styles.input}
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Calculus Notes Chapter 3"
                                        required
                                    />
                                </div>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>
                                        Category <span className={styles.required}>*</span>
                                    </label>
                                    <select
                                        className={styles.select}
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select category...</option>
                                        {CATEGORY_OPTIONS.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Description</label>
                                <motion.textarea
                                    whileFocus={{ scale: 1.005 }}
                                    className={styles.textarea}
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Briefly describe what these notes cover..."
                                />
                            </div>

                            {/* File Upload */}
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>PDF File</label>
                                <motion.div
                                    className={`${styles.fileUpload} ${dragging ? styles.dragging : ''}`}
                                    onClick={() => fileInputRef.current?.click()}
                                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={handleDrop}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <div className={styles.fileUploadIcon}>
                                        <CloudUploadIcon className={styles.fileUploadIcon} style={{ color: 'var(--accent-primary)' }} />
                                    </div>
                                    <div className={styles.fileUploadTitle}>
                                        {file ? 'File Selected' : 'Drop your PDF here'}
                                    </div>
                                    <div className={styles.fileUploadSub}>
                                        {file ? '' : 'or click to browse'}
                                    </div>
                                    {file && (
                                        <div className={styles.fileChosen}>✓ {file.name}</div>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className={styles.hiddenInput}
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                    />
                                </motion.div>
                            </div>

                            {/* Progress Bar */}
                            <AnimatePresence>
                                {uploading && (
                                    <motion.div
                                        className={styles.progressWrapper}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <div className={styles.progressLabel}>Uploading... {progress}%</div>
                                        <div className={styles.progressTrack}>
                                            <motion.div
                                                className={styles.progressFill}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.05 }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={uploading || !form.title || !form.category}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {uploading ? `Uploading... ${progress}%` : (
                                    <>
                                        <UploadFileIcon fontSize="small" /> Upload Note
                                    </>
                                )}
                            </motion.button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default UploadPage;
