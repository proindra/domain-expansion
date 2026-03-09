import React, { useState } from 'react';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import styles from './ChatSidebar.module.css';

interface Message {
    id: string;
    sender: 'bot' | 'user';
    text: React.ReactNode;
}

const ChatSidebar: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'bot',
            text: (
                <>
                    Hi, I'm Bot Sukuna! <br />
                    How can I help with your documents?
                </>
            ),
        },
        {
            id: '2',
            sender: 'user',
            text: 'Help me extract key business terms within our PDF data documentation.',
        },
        {
            id: '3',
            sender: 'bot',
            text: (
                <>
                    Happy to help with that!<br /><br />
                    I'll start by identifying what I believe to be the most important terms in this document for you to review. Should I proceed?
                </>
            ),
        },
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputValue.trim(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue('');

        setTimeout(() => {
            const newBotMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: 'currently unavailable pls try again later',
            };
            setMessages((prev) => [...prev, newBotMessage]);
        }, 500);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <aside className={styles.sidebar}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.icon}>
                    <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 18 }} />
                </div>
                <div className={styles.title}>Bot Sukuna</div>
            </div>

            {/* Messages Area */}
            <div className={styles.messages}>
                <div className={styles.dateDivider}>TODAY</div>

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${styles.messageRow} ${msg.sender === 'bot' ? styles.bot : styles.user}`}
                    >
                        {msg.sender === 'bot' && (
                            <div className={`${styles.avatar} ${styles.bot}`}>
                                <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 14 }} />
                            </div>
                        )}
                        <div className={`${styles.bubble} ${msg.sender === 'bot' ? styles.bot : styles.user}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className={styles.inputArea}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className={styles.actionBtn}>
                        <AttachmentRoundedIcon sx={{ fontSize: 18 }} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.send}`} onClick={handleSend}>
                        <SendRoundedIcon sx={{ fontSize: 18 }} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default ChatSidebar;
