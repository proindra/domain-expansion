import React, { createContext, useContext, useEffect, useState } from 'react';

interface SettingsContextType {
    isGlitchBgActive: boolean;
    toggleGlitchBg: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isGlitchBgActive, setIsGlitchBgActive] = useState<boolean>(() => {
        const saved = localStorage.getItem('notevault-glitch-bg');
        return saved === 'off' ? false : true; // Defaults to true if not set
    });

    useEffect(() => {
        localStorage.setItem('notevault-glitch-bg', isGlitchBgActive ? 'on' : 'off');
    }, [isGlitchBgActive]);

    const toggleGlitchBg = () => {
        setIsGlitchBgActive((prev) => !prev);
    };

    return (
        <SettingsContext.Provider value={{ isGlitchBgActive, toggleGlitchBg }}>
            {children}
        </SettingsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
    return ctx;
}
