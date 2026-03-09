/**
 * Banxo Sandbox Design Tokens
 */

export const tokens = {
    colors: {
        primary: '#E2001A', // Banxo Red
        background: '#0F0F0F', // Pure Dark Background
        surface: '#1A1A1A', // Elevated Card Surface
        border: '#2C2C2C', // Subtle Boundary
        text: {
            primary: '#FFFFFF',
            secondary: '#999999',
            muted: '#666666',
            success: '#4ADE80',
        },
        shadow: 'transparent',
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
