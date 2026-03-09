export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
        Mathematics: '∑',
        Physics: 'φ',
        Chemistry: '⚗',
        Biology: '🧬',
        History: '📜',
        'Computer Science': '</>'
    };
    return icons[category] || '📄';
};

export const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
        Mathematics: '#4a74f2',
        Physics: '#a855f7',
        Chemistry: '#10b981',
        Biology: '#f59e0b',
        History: '#ef4444',
        'Computer Science': '#0ea5e9',
    };
    return colors[category] || '#4a74f2';
};
