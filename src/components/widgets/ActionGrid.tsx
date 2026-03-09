import React from 'react';
import { tokens } from '../../config/tokens';

const ActionGrid: React.FC = () => {
    const actions = [
        { id: 1, label: 'Virement', icon: '⇄' },
        { id: 2, label: 'Payer', icon: '📱' },
        { id: 3, label: 'Cartes', icon: '💳' },
        { id: 4, label: 'Plus', icon: '⋯' },
    ];

    return (
        <div style={gridStyle}>
            {actions.map(action => (
                <div key={action.id} style={actionItemStyle}>
                    <div style={iconCircleStyle}>{action.icon}</div>
                    <div style={labelStyle}>{action.label}</div>
                </div>
            ))}
        </div>
    );
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: tokens.spacing.md,
    padding: `${tokens.spacing.md} ${tokens.spacing.md}`,
};

const actionItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacing.sm,
};

const iconCircleStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.colors.surface,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    border: `1px solid ${tokens.colors.border}`,
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
};

const labelStyle: React.CSSProperties = {
    fontSize: tokens.typography.sizes.caption,
    color: tokens.colors.text.primary,
    fontWeight: tokens.typography.weights.medium,
};

export default ActionGrid;
