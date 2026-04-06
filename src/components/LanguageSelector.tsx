import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  current: Language;
  onSelect: (lang: Language) => void;
}

export function LanguageSelector({ current, onSelect }: LanguageSelectorProps) {
  return (
    <div className="fixed top-6 right-6 flex gap-2 z-50">
      {(['zh', 'en'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => onSelect(lang)}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-all border ${
            current === lang
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
              : 'bg-gray-900 text-gray-500 border-gray-800 hover:border-gray-700'
          }`}
        >
          {lang === 'zh' ? '中文' : 'EN'}
        </button>
      ))}
    </div>
  );
}
