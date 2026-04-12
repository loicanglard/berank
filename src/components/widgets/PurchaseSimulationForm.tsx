import type { CSSProperties, FC, FormEvent } from 'react';
import { useState } from 'react';
import { tokens } from '../../config/tokens';
import { getCategoryPoints, purchaseCategories, type PurchaseCategory } from '../../utils/beRankSimulation';

interface PurchaseSimulationFormProps {
    onSubmit: (category: PurchaseCategory, amount: number) => void;
    submitLabel?: string;
}

export const PurchaseSimulationForm: FC<PurchaseSimulationFormProps> = ({
    onSubmit,
    submitLabel = 'Confirmer',
}) => {
    const [category, setCategory] = useState<PurchaseCategory>('Responsable');
    const [amount, setAmount] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsedAmount = Number.parseFloat(amount.replace(',', '.'));
        if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
            return;
        }

        onSubmit(category, parsedAmount);
        setAmount('');
    };

    const pointsPreview = getCategoryPoints(category);

    return (
        <form onSubmit={handleSubmit} style={containerStyle}>
            <div style={fieldsGridStyle}>
                <label style={fieldStyle}>
                    <span style={labelStyle}>Catégorie</span>
                    <select value={category} onChange={(event) => setCategory(event.target.value as PurchaseCategory)} style={inputStyle}>
                        {purchaseCategories.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={fieldStyle}>
                    <span style={labelStyle}>Montant</span>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        placeholder="0,00"
                        style={inputStyle}
                    />
                </label>
            </div>

            <div style={footerStyle}>
                <span style={helperStyle}>Impact estimé : {pointsPreview > 0 ? '+' : ''}{pointsPreview} pts</span>
                <button type="submit" style={buttonStyle}>
                    {submitLabel}
                </button>
            </div>
        </form>
    );
};

const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.md,
    padding: tokens.spacing.md,
    borderRadius: tokens.radius.xl,
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
};

const fieldsGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: tokens.spacing.sm,
};

const fieldStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.xs,
};

const labelStyle: CSSProperties = {
    fontSize: tokens.typography.sizes.caption,
    color: tokens.colors.text.secondary,
    letterSpacing: '0.03em',
};

const inputStyle: CSSProperties = {
    appearance: 'none',
    width: '100%',
    padding: '12px 14px',
    borderRadius: tokens.radius.lg,
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(15,15,15,0.9)',
    color: tokens.colors.text.primary,
    fontSize: tokens.typography.sizes.body,
    outline: 'none',
    boxSizing: 'border-box',
};

const footerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacing.sm,
};

const helperStyle: CSSProperties = {
    fontSize: tokens.typography.sizes.caption,
    color: tokens.colors.text.secondary,
};

const buttonStyle: CSSProperties = {
    border: 'none',
    cursor: 'pointer',
    padding: '10px 14px',
    borderRadius: tokens.radius.full,
    background: 'linear-gradient(135deg, rgba(74,222,128,0.18), rgba(74,222,128,0.08))',
    color: tokens.colors.text.primary,
    fontSize: tokens.typography.sizes.body,
    fontWeight: Number(tokens.typography.weights.semibold),
};