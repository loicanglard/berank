import type { CSSProperties, FC } from 'react';
import { tokens } from '../../config/tokens';

interface BeRankProgressProps {
    progressPercent: number;
    progressLabel: string;
    caption?: string;
    accentColor?: string;
}

const BeRankProgress: FC<BeRankProgressProps> = ({
    progressPercent,
    progressLabel,
    caption = 'Votre progression BeRank',
    accentColor = '#6AAE8A',
}) => {
    const safeProgress = Math.max(0, Math.min(progressPercent, 100));

    return (
        <div style={containerStyle}>
            <div style={labelRowStyle}>
                <span style={captionStyle}>{caption}</span>
                <span style={progressLabelStyle}>{progressLabel}</span>
            </div>
            <div style={trackStyle}>
                <div
                    style={{
                        ...fillStyle,
                        width: `${safeProgress}%`,
                        backgroundColor: accentColor,
                    }}
                />
            </div>
        </div>
    );
};

const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.sm,
};

const labelRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: tokens.spacing.sm,
};

const captionStyle: CSSProperties = {
    fontSize: '12px',
    color: tokens.colors.text.secondary,
};

const progressLabelStyle: CSSProperties = {
    fontSize: '12px',
    fontWeight: '600',
    color: tokens.colors.text.primary,
};

const trackStyle: CSSProperties = {
    width: '100%',
    height: '8px',
    borderRadius: tokens.radius.full,
    overflow: 'hidden',
    backgroundColor: '#262626',
};

const fillStyle: CSSProperties = {
    height: '100%',
    borderRadius: tokens.radius.full,
};

export default BeRankProgress;