import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import BottomNav from '../../components/navigation/BottomNav';
import { tokens } from '../../config/tokens';
import { useTheme } from '../../contexts/ThemeContext';

interface PlusScreenProps {
    currentNav: string;
    onNavChange: (nav: string) => void;
}

const PlusScreen: React.FC<PlusScreenProps> = ({ currentNav, onNavChange }) => {
    const { theme, setTheme } = useTheme();

    return (
        <MainLayout>
            <div style={containerStyle}>
                <h1 style={titleStyle}>Menu Plus</h1>

                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>Paramètres</h2>
                    <div style={cardStyle}>
                        <div style={settingRowStyle}>
                            <span style={settingLabelStyle}>Thème</span>
                            <div style={themeToggleStyle}>
                                <button
                                    style={themeButtonStyle(theme === 'dark')}
                                    onClick={() => setTheme('dark')}
                                >
                                    Sombre
                                </button>
                                <button
                                    style={themeButtonStyle(theme === 'light')}
                                    onClick={() => setTheme('light')}
                                >
                                    Clair
                                </button>
                                <button
                                    style={themeButtonStyle(theme === 'system')}
                                    onClick={() => setTheme('system')}
                                >
                                    Système
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={cardStyle}>
                    <p style={{ color: tokens.colors.text.secondary }}>Options supplémentaires (Simulation)</p>
                </div>
            </div>
            <BottomNav activeTab={currentNav} onTabChange={onNavChange} />
        </MainLayout>
    );
};

const containerStyle: React.CSSProperties = {
    padding: tokens.spacing.md,
    backgroundColor: tokens.colors.background,
    flex: 1,
};

const titleStyle: React.CSSProperties = {
    marginBottom: tokens.spacing.lg,
    color: tokens.colors.text.primary,
    marginTop: tokens.spacing.xl,
};

const sectionStyle: React.CSSProperties = {
    marginBottom: tokens.spacing.xl,
};

const sectionTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: tokens.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: tokens.spacing.md,
};

const cardStyle: React.CSSProperties = {
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing.xl,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border}`,
    textAlign: 'center',
};

const settingRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const settingLabelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    color: tokens.colors.text.primary,
};

const themeToggleStyle: React.CSSProperties = {
    display: 'flex',
    borderRadius: tokens.radius.md,
    overflow: 'hidden',
    border: `1px solid ${tokens.colors.border}`,
};

const themeButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    backgroundColor: isActive ? 'var(--color-accent-green)' : 'transparent',
    color: isActive ? 'var(--color-background)' : 'var(--color-text-secondary)',
    border: 'none',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderRight: '1px solid var(--color-border)',
});

export default PlusScreen;
