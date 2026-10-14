import React, { useState } from 'react';
import {
  Sparkles,
  PlusCircle,
  Video,
  Mic,
  Palette,
  ArrowRight,
  Zap,
  Clock,
  Layers,
  ChevronRight,
  Copy,
  ExternalLink,
  Check,
  Filter,
  Eye,
  SlidersHorizontal,
  X,
  Share2,
  Crown,
} from 'lucide-react';
import { CampaignData } from '../types/campaign';
import { NavigationTab } from './Navigation';
import { StorageService } from '../lib/storage';

interface DashboardViewProps {
  activeCampaign: CampaignData | null;
  savedCampaigns: CampaignData[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectCampaign: (id: string) => void;
  onSelectDemo: (demoKey: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  activeCampaign,
  savedCampaigns,
  onNavigate,
  onSelectCampaign,
  onSelectDemo,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [previewCampaign, setPreviewCampaign] = useState<CampaignData | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Filter campaigns
  const filteredCampaigns = savedCampaigns.filter((camp) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'my') return !camp.isDemo;
    if (selectedFilter === 'direct') return camp.categoryBadge === 'DIRECT RESPONSE';
    if (selectedFilter === 'brand') return camp.categoryBadge === 'BRAND';
    if (selectedFilter === 'festive') return camp.categoryBadge === 'FESTIVE PROMO' || camp.categoryBadge === 'PRODUCT HERO';
    return true;
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDuplicate = (camp: CampaignData, e: React.MouseEvent) => {
    e.stopPropagation();
    const copy = StorageService.duplicateCampaign(camp);
    onSelectCampaign(copy.id);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* 1. HERO SECTION: "Turn Your Products Into Campaigns People Remember." */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F1123] via-[#0C0E1E] to-[#070814] border border-violet-500/20 p-6 sm:p-10 shadow-2xl">
        {/* Deep Violet and Electric Magenta Atmospheric Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline and Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Commercial Creative Studio</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">Multi-Channel Blueprints</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] text-balance">
              Turn Your Products Into Campaigns{' '}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-amber-200 bg-clip-text text-transparent">
                People Remember.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl text-balance">
              Generate structured direct-response hooks, cinematic video storyboards, high-resolution promotional posters, and natural voiceover scripts for your business.
            </p>

            {/* Real Application Metric Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="font-mono tabular-nums font-bold text-white text-sm">
                  {savedCampaigns.length}
                </span>
                <span>Saved Projects</span>
              </div>
              <span className="text-slate-700">/</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono tabular-nums font-bold text-violet-300 text-sm">8</span>
                <span>Creative Deliverables</span>
              </div>
              <span className="text-slate-700">/</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono tabular-nums font-bold text-emerald-400 text-sm">4</span>
                <span>Target Channels</span>
              </div>
              <span className="text-slate-700">/</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-amber-300 text-xs">EN · HI</span>
                <span>Bilingual Copy</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onNavigate('create')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30 flex items-center gap-2 active:scale-95 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Campaign</span>
              </button>

              {activeCampaign && (
                <button
                  onClick={() => onNavigate('campaign')}
                  className="px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 font-semibold text-sm border border-white/10 flex items-center gap-2 transition-all"
                >
                  <span>Open Active Workspace</span>
                  <ArrowRight className="w-4 h-4 text-violet-400" />
                </button>
              )}

              <button
                onClick={() => onNavigate('pricing')}
                className="px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white font-medium text-sm border border-white/[0.08] flex items-center gap-2 transition-all"
              >
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Plans & Pricing</span>
              </button>
            </div>
          </div>

          {/* Right Column: Active Campaign Highlight Card */}
          <div className="lg:col-span-5">
            {activeCampaign ? (
              <div className="relative rounded-2xl overflow-hidden bg-[#121528] border border-violet-500/30 shadow-2xl group">
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
                  <img
                    src={activeCampaign.imageUrl || activeCampaign.poster?.productImageUrl || '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg'}
                    alt={activeCampaign.input.productName}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E1F] via-[#0C0E1F]/50 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-black/70 text-violet-300 border border-violet-500/30 uppercase backdrop-blur-md">
                      Current Focus
                    </span>
                    <span className="text-[10px] font-medium text-slate-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-md">
                      {activeCampaign.input.platform} · {activeCampaign.input.duration}s
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 space-y-1">
                    <div className="text-xs font-semibold uppercase text-emerald-400">
                      {activeCampaign.poster?.priceTag || activeCampaign.input.price}
                    </div>
                    <h3 className="font-bold text-white text-base leading-tight truncate">
                      {activeCampaign.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-[#0F1224] border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-400 truncate max-w-[200px]">
                    {activeCampaign.hooks[0] || activeCampaign.input.description}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onNavigate('reelready')}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 text-xs font-medium transition-colors"
                      title="ReelReady Storyboard"
                    >
                      Storyboard
                    </button>
                    <button
                      onClick={() => onNavigate('poster')}
                      className="px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
                      title="Poster Designer"
                    >
                      Poster
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl p-6 bg-[#0E1122] border border-dashed border-violet-500/30 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-violet-600/20 text-violet-300 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">No Active Campaign</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Select a curated portfolio project below or create your own custom ad campaign.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('create')}
                  className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 transition-colors"
                >
                  Start New Brief
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. VISUAL CAMPAIGN GALLERY */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Agency Creative Gallery
              </h2>
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                ({filteredCampaigns.length})
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Production-ready campaigns with cinematic product photography, custom typography, and multi-scene storyboards.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional buttons as per Constitution) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0A0D1B] border border-white/[0.08] rounded-xl overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Creatives' },
              { id: 'direct', label: 'Direct Response' },
              { id: 'brand', label: 'Brand Story' },
              { id: 'festive', label: 'Festive & Tech' },
              { id: 'my', label: 'My Custom' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedFilter === f.id
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 or 4 Column Responsive Ad Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {filteredCampaigns.map((camp) => {
            const isHovered = hoveredCardId === camp.id;
            const categoryBadge = camp.categoryBadge || 'DIRECT RESPONSE';
            const imageUrl =
              camp.imageUrl ||
              camp.poster?.productImageUrl ||
              '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg';

            return (
              <div
                key={camp.id}
                onMouseEnter={() => setHoveredCardId(camp.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="group relative rounded-2xl overflow-hidden bg-[#0D0F1E] border border-white/[0.08] hover:border-violet-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Image Container with 3:4 Aspect Ratio */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0A0C16]">
                  <img
                    src={imageUrl}
                    alt={camp.input.productName}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Gradient Scrims for Perfect Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A16] via-[#080A16]/40 to-black/60 pointer-events-none" />

                  {/* Top Bar on Image: Category Badge and Demo Tag */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-md border ${
                        categoryBadge === 'BRAND'
                          ? 'bg-rose-950/70 text-rose-300 border-rose-500/40'
                          : categoryBadge === 'FESTIVE PROMO'
                          ? 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                          : categoryBadge === 'PRODUCT HERO'
                          ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                          : 'bg-violet-950/70 text-violet-300 border-violet-500/40'
                      }`}
                    >
                      {categoryBadge}
                    </span>

                    {camp.isDemo ? (
                      <span className="text-[10px] font-semibold text-slate-400 bg-black/70 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-md">
                        Demo
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40 backdrop-blur-md">
                        Custom
                      </span>
                    )}
                  </div>

                  {/* Middle Content Overlay: Headline & Core Pitch */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                      <span className="font-mono text-emerald-400 font-bold">
                        {camp.poster?.priceTag || camp.input.price}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {camp.input.platform} · {camp.input.duration}s
                      </span>
                    </div>

                    <h3 className="font-black text-xl text-white tracking-tight leading-tight uppercase drop-shadow-md">
                      {camp.poster?.headline || camp.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 font-medium drop-shadow">
                      {camp.poster?.subheadline || camp.input.description}
                    </p>

                    {/* Primary Call to Action Button */}
                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={() => {
                          onSelectCampaign(camp.id);
                          onNavigate('campaign');
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-violet-300 transition-colors uppercase group-hover:translate-x-1 duration-200"
                      >
                        <span>{camp.poster?.callToAction || 'Open Campaign'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
                      </button>

                      <button
                        onClick={() => setPreviewCampaign(camp)}
                        className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 transition-colors"
                        title="Quick Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Studio Action Bar */}
                <div className="p-3 bg-[#0B0D1B] border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
                    <Video className="w-3 h-3 text-violet-400" />
                    <span>{camp.storyboard.scenes.length} Scenes</span>
                    <span className="text-slate-600">·</span>
                    <span>{camp.input.style}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        onSelectCampaign(camp.id);
                        onNavigate('reelready');
                      }}
                      className="px-2 py-1 rounded-md bg-white/[0.06] hover:bg-violet-600 text-slate-200 hover:text-white text-[11px] font-medium transition-colors"
                      title="ReelReady Storyboard"
                    >
                      Storyboard
                    </button>
                    <button
                      onClick={() => {
                        onSelectCampaign(camp.id);
                        onNavigate('poster');
                      }}
                      className="px-2 py-1 rounded-md bg-white/[0.06] hover:bg-amber-600 text-slate-200 hover:text-white text-[11px] font-medium transition-colors"
                      title="Poster Designer"
                    >
                      Poster
                    </button>
                    <button
                      onClick={(e) => handleDuplicate(camp, e)}
                      className="px-2 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white text-[11px] font-medium transition-colors"
                      title="Duplicate as new editable campaign"
                    >
                      Duplicate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CREATIVE WORKSPACE MODULES */}
      <section className="space-y-4 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight">
            Creative Production Engines
          </h2>
          <span className="text-xs text-slate-500">Autonomous Generation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('create')}
            className="rounded-2xl p-5 bg-[#0C0E1E] border border-white/[0.08] hover:border-violet-500/40 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-violet-300 transition-colors">
                AI Campaign Generator
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hooks, scripts, social captions, and WhatsApp broadcasts in natural English and Hindi.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('reelready')}
            className="rounded-2xl p-5 bg-[#0C0E1E] border border-white/[0.08] hover:border-rose-500/40 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors">
                ReelReady Video Studio
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Shot-by-shot timestamps, camera directions, on-screen text, and pacing for Reels & Shorts.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('voiceover')}
            className="rounded-2xl p-5 bg-[#0C0E1E] border border-white/[0.08] hover:border-indigo-500/40 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                AI Voiceover Studio
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                ElevenLabs TTS integration with secure server secrets and live Google Gemini TTS audio.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('poster')}
            className="rounded-2xl p-5 bg-[#0C0E1E] border border-white/[0.08] hover:border-amber-500/40 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                Poster Designer
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Editable headings, price tags, brand colors, and functional 2x retina PNG download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK PREVIEW MODAL */}
      {previewCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0D0F22] border border-violet-500/30 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
                  Campaign Quick View
                </span>
                <h3 className="font-bold text-lg text-white">{previewCampaign.title}</h3>
              </div>
              <button
                onClick={() => setPreviewCampaign(null)}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden bg-slate-950 aspect-[3/4]">
                  <img
                    src={previewCampaign.imageUrl || previewCampaign.poster?.productImageUrl || '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg'}
                    alt={previewCampaign.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Opening Hook</span>
                    <p className="font-medium text-white text-sm mt-0.5">
                      "{previewCampaign.hooks[0]}"
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Product Description</span>
                    <p className="text-slate-300 mt-0.5 leading-relaxed">
                      {previewCampaign.input.description}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Price & Offer</span>
                    <p className="font-bold text-emerald-400 text-sm mt-0.5">
                      {previewCampaign.input.price} · {previewCampaign.input.offer}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Target Audience</span>
                    <p className="text-slate-300 mt-0.5">{previewCampaign.input.targetAudience}</p>
                  </div>
                </div>
              </div>

              {/* Script Excerpt */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-1.5">
                <span className="text-slate-400 font-mono text-[10px] uppercase">
                  Commercial Script
                </span>
                <p className="text-slate-200 leading-relaxed italic">
                  "{previewCampaign.script.fullText}"
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0A0C1A] border-t border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => {
                  handleCopy(previewCampaign.script.fullText, 'modal-script');
                }}
                className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs font-medium flex items-center gap-1.5"
              >
                {copiedKey === 'modal-script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'modal-script' ? 'Copied Script' : 'Copy Script'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectCampaign(previewCampaign.id);
                    setPreviewCampaign(null);
                    onNavigate('campaign');
                  }}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all"
                >
                  Open Full Campaign Hub
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
