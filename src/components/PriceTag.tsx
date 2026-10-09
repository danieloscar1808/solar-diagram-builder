import { ExternalLink, Minus, Plus } from 'lucide-react';
import { formatArs } from '@/types/solar';

interface PriceTagProps {
  price?: number;
  url?: string;
  label?: string;
  qty?: number;
  onQtyChange?: (n: number) => void;
  unit?: string;
}

const PriceTag = ({ price, url, label = 'Precio Enertik', qty, onQtyChange, unit = 'u' }: PriceTagProps) => {
  const hasPrice = typeof price === 'number' && !isNaN(price);
  const q = qty ?? 1;
  const badge = (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
        hasPrice ? 'bg-success/15 text-success border-success/40' : 'bg-muted text-muted-foreground border-border'
      }`}
      title={`${label}: ${formatArs(price)}`}
    >
      {formatArs(price)}
      {url && <ExternalLink className="w-2.5 h-2.5" />}
    </span>
  );
  const linked = url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="hover:opacity-80 transition-opacity">{badge}</a>
  ) : badge;

  return (
    <div className="flex items-center justify-end gap-2 mt-1 flex-wrap">
      {onQtyChange && (
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <span>Cantidad ({unit === 'm' ? 'metros' : 'unid.'})</span>
          <button type="button" aria-label="Restar" onClick={() => onQtyChange(q - 1)} className="w-5 h-5 flex items-center justify-center rounded border border-border hover:bg-muted"><Minus className="w-3 h-3" /></button>
          <input type="number" min={0} value={q} onChange={e => onQtyChange(Number(e.target.value))} className="w-10 h-5 text-center text-[11px] font-mono rounded border border-border bg-background text-foreground" />
          <button type="button" aria-label="Sumar" onClick={() => onQtyChange(q + 1)} className="w-5 h-5 flex items-center justify-center rounded border border-border hover:bg-muted"><Plus className="w-3 h-3" /></button>
        </div>
      )}
      {linked}
      {onQtyChange && q !== 1 && hasPrice && (
        <span className="text-[10px] font-mono font-bold text-foreground">= {formatArs(price! * q)}</span>
      )}
    </div>
  );
};

export default PriceTag;
