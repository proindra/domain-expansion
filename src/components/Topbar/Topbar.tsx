import React from 'react';
import { motion } from 'framer-motion';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Topbar.module.css';

const pageTitles: Record<string, string> = {
    '/app': 'Resources',
    '/app/categories': 'Categories',
    '/app/favorites': 'Favorites',
    '/app/upload': 'Upload Notes',
};

interface TopbarProps {
    leftSidebarOpen?: boolean;
    toggleLeftSidebar?: () => void;
    chatSidebarOpen?: boolean;
    toggleChatSidebar?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
    leftSidebarOpen = true,
    toggleLeftSidebar,
    chatSidebarOpen = true,
    toggleChatSidebar
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get title (handles /app/viewer/:id)
    const title = pageTitles[location.pathname] || 'Resources';

    return (
        <header className={styles.topbar}>
            {/* Left Box: Breadcrumb */}
            <div className={styles.leftSection}>
                <button
                    className={styles.iconBtn}
                    style={{ marginRight: '8px' }}
                    onClick={toggleLeftSidebar}
                    title={leftSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                >
                    {leftSidebarOpen ? <MenuOpenRoundedIcon sx={{ fontSize: 18 }} /> : <MenuRoundedIcon sx={{ fontSize: 18 }} />}
                </button>
                <div className={styles.breadcrumb}>
                    <span
                        className={`${styles.breadcrumbItem} ${styles.clickable}`}
                        onClick={() => navigate('/')}
                        title="Go to Landing Page"
                    >
                        Domain Expansion
                    </span>
                    <ChevronRightRoundedIcon className={styles.breadcrumbSeparator} />
                    <span
                        className={`${styles.breadcrumbItem} ${styles.clickable}`}
                        onClick={() => navigate('/app')}
                        title="Go to Knowledge Center"
                    >
                        Knowledge Center
                    </span>
                    <ChevronRightRoundedIcon className={styles.breadcrumbSeparator} />
                    <span className={styles.breadcrumbCurrent}>{title}</span>
                </div>
            </div>

            {/* Right Box: Actions & Profile */}
            <div className={styles.actions}>
                <motion.button
                    className={styles.iconBtn}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleChatSidebar}
                    title={chatSidebarOpen ? "Hide Bot Sukuna" : "Show Bot Sukuna"}
                >
                    <span style={{ fontSize: 18, color: chatSidebarOpen ? 'var(--accent-primary)' : 'inherit' }}>✨</span>
                </motion.button>
                <motion.button
                    className={styles.iconBtn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <NotificationsNoneRoundedIcon sx={{ fontSize: 18 }} />
                </motion.button>

                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        <img
                            src="https://api.dicebear.com/7.x/notionists/svg?seed=Connor&backgroundColor=f8fafc"
                            alt="User"
                            className={styles.avatarImg}
                        />
                    </div>
                    <div className={styles.userName}>
                        Connor<br /><span>Bond</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
