import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '10mb' }));

// Shared GenAI client for server-side operations
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Demo campaigns catalog for instant testing & offline/fallback access
const DEMO_CAMPAIGNS: Record<string, any> = {
  'velocity-sneaker': {
    id: 'demo-velocity-sneaker',
    title: 'Velocity Pro — Carbon Sprint Running Shoe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    categoryBadge: 'DIRECT RESPONSE',
    isDemo: true,
    input: {
      productName: 'Velocity Pro Carbon Runner',
      description: 'Ultralight performance marathon running shoe with dual-density carbon fiber propulsion plate and breathable hydrophobic mesh upper.',
      keyBenefits: '4% energy return boost, weighs only 185g, anti-pronation heel lock, race-day tuned.',
      price: '$139 (Reg $199)',
      offer: '30% Off Season Kickoff + Free Carbon Insoles',
      targetAudience: 'Marathon runners, triathletes, track athletes, and fitness enthusiasts',
      language: 'English',
      style: 'Bold',
      platform: 'Instagram',
      duration: 15,
      modelPreference: 'demo',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      categoryBadge: 'DIRECT RESPONSE',
    },
    modelMetadata: {
      modelUsed: 'Curated Campaign Engine',
      provider: 'AdGenius Curated Pro',
      isOpenWeight: false,
      generatedAt: new Date().toISOString(),
      note: 'Verified sample campaign ready for immediate testing and export.',
    },
    hooks: [
      'Built to break limits. Lighter. Faster. Stronger.',
      'What if your next 10K run felt like running on zero gravity?',
      'Stop losing seconds to heavy soles. Meet the 185g carbon plate racer.',
    ],
    script: {
      beginning: 'Every millisecond counts when you are chasing your personal best.',
      benefits: 'Velocity Pro packs an explosive carbon-fiber propulsion plate into a featherlight 185g frame. Engineered with breathable mesh and responsive foam for maximum energy rebound on every stride.',
      callToAction: 'Lace up your fastest season yet. Tap below to claim 30% off with complimentary carbon performance insoles.',
      fullText: 'Every millisecond counts when you are chasing your personal best. Velocity Pro packs an explosive carbon-fiber propulsion plate into a featherlight 185g frame. Engineered with breathable mesh and responsive foam for maximum energy rebound on every stride. Lace up your fastest season yet. Tap below to claim 30% off with complimentary carbon performance insoles.',
    },
    caption: 'BUILT TO BREAK LIMITS. ⚡🏃 Engineered with carbon-fiber propulsion for effortless speed and explosive rebound. Claim 30% OFF launch pricing today! Link in bio.',
    hashtags: ['#VelocityPro', '#RunningShoes', '#MarathonTraining', '#CarbonPlate', '#TrackAndField', '#LighterFasterStronger'],
    whatsappMessage: '⚡ *Velocity Pro Carbon Sprint Launch Special!*\n\nShave seconds off your personal best with the 185g carbon plate running shoe.\n\n🔥 *Launch Perks:*\n• Flat 30% Off: $139 (Was $199)\n• Free Carbon Insole Upgrade included\n• Free Express Shipping 📦\n\n👉 *Claim yours now:* https://velocity.run/kickoff',
    poster: {
      headline: 'BUILT TO BREAK LIMITS',
      subheadline: 'LIGHTER. FASTER. STRONGER.',
      offerBadge: '30% OFF KICKOFF',
      priceTag: '$139 (REG $199)',
      callToAction: 'SHOP NOW',
      layout: 'bold_split',
      aspectRatio: '9:16',
      accentColor: '#8B5CF6',
      productImageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    },
    targetAudienceProfile: 'Dedicated runners and endurance athletes seeking race-day performance gains.',
    campaignObjective: 'Direct-response conversion via high-energy short video and Instagram story ads.',
    psychologicalRationale: 'Appeals to athletic pride and the measurable desire to beat personal records with tangible gear advantages.',
    storyboard: {
      approach: 'Problem and Solution',
      durationSeconds: 15,
      overallPacing: 'Hyper-dynamic cuts synchronized with high-tempo percussion.',
      bgMusicMood: 'Aggressive electronic bass drop with energetic synth rhythms.',
      hookSummary: 'Slow-motion water splash under shoe sole transitioning into explosive sprint.',
      finalCta: '30% Off Season Kickoff — Swipe Up to Shop.',
      scenes: [
        {
          sceneNumber: 1,
          timestamp: '0:00 - 0:03',
          visualDirection: 'Extreme close up: Velocity Pro sneaker striking wet pavement, neon purple water ripples bursting in 120fps slow motion.',
          onScreenText: 'BUILT TO BREAK LIMITS',
          voiceover: 'Built to break limits. Lighter. Faster. Stronger.',
          transition: 'Whip zoom into shoe side-profile.',
        },
        {
          sceneNumber: 2,
          timestamp: '0:03 - 0:09',
          visualDirection: 'Cutaway 3D wireframe animation displaying carbon fiber spring plate flexing and returning kinetic energy.',
          onScreenText: '185g Carbon Propulsion • 4% Energy Boost',
          voiceover: 'Dual-density carbon fiber engineered to propel every stride forward.',
          transition: 'Quick cut to athlete accelerating past competitors.',
        },
        {
          sceneNumber: 3,
          timestamp: '0:09 - 0:15',
          visualDirection: 'Athlete crossing finish line under stadium floodlights; high-contrast title card slides into view.',
          onScreenText: '$139 • 30% OFF LAUNCH SPECIAL',
          voiceover: 'Lace up your personal best. Tap below for 30% off today.',
          transition: 'Pulsing purple glow button overlay.',
        },
      ],
    },
  },
  'lumina-serum': {
    id: 'demo-lumina-serum',
    title: 'Lumina — Hydra Glow Hyaluronic Serum',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
    categoryBadge: 'BRAND',
    isDemo: true,
    input: {
      productName: 'Lumina Hydra Glow Serum',
      description: 'Triple-molecular hyaluronic acid serum with 5% niacinamide, antioxidant botanical extracts, and barrier-repair ceramides.',
      keyBenefits: 'Deep 72-hour dermal hydration, reduces redness, pore-smoothing, 100% fragrance-free.',
      price: '$38 / 30ml',
      offer: 'Complimentary Rose Quartz Facial Roller with first order',
      targetAudience: 'Skincare enthusiasts, women and men 22-45 seeking glass-skin glow without irritation',
      language: 'English',
      style: 'Premium',
      platform: 'Instagram',
      duration: 30,
      modelPreference: 'demo',
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
      categoryBadge: 'BRAND',
    },
    modelMetadata: {
      modelUsed: 'Curated Campaign Engine',
      provider: 'AdGenius Curated Pro',
      isOpenWeight: false,
      generatedAt: new Date().toISOString(),
      note: 'Verified sample campaign ready for immediate testing and export.',
    },
    hooks: [
      'Glowing is confidence. Clinically proven. Naturally radiant.',
      'Stop hiding dull skin behind 5 layers of heavy foundation.',
      'The 3-drop morning ritual dermatologists swear by for glass skin.',
    ],
    script: {
      beginning: 'Healthy skin doesn’t need filters — it just needs the right nourishment.',
      benefits: 'Lumina Hydra Glow pairs triple-molecular hyaluronic acid with soothing niacinamide. It penetrates deeply to plump fine lines, calm redness, and deliver a natural all-day lit-from-within glow.',
      callToAction: 'Experience real dermal radiance. Order your bottle today and receive a complimentary handcrafted Rose Quartz roller.',
      fullText: 'Healthy skin doesn’t need filters — it just needs the right nourishment. Lumina Hydra Glow pairs triple-molecular hyaluronic acid with soothing niacinamide. It penetrates deeply to plump fine lines, calm redness, and deliver a natural all-day lit-from-within glow. Experience real dermal radiance. Order your bottle today and receive a complimentary handcrafted Rose Quartz roller.',
    },
    caption: 'Glowing is confidence. ✨ Clinically proven hydration powered by triple-weight hyaluronic acid and niacinamide. Receive a FREE Rose Quartz roller with your first bottle! Tap the link to discover your glow.',
    hashtags: ['#LuminaGlow', '#GlassSkinRoutine', '#HyaluronicAcid', '#CleanSkincare', '#SkinBarrierHealth', '#RadiantSkin'],
    whatsappMessage: '✨ *Discover Glass Skin with Lumina Hydra Glow!*\n\nDeep 72-hour moisture with pure niacinamide & ceramides for that effortless natural glow.\n\n🎁 *VIP Welcome Gift:*\n• Complimentary Handcrafted Rose Quartz Roller\n• Free shipping on your first bottle\n\n👉 *Tap to claim yours:* https://lumina.skin/glow',
    poster: {
      headline: 'Glowing is confidence.',
      subheadline: 'Clinically proven. Naturally radiant.',
      offerBadge: 'FREE ROSE QUARTZ ROLLER',
      priceTag: '$38 / 30ml',
      callToAction: 'DISCOVER YOUR GLOW',
      layout: 'luxury_dark',
      aspectRatio: '9:16',
      accentColor: '#F43F5E',
      productImageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
    },
    targetAudienceProfile: 'Conscious skincare consumers prioritizing gentle, barrier-restoring ingredients with visible radiance.',
    campaignObjective: 'Brand affinity and recurring subscription trials.',
    psychologicalRationale: 'Shifts focus from covering imperfections to celebrating healthy, hydrated natural skin confidence.',
    storyboard: {
      approach: 'Product Showcase',
      durationSeconds: 30,
      overallPacing: 'Luminous, serene, and tactile with soft ambient lighting.',
      bgMusicMood: 'Ethereal ambient dream-pop with warm piano chords.',
      hookSummary: 'Golden glass dropper releasing a crystal-clear droplet in macro slow-motion onto dewy cheek.',
      finalCta: 'Unlock Your Natural Glow — Shop Lumina Today.',
      scenes: [
        {
          sceneNumber: 1,
          timestamp: '0:00 - 0:06',
          visualDirection: 'Sunlit morning vanity: Golden serum droplet gently falling in macro ultra-slow motion; model with radiant bare skin smiles softly.',
          onScreenText: 'Glowing is confidence.',
          voiceover: 'Healthy skin doesn’t need filters. It just needs pure hydration.',
          transition: 'Gentle dissolve into ingredient visualization.',
        },
        {
          sceneNumber: 2,
          timestamp: '0:06 - 0:18',
          visualDirection: 'Serum gently pressed into skin; texture transitions from liquid drop to smooth velvety finish.',
          onScreenText: 'Triple Hyaluronic Acid + 5% Niacinamide',
          voiceover: 'Lumina penetrates deep beneath the surface to lock in 72 hours of plump, glass-like dewiness.',
          transition: 'Slow pan across amber bottle with gold typography.',
        },
        {
          sceneNumber: 3,
          timestamp: '0:18 - 0:30',
          visualDirection: 'Minimalist product setup with smooth pink rose quartz roller; soft warm ambient glow framing.',
          onScreenText: 'Complimentary Rose Quartz Roller with 1st Order • $38',
          voiceover: 'Experience true radiance. Claim your complimentary Rose Quartz roller with your first order today.',
          transition: 'Soft fade to Lumina logo and Shop button.',
        },
      ],
    },
  },
  'aerosound-headphones': {
    id: 'demo-aerosound-headphones',
    title: 'AeroSound Apex — Studio ANC Wireless Headphones',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    categoryBadge: 'DIRECT RESPONSE',
    isDemo: true,
    input: {
      productName: 'AeroSound Apex Studio ANC',
      description: 'Over-ear audiophile wireless headphones with 45dB hybrid active noise cancellation, custom 40mm beryllium drivers, and 50-hour battery life.',
      keyBenefits: 'Silences cabin and office noise, hi-res lossless wireless audio, cloud-soft memory foam earcups.',
      price: '$179 (Reg $249)',
      offer: 'Save $70 + Free Hardshell Travel Case with code FOCUS',
      targetAudience: 'Software engineers, designers, frequent travelers, gamers, and audiophiles',
      language: 'English',
      style: 'Bold',
      platform: 'Instagram',
      duration: 15,
      modelPreference: 'demo',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      categoryBadge: 'DIRECT RESPONSE',
    },
    modelMetadata: {
      modelUsed: 'Curated Campaign Engine',
      provider: 'AdGenius Curated Pro',
      isOpenWeight: false,
      generatedAt: new Date().toISOString(),
      note: 'Verified sample campaign ready for immediate testing and export.',
    },
    hooks: [
      'Noise out. Focus in. Silence 45dB of chaos instantly.',
      '“The sound is next level.” — Verified Studio Producer',
      'One switch turns crowded cafes into your private acoustic chamber.',
    ],
    script: {
      beginning: 'Tired of open-office chatter and subway roar breaking your deep work flow?',
      benefits: 'AeroSound Apex uses custom 40mm beryllium drivers and 45dB hybrid ANC to eliminate distractions. Enjoy lossless audio clarity and 50 hours of battery life on a single charge.',
      callToAction: 'Step into pure acoustic silence. Save $70 during our studio drop with complimentary hardshell case.',
      fullText: 'Tired of open-office chatter and subway roar breaking your deep work flow? AeroSound Apex uses custom 40mm beryllium drivers and 45dB hybrid ANC to eliminate distractions. Enjoy lossless audio clarity and 50 hours of battery life on a single charge. Step into pure acoustic silence. Save $70 during our studio drop with complimentary hardshell case.',
    },
    caption: 'NOISE OUT. FOCUS IN. 🎧 45dB hybrid active noise cancellation engineered for deep work and audiophile clarity. Save $70 + get a free travel case today only! Link in bio.',
    hashtags: ['#AeroSound', '#ANCHeadphones', '#DeepWork', '#Audiophile', '#TechAccessories', '#NoiseCancelling'],
    whatsappMessage: '🎧 *AeroSound Apex Studio ANC Special Deal!*\n\nSilence office chatter & flight noise with 45dB hybrid ANC and 50-hour battery.\n\n⚡ *Launch Promotion:*\n• Save $70: Now $179 (Reg $249)\n• Free Hardshell Case included\n• 30-Day Risk-Free Trial\n\n👉 *Order with promo code FOCUS:* https://aerosound.audio/apex',
    poster: {
      headline: 'NOISE OUT. FOCUS IN.',
      subheadline: '45dB Hybrid Active Noise Cancellation • 50h Battery',
      offerBadge: 'SAVE $70 TODAY',
      priceTag: '$179 (REG $249)',
      callToAction: 'SHOP NOW',
      layout: 'bold_split',
      aspectRatio: '9:16',
      accentColor: '#3B82F6',
      productImageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    },
    targetAudienceProfile: 'Remote professionals, coders, and audiophiles needing deep focus without distractions.',
    campaignObjective: 'Direct-response sales and impulse tech upgrades.',
    psychologicalRationale: 'Taps into the daily pain point of sensory overload and the desire for productive control.',
    storyboard: {
      approach: 'Problem and Solution',
      durationSeconds: 15,
      overallPacing: 'Loud chaotic opening instantly muted to deep acoustic calm.',
      bgMusicMood: 'Clean cinematic sub-bass with crisp electronic rhythm.',
      hookSummary: 'Noisy bustling subway instantly falls silent as headphones slip over ears.',
      finalCta: 'Save $70 + Free Case — Tap to Shop Now.',
      scenes: [
        {
          sceneNumber: 1,
          timestamp: '0:00 - 0:04',
          visualDirection: 'Overhead camera in chaotic crowded cafe with loud clinking mugs and sirens; model puts on matte black AeroSound Apex.',
          onScreenText: 'NOISE OUT. FOCUS IN.',
          voiceover: 'Noise out. Focus in. Silence the chaos in one click.',
          transition: 'Audio drops to pure silence with visual soundwave freeze.',
        },
        {
          sceneNumber: 2,
          timestamp: '0:04 - 0:10',
          visualDirection: 'Sleek rotating 3D view of earcups on pedestal with blue soundwave dampening visualization.',
          onScreenText: '45dB Hybrid ANC • 50-Hour Battery Life',
          voiceover: 'Beryllium drivers and 45 decibels of hybrid cancellation.',
          transition: 'Cut to clean desktop workspace.',
        },
        {
          sceneNumber: 3,
          timestamp: '0:10 - 0:15',
          visualDirection: 'High-contrast studio product shot with glowing discount badge and travel case accessory.',
          onScreenText: '$179 (SAVE $70) + FREE TRAVEL CASE',
          voiceover: 'Experience studio silence. Save $70 today with code FOCUS.',
          transition: 'Shop Now button with glowing ring.',
        },
      ],
    },
  },
  'origin-coffee': {
    id: 'demo-origin-coffee',
    title: 'Origin Coffee Co. — Ethiopia Single Origin Roast',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    categoryBadge: 'SOCIAL PROOF',
    isDemo: true,
    input: {
      productName: 'Origin Ethiopia Single Origin',
      description: 'Shade-grown specialty grade Arabica beans sourced directly from Yirgacheffe, Ethiopia. Small-batch roasted with tasting notes of wild blueberry, bergamot, and sweet caramel.',
      keyBenefits: 'Direct-trade sourced, roasted 48 hours before shipping, zero bitterness, vibrant fruit notes.',
      price: '$22 / 350g',
      offer: 'Subscribe & Save 20% + Free Ceramic Tasting Cup',
      targetAudience: 'Pour-over and espresso lovers, specialty coffee hobbyists, and morning ritual fans',
      language: 'English',
      style: 'Emotional',
      platform: 'Instagram',
      duration: 30,
      modelPreference: 'demo',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      categoryBadge: 'SOCIAL PROOF',
    },
    modelMetadata: {
      modelUsed: 'Curated Campaign Engine',
      provider: 'AdGenius Curated Pro',
      isOpenWeight: false,
      generatedAt: new Date().toISOString(),
      note: 'Verified sample campaign ready for immediate testing and export.',
    },
    hooks: [
      'Loved by 10,000+ coffee lovers across the country.',
      'Stop drinking supermarket beans roasted 6 months ago.',
      'What if your morning cup tasted like wild blueberries and milk chocolate?',
    ],
    script: {
      beginning: 'You spend a third of your life awake — why settle for stale supermarket coffee?',
      benefits: 'Origin Coffee sources directly from high-elevation family farms in Ethiopia. Roasted in micro-batches every Tuesday and shipped within 48 hours for unmatched vibrancy and aroma.',
      callToAction: 'Elevate your daily brew. Subscribe today to save 20% and receive our handcrafted ceramic tasting cup.',
      fullText: 'You spend a third of your life awake — why settle for stale supermarket coffee? Origin Coffee sources directly from high-elevation family farms in Ethiopia. Roasted in micro-batches every Tuesday and shipped within 48 hours for unmatched vibrancy and aroma. Elevate your daily brew. Subscribe today to save 20% and receive our handcrafted ceramic tasting cup.',
    },
    caption: 'Loved by 10,000+ coffee lovers. ☕ Freshly roasted Ethiopian single origin with vibrant notes of wild berry, citrus, and sweet caramel. Claim your complimentary ceramic cup with your first bag!',
    hashtags: ['#OriginCoffee', '#SingleOrigin', '#SpecialtyCoffee', '#CoffeeLovers', '#PourOver', '#CoffeeCommunity'],
    whatsappMessage: '☕ *Fresh Roast Alert from Origin Coffee Co.!\n\nSingle-origin Yirgacheffe beans roasted within 48 hours of dispatch.\n\n✨ *Coffee Lover Welcome Pack:*\n• 20% Off your first bag: $17.60\n• Bonus: Handcrafted Ceramic Tasting Cup\n• Free shipping on subscriptions\n\n👉 *Order fresh beans today:* https://origincoffee.co/ethiopia',
    poster: {
      headline: 'Loved by 10,000+ Coffee Lovers',
      subheadline: 'ETHIOPIA SINGLE ORIGIN • NOTES OF BERRY, CITRUS & CARAMEL',
      offerBadge: '20% OFF FIRST BAG',
      priceTag: '$22 / 350G',
      callToAction: 'ORDER FRESH ROAST',
      layout: 'luxury_dark',
      aspectRatio: '9:16',
      accentColor: '#D97706',
      productImageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    },
    targetAudienceProfile: 'Discerning coffee enthusiasts who prioritize ethical sourcing, peak freshness, and nuanced roast profiles.',
    campaignObjective: 'Monthly recurring subscription acquisition and foodie social proof.',
    psychologicalRationale: 'Builds instant community trust via social proof while appealing to sensory craftsmanship.',
    storyboard: {
      approach: 'Storytelling',
      durationSeconds: 30,
      overallPacing: 'Artisan craftsmanship cadence with tactile sensory shots.',
      bgMusicMood: 'Warm acoustic folk guitar with cozy ambient morning kitchen soundscape.',
      hookSummary: 'Pour-over bloom expanding with golden crema and rising morning steam.',
      finalCta: 'Subscribe & Save 20% — Taste The Origin Difference.',
      scenes: [
        {
          sceneNumber: 1,
          timestamp: '0:00 - 0:05',
          visualDirection: 'Slow motion gooseneck kettle pouring hot water over fresh ground coffee; rich aromatic bloom bubbles up with golden crema.',
          onScreenText: 'Loved by 10,000+ Coffee Lovers',
          voiceover: 'Why settle for stale coffee when peak freshness exists?',
          transition: 'Cross dissolve to coffee bean bag and roasting process.',
        },
        {
          sceneNumber: 2,
          timestamp: '0:05 - 0:18',
          visualDirection: 'Artisan roaster checking amber roasted beans; smooth pour of velvety black coffee into warm ceramic mug.',
          onScreenText: 'Roasted Within 48 Hours • Notes of Wild Berry & Citrus',
          voiceover: 'Single origin beans from Ethiopia, roasted in small batches every week and delivered to your doorstep.',
          transition: 'Cut to steam rising in sunlit kitchen.',
        },
        {
          sceneNumber: 3,
          timestamp: '0:18 - 0:30',
          visualDirection: 'Origin kraft pouch displayed beside full ceramic mug and scattered whole beans; promo banner slides in.',
          onScreenText: '20% OFF + FREE CERAMIC TASTING CUP',
          voiceover: 'Upgrade your morning ritual. Subscribe today to save 20% plus get a free ceramic cup.',
          transition: 'Pulsing Order Now button overlay.',
        },
      ],
    },
  },
  'chai-bliss': {
    id: 'demo-chai-bliss',
    title: 'Chai Bliss — Royal Saffron CTC Tea',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    categoryBadge: 'FESTIVE PROMO',
    isDemo: true,
    input: {
      productName: 'Chai Bliss Royal Saffron Tea',
      description: 'Hand-picked Assam CTC tea leaves infused with Kashmiri saffron strands and fresh green cardamom pods.',
      keyBenefits: 'Authentic royal taste, rich aroma, 100% natural spices, energizes your morning.',
      price: '₹349 (250g pack)',
      offer: 'Buy 2 Get 1 Free + Free Kullad Cup',
      targetAudience: 'Chai lovers, families, working professionals, and festive gift buyers',
      language: 'English',
      style: 'Emotional',
      platform: 'Instagram',
      duration: 30,
      modelPreference: 'demo',
      imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
      categoryBadge: 'FESTIVE PROMO',
    },
    modelMetadata: {
      modelUsed: 'Curated Campaign Engine',
      provider: 'AdGenius Curated Pro',
      isOpenWeight: false,
      generatedAt: new Date().toISOString(),
      note: 'Verified sample campaign ready for immediate testing and export.',
    },
    hooks: [
      'Stop settling for powdered masala tea when real saffron exists.',
      'Remember the smell of grandmother’s morning kitchen? We captured it in a cup.',
      'What if your daily 5-minute chai break felt like a luxury heritage retreat?',
    ],
    script: {
      beginning: 'Every morning begins in a rush, but your first sip shouldn’t feel like an afterthought.',
      benefits: 'Chai Bliss brings pure golden Kashmiri saffron and crushed green cardamom blended into estate-grown Assam tea. Rich, warm, and naturally fragrant without synthetic essences.',
      callToAction: 'Order your first batch today. Use code ROYALCHAI for Buy 2 Get 1 Free plus a complimentary handcrafted terracotta kullad.',
      fullText: 'Every morning begins in a rush, but your first sip shouldn’t feel like an afterthought. Chai Bliss brings pure golden Kashmiri saffron and crushed green cardamom blended into estate-grown Assam tea. Rich, warm, and naturally fragrant without synthetic essences. Order your first batch today. Use code ROYALCHAI for Buy 2 Get 1 Free plus a complimentary handcrafted terracotta kullad.',
    },
    caption: 'Great mornings aren’t accidental — they’re brewed. ☕✨ Hand-blended Assam tea with genuine Kashmiri saffron strands for that golden aroma you deserve. Claim your free handmade Kullad today! 👇',
    hashtags: ['#ChaiBliss', '#SaffronChai', '#MorningRitual', '#IndianTeaLovers', '#ArtisanBlend', '#DesiChai'],
    whatsappMessage: '☕ *Chai Bliss Royal Saffron Launch Offer!*\n\nUpgrade your morning chai with authentic *Kashmiri Kesar* & crushed green elaichi blended with premium Assam tea.\n\n✨ *Exclusive Festive Deal:*\n• Buy 2 Packs @ ₹698 & Get 1 FREE!\n• Bonus: Handcrafted Terracotta Kullad inside\n• Free shipping across India 🚚\n\n👉 *Tap to order on WhatsApp:* https://wa.me/919876543210?text=I+want+Chai+Bliss+Offer',
    poster: {
      headline: 'The Royal Morning Ritual',
      subheadline: 'Pure Kashmiri Saffron Blended with Assam CTC',
      offerBadge: 'BUY 2 GET 1 FREE',
      priceTag: '₹349 / 250g',
      callToAction: 'Order Now & Get Free Terracotta Kullad',
      layout: 'festive_royal',
      aspectRatio: '9:16',
      accentColor: '#F59E0B',
      productImageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    },
    targetAudienceProfile: 'Urban tea enthusiasts aged 24-55 who appreciate traditional flavours, quality ingredients, and homely nostalgia.',
    campaignObjective: 'Direct-to-consumer trial purchases and viral family WhatsApp forwards for festive gifting.',
    psychologicalRationale: 'Evokes deep nostalgia and comfort, contrasting hurried modern mornings with an affordable luxury sensory ritual.',
    hindiAdaptation: {
      hooks: [
        'क्या आपकी सुबह की चाय में असली केसर की खुशबू है?',
        'दादी के हाथ की चाय का स्वाद याद है? पेश है चाय ब्लिस की शाही ताजगी।',
        'सुबह की पहली घूंट साधारण क्यों हो, जब आपका दिन खास होना है?',
      ],
      script: {
        beginning: 'सुबह की भागदौड़ में अक्सर हम खुद के लिए वक्त निकालना भूल जाते हैं। लेकिन आपकी चाय का पहला घूंट कोई जल्दबाजी नहीं मांगता।',
        benefits: 'चाय ब्लिस में है असली कश्मीरी केसर, ताज़ी कुटी हरी इलायची और असम के बागानों की चुनिंदा कड़क पत्तियां। कोई कृत्रिम फ्लेवर नहीं — बस कुदरत का असली स्वाद।',
        callToAction: 'आज ही ऑर्डर करें और पाएं 2 पर 1 मुफ्त, साथ में खूबसूरत मिट्टी का कुल्हड़ बिल्कुल फ्री!',
        fullText: 'सुबह की भागदौड़ में अक्सर हम खुद के लिए वक्त निकालना भूल जाते हैं। लेकिन आपकी चाय का पहला घूंट कोई जल्दबाजी नहीं मांगता। चाय ब्लिस में है असली कश्मीरी केसर, ताज़ी कुटी हरी इलायची और असम के बागानों की चुनिंदा कड़क पत्तियां। कोई कृत्रिम फ्लेवर नहीं — बस कुदरत का असली स्वाद। आज ही ऑर्डर करें और पाएं 2 पर 1 मुफ्त, साथ में खूबसूरत मिट्टी का कुल्हड़ बिल्कुल फ्री!',
      },
      caption: 'सुबह की शुरुआत अब होगी शाही अंदाज में! ☕ शुद्ध कश्मीरी केसर और इलायची वाली कड़क चाय। आज ही ऑर्डर करें और पाएं 1 पैकेट बिल्कुल मुफ्त!',
      whatsappMessage: '☕ *चाय ब्लिस — असली कश्मीरी केसर वाली शाही चाय!*\n\n✨ *विशेष लॉन्च ऑफर:*\n• 2 पैकेट खरीदें और 1 मुफ्त पाएं!\n• साथ में सुंदर कुल्हड़ फ्री\n• पूरे भारत में कैश ऑन डिलीवरी उपलब्ध 🚚\n\n👉 *ऑर्डर करने के लिए रिप्लाई करें:* "हाँ मुझे चाहिए"',
      posterHeadline: 'हर सुबह बने शाही उत्सव',
      rationale: 'भारतीय घरों में चाय एक भावना है, केवल पेय नहीं। केसर और कुल्हड़ का उल्लेख भावनात्मक जुड़ाव और प्रीमियम गुणवत्ता को दर्शाता है।',
    },
    storyboard: {
      approach: 'Product Showcase',
      durationSeconds: 30,
      overallPacing: 'Slow, sensory opening leading into a brisk, appetizing pour and warm CTA.',
      bgMusicMood: 'Warm acoustic sitar with modern lofi acoustic beat.',
      hookSummary: 'Extreme close-up of boiling golden tea with saffron threads unravelling.',
      finalCta: 'Limited Festive Offer — Buy 2 Get 1 Free on Bio link.',
      scenes: [
        {
          sceneNumber: 1,
          timestamp: '0:00 - 0:04',
          visualDirection: 'Macro slow-motion shot: Deep amber tea boiling in a copper saucepan; real red saffron strands slowly blossoming into golden swirls.',
          onScreenText: 'Is your chai really made of pure saffron?',
          voiceover: 'Stop settling for regular dust tea when real royal saffron exists.',
          transition: 'Match cut to crushing whole green cardamom pods in brass mortar.',
        },
        {
          sceneNumber: 2,
          timestamp: '0:04 - 0:11',
          visualDirection: 'Cozy sunlit morning balcony; hands wrapping around a steaming terracotta kullad; steam rising peacefully into crisp air.',
          onScreenText: '100% Assam CTC + Kashmiri Kesar',
          voiceover: 'Every morning begins in a rush. But your first sip deserves pure indulgence.',
          transition: 'Smooth slide right to ingredients flat-lay.',
        },
        {
          sceneNumber: 3,
          timestamp: '0:11 - 0:20',
          visualDirection: 'Dynamic split-screen: Left shows whole cardamom and saffron; right shows pouring tea from height into kullad creating creamy froth.',
          onScreenText: 'Zero Artificial Essences • Authentic Aroma',
          voiceover: 'Hand-blended Assam leaves with crushed green cardamom. Pure warmth, zero artificial aromas.',
          transition: 'Zooms in to the rich foam texture.',
        },
        {
          sceneNumber: 4,
          timestamp: '0:20 - 0:30',
          visualDirection: 'Product pack displayed beside smoking kullad and golden tea leaves; animated offer banner slides up.',
          onScreenText: 'BUY 2 GET 1 FREE + FREE KULLAD • ₹349',
          voiceover: 'Try Chai Bliss today. Buy 2 Get 1 Free plus your free handmade kullad. Tap below to order now.',
          transition: 'Pulsing button overlay with shop link.',
        },
      ],
    },
  },
  'ecoglow-lamp': {
    id: 'demo-ecoglow-lamp',
    title: 'EcoGlow — Bamboo Wireless Charging Desk Lamp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    categoryBadge: 'PRODUCT HERO',
    isDemo: true,
    input: {
      productName: 'EcoGlow Bamboo Smart Lamp',
      description: 'Handcrafted sustainable bamboo desk lamp featuring 15W Qi fast wireless phone charging, stepless touch dimming, and eye-care warm LED lighting.',
      keyBenefits: 'Declutters workspace, zero eye-strain during late nights, sustainable bamboo build, fast charging.',
      price: '$49.99 (Retail $79)',
      offer: 'Launch Discount 35% Off + Free Cable Organizers',
      targetAudience: 'Remote workers, coders, students, designers, and minimalist desk setup lovers',
      language: 'English',
      style: 'Premium',
      platform: 'Instagram',
      duration: 15,
      modelPreference: 'demo',
      imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      categoryBadge: 'PRODUCT HERO',
    },
    modelMetadata: {
      modelUsed: 'Curated Campaign Engine',
      provider: 'AdGenius Curated Pro',
      isOpenWeight: false,
      generatedAt: new Date().toISOString(),
      note: 'Verified sample campaign ready for immediate testing and export.',
    },
    hooks: [
      'Your desk is cluttered with 4 messy charging cords right now. Fix that in 5 seconds.',
      'The single upgrade that turns any budget table into an executive minimalist workspace.',
      'Late-night screen headaches? It’s not your monitor — it’s your harsh room lighting.',
    ],
    script: {
      beginning: 'Messy wires and harsh fluorescent lights destroy focus before your workday even starts.',
      benefits: 'The EcoGlow lamp is carved from solid sustainable bamboo, houses an ultra-fast 15W wireless charger in its base, and delivers flicker-free diffused warm light engineered for zero eye fatigue.',
      callToAction: 'Elevate your desk sanctuary. Grab 35% off during our launch event with free worldwide shipping.',
      fullText: 'Messy wires and harsh fluorescent lights destroy focus before your workday even starts. The EcoGlow lamp is carved from solid sustainable bamboo, houses an ultra-fast 15W wireless charger in its base, and delivers flicker-free diffused warm light engineered for zero eye fatigue. Elevate your desk sanctuary. Grab 35% off during our launch event with free worldwide shipping.',
    },
    caption: 'Clean desk. Charged phone. Zero eye strain. 💡✨ Crafted from solid renewable bamboo with a hidden 15W wireless charging pad. Get 35% OFF today only! Link in bio.',
    hashtags: ['#DeskSetup', '#MinimalistWorkspace', '#WorkFromHome', '#TechGadgets', '#EcoFriendlyTech', '#AestheticDesk'],
    whatsappMessage: '💡 *EcoGlow Minimalist Desk Lamp Launch!* \n\nSay goodbye to cable clutter. Charge your smartphone wirelessly on natural sustainable bamboo while enjoying soothing eye-care lighting.\n\n⚡ *Launch Special:* $49.99 (Was $79)\n🎁 Free Cable Organizer Kit included\n\n👉 *Claim yours before stock runs out:* https://ecoglow.shop/launch',
    poster: {
      headline: 'The Ultimate Minimalist Desk Upgrade',
      subheadline: 'Handcrafted Bamboo • 15W Fast Wireless Charger • Eye-Care LED',
      offerBadge: '35% OFF LAUNCH SALE',
      priceTag: '$49.99 (Reg $79)',
      callToAction: 'Order Today & Get Free Cable Kit',
      layout: 'luxury_dark',
      aspectRatio: '9:16',
      accentColor: '#10B981',
      productImageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    },
    targetAudienceProfile: 'Millennial and Gen-Z knowledge workers, designers, and tech professionals wanting a clean aesthetic desk.',
    campaignObjective: 'Impulse purchase conversion via high-aesthetic social media video and carousel ads.',
    psychologicalRationale: 'Taps into the modern obsession with clean, productive desk setups and frictionless cord-free living.',
    storyboard: {
      approach: 'Problem and Solution',
      durationSeconds: 15,
      overallPacing: 'Snappy problem intro, satisfying snap-in wireless charge action, and sleek luxury close.',
      bgMusicMood: 'Crisp future-chill electronic beat with clean bassline.',
      hookSummary: 'Frustrated worker untangling tangled phone cables; cuts immediately to sleek lamp.',
      finalCta: '35% Off Launch Sale — Swipe up to shop.',
      scenes: [
        {
          sceneNumber: 1,
          timestamp: '0:00 - 0:03',
          visualDirection: 'Overhead fast zoom: Messy desk with 4 knotted phone chargers and harsh room glare.',
          onScreenText: 'Tired of cable clutter on your desk?',
          voiceover: 'Tired of tangled cords ruining your workflow?',
          transition: 'Fast whip pan to clean dark walnut desk.',
        },
        {
          sceneNumber: 2,
          timestamp: '0:03 - 0:08',
          visualDirection: 'Phone placed softly on smooth bamboo base; charging animation illuminates smoothly while gentle warm lamp halo turns on with one touch.',
          onScreenText: '15W Fast Charge • Stepless Touch Dimming',
          voiceover: 'EcoGlow replaces your lamp and chargers with solid sustainable bamboo.',
          transition: 'Slow pan across the natural wood grain.',
        },
        {
          sceneNumber: 3,
          timestamp: '0:08 - 0:15',
          visualDirection: 'Cinematic wide shot of atmospheric dark home office bathed in cozy diffused amber light; clean minimalist branding overlay.',
          onScreenText: 'LAUNCH SPECIAL $49.99 • 35% OFF',
          voiceover: 'Zero eye fatigue, zero clutter. Get 35% off for a limited time.',
          transition: 'Fade to brand logo and Buy Now button.',
        },
      ],
    },
  },
};

// System prompt for Campaign Generation
const CAMPAIGN_SYSTEM_PROMPT = `You are AdGenius AI, an elite advertising strategist and copywriter helping small businesses, shopkeepers, freelancers, and direct-to-consumer creators.
Create high-converting, ethical advertising campaigns.
CRITICAL INTEGRITY RULES:
- Never fabricate fake user testimonials, false medical claims, or guaranteed sales promises.
- Only utilize the product facts, benefits, and prices provided by the user.
- If target language is Hindi, generate natural, culturally resonant Indian advertising Hindi (not robotic literal translations).
- Return strictly valid JSON conforming to the requested schema.`;

// Helper to sanitize JSON response from LLM
function extractJsonFromText(rawText: string): any {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return JSON.parse(cleaned);
}

// API Health & Provider Status
app.get('/api/status', async (_req, res) => {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY);
  const hasElevenLabsKey = Boolean(process.env.ELEVENLABS_API_KEY);

  res.json({
    status: 'online',
    version: '1.0.0',
    providers: {
      geminiKeyConfigured: hasGeminiKey,
      elevenLabsConfigured: hasElevenLabsKey,
      openWeightModel: 'gemma-4-26b-a4b-it',
      openWeightDisplayName: 'Gemma 4 26B A4B IT',
      fallbackModel: 'gemini-3.1-flash-lite',
      ttsModel: 'gemini-3.8-flash-lite-tts',
    },
    demoCampaignsAvailable: Object.keys(DEMO_CAMPAIGNS),
  });
});

// API: Direct Gemma Test Endpoint (Verifies live Google API connection to Gemma)
app.get('/api/gemma/test', async (_req, res) => {
  const startTime = Date.now();
  const testModel = 'gemma-4-26b-a4b-it';

  try {
    const testPrompt = `Create a 1-sentence advertising hook and 1 short caption for an organic cold-brew coffee brand.
Return JSON:
{
  "headline": "Punchy hook",
  "caption": "Short caption with 2 hashtags",
  "hindiHeadline": "Hindi hook"
}`;

    const gemmaRes = await ai.models.generateContent({
      model: testModel,
      contents: testPrompt,
      config: {
        systemInstruction: 'You are AdGenius AI, an expert advertising copywriter. Return strictly valid JSON.',
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    });

    const durationMs = Date.now() - startTime;
    const rawText = gemmaRes.text || '{}';
    const parsed = extractJsonFromText(rawText);

    res.json({
      success: true,
      modelUsed: testModel,
      displayName: 'Gemma 4 26B A4B IT',
      provider: 'Google AI inference (Open-Weight)',
      latencyMs: durationMs,
      verifiedDirectConnection: true,
      sampleOutput: parsed,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Gemma direct test failed:', err);
    res.status(500).json({
      success: false,
      modelAttempted: testModel,
      error: 'Direct Gemma connection failed',
      technicalDetail: err?.message || String(err),
      timestamp: new Date().toISOString(),
    });
  }
});

// API: Generate Full Campaign
app.post('/api/campaign/generate', async (req, res) => {
  try {
    const {
      productName,
      description,
      keyBenefits,
      price,
      offer,
      targetAudience,
      language = 'English',
      style = 'Emotional',
      platform = 'Instagram',
      duration = 30,
      modelPreference = 'open-weight-gemma',
      demoKey,
    } = req.body;

    if (!productName || !description) {
      return res.status(400).json({ error: 'Product name and description are required.' });
    }

    // If explicit demo campaign is requested
    if (modelPreference === 'demo' || demoKey) {
      const selectedDemo = DEMO_CAMPAIGNS[demoKey] || DEMO_CAMPAIGNS['chai-bliss'];
      const adapted = JSON.parse(JSON.stringify(selectedDemo));
      adapted.id = 'camp-' + Date.now();
      adapted.input.productName = productName;
      adapted.input.description = description;
      if (price) adapted.input.price = price;
      if (offer) adapted.input.offer = offer;
      if (targetAudience) adapted.input.targetAudience = targetAudience;
      adapted.input.language = language;
      adapted.input.style = style;
      adapted.input.platform = platform;
      adapted.input.duration = duration;
      return res.json({ success: true, campaign: adapted });
    }

    // Build user prompt
    const prompt = `Create a complete advertising campaign for the following product:
- Product / Service: "${productName}"
- Description: "${description}"
- Key Benefits: "${keyBenefits || 'N/A'}"
- Price: "${price || 'Contact for price'}"
- Offer: "${offer || 'Special limited time deal'}"
- Target Audience: "${targetAudience || 'Potential buyers seeking quality'}"
- Primary Language: "${language}"
- Advertising Style: "${style}" (Reflect this tone consistently)
- Campaign Platform: "${platform}"
- Video Duration: ${duration} seconds

Return a JSON object with this exact structure:
{
  "title": "Short descriptive campaign title",
  "hooks": [
    "Hook 1 (High contrast curiosity or relatable pain point)",
    "Hook 2 (Vivid lifestyle or sensory trigger)",
    "Hook 3 (Direct benefit or counter-intuitive claim)"
  ],
  "script": {
    "beginning": "Opening 5-8 seconds setting context or hook",
    "benefits": "Core value proposition, features, and emotional relief",
    "callToAction": "Clear next action with offer and urgency without fake countdowns",
    "fullText": "Continuous script reading"
  },
  "caption": "Punchy social caption with line breaks and emojis suitable for ${platform}",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6"],
  "whatsappMessage": "Formatted WhatsApp text with asterisks for bolding, bullet points, offer breakdown, and CTA link placeholder",
  "poster": {
    "headline": "Bold catchy 3-6 word poster headline",
    "subheadline": "Supporting benefit sentence",
    "offerBadge": "${offer || 'LIMITED TIME OFFER'}",
    "priceTag": "${price || 'SPECIAL PRICE'}",
    "callToAction": "Order Now / Shop Today",
    "layout": "bold_split",
    "accentColor": "#8B5CF6"
  },
  "targetAudienceProfile": "Specific profile of the buyer persona",
  "campaignObjective": "Core business objective (e.g., direct conversion, awareness, footfall)",
  "psychologicalRationale": "Why this specific tone and hook structure will resonate with this target audience",
  "hindiAdaptation": {
    "hooks": ["Hindi Hook 1", "Hindi Hook 2", "Hindi Hook 3"],
    "script": {
      "beginning": "Hindi opening",
      "benefits": "Hindi benefits",
      "callToAction": "Hindi CTA",
      "fullText": "Full Hindi script"
    },
    "caption": "Natural Hindi social caption",
    "whatsappMessage": "Formatted Hindi WhatsApp copy",
    "posterHeadline": "Catchy Hindi poster headline",
    "rationale": "Hindi cultural rationale"
  },
  "storyboard": {
    "approach": "Product Showcase",
    "durationSeconds": ${duration},
    "overallPacing": "Pacing description",
    "bgMusicMood": "Background music mood and instrument suggestion",
    "hookSummary": "Description of first 3 seconds",
    "finalCta": "Final closing call to action visual",
    "scenes": [
      {
        "sceneNumber": 1,
        "timestamp": "0:00 - 0:04",
        "visualDirection": "Detailed camera movement, subject action, props, lighting",
        "onScreenText": "Short punchy text overlay",
        "voiceover": "Voiceover line for this scene",
        "transition": "Cut, whip zoom, dissolve, etc."
      },
      {
        "sceneNumber": 2,
        "timestamp": "0:04 - 0:10",
        "visualDirection": "Visual showing product benefits and transformation",
        "onScreenText": "Key benefit highlight text",
        "voiceover": "Core benefit voiceover narration",
        "transition": "Smooth pan or match cut"
      },
      {
        "sceneNumber": 3,
        "timestamp": "0:10 - 0:15",
        "visualDirection": "Closing hero product shot with final call to action and offer badge",
        "onScreenText": "Final CTA & Special Offer Text",
        "voiceover": "Compelling call to action and offer line",
        "transition": "Brand logo reveal overlay"
      }
    ]
  }
}
Note: Ensure you generate at least 3 detailed scenes for a ${duration}-second video plan.`;

    let rawOutput = '';
    let modelUsed = '';
    let isOpenWeight = false;

    // Handle Open-Weight Gemma request (Default)
    if (modelPreference === 'open-weight-gemma') {
      try {
        // Direct call to Google's supported Gemma 4 model (gemma-4-26b-a4b-it)
        const openWeightRes = await ai.models.generateContent({
          model: 'gemma-4-26b-a4b-it',
          contents: prompt,
          config: {
            systemInstruction: CAMPAIGN_SYSTEM_PROMPT,
            temperature: 0.7,
            responseMimeType: 'application/json',
          },
        });
        rawOutput = openWeightRes.text || '';
        modelUsed = 'gemma-4-26b-a4b-it';
        isOpenWeight = true;
      } catch (gemmaErr: any) {
        // Strictly adhere to: DO NOT silently switch or fallback to another model!
        console.error('Gemma generation error:', gemmaErr);
        return res.status(503).json({
          success: false,
          errorType: 'OPEN_WEIGHT_UNAVAILABLE',
          modelAttempted: 'gemma-4-26b-a4b-it',
          isOpenWeight: true,
          message:
            'The open-weight Gemma model (gemma-4-26b-a4b-it) returned an error from Google AI inference. In compliance with our transparent AI policy, we do NOT silently substitute another model without your consent.',
          technicalDetail: gemmaErr?.message || String(gemmaErr),
          options: [
            {
              id: 'gemini-fast',
              label: 'Switch to Gemini 3.1 Flash Lite',
              badge: 'Proprietary Fallback (Sub-second)',
            },
            {
              id: 'demo',
              label: 'Load Verified Production Sample Campaign',
              badge: 'Instant Offline Pro',
            },
          ],
        });
      }
    } else {
      // User explicitly selected Gemini Fallback (gemini-3.1-flash-lite)
      const flashRes = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          systemInstruction: CAMPAIGN_SYSTEM_PROMPT,
          temperature: 0.7,
          responseMimeType: 'application/json',
        },
      });
      rawOutput = flashRes.text || '';
      modelUsed = 'gemini-3.1-flash-lite';
      isOpenWeight = false;
    }

    if (!rawOutput) {
      throw new Error('Model produced empty response');
    }

    console.log(`[Campaign Generate] Successfully received output from ${modelUsed} (${rawOutput.length} chars)`);
    const parsed = extractJsonFromText(rawOutput);

    // Build complete campaign object
    const campaign = {
      id: 'camp-' + Date.now(),
      title: parsed.title || `${productName} Campaign`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      input: {
        productName,
        description,
        keyBenefits,
        price,
        offer,
        targetAudience,
        language,
        style,
        platform,
        duration,
        modelPreference,
      },
      modelMetadata: {
        modelUsed,
        provider: isOpenWeight ? 'Google Gemma (gemma-4-26b-a4b-it)' : 'Google Gemini (Fast Fallback)',
        isOpenWeight,
        generatedAt: new Date().toISOString(),
      },
      hooks: parsed.hooks || [],
      script: parsed.script || {
        beginning: '',
        benefits: '',
        callToAction: '',
        fullText: '',
      },
      caption: parsed.caption || '',
      hashtags: parsed.hashtags || [],
      whatsappMessage: parsed.whatsappMessage || '',
      poster: {
        headline: parsed.poster?.headline || productName,
        subheadline: parsed.poster?.subheadline || description.slice(0, 80),
        offerBadge: parsed.poster?.offerBadge || offer || 'SPECIAL OFFER',
        priceTag: parsed.poster?.priceTag || price || 'BEST VALUE',
        callToAction: parsed.poster?.callToAction || 'Shop Now',
        layout: parsed.poster?.layout || 'bold_split',
        aspectRatio: '1:1',
        accentColor: parsed.poster?.accentColor || '#8B5CF6',
        bgGradient: 'radial-gradient(circle at 50% 30%, #1e1b4b 0%, #0f172a 100%)',
      },
      targetAudienceProfile: parsed.targetAudienceProfile || targetAudience,
      campaignObjective: parsed.campaignObjective || 'Customer Acquisition & Sales',
      psychologicalRationale: parsed.psychologicalRationale || '',
      hindiAdaptation: parsed.hindiAdaptation || null,
      storyboard: parsed.storyboard || {
        approach: 'Product Showcase',
        durationSeconds: duration,
        overallPacing: 'Dynamic and engaging',
        bgMusicMood: 'Uplifting commercial pop',
        hookSummary: parsed.hooks?.[0] || 'Attention hook',
        finalCta: parsed.script?.callToAction || 'Visit website',
        scenes: [],
      },
    };

    res.json({ success: true, campaign });
  } catch (error: any) {
    console.error('Campaign generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate campaign',
      details: error.message,
    });
  }
});

// API: Regenerate a single section
app.post('/api/campaign/regenerate-section', async (req, res) => {
  try {
    const { campaign, section, instructions, modelPreference = 'gemini-fast' } = req.body;
    if (!campaign || !section) {
      return res.status(400).json({ error: 'Campaign and section are required.' });
    }

    const prompt = `You are AdGenius AI. Regenerate ONLY the "${section}" section for the following campaign:
Product: ${campaign.input?.productName}
Description: ${campaign.input?.description}
Current Style: ${campaign.input?.style}
Platform: ${campaign.input?.platform}
Language: ${campaign.input?.language}
Additional user instructions: ${instructions || 'Make it fresher and more punchy'}

Return ONLY a JSON object with the regenerated key "${section}" in the format matching:
- if hooks: { "hooks": ["Hook 1", "Hook 2", "Hook 3"] }
- if script: { "script": { "beginning": "...", "benefits": "...", "callToAction": "...", "fullText": "..." } }
- if caption: { "caption": "..." }
- if hashtags: { "hashtags": ["#tag1", "#tag2", ...] }
- if whatsappMessage: { "whatsappMessage": "..." }
- if rationale: { "psychologicalRationale": "..." }
- if poster: { "poster": { "headline": "...", "subheadline": "...", "offerBadge": "...", "priceTag": "...", "callToAction": "..." } }`;

    let modelUsed = 'gemini-3.1-flash-lite';
    let isOpenWeight = false;

    if (modelPreference === 'open-weight-gemma' || campaign.modelMetadata?.isOpenWeight) {
      try {
        const gemmaRes = await ai.models.generateContent({
          model: 'gemma-4-26b-a4b-it',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
        const parsed = extractJsonFromText(gemmaRes.text || '{}');
        return res.json({
          success: true,
          section,
          data: parsed[section] || parsed,
          modelMetadata: { modelUsed: 'gemma-4-26b-a4b-it', isOpenWeight: true },
        });
      } catch (err: any) {
        return res.status(503).json({
          success: false,
          errorType: 'OPEN_WEIGHT_UNAVAILABLE',
          modelAttempted: 'gemma-4-26b-a4b-it',
          message: 'Gemma model (gemma-4-26b-a4b-it) returned an error for section regeneration.',
          technicalDetail: err?.message || String(err),
        });
      }
    }

    const flashRes = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = extractJsonFromText(flashRes.text || '{}');
    res.json({
      success: true,
      section,
      data: parsed[section] || parsed,
      modelMetadata: { modelUsed, isOpenWeight },
    });
  } catch (error: any) {
    console.error('Section regeneration error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Creative Ad Style Switcher (with before & after comparison)
app.post('/api/campaign/adapt-style', async (req, res) => {
  try {
    const { campaign, newStyle, modelPreference = 'open-weight-gemma' } = req.body;
    if (!campaign || !newStyle) {
      return res.status(400).json({ error: 'Campaign and newStyle are required.' });
    }

    const prompt = `You are AdGenius AI. Adapt the existing campaign to the "${newStyle}" advertising style.
Product: ${campaign.input?.productName}
Description: ${campaign.input?.description}
Benefits: ${campaign.input?.keyBenefits}
Previous Style: ${campaign.input?.style}
New Desired Style: ${newStyle}

Generate updated hooks, script, caption, and whatsappMessage specifically adapted to "${newStyle}".
Return JSON:
{
  "hooks": ["New Hook 1", "New Hook 2", "New Hook 3"],
  "script": {
    "beginning": "New opening",
    "benefits": "New benefits phrasing",
    "callToAction": "New CTA",
    "fullText": "New full script"
  },
  "caption": "New caption",
  "whatsappMessage": "New WhatsApp message",
  "styleRationale": "Brief explanation of how the tone was adapted to ${newStyle}"
}`;

    const useGemma = modelPreference === 'open-weight-gemma' || campaign.modelMetadata?.isOpenWeight;
    const activeModel = useGemma ? 'gemma-4-26b-a4b-it' : 'gemini-3.1-flash-lite';

    const modelRes = await ai.models.generateContent({
      model: activeModel,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = extractJsonFromText(modelRes.text || '{}');

    // Create before & after comparison entry
    const comparison = {
      style: newStyle,
      changedAt: new Date().toISOString(),
      previousHook: campaign.hooks?.[0] || '',
      newHook: parsed.hooks?.[0] || '',
      previousScriptBeginning: campaign.script?.beginning || '',
      newScriptBeginning: parsed.script?.beginning || '',
      rationale: parsed.styleRationale || `Adapted tone from ${campaign.input?.style} to ${newStyle}`,
    };

    res.json({
      success: true,
      newStyle,
      adaptedData: parsed,
      comparison,
      modelUsed: activeModel,
    });
  } catch (error: any) {
    console.error('Style adaptation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: ReelReady Storyboard Generator (with multiple creative approaches)
app.post('/api/campaign/storyboard', async (req, res) => {
  try {
    const { campaign, approach = 'Product Showcase', duration = 30, modelPreference = 'open-weight-gemma' } = req.body;
    if (!campaign) {
      return res.status(400).json({ error: 'Campaign data is required.' });
    }

    const prompt = `You are a viral short-form video director (Reels, Shorts, TikTok) for AdGenius AI.
Generate a high-conversion, scene-by-scene storyboard for:
Product: ${campaign.input?.productName}
Description: ${campaign.input?.description}
Key Benefits: ${campaign.input?.keyBenefits}
Target Audience: ${campaign.targetAudienceProfile || campaign.input?.targetAudience}
Style: ${campaign.input?.style}
Duration: ${duration} seconds
Creative Approach: "${approach}" (Options: Product Showcase, Problem and Solution, Storytelling, Festive Promotion)

Break down into realistic 3 to 5 scenes with strict seconds timestamps.
Return JSON:
{
  "approach": "${approach}",
  "durationSeconds": ${duration},
  "overallPacing": "e.g., Quick cuts in first 4s, steady showcase middle, punchy CTA finish",
  "bgMusicMood": "Specific genre, tempo, instruments, and vibe",
  "hookSummary": "Why the opening 3 seconds will stop thumb scrolling",
  "finalCta": "Final closing visual & call to action instruction",
  "scenes": [
    {
      "sceneNumber": 1,
      "timestamp": "0:00 - 0:04",
      "visualDirection": "Detailed camera movement, actor action, props, lighting",
      "onScreenText": "Exact text overlay for mobile screen",
      "voiceover": "Spoken line synchronized with this visual",
      "transition": "Cut, zoom-in, whip pan, etc."
    }
  ]
}`;

    const useGemma = modelPreference === 'open-weight-gemma' || campaign.modelMetadata?.isOpenWeight;
    const activeModel = useGemma ? 'gemma-4-26b-a4b-it' : 'gemini-3.1-flash-lite';

    const modelRes = await ai.models.generateContent({
      model: activeModel,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = extractJsonFromText(modelRes.text || '{}');
    res.json({ success: true, storyboard: parsed });
  } catch (error: any) {
    console.error('Storyboard generation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: ElevenLabs AI Voiceover integration (secure server-side API)
app.post('/api/voiceover/generate', async (req, res) => {
  try {
    const { text, voiceId = '21m00Tcm4TlvDq8ikWAM', voiceName = 'Rachel' } = req.body;
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text script is required.' });
    }

    // Honest handling if ElevenLabs API key is missing
    if (!elevenLabsApiKey || elevenLabsApiKey.includes('MY_ELEVENLABS_API_KEY')) {
      return res.status(200).json({
        success: false,
        status: 'unconfigured',
        code: 'ELEVENLABS_NOT_CONFIGURED',
        message:
          'ElevenLabs API key is not configured in server environment secrets (ELEVENLABS_API_KEY).',
        script: text,
        alternative: 'You can copy the voiceover script below or test with Gemini TTS.',
      });
    }

    // Call real ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': elevenLabsApiKey,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      return res.status(200).json({
        success: false,
        status: 'failed',
        code: 'ELEVENLABS_API_ERROR',
        message: `ElevenLabs API request failed (${response.status}): ${errBody.slice(0, 150)}`,
        script: text,
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');
    const audioDataUrl = `data:audio/mpeg;base64,${base64Audio}`;

    return res.json({
      success: true,
      status: 'success',
      provider: 'ElevenLabs',
      voiceName,
      audioUrl: audioDataUrl,
    });
  } catch (error: any) {
    console.error('Voiceover generation error:', error);
    res.status(500).json({
      success: false,
      status: 'error',
      message: error.message,
    });
  }
});

// API: Optional Gemini TTS Voiceover (gemini-3.8-flash-lite-tts)
// Transparently labeled so users have working audio even without an ElevenLabs key
app.post('/api/voiceover/gemini-tts', async (req, res) => {
  try {
    const { text, voiceName = 'Kore' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text script is required.' });
    }

    const ttsResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text,
              speechMetadata: {
                style: 'Clear, charismatic commercial advertising voice',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName === 'Puck' ? 'Puck' : 'Kore' },
          },
        },
      },
    });

    const base64Wav = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Wav) {
      return res.status(500).json({ success: false, error: 'Gemini TTS did not return audio data.' });
    }

    const audioUrl = `data:audio/wav;base64,${base64Wav}`;
    res.json({
      success: true,
      status: 'success',
      provider: 'Google Gemini TTS (gemini-3.8-flash-lite-tts)',
      voiceName,
      audioUrl,
    });
  } catch (err: any) {
    console.error('Gemini TTS error:', err);
    res.status(500).json({
      success: false,
      error: 'Gemini TTS unavailable: ' + (err.message || String(err)),
    });
  }
});

// Vite Middleware for Development / Static serving for Production
async function setupVite() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AdGenius AI full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to start server:', err);
});
