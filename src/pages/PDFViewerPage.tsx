import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Icons matching Stitch screenshot
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

import { useNotes } from '../context/NotesContext';
import styles from './PDFViewerPage.module.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { notes } = useNotes();

    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [pdfError, setPdfError] = useState(false);

    const note = notes.find((n) => n.id === Number(id));

    const onDocumentLoadSuccess = useCallback(({ numPages: pages }: { numPages: number }) => {
        setNumPages(pages);
    }, []);

    const onDocumentLoadError = useCallback(() => {
        setPdfError(true);
    }, []);

    const handleDownload = useCallback((fileUrl: string) => {
        window.open(fileUrl, '_blank');
    }, []);

    if (!note) {
        return (
            <div className={styles.notFound}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Document not found</div>
                <button
                    style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 600 }}
                    onClick={() => navigate('/app')}
                >
                    Back to Library
                </button>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* Document Toolbar */}
            <div className={styles.toolbar}>
                {/* Left: Badge */}
                <div className={styles.fileInfo}>
                    <div className={styles.fileNameBadge}>
                        <DescriptionOutlinedIcon className={styles.fileIcon} />
                        {note.title}
                    </div>
                    <span className={styles.fileCategoryBadge}>{note.category}</span>
                </div>

                {/* Center: Controls */}
                <div className={styles.centerControls}>
                    {/* Pagination */}
                    <div className={styles.controlPill}>
                        <span className={styles.controlText}>
                            {pageNumber} / {numPages || '--'}
                        </span>
                    </div>

                    {/* Zoom */}
                    <div className={styles.controlPill}>
                        <button
                            className={styles.controlBtn}
                            onClick={() => setScale(s => Math.max(0.5, s - 0.25))}
                            disabled={scale <= 0.5}
                        >
                            -
                        </button>
                        <span className={styles.controlText}>{Math.round(scale * 100)}%</span>
                        <button
                            className={styles.controlBtn}
                            onClick={() => setScale(s => Math.min(3, s + 0.25))}
                            disabled={scale >= 3}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Copy"><ContentCopyOutlinedIcon sx={{ fontSize: 18 }} /></button>
                    <button className={styles.actionBtn} title="Edit"><EditOutlinedIcon sx={{ fontSize: 18 }} /></button>
                    <button className={styles.actionBtn} title="Share"><ShareOutlinedIcon sx={{ fontSize: 18 }} /></button>
                    <button className={styles.actionBtn} title="Download" onClick={() => handleDownload('/test_5.pdf')}>
                        <FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />
                    </button>
                    <button className={styles.actionBtn} title="Comment"><ChatBubbleOutlineRoundedIcon sx={{ fontSize: 18 }} /></button>
                </div>
            </div>

            {/* Document Content */}
            <div className={styles.viewerContainer} id="pdf-area">
                {pdfError ? (
                    <div className={styles.notFound}>
                        <DescriptionOutlinedIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                        <div style={{ fontSize: 18, fontWeight: 600 }}>Failed to load PDF</div>
                        <div style={{ fontSize: 14, opacity: 0.7 }}>The file may be corrupted or unavailable.</div>
                    </div>
                ) : (
                    <div className={styles.pdfArea}>
                        <Document
                            file="/test_5.pdf"
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            loading={<div className={styles.loadingSpinner} />}
                        >
                            {Array.from(new Array(numPages), (_, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    scale={scale}
                                    className={styles.pdfCanvas}
                                    renderTextLayer={true}
                                    renderAnnotationLayer={true}
                                />
                            ))}
                        </Document>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PDFViewerPage;
