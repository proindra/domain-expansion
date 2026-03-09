import React from 'react';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import styles from './ChatSidebar.module.css';

const ChatSidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.icon}>
                    <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 18 }} />
                </div>
                <div className={styles.title}>BrightBot</div>
            </div>

            {/* Messages Area */}
            <div className={styles.messages}>
                <div className={styles.dateDivider}>TODAY</div>

                {/* Bot Message */}
                <div className={`${styles.messageRow} ${styles.bot}`}>
                    <div className={`${styles.avatar} ${styles.bot}`}>
                        <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 14 }} />
                    </div>
                    <div className={`${styles.bubble} ${styles.bot}`}>
                        Hi, I'm BrightBot! <br />
                        How can I help with your documents?
                    </div>
                </div>

                {/* User Message */}
                <div className={`${styles.messageRow} ${styles.user}`}>
                    <div className={`${styles.bubble} ${styles.user}`}>
                        Help me extract key business terms within our PDF data documentation.
                    </div>
                </div>

                {/* Bot Message */}
                <div className={`${styles.messageRow} ${styles.bot}`}>
                    <div className={`${styles.avatar} ${styles.bot}`}>
                        <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 14 }} />
                    </div>
                    <div className={`${styles.bubble} ${styles.bot}`}>
                        Happy to help with that!<br /><br />
                        I'll start by identifying what I believe to be the most important terms in this document for you to review. Should I proceed?
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className={styles.inputArea}>
                <div className={styles.inputWrapper}>
                    <input type="text" className={styles.input} placeholder="" />
                    <button className={styles.actionBtn}>
                        <AttachmentRoundedIcon sx={{ fontSize: 18 }} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.send}`}>
                        <SendRoundedIcon sx={{ fontSize: 18 }} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default ChatSidebar;
