import React from 'react';
import { tokens } from '../../config/tokens';
import { mockContent } from '../../config/content';

const BalanceCard: React.FC = () => {
    return (
        <div style={cardStyle}>
            <div style={infoContainerStyle}>
                <div style={headerRowStyle}>
                    <div style={redSquareStyle} />
                    <div style={labelStyle}>{mockContent.mainAccount.label}</div>
                </div>
                <div style={subLabelStyle}>{mockContent.mainAccount.iban}</div>
                <div style={subLabelStyle}>M {mockContent.user.firstName} {mockContent.user.lastName}</div>
            </div>
            <div style={balanceStyle}>{mockContent.mainAccount.balance}</div>
        </div>
    );
};

const cardStyle: React.CSSProperties = {
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing.md,
    margin: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    borderRadius: tokens.radius.md,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${tokens.colors.border}`,
};

const infoContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
};

const headerRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    marginBottom: '2px',
};

const redSquareStyle: React.CSSProperties = {
    width: '6px',
    height: '6px',
    backgroundColor: tokens.colors.primary,
};

const labelStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: '600',
    color: tokens.colors.text.primary,
};

const subLabelStyle: React.CSSProperties = {
    fontSize: '11px',
    color: tokens.colors.text.secondary,
};

const balanceStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '700',
    color: tokens.colors.text.success, // Banxo uses green for certain balances
};

export default BalanceCard;
