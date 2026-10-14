import React, { useState } from 'react';
import {
  Video,
  Clock,
  Music,
  Zap,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Film,
  Camera,
  Layers,
  ArrowRight,
  Info,
  Tv,
} from 'lucide-react';
import {
  CampaignData,
  CreativeApproach,
  VideoDuration,
  ReelReadyStoryboard,
} from '../types/campaign';

interface ReelReadyViewProps {
  campaign: CampaignData;
  onUpdateCampaign: (updated: CampaignData) => void;
  onNavigateToVoiceover: () => void;
}

const CREATIVE_APPROACHES: Array<{
  id: CreativeApproach;
  title: string;
  desc: string;
  badge: string;
}> = [
  {
    id: 'Product Showcase',
    title: 'Product Showcase',
    desc: 'Appetizing macro shots, texture close-ups, and hero product reveals.',
    badge: 'Macro & Form',
  },
  {
    id: 'Problem and Solution',
    title: 'Problem & Solution',
    desc: 'High-contrast relatable friction in first 3s followed by instant relief.',
    badge: 'Direct Response',
  },
  {
    id: 'Storytelling',
    title: 'Storytelling & Nostalgia',
    desc: 'Human narrative evoking warm memories, heritage, or daily routines.',
    badge: 'Emotional Hook',
  },
  {
    id: 'Festive Promotion',
    title: 'Festive Celebration',
    desc: 'Upbeat celebratory energy, gifting excitement, and limited deals.',
    badge: 'Urgency & Gift',
  },
];

export const ReelReadyView: React.FC<ReelReadyViewProps> = ({
  campaign,
  onUpdateCampaign,
  onNavigateToVoiceover,
}) => {
  const [selectedApproach, setSelectedApproach] = useState<CreativeApproach>(
    campaign.storyboard.approach || 'Product Showcase'
  );
  const [selectedDuration, setSelectedDuration] = useState<VideoDuration>(
    (campaign.storyboard.durationSeconds as VideoDuration) || campaign.input.duration || 30
  );
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const storyboard = campaign.storyboard;

  const handleApproachChange = async (approach: CreativeApproach) => {
    setSelectedApproach(approach);
    setIsRegenerating(true);
    try {
      const res = await fetch('/api/campaign/storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign,
          approach,
          duration: selectedDuration,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update storyboard');
      }

      const updated = {
        ...campaign,
        storyboard: data.storyboard,
      };
      onUpdateCampaign(updated);
    } catch (e: any) {
      alert(e.message || 'Error updating storyboard');
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleDurationChange = async (duration: VideoDuration) => {
    setSelectedDuration(duration);
    setIsRegenerating(true);
    try {
      const res = await fetch('/api/campaign/storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign,
          approach: selectedApproach,
          duration,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update storyboard');
      }

      const updated = {
        ...campaign,
        storyboard: data.storyboard,
      };
      onUpdateCampaign(updated);
    } catch (e: any) {
      alert(e.message || 'Error updating storyboard');
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleCopyBrief = () => {
    let brief = `# REELREADY VIDEO PRODUCTION BRIEF: ${campaign.title}\n`;
    brief += `Format: ${selectedDuration}s Short / Reel (${selectedApproach})\n`;
    brief += `Music Mood: ${storyboard.bgMusicMood}\n`;
    brief += `Pacing: ${storyboard.overallPacing}\n`;
    brief += `Opening Hook (First 3s): ${storyboard.hookSummary}\n`;
    brief += `Final Call to Action: ${storyboard.finalCta}\n\n`;
    brief += `## SCENE BY SCENE STORYBOARD\n\n`;

    storyboard.scenes.forEach((scene) => {
      brief += `### Scene ${scene.sceneNumber} [${scene.timestamp}]\n`;
      brief += `- Visual Direction: ${scene.visualDirection}\n`;
      brief += `- On-Screen Text: "${scene.onScreenText}"\n`;
      brief += `- Voiceover: "${scene.voiceover}"\n`;
      brief += `- Transition: ${scene.transition}\n\n`;
    });

    navigator.clipboard.writeText(brief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="rounded-3xl p-5 sm:p-6 bg-[#0E1122] border border-white/[0.08] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-xs">
              <Video className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              ReelReady Video Studio
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Short-Video Storyboard & Production Blueprint
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Practical shot-by-shot timeline for Instagram Reels, YouTube Shorts, and vertical video ads.
          </p>
        </div>

        {/* Copy Brief Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyBrief}
            className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 border border-white/[0.08]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Brief Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Video Brief</span>
              </>
            )}
          </button>
          <button
            onClick={onNavigateToVoiceover}
            className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-violet-600/30"
          >
            <span>Record Voiceover →</span>
          </button>
        </div>
      </div>

      {/* Video Ad Creative Hero Preview */}
      <div className="relative overflow-hidden rounded-3xl bg-[#090C19] border border-white/[0.08] p-5 flex flex-col md:flex-row items-center gap-5 shadow-2xl">
        <div className="relative w-full md:w-48 h-48 md:h-56 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg bg-black">
          <img
            src={campaign.imageUrl || campaign.poster?.productImageUrl || '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg'}
            alt={campaign.input.productName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[10px] font-mono text-white bg-black/70 px-2 py-0.5 rounded backdrop-blur-md">
              9:16 REEL
            </span>
          </div>
          <div className="absolute bottom-2.5 left-2.5 right-2.5">
            <span className="text-[11px] font-black text-white uppercase line-clamp-1">
              {campaign.poster?.headline || campaign.input.productName}
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="text-rose-400 font-bold uppercase">{selectedApproach}</span>
            <span>·</span>
            <span className="font-mono tabular-nums">{selectedDuration}s Mobile Format</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-white">
            "{storyboard.hookSummary || campaign.hooks?.[0]}"
          </h2>
          <p className="text-slate-300 text-xs leading-relaxed">
            Pacing: {storyboard.overallPacing} · Audio: {storyboard.bgMusicMood}
          </p>
          <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-slate-300 font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-[#0E1122] border border-white/[0.06]">
              {storyboard.scenes.length} Camera Setups
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#0E1122] border border-white/[0.06]">
              Mobile Safe-Zone Text
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#0E1122] border border-white/[0.06]">
              Synchronized Audio Cues
            </span>
          </div>
        </div>
      </div>

      {/* Approach & Duration Selector */}
      <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Creative Approach & Duration
          </span>
          {/* Duration toggles */}
          <div className="flex items-center gap-1 bg-[#080A16] p-1 rounded-xl border border-white/[0.08] text-xs self-start sm:self-auto">
            {([15, 30, 60] as VideoDuration[]).map((dur) => (
              <button
                key={dur}
                disabled={isRegenerating}
                onClick={() => handleDurationChange(dur)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  selectedDuration === dur
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {dur}s
              </button>
            ))}
          </div>
        </div>

        {/* 4 Creative Approaches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {CREATIVE_APPROACHES.map((app) => (
            <button
              key={app.id}
              disabled={isRegenerating}
              onClick={() => handleApproachChange(app.id)}
              className={`p-3.5 rounded-xl text-left border transition-all ${
                selectedApproach === app.id
                  ? 'bg-rose-950/40 border-rose-500/60 ring-1 ring-rose-500/40 text-white'
                  : 'bg-[#080A16] border-white/[0.06] hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-200">{app.title}</span>
                <span className="text-[10px] font-mono text-rose-400">{app.badge}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">{app.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Music & Pacing Meta Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl p-4 bg-[#0D0F20] border border-white/[0.08] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center shrink-0">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">
              Audio / Music Mood
            </span>
            <p className="text-xs font-semibold text-slate-200 mt-0.5">
              {storyboard.bgMusicMood || 'Upbeat Commercial Pop'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-4 bg-[#0D0F20] border border-white/[0.08] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">
              Pacing & Flow
            </span>
            <p className="text-xs font-semibold text-slate-200 mt-0.5">
              {storyboard.overallPacing || 'High Energy Opening'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-4 bg-[#0D0F20] border border-white/[0.08] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">
              Retention Hook (First 3s)
            </span>
            <p className="text-xs font-semibold text-emerald-300 mt-0.5 truncate">
              {storyboard.hookSummary || 'Curiosity Hook'}
            </p>
          </div>
        </div>
      </div>

      {/* Scene-by-Scene Timeline & Storyboard Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Film className="w-4 h-4 text-rose-400" />
              <span>Scene-By-Scene Storyboard</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">
              ({storyboard.scenes.length} Scenes)
            </span>
          </div>

          {isRegenerating && (
            <span className="text-xs text-rose-400 flex items-center gap-1.5 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Regenerating shot plan...</span>
            </span>
          )}
        </div>

        <div className="space-y-4">
          {storyboard.scenes.map((scene, idx) => (
            <div
              key={scene.sceneNumber || idx}
              className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] hover:border-slate-700 transition-all space-y-4 shadow-xl"
            >
              {/* Scene Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-rose-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md shadow-rose-600/30">
                    {scene.sceneNumber || idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-200">
                    Scene 0{scene.sceneNumber || idx + 1}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3 h-3 text-rose-400" />
                    <span>{scene.timestamp}</span>
                  </span>
                  <span>·</span>
                  <span>Transition: {scene.transition}</span>
                </div>
              </div>

              {/* Scene Grid: Visual vs Voiceover & Text */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Visual Directions */}
                <div className="p-3.5 rounded-xl bg-[#080A16] border border-white/[0.06] space-y-2">
                  <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    Camera & Visual Direction
                  </span>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {scene.visualDirection}
                  </p>
                </div>

                {/* Voiceover & On-Screen Text */}
                <div className="space-y-2.5">
                  {/* On-Screen Text Overlay */}
                  <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-500/20">
                    <span className="text-[10px] uppercase font-mono text-violet-400 block mb-1">
                      On-Screen Text Overlay (Mobile Safe-Zone)
                    </span>
                    <p className="text-white font-bold text-xs bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/10">
                      "{scene.onScreenText}"
                    </p>
                  </div>

                  {/* Synchronized Voiceover Line */}
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                    <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">
                      Synchronized Voiceover Line
                    </span>
                    <p className="text-emerald-200 font-medium leading-relaxed italic">
                      "{scene.voiceover}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA Visual instruction */}
        {storyboard.finalCta && (
          <div className="p-4.5 rounded-2xl bg-gradient-to-r from-rose-950/40 to-[#0A0D1B] border border-rose-500/30 text-xs flex items-center justify-between gap-3 shadow-xl">
            <div>
              <span className="text-[10px] uppercase font-mono text-rose-400 block">
                Final Call To Action Closing
              </span>
              <p className="text-slate-200 font-semibold mt-0.5">{storyboard.finalCta}</p>
            </div>
            <button
              onClick={onNavigateToVoiceover}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0 transition-colors shadow-sm"
            >
              Voiceover Sync →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
