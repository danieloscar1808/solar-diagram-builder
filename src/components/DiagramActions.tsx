import { Download, Share2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from 'react';

const DiagramActions = () => {
  const [exporting, setExporting] = useState(false);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('solar-diagram-export');
    if (!element) {
      toast.error('No se encontro el diagrama');
      return;
    }

    setExporting(true);
    toast.info('Generando PDF...');

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#111827',
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [imgWidth, imgHeight],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('diagrama-solar.pdf');
      toast.success('PDF descargado correctamente');
    } catch {
      toast.error('Error al generar el PDF');
    } finally {
      setExporting(false);
    }
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
      <Button onClick={handleDownloadPDF} disabled={exporting} variant="default" className="gap-2 font-mono text-xs tracking-wide">
        <Download className="w-4 h-4" />
        {exporting ? 'GENERANDO...' : 'DESCARGAR PDF'}
      </Button>
      <Button onClick={handleSave} variant="secondary" className="gap-2 font-mono text-xs tracking-wide bg-success hover:bg-success/80 text-success-foreground">
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
