import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import ChatSidebar from '../components/ChatSidebar/ChatSidebar';
import LetterGlitch from '../components/LetterGlitch/LetterGlitch';
import { useSettings } from '../context/SettingsContext';
import styles from './AppLayout.module.css';

const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
};

const pageTransition = { duration: 0.3, ease: 'easeOut' as const };

const AppLayout: React.FC = () => {
    const location = useLocation();
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
    const [chatSidebarOpen, setChatSidebarOpen] = useState(true);
    const { isGlitchBgActive } = useSettings();

    return (
        <div className={styles.layout}>
            {isGlitchBgActive && <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={false} smooth={true} />}
            {/* Left Nav Pane */}
            <AnimatePresence initial={false}>
                {leftSidebarOpen && (
                    <motion.div
                        className={styles.sidebarContainer}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 280, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <Sidebar toggleLeftSidebar={() => setLeftSidebarOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Center Main Pane */}
            <div className={styles.mainContainer}>
                <div className={styles.topbarWrapper}>
                    <Topbar
                        leftSidebarOpen={leftSidebarOpen}
                        toggleLeftSidebar={() => setLeftSidebarOpen(prev => !prev)}
                        chatSidebarOpen={chatSidebarOpen}
                        toggleChatSidebar={() => setChatSidebarOpen(prev => !prev)}
                    />
                </div>

                <div className={styles.contentWrapper}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={pageVariants}
                            transition={pageTransition}
                            style={{ height: '100%' }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Chat Pane */}
            <AnimatePresence initial={false}>
                {chatSidebarOpen && (
                    <motion.div
                        className={styles.chatContainer}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 340, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <ChatSidebar />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AppLayout;
