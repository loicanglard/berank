import React from 'react';
import { tokens } from '../config/tokens';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="app-shell" style={shellStyle}>
            <main style={contentStyle}>
                {children}
            </main>
        </div>
    );
};

const shellStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: `var(--app-shell-max-width, ${tokens.layout.maxWidth})`,
    minHeight: '100vh',
    backgroundColor: 'var(--color-background)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'hidden',
};

const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '80px', // Space for bottom navigation
};

export default MainLayout;
