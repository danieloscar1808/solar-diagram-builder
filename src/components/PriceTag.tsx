import { ExternalLink } from 'lucide-react';
import { formatArs } from '@/types/solar';

interface PriceTagProps {
  price?: number;
  url?: string;
  label?: string;
}

const PriceTag = ({ price, url, label = 'Precio Enertik' }: PriceTagProps) => {
  const hasPrice = typeof price === 'number' && !isNaN(price);
  const content = (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
        hasPrice
          ? 'bg-success/15 text-success border-success/40'
          : 'bg-muted text-muted-foreground border-border'
      }`}
      title={`${label}: ${formatArs(price)}`}
    >
      {formatArs(price)}
      {url && <ExternalLink className="w-2.5 h-2.5" />}
    </span>
  );

  if (!url) return <div className="flex justify-end mt-1">{content}</div>;

  return (
    <div className="flex justify-end mt-1">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    </div>
  );
};

export default PriceTag;
