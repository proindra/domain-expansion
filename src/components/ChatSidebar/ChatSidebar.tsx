import React, { useState, useRef, useEffect } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import styles from './ChatSidebar.module.css';
import botIcon from '../../../bot_icon.png';
import fingerIcon from '../../../finger_icon.png';

interface Message {
    id: string;
    sender: 'bot' | 'user';
    text: React.ReactNode;
}

const ChatSidebar: React.FC = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
                    <img src={fingerIcon} alt="Chat" style={{ width: 18, height: 18, transform: 'scale(1.8)', borderRadius: '50%' }} />
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
                                <img src={botIcon} alt="Bot Sukuna" className={styles.botIcon} />
                            </div>
                        )}
                        <div className={`${styles.bubble} ${msg.sender === 'bot' ? styles.bot : styles.user}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
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
                    <button className={`${styles.actionBtn} ${styles.send}`} onClick={handleSend}>
                        <SendRoundedIcon sx={{ fontSize: 18 }} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default ChatSidebar;
