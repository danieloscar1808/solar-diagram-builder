import { Home, FolderOpen, FileText } from 'lucide-react';
import { useState } from 'react';

const tabs = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'proyectos', label: 'Proyectos', icon: FolderOpen },
  { id: 'documentacion', label: 'Documentacion', icon: FileText },
] as const;

interface BottomNavProps {
  active?: string;
  onNavigate?: (tab: string) => void;
}

const BottomNav = ({ active = 'inicio', onNavigate }: BottomNavProps) => {
  return (
    <nav className="flex items-center justify-around border-t border-border bg-card px-4 py-2">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate?.(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 text-xs transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-mono text-[10px] tracking-wide">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
