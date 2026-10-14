import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Cpu,
  AlertTriangle,
  Layers,
  Clock,
  Globe2,
  Tag,
  Target,
  FileText,
  CheckCircle,
  HelpCircle,
  Flame,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import {
  CampaignInput,
  CampaignData,
  AdvertisingStyle,
  PlatformTarget,
  CampaignLanguage,
  VideoDuration,
} from '../types/campaign';

interface CampaignFormProps {
  onCampaignGenerated: (campaign: CampaignData) => void;
  onSelectDemo: (demoKey: string) => void;
}

const CURATED_STYLES = [
  {
    id: 'athletic-shoe',
    label: 'Athletic Runner',
    category: 'Footwear & Sports',
    imageUrl: '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg',
  },
  {
    id: 'skincare-serum',
    label: 'Luxury Skincare',
    category: 'Beauty & Wellness',
    imageUrl: '/src/assets/images/ad_luxury_skincare_serum_1791966612984.jpg',
  },
  {
    id: 'headphones',
    label: 'Studio ANC Audio',
    category: 'Consumer Electronics',
    imageUrl: '/src/assets/images/ad_audiophile_headphones_1791966613303.jpg',
  },
  {
    id: 'coffee-roast',
    label: 'Specialty Coffee',
    category: 'Food & Beverage',
    imageUrl: '/src/assets/images/ad_artisan_coffee_roast_1791966658045.jpg',
  },
  {
    id: 'saffron-tea',
    label: 'Artisan Saffron Chai',
    category: 'Specialty Tea & FMCG',
    imageUrl: '/src/assets/images/ad_artisan_saffron_tea_1791966613436.jpg',
  },
  {
    id: 'bamboo-lamp',
    label: 'Bamboo Smart Lamp',
    category: 'Home & Workspace',
    imageUrl: '/src/assets/images/ad_minimalist_desk_lamp_1791966613744.jpg',
  },
];

const PRESET_IDEAS = [
  {
    label: '⚡ Velocity Carbon Sneaker',
    demoKey: 'velocity-sneaker',
    name: 'Velocity Pro Carbon Runner',
    desc: 'Ultralight performance marathon running shoe with dual-density carbon fiber propulsion plate and breathable hydrophobic mesh upper.',
    benefits: '4% energy return boost, weighs only 185g, anti-pronation heel lock, race-day tuned.',
    price: '$139 (Reg $199)',
    offer: '30% Off Season Kickoff + Free Carbon Insoles',
    audience: 'Marathon runners, triathletes, track athletes, and fitness enthusiasts',
    style: 'Bold' as AdvertisingStyle,
    platform: 'Instagram' as PlatformTarget,
    lang: 'English' as CampaignLanguage,
    duration: 15 as VideoDuration,
    imageUrl: '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg',
  },
  {
    label: '✨ Lumina Skincare Serum',
    demoKey: 'lumina-serum',
    name: 'Lumina Hydra Glow Serum',
    desc: 'Triple-molecular hyaluronic acid serum with 5% niacinamide, antioxidant botanical extracts, and barrier-repair ceramides.',
    benefits: 'Deep 72-hour dermal hydration, reduces redness, pore-smoothing, 100% fragrance-free.',
    price: '$38 / 30ml',
    offer: 'Complimentary Rose Quartz Facial Roller with first order',
    audience: 'Skincare enthusiasts, women and men 22-45 seeking glass-skin glow without irritation',
    style: 'Premium' as AdvertisingStyle,
    platform: 'Instagram' as PlatformTarget,
    lang: 'English' as CampaignLanguage,
    duration: 30 as VideoDuration,
    imageUrl: '/src/assets/images/ad_luxury_skincare_serum_1791966612984.jpg',
  },
  {
    label: '🎧 AeroSound ANC Studio',
    demoKey: 'aerosound-headphones',
    name: 'AeroSound Apex Studio ANC',
    desc: 'Over-ear audiophile wireless headphones with 45dB hybrid active noise cancellation, custom 40mm beryllium drivers, and 50-hour battery life.',
    benefits: 'Silences cabin and office noise, hi-res lossless wireless audio, cloud-soft memory foam earcups.',
    price: '$179 (Reg $249)',
    offer: 'Save $70 + Free Hardshell Travel Case with code FOCUS',
    audience: 'Software engineers, designers, frequent travelers, gamers, and audiophiles',
    style: 'Bold' as AdvertisingStyle,
    platform: 'Instagram' as PlatformTarget,
    lang: 'English' as CampaignLanguage,
    duration: 15 as VideoDuration,
    imageUrl: '/src/assets/images/ad_audiophile_headphones_1791966613303.jpg',
  },
  {
    label: '☕ Luna Roasts Coffee',
    demoKey: 'origin-coffee',
    name: 'Luna Roasts Velvet Eclipse',
    desc: 'Shade-grown specialty grade Arabica beans sourced directly from Yirgacheffe, Ethiopia. Small-batch roasted with tasting notes of dark chocolate, blackberry, and toffee.',
    benefits: 'Direct-trade sourced, roasted within 48 hours of dispatch, silky mouthfeel, rich cocoa notes.',
    price: '$22 / 340g',
    offer: 'Subscribe & Save 20% + Free Ceramic Tasting Cup',
    audience: 'Pour-over and espresso lovers, specialty coffee hobbyists, and morning ritual fans',
    style: 'Emotional' as AdvertisingStyle,
    platform: 'Instagram' as PlatformTarget,
    lang: 'English' as CampaignLanguage,
    duration: 30 as VideoDuration,
    imageUrl: '/src/assets/images/ad_artisan_coffee_roast_1791966658045.jpg',
  },
  {
    label: '🫖 Royal Saffron Chai',
    demoKey: 'chai-bliss',
    name: 'Chai Bliss Royal Saffron Tea',
    desc: 'Hand-picked Assam CTC tea leaves infused with Kashmiri saffron strands and fresh green cardamom pods.',
    benefits: 'Authentic royal aroma, 100% natural spices, zero artificial flavours, energizing morning cup.',
    price: '₹349 (250g pack)',
    offer: 'Buy 2 Get 1 Free + Free Terracotta Kullad',
    audience: 'Chai lovers, families, working professionals, and festive gift buyers',
    style: 'Festive' as AdvertisingStyle,
    platform: 'Instagram' as PlatformTarget,
    lang: 'Hindi' as CampaignLanguage,
    duration: 30 as VideoDuration,
    imageUrl: '/src/assets/images/ad_artisan_saffron_tea_1791966613436.jpg',
  },
  {
    label: '💡 EcoGlow Smart Lamp',
    demoKey: 'ecoglow-lamp',
    name: 'EcoGlow Bamboo Smart Desk Lamp',
    desc: 'Handcrafted sustainable bamboo desk lamp featuring 15W Qi fast wireless phone charging, stepless touch dimming, and eye-care warm LED lighting.',
    benefits: 'Declutters desk cables, eliminates late night eye strain, premium natural wood finish.',
    price: '$49.99 (Reg $79)',
    offer: 'Launch Discount 35% Off + Free Cable Kit',
    audience: 'Remote workers, designers, coders, students, and minimalist workspace enthusiasts',
    style: 'Premium' as AdvertisingStyle,
    platform: 'Instagram' as PlatformTarget,
    lang: 'English' as CampaignLanguage,
    duration: 15 as VideoDuration,
    imageUrl: '/src/assets/images/ad_minimalist_desk_lamp_1791966613744.jpg',
  },
];

export const CampaignForm: React.FC<CampaignFormProps> = ({
  onCampaignGenerated,
  onSelectDemo,
}) => {
  const [formData, setFormData] = useState<CampaignInput>({
    productName: '',
    description: '',
    keyBenefits: '',
    price: '',
    offer: '',
    targetAudience: '',
    language: 'English',
    style: 'Emotional',
    platform: 'Instagram',
    duration: 30,
    modelPreference: 'open-weight-gemma',
    imageUrl: '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [openWeightNotice, setOpenWeightNotice] = useState<any | null>(null);

  const loadingSteps = [
    'Analyzing product benefits and target audience persona...',
    'Writing 3 alternative attention-grabbing opening hooks...',
    'Crafting persuasive script with benefits & call to action...',
    'Designing responsive poster layout and WhatsApp promotional message...',
    'Directing scene-by-scene ReelReady video production storyboard...',
  ];

  const handleApplyPreset = (preset: typeof PRESET_IDEAS[0]) => {
    setFormData({
      productName: preset.name,
      description: preset.desc,
      keyBenefits: preset.benefits,
      price: preset.price,
      offer: preset.offer,
      targetAudience: preset.audience,
      style: preset.style,
      platform: preset.platform,
      language: preset.lang,
      duration: preset.duration,
      modelPreference: formData.modelPreference,
      imageUrl: preset.imageUrl,
    });
    setErrorMsg(null);
    setOpenWeightNotice(null);
  };

  const handleGenerate = async (overrideModel?: 'open-weight-gemma' | 'gemini-fast' | 'demo') => {
    const modelToUse = overrideModel || formData.modelPreference;

    // Validation
    if (!formData.productName.trim()) {
      setErrorMsg('Please enter your Product or Service name.');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMsg('Please enter a brief product description.');
      return;
    }

    setErrorMsg(null);
    setOpenWeightNotice(null);
    setIsLoading(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1400);

    try {
      const response = await fetch('/api/campaign/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          modelPreference: modelToUse,
        }),
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (!response.ok || !data.success) {
        if (data.errorType === 'OPEN_WEIGHT_UNAVAILABLE') {
          setOpenWeightNotice(data);
          setIsLoading(false);
          return;
        }
        throw new Error(data.message || data.error || 'Failed to generate campaign');
      }

      onCampaignGenerated(data.campaign);
    } catch (err: any) {
      clearInterval(stepInterval);
      setErrorMsg(err.message || 'Network error while generating campaign. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Title & Introduction */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Autonomous AI Campaign Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Turn Any Product Into a{' '}
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
            Complete Ad Campaign
          </span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          From a simple description to multi-hook ad scripts, shot-by-shot ReelReady video blueprints, WhatsApp messages, and high-resolution downloadable posters.
        </p>
      </div>

      {/* Quick 1-Click Preset Ideas */}
      <div className="rounded-2xl p-4 sm:p-5 bg-[#0C0E1F] border border-white/[0.08]">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Quick 1-Click Samples (Auto-Fill)</span>
          </span>
          <span className="text-[11px] text-slate-500">Tap to load verified agency briefs</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PRESET_IDEAS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-violet-950/40 border border-white/[0.06] hover:border-violet-500/40 transition-all text-xs group"
            >
              <div className="font-semibold text-slate-200 group-hover:text-violet-300 truncate">
                {preset.label}
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Transparent Open-Weight Notice Banner (if triggered) */}
      {openWeightNotice && (
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-amber-200">
                Open-Weight Gemma Model Upstream Notice
              </h3>
              <p className="text-xs text-amber-300/80 mt-1 leading-relaxed">
                {openWeightNotice.message}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleGenerate('gemini-fast')}
                  className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Use Gemini 3.1 Flash Lite (High-Speed Fallback)
                </button>
                <button
                  type="button"
                  onClick={() => onSelectDemo('chai-bliss')}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                >
                  Load Curated Demo Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Campaign Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        className="rounded-3xl p-5 sm:p-8 bg-[#0D0F20] border border-white/[0.08] shadow-2xl space-y-6"
      >
        {/* Section 1: Product Core */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold tracking-wider uppercase text-violet-400 flex items-center gap-2">
            <span>01. Product & Positioning</span>
          </h2>

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Product or Service Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Velocity Pro Carbon Runner, Chai Bliss Royal Saffron Tea"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Description and Key Benefits <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="What makes this product special? What problem does it solve? Mention materials, flavor, efficiency, or origin."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Price (Real figure as supplied by you)
                </label>
                <input
                  type="text"
                  placeholder="e.g. $139 (Reg $199), ₹349/box"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Special Offer or Launch Incentive (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 30% Off Launch, Buy 2 Get 1 Free, Free Shipping"
                  value={formData.offer}
                  onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Audience Persona
              </label>
              <input
                type="text"
                placeholder="e.g. Marathon runners, remote software engineers, busy working professionals"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>

        <div className="h-px bg-white/[0.08]" />

        {/* Section 2: Product Imagery Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold tracking-wider uppercase text-violet-400">
              02. Product Photography & Creative Style
            </h2>
            <span className="text-[11px] text-slate-400">Studio aesthetic selection</span>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-300">
              Select a photography theme for your advertisement cards and poster canvas, or enter your own custom product image URL.
            </p>

            {/* Curated Style Options */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {CURATED_STYLES.map((style) => {
                const isSelected = formData.imageUrl === style.imageUrl;
                return (
                  <div
                    key={style.id}
                    onClick={() => setFormData({ ...formData, imageUrl: style.imageUrl })}
                    className={`cursor-pointer rounded-xl overflow-hidden border p-1 transition-all ${
                      isSelected
                        ? 'border-violet-500 ring-2 ring-violet-500/40 bg-violet-950/30'
                        : 'border-white/[0.06] hover:border-slate-700 bg-slate-900/50'
                    }`}
                  >
                    <div className="aspect-[3/4] rounded-lg overflow-hidden relative bg-black">
                      <img
                        src={style.imageUrl}
                        alt={style.label}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div className="p-1.5 text-center">
                      <div className="text-[11px] font-bold text-slate-200 truncate">{style.label}</div>
                      <div className="text-[9px] text-slate-400 truncate">{style.category}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Image URL input */}
            <div className="pt-1">
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Or supply custom product image URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/product.jpg"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/[0.08]" />

        {/* Section 3: Campaign Tone & Channels */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold tracking-wider uppercase text-violet-400">
            03. Format & Channel Distribution
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Preferred Language */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Language
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
                {(['English', 'Hindi'] as CampaignLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setFormData({ ...formData, language: lang })}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      formData.language === lang
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang === 'Hindi' ? 'हिन्दी (Hindi)' : 'English'}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Platform */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) =>
                  setFormData({ ...formData, platform: e.target.value as PlatformTarget })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs font-semibold focus:outline-none focus:border-violet-500"
              >
                <option value="Instagram">Instagram (Reels & Feed)</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
                <option value="Facebook">Facebook Ads</option>
                <option value="WhatsApp">WhatsApp Broadcast</option>
              </select>
            </div>

            {/* Advertising Style */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Advertising Style
              </label>
              <select
                value={formData.style}
                onChange={(e) =>
                  setFormData({ ...formData, style: e.target.value as AdvertisingStyle })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs font-semibold focus:outline-none focus:border-violet-500"
              >
                <option value="Emotional">Emotional & Nostalgic</option>
                <option value="Funny">Funny & Relatable</option>
                <option value="Premium">Premium & Elegant</option>
                <option value="Professional">Professional & Direct</option>
                <option value="Festive">Festive & Celebratory</option>
                <option value="Bold">Bold & High Urgency</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Video Ad Duration
              </label>
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
                {([15, 30, 60] as VideoDuration[]).map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setFormData({ ...formData, duration: sec })}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      formData.duration === sec
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/[0.08]" />

        {/* Section 4: AI Model Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-violet-400" />
              <span>04. AI Model Engine</span>
            </label>
            <span className="text-[11px] text-slate-400">Explicit model transparency</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                formData.modelPreference === 'gemini-fast'
                  ? 'bg-violet-950/40 border-violet-500/60 ring-1 ring-violet-500/40 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Gemini 3.1 Flash Lite
                </span>
                <input
                  type="radio"
                  name="modelPreference"
                  value="gemini-fast"
                  checked={formData.modelPreference === 'gemini-fast'}
                  onChange={() => setFormData({ ...formData, modelPreference: 'gemini-fast' })}
                  className="accent-violet-500"
                />
              </div>
              <span className="text-[10px] text-slate-400 leading-tight">
                High-speed generation (~1.5s), reliable structured schema.
              </span>
            </label>

            <label
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                formData.modelPreference === 'open-weight-gemma'
                  ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/40 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  Gemma 4 26B A4B IT
                </span>
                <input
                  type="radio"
                  name="modelPreference"
                  value="open-weight-gemma"
                  checked={formData.modelPreference === 'open-weight-gemma'}
                  onChange={() => setFormData({ ...formData, modelPreference: 'open-weight-gemma' })}
                  className="accent-emerald-500"
                />
              </div>
              <span className="text-[10px] text-slate-400 leading-tight">
                Direct Google API open-weight model with genuine structured generation.
              </span>
            </label>

            <label
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                formData.modelPreference === 'demo'
                  ? 'bg-blue-950/40 border-blue-500/60 ring-1 ring-blue-500/40 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Curated Pro Sample
                </span>
                <input
                  type="radio"
                  name="modelPreference"
                  value="demo"
                  checked={formData.modelPreference === 'demo'}
                  onChange={() => setFormData({ ...formData, modelPreference: 'demo' })}
                  className="accent-blue-500"
                />
              </div>
              <span className="text-[10px] text-slate-400 leading-tight">
                Instant generation from curated production templates.
              </span>
            </label>
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button & Loading State */}
        <div>
          {isLoading ? (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-violet-500/30 text-center space-y-4">
              <div className="inline-flex p-3 rounded-2xl bg-violet-600/20 text-violet-400 animate-pulse">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Generating Your Ad Campaign</h3>
                <p className="text-xs text-violet-300 mt-1">{loadingSteps[loadingStep]}</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-500 to-rose-500 h-full transition-all duration-500"
                  style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 block">
                Creating 8 marketing assets, storyboard, poster, and voiceover synchronization...
              </span>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-extrabold text-base tracking-wide shadow-xl shadow-violet-600/30 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Generate My Campaign</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
