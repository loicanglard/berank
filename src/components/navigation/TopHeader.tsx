import React from 'react';
import { tokens } from '../../config/tokens';
import { mockContent } from '../../config/content';

interface TopHeaderProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ activeTab, onTabChange }) => {
    return (
        <header style={containerStyle}>
            <div style={overlayStyle}>
                <div style={headerMainStyle}>
                    <div style={titleStyle}>{activeTab === 'Tous' ? 'Tous mes comptes' : 'Personnaliser'}</div>
                    <div style={notificationIconStyle}>
                        🔔
                        <div style={badgeStyle} />
                    </div>
                </div>

                <div style={tabContainerStyle}>
                    {mockContent.headerTabs.map((tab, idx) => (
                        <div
                            key={idx}
                            onClick={() => onTabChange(tab)}
                            style={{
                                ...tabStyle,
                                borderBottom: activeTab === tab ? '3px solid white' : 'none',
                                opacity: activeTab === tab ? 1 : 0.6
                            }}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
};

const containerStyle: React.CSSProperties = {
    height: '180px',
    position: 'relative',
    backgroundImage: 'url("https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=390&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
    color: 'white',
};

const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(rgba(0,0,0,0.1), rgba(15,15,15,1))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
};

const headerMainStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${tokens.spacing.md} ${tokens.spacing.md}`,
};

const titleStyle: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: '600',
};

const notificationIconStyle: React.CSSProperties = {
    position: 'relative',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    cursor: 'pointer',
};

const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '8px',
    height: '8px',
    backgroundColor: tokens.colors.primary,
    borderRadius: '50%',
};

const tabContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: tokens.spacing.lg,
    padding: `0 ${tokens.spacing.md}`,
    backgroundColor: 'rgba(15, 15, 15, 0.4)',
};

const tabStyle: React.CSSProperties = {
    fontSize: tokens.typography.sizes.body,
    fontWeight: '600',
    padding: `${tokens.spacing.sm} 0`,
    cursor: 'pointer',
};

export default TopHeader;
