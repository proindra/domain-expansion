import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeOutlineRoundedIcon from '@mui/icons-material/HomeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { useSettings } from '../../context/SettingsContext';
import styles from './Sidebar.module.css';

const navItems = [
    { path: '/app', label: 'Resources', icon: <HomeOutlineRoundedIcon fontSize="small" /> },
    { path: '/app/categories', label: 'Terms', icon: <CategoryOutlinedIcon fontSize="small" /> },
    { path: '/app/favorites', label: 'Schemas', icon: <BookmarkBorderRoundedIcon fontSize="small" /> },
    { path: '/app/upload', label: 'Upload Notes', icon: <UploadFileRoundedIcon fontSize="small" /> },
];

interface SidebarProps {
    toggleLeftSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleLeftSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [metricsOpen, setMetricsOpen] = useState(true);
    const { isGlitchBgActive, toggleGlitchBg } = useSettings();

    return (
        <aside className={styles.sidebar}>
            {/* 1. Slim Icon Strip */}
            <div className={styles.slimBar}>
                <div className={styles.workspaceIcon} onClick={() => navigate('/app')} style={{ cursor: 'pointer' }} />

                <div className={styles.slimNav}>
                    <button className={`${styles.slimBtn} ${styles.active}`}><AppsRoundedIcon fontSize="small" /></button>
                    <button className={styles.slimBtn}><FolderOpenRoundedIcon fontSize="small" /></button>
                    <button className={styles.slimBtn}><PeopleAltOutlinedIcon fontSize="small" /></button>
                    <button className={styles.slimBtn}><DescriptionOutlinedIcon fontSize="small" /></button>
                </div>

                <div className={styles.bottomIcons}>
                    <button className={styles.slimBtn} onClick={toggleGlitchBg} title={isGlitchBgActive ? "Hide Glitch Background" : "Show Glitch Background"}>
                        {isGlitchBgActive ? <VisibilityRoundedIcon fontSize="small" /> : <VisibilityOffRoundedIcon fontSize="small" />}
                    </button>
                    <button className={styles.slimBtn}><HelpOutlineRoundedIcon fontSize="small" /></button>
                    <button className={styles.slimBtn} onClick={() => navigate('/')} title="Logout"><LoginRoundedIcon fontSize="small" /></button>
                </div>
            </div>

            {/* 2. Main Sidebar Area */}
            <div className={styles.mainArea}>
                <div className={styles.header}>
                    <HomeOutlineRoundedIcon sx={{ fontSize: 18, color: 'var(--text-secondary)' }} />
                    <span className={styles.headerTitle}>KNOWLEDGE CENTER</span>
                </div>

                <div className={styles.navContent}>
                    {/* Primary Links */}
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (location.pathname.startsWith('/app/viewer') && item.path === '/app');
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            >
                                <span className={styles.navItemIcon}>{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}

                    {/* Search Input */}
                    <div className={styles.searchBox}>
                        <SearchRoundedIcon className={styles.searchIcon} />
                        <input type="text" placeholder="Search" className={styles.searchInput} />
                    </div>

                    {/* Tree View */}
                    <div className={styles.treeSection}>
                        <div className={styles.treeHeader}>
                            <span>DOCUMENTS</span>
                            <button className={styles.treeAddBtn}>+</button>
                        </div>

                        <div className={styles.treeNode}>
                            <span className={styles.arrow}><ChevronRightRoundedIcon sx={{ fontSize: 14 }} /></span>
                            <span className={styles.nodeIcon}><FolderOpenRoundedIcon sx={{ fontSize: 14 }} /></span>
                            Aisle
                        </div>
                        <div className={styles.treeNode}>
                            <span className={styles.arrow}><ChevronRightRoundedIcon sx={{ fontSize: 14 }} /></span>
                            <span className={styles.nodeIcon}><FolderOpenRoundedIcon sx={{ fontSize: 14 }} /></span>
                            Concepts
                        </div>
                        <div className={styles.treeNode}>
                            <span className={styles.arrow}><ChevronRightRoundedIcon sx={{ fontSize: 14 }} /></span>
                            <span className={styles.nodeIcon}><FolderOpenRoundedIcon sx={{ fontSize: 14 }} /></span>
                            Consumer Product Goods
                        </div>
                        <div className={styles.treeNode}>
                            <span className={styles.arrow}><ChevronRightRoundedIcon sx={{ fontSize: 14 }} /></span>
                            <span className={styles.nodeIcon}><FolderOpenRoundedIcon sx={{ fontSize: 14 }} /></span>
                            Example Glossary
                            <span className={styles.actionBadge}>More</span>
                        </div>

                        {/* Open Folder */}
                        <div className={`${styles.treeNode} ${metricsOpen ? '' : styles.active}`} onClick={() => setMetricsOpen(!metricsOpen)}>
                            <span className={`${styles.arrow} ${metricsOpen ? styles.open : ''}`}><ChevronRightRoundedIcon sx={{ fontSize: 14 }} /></span>
                            <span className={styles.nodeIcon} style={{ color: metricsOpen ? 'var(--success)' : '' }}><FolderOpenRoundedIcon sx={{ fontSize: 14 }} /></span>
                            <span style={{ color: metricsOpen ? 'var(--success)' : '' }}>Metrics</span>
                        </div>

                        {metricsOpen && (
                            <>
                                <div className={`${styles.treeNode} ${styles.treeRowIndent}`}>
                                    <span className={styles.arrow}><ChevronRightRoundedIcon sx={{ fontSize: 14 }} /></span>
                                    <span className={styles.nodeIcon}><FolderOpenRoundedIcon sx={{ fontSize: 14 }} /></span>
                                    Annual
                                </div>
                                <div className={`${styles.treeNode} ${styles.treeRowIndent}`}>
                                    <span className={styles.arrow}><ChevronRightRoundedIcon sx={{ fontSize: 14 }} /></span>
                                    <span className={styles.nodeIcon}><FolderOpenRoundedIcon sx={{ fontSize: 14 }} /></span>
                                    Concepts
                                </div>
                                <div className={`${styles.treeNode} ${styles.treeRowIndent}`}>
                                    <span className={styles.arrow}><ChevronRightRoundedIcon sx={{ fontSize: 14 }} /></span>
                                    <span className={styles.nodeIcon}><FolderOpenRoundedIcon sx={{ fontSize: 14 }} /></span>
                                    Monthly
                                </div>

                                {/* Files */}
                                <div className={`${styles.treeNode} ${styles.treeRowIndent2}`}>
                                    <span className={styles.nodeIcon}><DescriptionOutlinedIcon sx={{ fontSize: 14, opacity: 0.5 }} /></span>
                                    <span style={{ opacity: 0.6 }}>sample1.pdf</span>
                                </div>
                                <div className={`${styles.treeNode} ${styles.treeRowIndent2} ${styles.treeFile}`} onClick={() => navigate('/app/viewer/1')}>
                                    <span className={styles.nodeIcon} style={{ color: 'var(--success)' }}><DescriptionOutlinedIcon sx={{ fontSize: 14 }} /></span>
                                    test_5.pdf
                                    <span style={{ marginLeft: 'auto', opacity: 0.5 }}>...</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <button className={styles.toggleSidebarBtn} onClick={toggleLeftSidebar} title="Collapse Sidebar">
                    <KeyboardDoubleArrowLeftRoundedIcon fontSize="small" />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
