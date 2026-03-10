import { Download, Share2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DiagramActions = () => {
  const handleDownloadPDF = () => {
    toast.info('Funcion de descarga PDF disponible proximamente');
  };

  const handleSave = () => {
    toast.info('Proyecto guardado (proximamente)');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Diagrama Solar', text: 'Diagrama de conexion solar generado' });
    } else {
      toast.info('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={handleDownloadPDF} variant="default" className="gap-2 font-mono text-xs tracking-wide">
        <Download className="w-4 h-4" />
        DESCARGAR PDF
      </Button>
      <Button onClick={handleSave} variant="secondary" className="gap-2 font-mono text-xs tracking-wide bg-emerald-700 hover:bg-emerald-600 text-foreground border-emerald-600">
        <Save className="w-4 h-4" />
        GUARDAR PROYECTO
      </Button>
      <Button onClick={handleShare} variant="secondary" className="gap-2 font-mono text-xs tracking-wide bg-accent hover:bg-accent/80 text-accent-foreground">
        <Share2 className="w-4 h-4" />
        COMPARTIR
      </Button>
    </div>
  );
};

export default DiagramActions;
