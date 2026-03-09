import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import BottomNav from '../../components/navigation/BottomNav';
import { tokens } from '../../config/tokens';

interface VirementsScreenProps {
    currentNav: string;
    onNavChange: (nav: string) => void;
}

const VirementsScreen: React.FC<VirementsScreenProps> = ({ currentNav, onNavChange }) => {
    return (
        <MainLayout>
            <div style={containerStyle}>
                <h1 style={titleStyle}>Virements</h1>
                <div style={cardStyle}>
                    <p style={{ color: tokens.colors.text.secondary }}>Interface de virement (Simulation)</p>
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

const cardStyle: React.CSSProperties = {
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing.xl,
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.border}`,
    textAlign: 'center',
};

export default VirementsScreen;
