import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  Video,
  Mic,
  Palette,
  FolderHeart,
  Crown,
} from 'lucide-react';

export type NavigationTab =
  | 'dashboard'
  | 'create'
  | 'campaign'
  | 'reelready'
  | 'voiceover'
  | 'poster'
  | 'saved'
  | 'pricing';

interface NavigationProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  campaignTitle?: string;
  hasActiveCampaign: boolean;
  savedCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  campaignTitle,
  hasActiveCampaign,
  savedCount = 0,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Creative Gallery',
      icon: LayoutDashboard,
    },
    {
      id: 'campaign' as NavigationTab,
      label: 'Campaign Hub',
      icon: FileText,
      detail: hasActiveCampaign ? '8 Assets' : undefined,
    },
    {
      id: 'create' as NavigationTab,
      label: 'AI Generator',
      icon: Sparkles,
      detail: 'New Brief',
    },
    {
      id: 'reelready' as NavigationTab,
      label: 'ReelReady Studio',
      icon: Video,
      detail: 'Video',
    },
    {
      id: 'voiceover' as NavigationTab,
      label: 'Voiceover Studio',
      icon: Mic,
      detail: 'Audio',
    },
    {
      id: 'poster' as NavigationTab,
      label: 'Poster Designer',
      icon: Palette,
      detail: 'PNG',
    },
    {
      id: 'saved' as NavigationTab,
      label: 'Saved Projects',
      icon: FolderHeart,
      detail: savedCount > 0 ? `${savedCount}` : undefined,
    },
    {
      id: 'pricing' as NavigationTab,
      label: 'Pricing & Plans',
      icon: Crown,
      detail: '$9/mo Pro',
    },
  ];

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#080A15] border-r border-white/[0.08] p-4 shrink-0 justify-between select-none min-h-[calc(100vh-61px)]">
        <div className="space-y-4">
          {/* Active project indicator */}
          {hasActiveCampaign && campaignTitle && (
            <div className="p-3 rounded-xl bg-[#0F1225] border border-violet-500/25">
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="font-mono uppercase tracking-wider text-violet-400">
                  Active Campaign
                </span>
                <span className="text-[10px] text-emerald-400">Ready</span>
              </div>
              <p className="text-xs font-semibold text-white truncate" title={campaignTitle}>
                {campaignTitle}
              </p>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left whitespace-nowrap ${
                    isActive
                      ? 'bg-violet-600/20 text-white border border-violet-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-violet-300' : 'text-slate-400'
                      }`}
                    />
                    <span className={isActive ? 'font-bold' : ''}>{item.label}</span>
                  </div>
                  {item.detail && (
                    <span
                      className={`text-[10px] font-mono tabular-nums ${
                        isActive ? 'text-violet-300 font-semibold' : 'text-slate-500'
                      }`}
                    >
                      {item.detail}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Studio Info Card with Quick Link to Plans */}
        <div className="space-y-3 pt-4 border-t border-white/[0.08]">
          <div
            onClick={() => onSelectTab('pricing')}
            className="p-3 rounded-xl bg-[#0D0F20] hover:bg-[#121528] border border-white/[0.06] hover:border-violet-500/30 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white group-hover:text-violet-300 transition-colors flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Subscription Plans</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">Free Plan Active</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Pro Plan:</span>
              <span className="font-mono text-slate-200 font-medium">$9/mo (Demo Model)</span>
            </div>
            <div className="text-[10px] text-violet-400 font-semibold group-hover:underline block pt-0.5">
              Compare Features & Plans →
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile/Tablet Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070914]/95 backdrop-blur-xl border-t border-white/[0.08] px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-lg text-[10px] transition-all whitespace-nowrap ${
                isActive ? 'text-violet-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1.5 rounded-md transition-all ${
                  isActive ? 'bg-violet-600/30 text-white' : ''
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="truncate max-w-[52px]">
                {item.id === 'pricing' ? 'Pricing' : item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
