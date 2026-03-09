import React from 'react';
import { tokens } from '../../config/tokens';
import { mockContent } from '../../config/content';

const TransactionList: React.FC = () => {
    return (
        <section style={containerStyle}>
            <h2 style={titleStyle}>Dernières opérations</h2>
            <div style={listStyle}>
                {mockContent.recentTransactions.map(tx => (
                    <div key={tx.id} style={txItemStyle}>
                        <div style={txInfoStyle}>
                            <div style={txLabelStyle}>{tx.label}</div>
                            <div style={txDateStyle}>{tx.category} • {tx.date}</div>
                        </div>
                        <div style={{
                            ...txAmountStyle,
                            color: tx.amount.startsWith('+') ? tokens.colors.text.success : tokens.colors.text.primary
                        }}>
                            {tx.amount}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const containerStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    paddingTop: tokens.spacing.md,
};

const titleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: tokens.spacing.md,
    color: tokens.colors.text.secondary,
};

const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border}`,
    overflow: 'hidden',
};

const txItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: tokens.spacing.md,
    borderBottom: `1px solid ${tokens.colors.background}`,
};

const txInfoStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
};

const txLabelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#FFFFFF',
};

const txDateStyle: React.CSSProperties = {
    fontSize: '11px',
    color: tokens.colors.text.secondary,
};

const txAmountStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '700',
};

export default TransactionList;
