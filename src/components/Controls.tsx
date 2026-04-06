import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface ControlsProps {
  movementLabel: string;
  pauseLabel: string;
  spaceLabel: string;
  onMobileInput: (key: string) => void;
}

export function Controls({ movementLabel, pauseLabel, spaceLabel, onMobileInput }: ControlsProps) {
  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-8 text-gray-500">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600">{movementLabel}</p>
          <div className="flex gap-1">
            {['W', 'A', 'S', 'D'].map(k => <kbd key={k} className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-xs">{k}</kbd>)}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600">{pauseLabel}</p>
          <kbd className="px-4 py-1 bg-gray-900 border border-gray-800 rounded text-xs block w-fit">{spaceLabel}</kbd>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
        <div />
        <MobileBtn icon={<ChevronUp />} onClick={() => onMobileInput('ArrowUp')} />
        <div />
        <MobileBtn icon={<ChevronLeft />} onClick={() => onMobileInput('ArrowLeft')} />
        <MobileBtn icon={<ChevronDown />} onClick={() => onMobileInput('ArrowDown')} />
        <MobileBtn icon={<ChevronRight />} onClick={() => onMobileInput('ArrowRight')} />
      </div>
    </>
  );
}

function MobileBtn({ icon, onClick }: { icon: React.ReactNode, onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-14 h-14 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center active:bg-emerald-500 active:text-gray-950 transition-colors">
      {icon}
    </button>
  );
}
