import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Share2,
  ExternalLink,
  MessageCircle,
  Hash,
  FileText,
  Target,
  Brain,
  Palette,
  Globe,
  Sliders,
  ChevronRight,
  HelpCircle,
  Volume2,
} from 'lucide-react';
import {
  CampaignData,
  AdvertisingStyle,
  StyleChangeComparison,
} from '../types/campaign';

interface CampaignOverviewProps {
  campaign: CampaignData;
  onUpdateCampaign: (updated: CampaignData) => void;
  onNavigateToStudio: (tab: 'reelready' | 'voiceover' | 'poster') => void;
}

const ADVERTISING_STYLES: AdvertisingStyle[] = [
  'Emotional',
  'Funny',
  'Premium',
  'Professional',
  'Festive',
  'Bold',
];

export const CampaignOverview: React.FC<CampaignOverviewProps> = ({
  campaign,
  onUpdateCampaign,
  onNavigateToStudio,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<'English' | 'Hindi'>(
    campaign.input.language === 'Hindi' ? 'Hindi' : 'English'
  );

  // Section regeneration state
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);
  const [regenInstructions, setRegenInstructions] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Style change state
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [isAdaptingStyle, setIsAdaptingStyle] = useState(false);
  const [lastComparison, setLastComparison] = useState<StyleChangeComparison | null>(
    campaign.styleHistory && campaign.styleHistory.length > 0
      ? campaign.styleHistory[campaign.styleHistory.length - 1]
      : null
  );

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Regenerate individual section
  const handleRegenerateSection = async (sectionName: string) => {
    setIsRegenerating(true);
    try {
      const response = await fetch('/api/campaign/regenerate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign,
          section: sectionName,
          instructions: regenInstructions,
          modelPreference: 'gemini-fast',
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || 'Failed to regenerate section');
      }

      const updated = { ...campaign };
      if (sectionName === 'hooks') {
        updated.hooks = data.data.hooks || data.data;
      } else if (sectionName === 'script') {
        updated.script = data.data.script || data.data;
      } else if (sectionName === 'caption') {
        updated.caption = data.data.caption || data.data;
      } else if (sectionName === 'hashtags') {
        updated.hashtags = data.data.hashtags || data.data;
      } else if (sectionName === 'whatsappMessage') {
        updated.whatsappMessage = data.data.whatsappMessage || data.data;
      } else if (sectionName === 'psychologicalRationale') {
        updated.psychologicalRationale = data.data.psychologicalRationale || data.data;
      }

      onUpdateCampaign(updated);
      setRegeneratingSection(null);
      setRegenInstructions('');
    } catch (err: any) {
      alert(err.message || 'Error regenerating section');
    } finally {
      setIsRegenerating(false);
    }
  };

  // Switch Style with Before/After
  const handleAdaptStyle = async (newStyle: AdvertisingStyle) => {
    if (newStyle === campaign.input.style) return;
    setIsAdaptingStyle(true);

    try {
      const res = await fetch('/api/campaign/adapt-style', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign, newStyle }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Style adaptation failed');
      }

      const comparison: StyleChangeComparison = {
        style: newStyle,
        changedAt: new Date().toISOString(),
        previousHook: campaign.hooks[0] || '',
        newHook: data.adaptedData.hooks?.[0] || '',
        previousScriptBeginning: campaign.script.beginning || '',
        newScriptBeginning: data.adaptedData.script?.beginning || '',
        rationale: data.comparison?.rationale,
      };

      const updated: CampaignData = {
        ...campaign,
        input: { ...campaign.input, style: newStyle },
        hooks: data.adaptedData.hooks || campaign.hooks,
        script: data.adaptedData.script || campaign.script,
        caption: data.adaptedData.caption || campaign.caption,
        whatsappMessage: data.adaptedData.whatsappMessage || campaign.whatsappMessage,
        styleHistory: [...(campaign.styleHistory || []), comparison],
      };

      setLastComparison(comparison);
      onUpdateCampaign(updated);
    } catch (e: any) {
      alert(e.message || 'Failed to adapt style');
    } finally {
      setIsAdaptingStyle(false);
    }
  };

  // Hindi text helper
  const isHindi = activeLang === 'Hindi' && campaign.hindiAdaptation;
  const currentHooks = isHindi ? campaign.hindiAdaptation!.hooks : campaign.hooks;
  const currentScript = isHindi ? campaign.hindiAdaptation!.script : campaign.script;
  const currentCaption = isHindi ? campaign.hindiAdaptation!.caption : campaign.caption;
  const currentWhatsapp = isHindi ? campaign.hindiAdaptation!.whatsappMessage : campaign.whatsappMessage;
  const currentRationale = isHindi ? campaign.hindiAdaptation!.rationale : campaign.psychologicalRationale;

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner & Control Bar */}
      <div className="rounded-3xl p-5 sm:p-6 bg-[#0E1122] border border-white/[0.08] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs text-slate-400 font-medium">
            <span className="text-violet-400 font-bold uppercase tracking-wider">
              {campaign.input.platform} Campaign
            </span>
            <span>·</span>
            <span>{campaign.input.style} Style</span>
            <span>·</span>
            <span className="font-mono tabular-nums">{campaign.input.duration}s Format</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{campaign.title}</h1>
        </div>

        {/* Action Controls: Language Toggle & Style Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#070915] p-1 rounded-xl border border-white/[0.08] text-xs">
            <button
              onClick={() => setActiveLang('English')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeLang === 'English'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveLang('Hindi')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                activeLang === 'Hindi'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>हिन्दी</span>
              {campaign.hindiAdaptation && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
          </div>

          {/* Style Switcher Button */}
          <button
            onClick={() => setShowStyleModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs font-semibold transition-all border border-white/[0.08] active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5 text-violet-400" />
            <span>Switch Style</span>
          </button>
        </div>
      </div>

      {/* Before & After Comparison Banner */}
      {lastComparison && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-950/40 via-indigo-950/30 to-[#0A0D1B] border border-violet-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-violet-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Creative Style Adapted to: <span className="text-white uppercase">{lastComparison.style}</span>
            </span>
            <button
              onClick={() => setLastComparison(null)}
              className="text-slate-500 hover:text-slate-300 text-[11px]"
            >
              Dismiss
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 rounded-xl bg-[#090C1A] border border-white/[0.06]">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                Previous Hook
              </span>
              <p className="text-slate-300 italic">"{lastComparison.previousHook}"</p>
            </div>
            <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/30">
              <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">
                Adapted {lastComparison.style} Hook
              </span>
              <p className="text-violet-200 font-medium">"{lastComparison.newHook}"</p>
            </div>
          </div>
        </div>
      )}

      {/* 8 Campaign Core Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Hooks, Script, Social Caption, WhatsApp */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: 3 Alternative Opening Hooks */}
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">01. Three High-Contrast Opening Hooks</h3>
              <button
                onClick={() => setRegeneratingSection('hooks')}
                className="text-xs text-slate-400 hover:text-violet-400 flex items-center gap-1 transition-colors"
                title="Regenerate alternative hooks"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Regenerate</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {currentHooks.map((hook, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#080A16] border border-white/[0.06] hover:border-violet-500/30 transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-xs font-mono font-bold text-violet-400 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                      "{hook}"
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(hook, `hook-${idx}`)}
                    className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white shrink-0 transition-colors"
                    title="Copy hook"
                  >
                    {copiedKey === `hook-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Persuasive Advertisement Script */}
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">02. Persuasive Commercial Script</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(currentScript.fullText, 'script-full')}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'script-full' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Script</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setRegeneratingSection('script')}
                  className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="p-3.5 rounded-xl bg-[#080A16] border border-white/[0.06]">
                <span className="text-[10px] uppercase font-mono text-violet-400 block mb-1">
                  Beginning & Problem Setup (0:00 - 0:08)
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentScript.beginning}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#080A16] border border-white/[0.06]">
                <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">
                  Product Proof & Key Benefits
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentScript.benefits}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#080A16] border border-white/[0.06]">
                <span className="text-[10px] uppercase font-mono text-rose-400 block mb-1">
                  Call to Action & Offer
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentScript.callToAction}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => onNavigateToStudio('voiceover')}
                className="text-xs text-violet-300 hover:text-violet-200 font-semibold flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Open in Voiceover Studio →</span>
              </button>
            </div>
          </div>

          {/* Section 3 & 4: Social Media Caption & Hashtags */}
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">03 & 04. Social Media Caption & Hashtags</h3>
              <button
                onClick={() =>
                  handleCopy(`${currentCaption}\n\n${campaign.hashtags.join(' ')}`, 'caption')
                }
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-white/[0.06] hover:bg-white/[0.12] px-2.5 py-1 rounded-lg"
              >
                {copiedKey === 'caption' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Post</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#080A16] border border-white/[0.06] space-y-3">
              <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                {currentCaption}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                {campaign.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono text-indigo-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: WhatsApp Promotional Message */}
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>05. WhatsApp Broadcast & Direct Chat Copy</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(currentWhatsapp, 'whatsapp')}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  {copiedKey === 'whatsapp' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy</span>
                </button>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentWhatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Test in WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#091116] border border-emerald-950/60 text-xs sm:text-sm text-emerald-100 font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
              {currentWhatsapp}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Poster Preview, Strategy & Rationales */}
        <div className="space-y-6">
          {/* Section 6: Product Poster Card with Image Thumbnail */}
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">06. Promotional Poster</h3>
              <button
                onClick={() => onNavigateToStudio('poster')}
                className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Open Designer →</span>
              </button>
            </div>

            {/* Poster Thumbnail / Preview Box */}
            <div
              onClick={() => onNavigateToStudio('poster')}
              className="p-3.5 rounded-xl bg-[#080A16] border border-white/[0.06] hover:border-violet-500/50 transition-all cursor-pointer group space-y-3"
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden relative bg-black">
                <img
                  src={campaign.poster.productImageUrl || campaign.imageUrl || '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg'}
                  alt={campaign.poster.headline}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    {campaign.poster.priceTag} · {campaign.poster.offerBadge}
                  </div>
                  <h4 className="font-black text-sm text-white uppercase leading-tight">
                    {campaign.poster.headline}
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Layout: {campaign.poster.layout}</span>
                <span className="text-violet-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Export PNG →
                </span>
              </div>
            </div>
          </div>

          {/* Section 7: Suggested Audience Profile & Objective */}
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-3">
            <h3 className="font-bold text-sm text-white">07. Target Persona & Objective</h3>

            <div className="p-3.5 rounded-xl bg-[#080A16] border border-white/[0.06] space-y-2.5 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">
                  Target Audience Persona
                </span>
                <p className="text-slate-200 mt-0.5 leading-relaxed">
                  {campaign.targetAudienceProfile || campaign.input.targetAudience}
                </p>
              </div>
              <div className="pt-2 border-t border-white/[0.06]">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">
                  Campaign Objective
                </span>
                <p className="text-emerald-400 font-semibold mt-0.5">
                  {campaign.campaignObjective}
                </p>
              </div>
            </div>
          </div>

          {/* Section 8: Psychological Rationale */}
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>08. Advertising Rationale</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-[#080A16] border border-white/[0.06] text-xs text-slate-300 leading-relaxed space-y-2">
              <p>{currentRationale}</p>
              <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-300 leading-relaxed">
                Strategic note: Leverages authentic product attributes and audience resonance without unsupported claims or fabricated metrics.
              </div>
            </div>
          </div>

          {/* Quick link to ReelReady Studio */}
          <div className="p-4.5 rounded-2xl bg-gradient-to-br from-violet-900/30 via-indigo-900/20 to-[#0A0D1B] border border-violet-500/30 space-y-2 text-xs">
            <div className="font-bold text-white flex items-center justify-between">
              <span>Ready for Short Video?</span>
              <span className="text-violet-300 font-mono text-[10px]">
                {campaign.storyboard.scenes.length} Scenes Directed
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Open the ReelReady Video Ad Studio to review timestamps, visual shot instructions, on-screen supers, and audio cues.
            </p>
            <button
              onClick={() => onNavigateToStudio('reelready')}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Launch ReelReady Studio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Style Switcher Modal */}
      {showStyleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-3xl p-6 max-w-md w-full bg-[#0D0F22] border border-violet-500/30 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-violet-400" />
                <span>Switch Creative Ad Style</span>
              </h3>
              <button
                onClick={() => setShowStyleModal(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Transform the personality of your campaign without losing your product data. We will generate a before-and-after comparison.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {ADVERTISING_STYLES.map((st) => (
                <button
                  key={st}
                  disabled={isAdaptingStyle}
                  onClick={() => {
                    handleAdaptStyle(st);
                    setShowStyleModal(false);
                  }}
                  className={`p-3 rounded-xl text-left border text-xs transition-all ${
                    campaign.input.style === st
                      ? 'bg-violet-600/30 border-violet-500 text-white font-bold'
                      : 'bg-[#080A16] border-white/[0.06] hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="font-semibold">{st}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {st === 'Emotional'
                      ? 'Nostalgic & warm'
                      : st === 'Funny'
                      ? 'Lighthearted wit'
                      : st === 'Premium'
                      ? 'Minimalist luxury'
                      : st === 'Professional'
                      ? 'Direct & factual'
                      : st === 'Festive'
                      ? 'Celebration & joy'
                      : 'Urgent & punchy'}
                  </div>
                </button>
              ))}
            </div>

            {isAdaptingStyle && (
              <div className="text-center text-xs text-violet-300 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Adapting tone and generating comparison...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Single Section Regeneration Modal */}
      {regeneratingSection && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-3xl p-6 max-w-md w-full bg-[#0D0F22] border border-violet-500/30 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-violet-400" />
                <span>Regenerate "{regeneratingSection}"</span>
              </h3>
              <button
                onClick={() => setRegeneratingSection(null)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Specify any optional creative directions or leave blank for fresh AI creativity:
            </p>
            <input
              type="text"
              placeholder="e.g. Make it shorter, focus more on the free shipping offer"
              value={regenInstructions}
              onChange={(e) => setRegenInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-violet-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRegeneratingSection(null)}
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs"
              >
                Cancel
              </button>
              <button
                disabled={isRegenerating}
                onClick={() => handleRegenerateSection(regeneratingSection)}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                {isRegenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Regenerating...</span>
                  </>
                ) : (
                  <span>Regenerate Section</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
