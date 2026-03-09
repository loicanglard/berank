import React from 'react';
import { tokens } from '../../config/tokens';
import { mockContent } from '../../config/content';

interface BottomNavProps {
    activeTab: string;
    onTabChange: (label: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav style={navStyle}>
            {mockContent.navigation.map((item, index) => {
                const isActive = activeTab === item.label;
                return (
                    <div key={index} style={itemStyle} onClick={() => onTabChange(item.label)}>
                        <div style={{
                            ...iconContainerStyle,
                            backgroundColor: isActive ? tokens.colors.primary : 'transparent',
                        }}>
                            <span style={{
                                fontSize: '20px',
                                color: 'white',
                                opacity: isActive ? 1 : 0.6
                            }}>{item.icon}</span>
                        </div>
                        <div style={{
                            ...labelStyle,
                            color: isActive ? tokens.colors.primary : tokens.colors.text.secondary,
                            fontWeight: isActive ? '600' : '400',
                        }}>
                            {item.label}
                        </div>
                    </div>
                );
            })}
        </nav>
    );
};

const navStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80px',
    backgroundColor: '#0A0A0A',
    borderTop: `1px solid ${tokens.colors.border}`,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: '20px',
    zIndex: 10,
    cursor: 'pointer',
};

const itemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
};

const iconContainerStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    letterSpacing: '-0.1px',
};

export default BottomNav;
