import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import BlurOnRoundedIcon from '@mui/icons-material/BlurOnRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import Lightning from '../components/Lightning/Lightning';

const FEATURES = [
    {
        icon: <AutoAwesomeMosaicOutlinedIcon fontSize="small" />,
        colorClass: 'blue',
        title: 'Glassmorphic UI',
        desc: 'Deep glass effects and subtle glow that makes your workspace feel truly premium and modern.',
        imgClass: styles.featureImg1
    },
    {
        icon: <ShieldOutlinedIcon fontSize="small" />,
        colorClass: 'purple',
        title: 'Secure Vault',
        desc: 'Military-grade encrypted storage for your most sensitive documents and research data.',
        imgClass: styles.featureImg2
    },
    {
        icon: <SettingsRoundedIcon fontSize="small" />,
        colorClass: 'amber',
        title: 'AI Insights',
        desc: 'Extract deep knowledge with one click using our custom large language models.',
        imgClass: styles.featureImg3
    }
];

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            {/* Lightning Background */}
            <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
                <Lightning hue={280} xOffset={0.5} speed={1.5} intensity={1} size={1} />
            </div>

            {/* Background */}
            <div className={styles.bg}>
                <div className={styles.bgStars} />
                <div className={styles.bgNebula1} />
                <div className={styles.bgNebula2} />
            </div>

            {/* Navigation */}
            <nav className={styles.nav}>
                <a className={styles.navLogo} href="#">O</a>

                <div className={styles.navCenter}>
                    <ul className={styles.navLinks}>
                        {['Home', 'DeFi App', 'Assets', 'Features', 'Pricing', 'FAQ'].map(item => (
                            <li key={item}><a className={styles.navLink}>{item}</a></li>
                        ))}
                    </ul>
                    <button className={styles.navProtectionBtn}>
                        Protection <ArrowOutwardRoundedIcon sx={{ fontSize: 14 }} />
                    </button>
                    <div className={styles.navGlobe}>
                        <LanguageRoundedIcon sx={{ fontSize: 20 }} />
                    </div>
                </div>

                <div className={styles.navRight}>
                    <button className={styles.navAccountBtn} onClick={() => navigate('/signup')}>
                        <PersonOutlineRoundedIcon sx={{ fontSize: 18 }} /> Create Account
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className={styles.hero}>
                {/* Floating Nodes */}
                <motion.div
                    className={`${styles.floatingNode} ${styles.nodeTopLeft}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className={styles.nodeIcon}>▲</div>
                    <div className={styles.nodeInfo}>
                        <div className={styles.nodeName}>Cortex</div>
                        <div className={styles.nodeValue}>20.945</div>
                    </div>
                </motion.div>

                <motion.div
                    className={`${styles.floatingNode} ${styles.nodeTopRight}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <div className={styles.nodeIcon}><ShowChartRoundedIcon sx={{ fontSize: 16 }} /></div>
                    <div className={styles.nodeInfo}>
                        <div className={styles.nodeName}>Quant</div>
                        <div className={styles.nodeValue}>2.915</div>
                    </div>
                </motion.div>

                <motion.div
                    className={`${styles.floatingNode} ${styles.nodeBottomLeft}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <div className={styles.nodeIcon}><BlurOnRoundedIcon sx={{ fontSize: 16 }} /></div>
                    <div className={styles.nodeInfo}>
                        <div className={styles.nodeName}>Aelf</div>
                        <div className={styles.nodeValue}>18.346</div>
                    </div>
                </motion.div>

                {/* Hero Content */}
                <motion.button
                    className={styles.heroEyebrowBtn}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.heroEyebrowIcon}><PlayArrowRoundedIcon fontSize="small" /></div>
                    Unlock Your Assets Spark! <ArrowOutwardRoundedIcon sx={{ fontSize: 14, ml: 1, opacity: 0.5 }} />
                </motion.button>

                <motion.h1
                    className={styles.heroTitle}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    One-click for<br />Domain Expansion
                </motion.h1>

                <motion.p
                    className={styles.heroSubtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Dive into the art assets, where innovative blockchain technology meets financial expertise
                </motion.p>

                <motion.div
                    className={styles.heroCtas}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <button className={styles.ctaPrimary} onClick={() => navigate('/app')}>
                        Open App <ArrowOutwardRoundedIcon sx={{ fontSize: 16, opacity: 0.7 }} />
                    </button>
                    <button className={styles.ctaSecondary}>
                        Discover More
                    </button>
                </motion.div>

                {/* Scroll Indicators */}
                <div className={styles.scrollIndicator}>
                    <div className={styles.scrollIcon}><ArrowDownwardRoundedIcon sx={{ fontSize: 16 }} /></div>
                    02/03 • Scroll down
                </div>

                <div className={styles.defiHorizons}>
                    DeFi horizons
                    <div className={styles.defiDots}>
                        <div className={`${styles.defiDot} ${styles.defiDotActive}`} />
                        <div className={styles.defiDot} />
                        <div className={styles.defiDot} />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Advanced PDF Workspace</h2>
                    <p className={styles.sectionSubtitle}>
                        Designed for high-performance knowledge management with state-of-the-art security and analysis tools.
                    </p>
                </div>

                <div className={styles.featureCards}>
                    {FEATURES.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            className={styles.featureCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <div className={`${styles.featureIconCard} ${styles[feat.colorClass]}`}>
                                {feat.icon}
                            </div>
                            <div className={styles.featureCardTitle}>{feat.title}</div>
                            <div className={styles.featureCardDesc}>{feat.desc}</div>
                            <div className={`${styles.featureImage} ${feat.imgClass}`}>
                                {feat.title === 'AI Insights' && <div className={styles.featureImg3_brain} />}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerLeft}>
                    <div className={styles.footerLogoIcon}>e</div>
                    <span className={styles.footerLogoText}>Domain Expansion</span>
                </div>

                <div className={styles.footerLinks}>
                    {['Twitter', 'GitHub', 'Privacy', 'Terms'].map(link => (
                        <a key={link} className={styles.footerLink}>{link}</a>
                    ))}
                </div>

                <div className={styles.footerCopy}>
                    © 2024 Domain Expansion. Built for the future of research.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
