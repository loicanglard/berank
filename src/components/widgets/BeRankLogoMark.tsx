import { useId, type CSSProperties, type FC } from 'react';
import { tokens } from '../../config/tokens';

interface BeRankLogoMarkProps {
    size?: number;
}

const BeRankLogoMark: FC<BeRankLogoMarkProps> = ({ size = 22 }) => {
    const gradientId = useId();

    return (
        <span style={getContainerStyle(size)} aria-hidden="true">
            <svg width={size - 4} height={size - 4} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id={gradientId} x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#08C56B" />
                        <stop offset="0.55" stopColor="#38C979" />
                        <stop offset="1" stopColor="#44525E" />
                    </linearGradient>
                </defs>
                <path
                    d="M24 4C31.7 4 36.8 5.6 40 7.6V22.1C40 31.5 33.5 37.8 24 41C14.5 37.8 8 31.5 8 22.1V7.6C11.2 5.6 16.3 4 24 4Z"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M24.2 11.7L27.1 17.7L33.7 18.4L28.8 22.8L30.2 29.2L24.2 25.8L18.5 29.2L19.7 22.8L14.8 18.4L21.3 17.7L24.2 11.7Z"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M19.5 36.1C19.8 31.2 23.1 27.1 29 25.8C28.7 31 25.5 35 20.4 37.2"
                    fill="rgba(8, 197, 107, 0.16)"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M18.7 38.2C20.7 31.6 24.5 26.8 31 23.6"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                />
            </svg>
        </span>
    );
};

const getContainerStyle = (size: number): CSSProperties => ({
    width: size,
    height: size,
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.md,
    background: 'radial-gradient(circle at 30% 25%, rgba(8, 197, 107, 0.14) 0%, rgba(8, 197, 107, 0.05) 45%, rgba(255, 255, 255, 0.01) 100%)',
    border: '1px solid rgba(106, 174, 138, 0.18)',
    boxShadow: '0 8px 18px rgba(8, 197, 107, 0.08)',
});

export default BeRankLogoMark;