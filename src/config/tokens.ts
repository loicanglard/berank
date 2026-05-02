/**
 * Banxo Sandbox Design Tokens
 */

export const tokens = {
    colors: {
        primary: '#E2001A', // Banxo Red
        background: 'var(--color-background)', // Pure Dark Background
        surface: 'var(--color-surface)', // Elevated Card Surface
        border: 'var(--color-border)', // Subtle Boundary
        text: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            muted: 'var(--color-text-muted)',
            success: '#4ADE80',
        },
        shadow: 'var(--color-shadow)',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
    },
    radius: {
        sm: '4px',
        md: '8px',
        lg: '8px',
        xl: '10px',
        full: '9999px',
    },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        sizes: {
            caption: '11px',
            body: '14px',
            header: '17px',
            balance: '24px',
        },
        weights: { regular: '400', medium: '500', semibold: '600', bold: '700' },
    },
    layout: {
        maxWidth: '390px',
    }
};
