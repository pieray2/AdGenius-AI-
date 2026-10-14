import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Volume2,
  Play,
  Pause,
  Download,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Cpu,
  Layers,
  Info,
} from 'lucide-react';
import { CampaignData } from '../types/campaign';

interface VoiceoverViewProps {
  campaign: CampaignData;
}

const ELEVENLABS_VOICES = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', tone: 'Calm, Charismatic Commercial' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', tone: 'Deep Authority & Trust' },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni', tone: 'Energetic Storyteller' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella', tone: 'Warm, Friendly Lifestyle' },
];

const GEMINI_TTS_VOICES = [
  { id: 'Kore', name: 'Kore (Gemini TTS)', tone: 'Clear, articulate commercial warmth' },
  { id: 'Puck', name: 'Puck (Gemini TTS)', tone: 'Enthusiastic, energetic podcast tone' },
];

export const VoiceoverView: React.FC<VoiceoverViewProps> = ({ campaign }) => {
  // Script selection
  const [selectedScriptType, setSelectedScriptType] = useState<
    'full' | 'storyboard' | 'hook' | 'hindi' | 'custom'
  >('full');

  const defaultFullText = campaign.script.fullText || `${campaign.script.beginning} ${campaign.script.benefits} ${campaign.script.callToAction}`;
  const defaultStoryboardText = campaign.storyboard.scenes.map((s) => s.voiceover).join(' ');
  const defaultHookText = campaign.hooks[0] || '';
  const defaultHindiText = campaign.hindiAdaptation?.script.fullText || '';

  const [customScript, setCustomScript] = useState(defaultFullText);
  const [selectedVoice, setSelectedVoice] = useState('21m00Tcm4TlvDq8ikWAM');
  const [geminiVoice, setGeminiVoice] = useState('Kore');

  // Generation status
  const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'unconfigured' | 'failed'>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioProvider, setAudioProvider] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [serverElevenLabsConfigured, setServerElevenLabsConfigured] = useState<boolean | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check server configuration on mount
  useEffect(() => {
    fetch('/api/status')
      .then((r) => r.json())
      .then((data) => {
        setServerElevenLabsConfigured(Boolean(data.providers?.elevenLabsConfigured));
      })
      .catch(() => setServerElevenLabsConfigured(false));
  }, []);

  // Update custom script when preset selector changes
  useEffect(() => {
    if (selectedScriptType === 'full') setCustomScript(defaultFullText);
    else if (selectedScriptType === 'storyboard') setCustomScript(defaultStoryboardText);
    else if (selectedScriptType === 'hook') setCustomScript(defaultHookText);
    else if (selectedScriptType === 'hindi' && defaultHindiText) setCustomScript(defaultHindiText);
  }, [selectedScriptType, campaign]);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(customScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate with ElevenLabs
  const handleGenerateElevenLabs = async () => {
    setStatus('generating');
    setStatusMessage('Connecting to ElevenLabs Text-to-Speech API...');
    setAudioUrl(null);

    try {
      const selectedObj = ELEVENLABS_VOICES.find((v) => v.id === selectedVoice);
      const res = await fetch('/api/voiceover/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: customScript,
          voiceId: selectedVoice,
          voiceName: selectedObj?.name || 'Rachel',
        }),
      });

      const data = await res.json();

      if (data.status === 'unconfigured') {
        setStatus('unconfigured');
        setStatusMessage(data.message);
        return;
      }

      if (!res.ok || !data.success) {
        setStatus('failed');
        setStatusMessage(data.message || 'ElevenLabs voiceover synthesis failed.');
        return;
      }

      setStatus('success');
      setStatusMessage('Voiceover generated successfully via ElevenLabs.');
      setAudioUrl(data.audioUrl);
      setAudioProvider('ElevenLabs MultiLingual v2');
    } catch (e: any) {
      setStatus('failed');
      setStatusMessage(e.message || 'Network error communicating with Voiceover API.');
    }
  };

  // Synthesize with Google Gemini TTS
  const handleGenerateGeminiTts = async () => {
    setStatus('generating');
    setStatusMessage('Synthesizing speech via Google Gemini TTS...');
    setAudioUrl(null);

    try {
      const res = await fetch('/api/voiceover/gemini-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: customScript,
          voiceName: geminiVoice,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gemini TTS synthesis failed.');
      }

      setStatus('success');
      setStatusMessage(`Audio synthesized using Google Gemini TTS (${geminiVoice}).`);
      setAudioUrl(data.audioUrl);
      setAudioProvider(`Google Gemini TTS (${geminiVoice})`);
    } catch (e: any) {
      setStatus('failed');
      setStatusMessage(e.message || 'Gemini TTS generation error.');
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="rounded-3xl p-5 sm:p-6 bg-[#0E1122] border border-white/[0.08] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs">
              <Mic className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              AI Voiceover Studio
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Professional Voiceover & Audio Narration
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Synthesize voiceovers for your ad campaigns with natural pacing and real audio playback.
          </p>
        </div>

        {/* Server Config Status */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-500">Service:</span>
          <span className={serverElevenLabsConfigured ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
            {serverElevenLabsConfigured ? 'ElevenLabs Active' : 'Gemini TTS / Script Copy'}
          </span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Script Selector & Editor */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                01. Select & Fine-Tune Script
              </span>

              {/* Presets */}
              <div className="flex flex-wrap gap-1 bg-[#080A16] p-1 rounded-xl border border-white/[0.08] text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedScriptType('full')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    selectedScriptType === 'full'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Full Script
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedScriptType('storyboard')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    selectedScriptType === 'storyboard'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Storyboard Scenes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedScriptType('hook')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    selectedScriptType === 'hook'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Hook Only
                </button>
                {campaign.hindiAdaptation && (
                  <button
                    type="button"
                    onClick={() => setSelectedScriptType('hindi')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      selectedScriptType === 'hindi'
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    हिन्दी Script
                  </button>
                )}
              </div>
            </div>

            {/* Editable Script Textarea */}
            <div>
              <textarea
                rows={6}
                value={customScript}
                onChange={(e) => {
                  setCustomScript(e.target.value);
                  setSelectedScriptType('custom');
                }}
                className="w-full px-4 py-3 rounded-xl bg-[#080A16] border border-white/[0.08] text-white text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-violet-500 font-sans resize-none"
                placeholder="Enter or edit voiceover lines..."
              />
              <div className="flex items-center justify-between text-xs text-slate-500 mt-2 font-mono">
                <span>
                  Words: {customScript.trim().split(/\s+/).filter(Boolean).length} (~
                  {Math.round(customScript.trim().split(/\s+/).filter(Boolean).length / 2.5)}s duration)
                </span>
                <button
                  onClick={handleCopyScript}
                  className="text-slate-400 hover:text-violet-400 flex items-center gap-1 font-semibold transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Script!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Voiceover Generation Box */}
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              02. Audio Synthesis Engine
            </span>

            {/* If ElevenLabs is configured vs unconfigured notice */}
            {status === 'unconfigured' && (
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>ElevenLabs Key Not Detected in Secrets</span>
                </div>
                <p className="leading-relaxed text-amber-300/80">
                  You can copy the voiceover script directly for external studio recording, or synthesize high-fidelity preview audio via Google Gemini TTS.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={handleCopyScript}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold"
                  >
                    Copy Script for External Recording
                  </button>
                  <button
                    onClick={handleGenerateGeminiTts}
                    className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Synthesize with Gemini TTS</span>
                  </button>
                </div>
              </div>
            )}

            {/* Generation Status Feedback */}
            {statusMessage && status !== 'unconfigured' && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                  status === 'generating'
                    ? 'bg-violet-950/40 border border-violet-500/30 text-violet-300'
                    : status === 'success'
                    ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'
                }`}
              >
                {status === 'generating' && <RefreshCw className="w-4 h-4 animate-spin shrink-0" />}
                {status === 'success' && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                {status === 'failed' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Generated Audio Player */}
            {audioUrl && (
              <div className="p-4 rounded-xl bg-[#080A16] border border-violet-500/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span>Generated Commercial Track</span>
                  </span>
                  <span className="text-[10px] font-mono text-violet-300">
                    {audioProvider}
                  </span>
                </div>

                {/* HTML Audio element */}
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlayback}
                    className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-md shadow-violet-600/30 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all ${
                        isPlaying ? 'animate-pulse w-full' : 'w-full'
                      }`}
                    />
                  </div>

                  <a
                    href={audioUrl}
                    download="adgenius-voiceover.mp3"
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
                    title="Download Audio File"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            )}

            {/* Generation Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                disabled={status === 'generating'}
                onClick={handleGenerateElevenLabs}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-violet-600/30 flex items-center justify-center gap-2 active:scale-98 transition-all disabled:opacity-50"
              >
                <Mic className="w-4 h-4" />
                <span>Synthesize with ElevenLabs</span>
              </button>

              <button
                disabled={status === 'generating'}
                onClick={handleGenerateGeminiTts}
                className="py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-white/[0.08] transition-all active:scale-98 disabled:opacity-50"
                title="Synthesizes speech using the server's Gemini TTS model"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Google Gemini TTS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Voice & Persona Selection */}
        <div className="space-y-5">
          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              ElevenLabs Voices
            </span>
            <div className="space-y-2">
              {ELEVENLABS_VOICES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVoice(v.id)}
                  className={`w-full p-3 rounded-xl text-left border text-xs transition-all ${
                    selectedVoice === v.id
                      ? 'bg-violet-950/40 border-violet-500/60 ring-1 ring-violet-500/40 text-white font-semibold'
                      : 'bg-[#080A16] border-white/[0.06] hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-slate-200">{v.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{v.tone}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-[#0D0F20] border border-white/[0.08] shadow-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Google Gemini TTS Voices
            </span>
            <div className="space-y-2">
              {GEMINI_TTS_VOICES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setGeminiVoice(v.id)}
                  className={`w-full p-3 rounded-xl text-left border text-xs transition-all ${
                    geminiVoice === v.id
                      ? 'bg-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/40 text-white font-semibold'
                      : 'bg-[#080A16] border-white/[0.06] hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-slate-200">{v.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{v.tone}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="p-4 rounded-2xl bg-[#0B0D1A] border border-white/[0.06] text-xs text-slate-400 space-y-1.5 leading-relaxed">
            <div className="font-bold text-slate-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-violet-400" />
              <span>Voiceover Timing Tips</span>
            </div>
            <p className="text-[11px]">
              Keep promotional short scripts between 30 and 70 words so that spoken pacing feels natural without having to artificially speed up audio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
