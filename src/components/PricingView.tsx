import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  Zap,
  Crown,
  ShieldCheck,
  Video,
  Palette,
  Mic,
  ArrowRight,
  Info,
  X,
  FileText,
  Sliders,
  Download,
  Layers,
  HeartHandshake,
} from 'lucide-react';
import { NavigationTab } from './Navigation';

interface PricingViewProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [showDemoModal, setShowDemoModal] = useState(false);

  const isAnnual = billingCycle === 'annual';
  const proPrice = isAnnual ? '$7' : '$9';
  const proBillingText = isAnnual ? 'billed annually ($84/yr)' : 'billed monthly';

  return (
    <div className="space-y-10 pb-24 max-w-6xl mx-auto">
      {/* 1. Header & Business Model Explainer */}
      <section className="text-center space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold">
          <Crown className="w-3.5 h-3.5 text-amber-300" />
          <span>Subscription Model Preview</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">Illustrative Pricing Only</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight text-balance">
          Transparent Plans for{' '}
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
            Every Growth Stage
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-balance">
          Designed for small shopkeepers, direct-to-consumer founders, and content creators. Test the complete advertising suite risk-free with no credit card required.
        </p>

        {/* Prominent Demo Notice Banner */}
        <div className="max-w-xl mx-auto p-3 rounded-2xl bg-[#0F1326] border border-violet-500/30 text-xs text-slate-300 flex items-center justify-center gap-2.5 shadow-lg">
          <Info className="w-4 h-4 text-violet-400 shrink-0" />
          <span className="text-[11px] sm:text-xs">
            <strong>Demonstration Notice:</strong> Pricing figures are illustrative to showcase the commercial SaaS business model. No payment gateway or credit card collection is implemented.
          </span>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="pt-2 flex items-center justify-center">
          <div className="inline-flex items-center p-1 rounded-xl bg-[#090C19] border border-white/[0.08] text-xs font-semibold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg transition-all ${
                !isAnnual
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                isAnnual
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Side-by-Side Plan Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {/* FREE PLAN CARD (Current Plan) */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0D0F20] border border-white/[0.08] shadow-xl flex flex-col justify-between space-y-6 relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Starter Tier
                </span>
                <h3 className="text-2xl font-black text-white mt-0.5">Free</h3>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40">
                Your Current Plan
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Essential advertising generator tools for local shops, freelancers, and students launching their first product campaign.
            </p>

            {/* Price */}
            <div className="pt-2 border-t border-white/[0.06]">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">$0</span>
                <span className="text-xs text-slate-400 font-medium">/ month</span>
              </div>
              <span className="text-[11px] text-slate-500 block mt-0.5 font-mono">
                No credit card required · Free forever
              </span>
            </div>

            {/* Feature Bullet List */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-bold tracking-wider block">
                Included in Free Plan:
              </span>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Limited campaign generations</strong> (5 creative runs / month)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>3 alternative high-contrast opening hooks</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Standard 15-second ReelReady video storyboard</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Basic poster layouts (Bold Split & Minimal Glow)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Standard social media caption & hashtag generator</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct WhatsApp promotional broadcast text</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Standard PNG poster image download</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Plan CTA */}
          <div className="pt-4 border-t border-white/[0.06]">
            <button
              disabled
              className="w-full py-3.5 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 font-bold text-xs sm:text-sm cursor-default flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Current Active Plan</span>
            </button>
          </div>
        </div>

        {/* PRO PLAN CARD (Prominent & Illustrative) */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#12142B] via-[#0E1024] to-[#0A0C1B] border-2 border-violet-500/60 shadow-2xl shadow-violet-950/50 flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-bold">
                  Agency & Creator Suite
                </span>
                <h3 className="text-2xl font-black text-white mt-0.5 flex items-center gap-2">
                  <span>Pro Studio</span>
                  <Crown className="w-5 h-5 text-amber-300" />
                </h3>
              </div>
              <span className="text-xs font-bold text-violet-200 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 rounded-full shadow-md shadow-violet-600/30">
                Recommended
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              For ambitious ecommerce brands, agencies, and content teams who need higher limits, brand kit presets, and advanced export options.
            </p>

            {/* Price */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">{proPrice}</span>
                <span className="text-xs text-slate-300 font-medium">/ month</span>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  Illustrative
                </span>
              </div>
              <span className="text-[11px] text-violet-300/80 block mt-0.5 font-mono">
                {proBillingText} · Cancel anytime (Demo mode)
              </span>
            </div>

            {/* Feature Bullet List */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono uppercase text-violet-300 font-bold tracking-wider block">
                Everything in Free, plus:
              </span>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded bg-violet-600/30 text-violet-300 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Higher campaign limits</strong> (Unlimited campaign generation runs)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded bg-violet-600/30 text-violet-300 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Premium poster templates</strong> (Festive Royal, Luxury Dark & Vibrant Retail)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded bg-violet-600/30 text-violet-300 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Brand Kits</strong> with saved hex palettes, brand fonts & product assets</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded bg-violet-600/30 text-violet-300 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Advanced campaign export</strong> (2x Retina PNG, Video briefs, JSON archives)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded bg-violet-600/30 text-violet-300 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>15s, 30s & 60s ReelReady timelines</strong> with multi-camera visual directions</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded bg-violet-600/30 text-violet-300 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Bilingual English & Hindi adaptation</strong> with natural cultural copy</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-0.5 rounded bg-violet-600/30 text-violet-300 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>AI Voiceover Studio integration</strong> (ElevenLabs & Google Gemini TTS)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Plan CTA */}
          <div className="pt-4 border-t border-white/10 relative z-10">
            <button
              onClick={() => setShowDemoModal(true)}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-extrabold text-sm shadow-xl shadow-violet-600/40 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Upgrade to Pro — {proPrice}/mo</span>
              <ArrowRight className="w-4 h-4 text-violet-200" />
            </button>
            <span className="text-[10px] text-center text-slate-400 block mt-2">
              Demonstration only · No payment collection or card required
            </span>
          </div>
        </div>
      </section>

      {/* 3. Comprehensive Feature Comparison Table */}
      <section className="space-y-4 pt-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Detailed Plan Comparison
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Compare capabilities across essential creation tools, video blueprints, and export formats.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0C0E1E] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#080A16]">
                  <th className="py-4 px-5 text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                    Capability
                  </th>
                  <th className="py-4 px-5 text-slate-300 font-bold uppercase tracking-wider text-[11px] w-40 sm:w-48 text-center">
                    Free ($0)
                  </th>
                  <th className="py-4 px-5 text-violet-300 font-bold uppercase tracking-wider text-[11px] w-48 sm:w-56 text-center bg-violet-950/20">
                    Pro ($9/mo)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-slate-300">
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-white">Campaign Generation Quota</td>
                  <td className="py-3.5 px-5 text-center font-mono text-slate-400">5 runs / month</td>
                  <td className="py-3.5 px-5 text-center font-mono text-emerald-400 font-bold bg-violet-950/10">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-white">Opening Hook Alternatives</td>
                  <td className="py-3.5 px-5 text-center font-mono text-slate-400">3 per product</td>
                  <td className="py-3.5 px-5 text-center font-mono text-violet-300 font-bold bg-violet-950/10">3 + Instant Regenerate</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-white">ReelReady Video Storyboards</td>
                  <td className="py-3.5 px-5 text-center text-slate-400">15s basic</td>
                  <td className="py-3.5 px-5 text-center text-white font-medium bg-violet-950/10">15s, 30s & 60s formats</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-white">Creative Approaches</td>
                  <td className="py-3.5 px-5 text-center text-slate-400">Product Showcase</td>
                  <td className="py-3.5 px-5 text-center text-white font-medium bg-violet-950/10">All 4 Approaches</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-white">Poster Canvas Templates</td>
                  <td className="py-3.5 px-5 text-center text-slate-400">2 Basic Layouts</td>
                  <td className="py-3.5 px-5 text-center text-emerald-400 font-medium bg-violet-950/10">5 Premium Layouts</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-white">Brand Kits (Saved Colors & Logos)</td>
                  <td className="py-3.5 px-5 text-center text-slate-500">—</td>
                  <td className="py-3.5 px-5 text-center text-emerald-400 font-bold bg-violet-950/10">Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-white">Poster Export Resolution</td>
                  <td className="py-3.5 px-5 text-center font-mono text-slate-400">1080p Standard</td>
                  <td className="py-3.5 px-5 text-center font-mono text-emerald-400 font-bold bg-violet-950/10">2x Retina 4K PNG</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-white">Bilingual English & Hindi Synthesis</td>
                  <td className="py-3.5 px-5 text-center text-slate-400">Basic</td>
                  <td className="py-3.5 px-5 text-center text-emerald-400 font-bold bg-violet-950/10">Full Cultural Adaptation</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-white">AI Voiceover Studio Synthesis</td>
                  <td className="py-3.5 px-5 text-center text-slate-400">Copy Script Only</td>
                  <td className="py-3.5 px-5 text-center text-violet-300 font-medium bg-violet-950/10">ElevenLabs + Gemini Audio</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-white">Data Export & JSON Backup</td>
                  <td className="py-3.5 px-5 text-center text-slate-400">Local Only</td>
                  <td className="py-3.5 px-5 text-center text-white font-medium bg-violet-950/10">JSON Backup & Restore</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Brand Kit Demonstration Showcase */}
      <section className="rounded-3xl p-6 sm:p-8 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <h3 className="font-bold text-lg text-white">
                Pro Feature Spotlight: Saved Brand Kits
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Store your business identities once to automatically apply matching colors, logos, and voiceover tones across all generated campaigns.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase text-violet-300 bg-violet-950/60 px-3 py-1 rounded-full border border-violet-500/30 self-start sm:self-auto">
            Pro Feature Preview
          </span>
        </div>

        {/* Brand Kit Mockups */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#080A16] border border-white/[0.06] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Velocity Athletics</span>
              <span className="text-[10px] font-mono text-emerald-400">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#8B5CF6] border border-white/20" title="#8B5CF6" />
              <span className="w-5 h-5 rounded-full bg-[#EC4899] border border-white/20" title="#EC4899" />
              <span className="w-5 h-5 rounded-full bg-[#10B981] border border-white/20" title="#10B981" />
              <span className="text-[10px] text-slate-500 font-mono">3 Palette Swatches</span>
            </div>
            <p className="text-[11px] text-slate-400">Tone: High Energy & Bold Athletic</p>
          </div>

          <div className="p-4 rounded-xl bg-[#080A16] border border-white/[0.06] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Lumina Skincare</span>
              <span className="text-[10px] font-mono text-slate-400">Preset</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#F43F5E] border border-white/20" title="#F43F5E" />
              <span className="w-5 h-5 rounded-full bg-[#F59E0B] border border-white/20" title="#F59E0B" />
              <span className="w-5 h-5 rounded-full bg-[#1E1B4B] border border-white/20" title="#1E1B4B" />
              <span className="text-[10px] text-slate-500 font-mono">3 Palette Swatches</span>
            </div>
            <p className="text-[11px] text-slate-400">Tone: Minimalist Organic Luxury</p>
          </div>

          <div className="p-4 rounded-xl bg-[#080A16] border border-white/[0.06] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Luna Roasts Coffee</span>
              <span className="text-[10px] font-mono text-slate-400">Preset</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#7C3AED] border border-white/20" title="#7C3AED" />
              <span className="w-5 h-5 rounded-full bg-[#D97706] border border-white/20" title="#D97706" />
              <span className="w-5 h-5 rounded-full bg-[#0F172A] border border-white/20" title="#0F172A" />
              <span className="text-[10px] text-slate-500 font-mono">3 Palette Swatches</span>
            </div>
            <p className="text-[11px] text-slate-400">Tone: Sensory Craftsmanship</p>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (Transparency) */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4.5 rounded-2xl bg-[#0C0E1E] border border-white/[0.08] space-y-2">
            <h4 className="font-bold text-white text-sm">Is this a live paid service?</h4>
            <p className="text-slate-400 leading-relaxed">
              No. This Pricing & Plans interface is an illustrative demonstration designed to demonstrate the potential commercial business model ($9/month) for evaluators and judges. Subscriptions and billing are intentionally not active.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-[#0C0E1E] border border-white/[0.08] space-y-2">
            <h4 className="font-bold text-white text-sm">Can I test all generative features today?</h4>
            <p className="text-slate-400 leading-relaxed">
              Yes! All core generative capabilities—including AI campaign generation, multi-scene ReelReady storyboards, poster designing, and script synthesis—are completely free and working in this demonstration.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-[#0C0E1E] border border-white/[0.08] space-y-2">
            <h4 className="font-bold text-white text-sm">Will clicking "Upgrade" charge my card?</h4>
            <p className="text-slate-400 leading-relaxed">
              Never. The application does not contain any payment gateway, checkout forms, or payment APIs. Clicking "Upgrade to Pro" displays a friendly informational dialog confirming this is a prototype demonstration.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-[#0C0E1E] border border-white/[0.08] space-y-2">
            <h4 className="font-bold text-white text-sm">What makes AdGenius AI valuable for businesses?</h4>
            <p className="text-slate-400 leading-relaxed">
              Small business owners and creators often struggle with copywriting, video scripts, and design. AdGenius AI provides an autonomous creative team that generates high-converting multi-platform campaigns in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FRIENDLY DEMO MODAL (Strictly non-billing, informative only) */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0E1124] border border-violet-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-center">
            {/* Close Button */}
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-violet-600/30">
              <Crown className="w-7 h-7 text-amber-300" />
            </div>

            {/* Title & Body */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-bold">
                Illustrative SaaS Demonstration
              </span>
              <h3 className="text-xl font-black text-white">
                Pro Tier Proposed Model ($9/mo)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Thank you for your interest! The Pro plan ($9/month) represents our proposed commercial subscription model for AdGenius AI.
              </p>
              <div className="p-3.5 rounded-xl bg-[#080A16] border border-white/[0.08] text-xs text-slate-400 text-left space-y-1.5 mt-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>No Payment or Card Collection</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-normal">
                  In this application evaluation build, all features—including creative generator, ReelReady storyboards, and poster canvas—are fully accessible for testing. Subscriptions and billing are not active.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  onNavigate('create');
                }}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-violet-600/30 transition-all"
              >
                Try Generator in Demo Mode
              </button>
              <button
                onClick={() => setShowDemoModal(false)}
                className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 font-semibold text-xs transition-colors"
              >
                Close & Return to Pricing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
