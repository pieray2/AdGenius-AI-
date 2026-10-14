export type AdvertisingStyle =
  | 'Funny'
  | 'Emotional'
  | 'Premium'
  | 'Professional'
  | 'Festive'
  | 'Bold';

export type PlatformTarget = 'Instagram' | 'YouTube Shorts' | 'Facebook' | 'WhatsApp';

export type CampaignLanguage = 'English' | 'Hindi';

export type VideoDuration = 15 | 30 | 60;

export type CreativeApproach =
  | 'Product Showcase'
  | 'Problem and Solution'
  | 'Storytelling'
  | 'Festive Promotion';

export type PosterLayout =
  | 'bold_split'
  | 'minimal_glow'
  | 'festive_royal'
  | 'luxury_dark'
  | 'vibrant_retail';

export type PosterAspectRatio = '1:1' | '9:16' | '16:9';

export interface CampaignInput {
  productName: string;
  description: string;
  keyBenefits: string;
  price: string;
  offer: string;
  targetAudience: string;
  language: CampaignLanguage;
  style: AdvertisingStyle;
  platform: PlatformTarget;
  duration: VideoDuration;
  modelPreference: 'open-weight-gemma' | 'gemini-fast' | 'demo';
  imageUrl?: string;
  categoryBadge?: string;
}

export interface ModelMetadata {
  modelUsed: string;
  provider: string;
  isOpenWeight: boolean;
  generatedAt: string;
  note?: string;
}

export interface AdScript {
  beginning: string;
  benefits: string;
  callToAction: string;
  fullText: string;
}

export interface PosterConfig {
  headline: string;
  subheadline: string;
  offerBadge: string;
  priceTag: string;
  callToAction: string;
  layout: PosterLayout;
  aspectRatio: PosterAspectRatio;
  accentColor: string;
  bgGradient?: string;
  productImageUrl?: string;
}

export interface StoryboardScene {
  sceneNumber: number;
  timestamp: string;
  visualDirection: string;
  onScreenText: string;
  voiceover: string;
  transition: string;
}

export interface ReelReadyStoryboard {
  approach: CreativeApproach;
  durationSeconds: number;
  overallPacing: string;
  bgMusicMood: string;
  hookSummary: string;
  finalCta: string;
  scenes: StoryboardScene[];
}

export interface HindiAdaptation {
  hooks: string[];
  script: AdScript;
  caption: string;
  whatsappMessage: string;
  posterHeadline: string;
  rationale: string;
}

export interface StyleChangeComparison {
  style: AdvertisingStyle;
  changedAt: string;
  previousHook: string;
  newHook: string;
  previousScriptBeginning: string;
  newScriptBeginning: string;
  rationale?: string;
}

export interface CampaignData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  categoryBadge?: 'DIRECT RESPONSE' | 'BRAND' | 'SOCIAL PROOF' | 'FESTIVE PROMO' | 'PRODUCT HERO' | string;
  isDemo?: boolean;
  input: CampaignInput;
  modelMetadata: ModelMetadata;
  hooks: string[];
  script: AdScript;
  caption: string;
  hashtags: string[];
  whatsappMessage: string;
  poster: PosterConfig;
  targetAudienceProfile: string;
  campaignObjective: string;
  psychologicalRationale: string;
  hindiAdaptation?: HindiAdaptation | null;
  storyboard: ReelReadyStoryboard;
  styleHistory?: StyleChangeComparison[];
}

export interface ServerStatus {
  status: string;
  version: string;
  providers: {
    geminiKeyConfigured: boolean;
    elevenLabsConfigured: boolean;
    openWeightModel: string;
    fallbackModel: string;
    ttsModel: string;
  };
  demoCampaignsAvailable: string[];
}
