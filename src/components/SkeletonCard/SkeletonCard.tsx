import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard: React.FC = () => (
    <div className={styles.card}>
        <div className={`${styles.preview} skeleton`} />
        <div className={styles.body}>
            <div className={`${styles.titleLine} skeleton`} />
            <div className={`${styles.subtitleLine} skeleton`} />
            <div className={`${styles.descLine1} skeleton`} />
            <div className={`${styles.descLine2} skeleton`} />
        </div>
    </div>
);

export default SkeletonCard;
