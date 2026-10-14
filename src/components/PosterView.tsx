import React, { useState, useEffect, useRef } from 'react';
import {
  Palette,
  Download,
  Save,
  Check,
  Sparkles,
  Layers,
  Ratio,
  Maximize2,
  RefreshCw,
  Info,
  Image as ImageIcon,
} from 'lucide-react';
import {
  CampaignData,
  PosterConfig,
  PosterLayout,
  PosterAspectRatio,
} from '../types/campaign';
import {
  renderPosterToCanvas,
  exportCanvasAsPng,
  getPosterDimensions,
} from '../lib/posterCanvas';

interface PosterViewProps {
  campaign: CampaignData;
  onUpdateCampaign: (updated: CampaignData) => void;
}

const COLOR_PRESETS = [
  { label: 'Violet', hex: '#8B5CF6' },
  { label: 'Rose Coral', hex: '#F43F5E' },
  { label: 'Amber Gold', hex: '#F59E0B' },
  { label: 'Emerald', hex: '#10B981' },
  { label: 'Cyber Cyan', hex: '#06B6D4' },
  { label: 'Royal Indigo', hex: '#6366F1' },
];

const CURATED_ASSET_IMAGES = [
  { label: 'Sneaker', url: '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg' },
  { label: 'Skincare', url: '/src/assets/images/ad_luxury_skincare_serum_1791966612984.jpg' },
  { label: 'Headphones', url: '/src/assets/images/ad_audiophile_headphones_1791966613303.jpg' },
  { label: 'Coffee', url: '/src/assets/images/ad_artisan_coffee_roast_1791966658045.jpg' },
  { label: 'Tea', url: '/src/assets/images/ad_artisan_saffron_tea_1791966613436.jpg' },
  { label: 'Lamp', url: '/src/assets/images/ad_minimalist_desk_lamp_1791966613744.jpg' },
];

const LAYOUTS: Array<{ id: PosterLayout; label: string; desc: string }> = [
  { id: 'bold_split', label: 'Bold Split', desc: 'Modern high-contrast street angled beam' },
  { id: 'minimal_glow', label: 'Minimal Glow', desc: 'Ultra-clean dark tech with ambient aura' },
  { id: 'festive_royal', label: 'Festive Royal', desc: 'Ornate gold accents & celebratory warmth' },
  { id: 'luxury_dark', label: 'Luxury Dark', desc: 'Deep emerald & violet executive typography' },
  { id: 'vibrant_retail', label: 'Vibrant Retail', desc: 'High energy commercial discount focus' },
];

export const PosterView: React.FC<PosterViewProps> = ({ campaign, onUpdateCampaign }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [posterConfig, setPosterConfig] = useState<PosterConfig>({
    headline: campaign.poster?.headline || campaign.input.productName,
    subheadline: campaign.poster?.subheadline || campaign.input.description.slice(0, 80),
    offerBadge: campaign.poster?.offerBadge || campaign.input.offer || 'SPECIAL OFFER',
    priceTag: campaign.poster?.priceTag || campaign.input.price || 'BEST PRICE',
    callToAction: campaign.poster?.callToAction || 'ORDER NOW',
    layout: campaign.poster?.layout || 'bold_split',
    aspectRatio: campaign.poster?.aspectRatio || '9:16',
    accentColor: campaign.poster?.accentColor || '#8B5CF6',
    productImageUrl: campaign.poster?.productImageUrl || campaign.imageUrl || '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Redraw canvas whenever config changes
  useEffect(() => {
    if (canvasRef.current) {
      renderPosterToCanvas({
        canvas: canvasRef.current,
        config: posterConfig,
        productName: campaign.input.productName,
        description: campaign.input.description,
        onImageLoaded: () => {
          if (canvasRef.current) {
            renderPosterToCanvas({
              canvas: canvasRef.current,
              config: posterConfig,
              productName: campaign.input.productName,
              description: campaign.input.description,
            });
          }
        },
      });
    }
  }, [posterConfig, campaign]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    const filename = `${campaign.input.productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-poster.png`;
    exportCanvasAsPng(canvasRef.current, filename);
    setTimeout(() => setDownloading(false), 800);
  };

  const handleSavePoster = () => {
    const updated: CampaignData = {
      ...campaign,
      poster: posterConfig,
    };
    onUpdateCampaign(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const dims = getPosterDimensions(posterConfig.aspectRatio);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="rounded-3xl p-5 sm:p-6 bg-[#0E1122] border border-white/[0.08] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
              <Palette className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Poster Canvas Studio
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            High-Impact Promotional Graphics
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Customizable marketing poster layouts with crisp typography, price stamps, and high-resolution PNG export.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSavePoster}
            className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-white/[0.08] transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>

      {/* Main Designer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Canvas Preview Box (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl p-4 sm:p-6 bg-[#0D0F20] border border-white/[0.08] flex flex-col items-center justify-center space-y-4 shadow-xl">
          <div className="flex items-center justify-between w-full text-xs text-slate-400 px-1">
            <span className="font-semibold text-slate-200">Interactive Canvas Viewport</span>
            <span className="font-mono tabular-nums text-slate-400">
              {dims.width} × {dims.height}px ({posterConfig.aspectRatio})
            </span>
          </div>

          {/* Responsive Preview Canvas Container */}
          <div className="w-full flex items-center justify-center bg-[#070914] rounded-2xl p-2 sm:p-4 border border-white/[0.06] overflow-hidden shadow-2xl">
            <canvas
              ref={canvasRef}
              className={`rounded-xl shadow-2xl transition-all duration-300 max-w-full h-auto ${
                posterConfig.aspectRatio === '9:16'
                  ? 'max-h-[560px]'
                  : posterConfig.aspectRatio === '16:9'
                  ? 'max-h-[380px]'
                  : 'max-h-[480px]'
              }`}
            />
          </div>

          <div className="flex items-center justify-between w-full text-xs text-slate-400 pt-1">
            <span className="text-[11px]">2x Retina resolution ready for social ad campaigns</span>
            <button
              onClick={handleDownload}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export High-Res PNG</span>
            </button>
          </div>
        </div>

        {/* Right: Customization Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Layout & Aspect Ratio */}
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] space-y-4 shadow-xl">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['1:1', '9:16', '16:9'] as PosterAspectRatio[]).map((ar) => (
                  <button
                    key={ar}
                    onClick={() => setPosterConfig({ ...posterConfig, aspectRatio: ar })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      posterConfig.aspectRatio === ar
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                        : 'bg-[#080A16] border-white/[0.06] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>{ar === '1:1' ? '1:1 Square' : ar === '9:16' ? '9:16 Story' : '16:9 Wide'}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Poster Style Theme
              </label>
              <div className="space-y-1.5">
                {LAYOUTS.map((lay) => (
                  <button
                    key={lay.id}
                    onClick={() => setPosterConfig({ ...posterConfig, layout: lay.id })}
                    className={`w-full p-2.5 rounded-xl text-left border text-xs transition-all ${
                      posterConfig.layout === lay.id
                        ? 'bg-amber-950/40 border-amber-500/60 ring-1 ring-amber-500/40 text-white font-semibold'
                        : 'bg-[#080A16] border-white/[0.06] hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-slate-200">{lay.label}</div>
                    <div className="text-[11px] text-slate-400">{lay.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Brand Accent Color
              </label>
              <div className="flex items-center gap-2">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setPosterConfig({ ...posterConfig, accentColor: c.hex })}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      posterConfig.accentColor === c.hex ? 'scale-125 border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                ))}
                <input
                  type="color"
                  value={posterConfig.accentColor}
                  onChange={(e) =>
                    setPosterConfig({ ...posterConfig, accentColor: e.target.value })
                  }
                  className="w-7 h-7 rounded-full cursor-pointer bg-transparent border-0 ml-1"
                />
              </div>
            </div>

            {/* Product Image Asset Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Product Photography Asset
              </label>
              <div className="grid grid-cols-6 gap-1.5 mb-2">
                {CURATED_ASSET_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setPosterConfig({ ...posterConfig, productImageUrl: img.url })}
                    className={`aspect-[3/4] rounded-lg overflow-hidden border transition-all ${
                      posterConfig.productImageUrl === img.url
                        ? 'border-amber-400 ring-2 ring-amber-400/50'
                        : 'border-white/[0.08] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Editable Text Fields */}
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] space-y-3.5 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Editable Poster Copy
            </span>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={posterConfig.headline}
                onChange={(e) =>
                  setPosterConfig({ ...posterConfig, headline: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Subheadline / Supporting Line
              </label>
              <input
                type="text"
                value={posterConfig.subheadline}
                onChange={(e) =>
                  setPosterConfig({ ...posterConfig, subheadline: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Offer Badge
                </label>
                <input
                  type="text"
                  value={posterConfig.offerBadge}
                  onChange={(e) =>
                    setPosterConfig({ ...posterConfig, offerBadge: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Price Tag
                </label>
                <input
                  type="text"
                  value={posterConfig.priceTag}
                  onChange={(e) =>
                    setPosterConfig({ ...posterConfig, priceTag: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Call to Action
              </label>
              <input
                type="text"
                value={posterConfig.callToAction}
                onChange={(e) =>
                  setPosterConfig({ ...posterConfig, callToAction: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Product Image URL
              </label>
              <input
                type="text"
                placeholder="/src/assets/images/... or https://..."
                value={posterConfig.productImageUrl || ''}
                onChange={(e) =>
                  setPosterConfig({ ...posterConfig, productImageUrl: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
