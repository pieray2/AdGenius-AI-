import React from 'react';
import {
  Sparkles,
  Cpu,
  PlusCircle,
  FolderOpen,
} from 'lucide-react';
import { CampaignData } from '../types/campaign';

interface HeaderProps {
  activeCampaign: CampaignData | null;
  onNewCampaign: () => void;
  onSelectCampaign: (id: string) => void;
  savedCampaigns: CampaignData[];
}

export const Header: React.FC<HeaderProps> = ({
  activeCampaign,
  onNewCampaign,
  onSelectCampaign,
  savedCampaigns,
}) => {
  const modelMeta = activeCampaign?.modelMetadata;

  return (
    <header className="sticky top-0 z-30 bg-[#070814]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8 select-none">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-600/30">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-black tracking-tight text-white whitespace-nowrap">
          AdGenius <span className="text-violet-400">AI</span>
        </span>
      </div>

      {/* Zone 2: Contextual Active Project & Model Transparency */}
      <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-400">
        {savedCampaigns.length > 0 && (
          <div className="flex items-center gap-2">
            <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={activeCampaign?.id || ''}
              onChange={(e) => onSelectCampaign(e.target.value)}
              className="bg-[#0D0F22] text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-white/[0.08] focus:outline-none focus:border-violet-500 max-w-[220px] truncate shadow-inner cursor-pointer"
            >
              {savedCampaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {modelMeta && (
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <span className="text-slate-600">·</span>
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
            <span>
              {modelMeta.isOpenWeight
                ? 'Gemma 4 26B (Google API)'
                : modelMeta.modelUsed.includes('Curated')
                ? 'Curated Pro Studio'
                : 'Gemini 3.1 Flash Lite'}
            </span>
          </div>
        )}
      </div>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onNewCampaign}
          className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg shadow-violet-600/25 transition-all active:scale-95 whitespace-nowrap shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Campaign</span>
        </button>
      </div>
    </header>
  );
};
