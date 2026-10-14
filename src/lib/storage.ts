import { CampaignData } from '../types/campaign';

const STORAGE_KEY = 'adgenius_ai_saved_campaigns_v3';
const ACTIVE_CAMPAIGN_KEY = 'adgenius_ai_active_campaign_id';

export const CURATED_GALLERY_CAMPAIGNS: CampaignData[] = [
  {
    id: 'demo-velocity-sneaker',
    title: 'Velocity Pro — Carbon Sprint Running Shoe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg',
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
      imageUrl: '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg',
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
      productImageUrl: '/src/assets/images/ad_athletic_shoe_studio_1791966612867.jpg',
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
  {
    id: 'demo-lumina-serum',
    title: 'Lumina — Hydra Glow Hyaluronic Serum',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: '/src/assets/images/ad_luxury_skincare_serum_1791966612984.jpg',
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
      imageUrl: '/src/assets/images/ad_luxury_skincare_serum_1791966612984.jpg',
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
      productImageUrl: '/src/assets/images/ad_luxury_skincare_serum_1791966612984.jpg',
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
  {
    id: 'demo-aerosound-headphones',
    title: 'AeroSound Apex — Studio ANC Wireless Headphones',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: '/src/assets/images/ad_audiophile_headphones_1791966613303.jpg',
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
      imageUrl: '/src/assets/images/ad_audiophile_headphones_1791966613303.jpg',
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
      'Studio-grade acoustic clarity in a featherlight wireless frame.',
      'One switch turns crowded commutes into your private listening room.',
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
      productImageUrl: '/src/assets/images/ad_audiophile_headphones_1791966613303.jpg',
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
  {
    id: 'demo-origin-coffee',
    title: 'Luna Roasts — Velvet Eclipse Single Origin Roast',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: '/src/assets/images/ad_artisan_coffee_roast_1791966658045.jpg',
    categoryBadge: 'BRAND',
    isDemo: true,
    input: {
      productName: 'Luna Roasts Velvet Eclipse',
      description: 'Shade-grown specialty grade Arabica beans sourced directly from Yirgacheffe, Ethiopia. Small-batch roasted with tasting notes of dark chocolate, blackberry, and toffee.',
      keyBenefits: 'Direct-trade sourced, roasted within 48 hours of dispatch, silky mouthfeel, rich cocoa notes.',
      price: '$22 / 340g',
      offer: 'Subscribe & Save 20% + Free Ceramic Tasting Cup',
      targetAudience: 'Pour-over and espresso lovers, specialty coffee hobbyists, and morning ritual fans',
      language: 'English',
      style: 'Premium',
      platform: 'Instagram',
      duration: 30,
      modelPreference: 'demo',
      imageUrl: '/src/assets/images/ad_artisan_coffee_roast_1791966658045.jpg',
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
      'Your morning coffee should feel like a moment, not a transaction.',
      'Stop settling for supermarket beans roasted six months ago.',
      'What if your daily cup tasted like dark chocolate, blackberry, and toffee?',
    ],
    script: {
      beginning: 'You spend a third of your life awake — why settle for stale supermarket coffee?',
      benefits: 'Luna Roasts sources directly from high-elevation family farms in Ethiopia. Roasted in micro-batches every Tuesday and shipped within 48 hours for unmatched vibrancy and aroma.',
      callToAction: 'Elevate your daily brew. Subscribe today to save 20% and receive our handcrafted ceramic tasting cup.',
      fullText: 'You spend a third of your life awake — why settle for stale supermarket coffee? Luna Roasts sources directly from high-elevation family farms in Ethiopia. Roasted in micro-batches every Tuesday and shipped within 48 hours for unmatched vibrancy and aroma. Elevate your daily brew. Subscribe today to save 20% and receive our handcrafted ceramic tasting cup.',
    },
    caption: 'Fresh roast perfection. ☕ Whole bean Ethiopian specialty roast with rich notes of dark chocolate, blackberry, and toffee. Claim your complimentary ceramic cup with your first bag!',
    hashtags: ['#LunaRoasts', '#SingleOrigin', '#SpecialtyCoffee', '#CoffeeLovers', '#PourOver', '#FreshRoast'],
    whatsappMessage: '☕ *Fresh Roast Alert from Luna Roasts!*\n\nSingle-origin Yirgacheffe beans roasted within 48 hours of dispatch.\n\n✨ *Coffee Lover Welcome Pack:*\n• 20% Off your first bag: $17.60\n• Bonus: Handcrafted Ceramic Tasting Cup\n• Free shipping on subscriptions\n\n👉 *Order fresh beans today:* https://lunaroasts.co/eclipse',
    poster: {
      headline: 'FRESH ROAST PERFECTION',
      subheadline: 'ETHIOPIA SINGLE ORIGIN • NOTES OF BLACKBERRY & TOFFEE',
      offerBadge: '20% OFF FIRST BAG',
      priceTag: '$22 / 340G',
      callToAction: 'ORDER FRESH ROAST',
      layout: 'luxury_dark',
      aspectRatio: '9:16',
      accentColor: '#8B5CF6',
      productImageUrl: '/src/assets/images/ad_artisan_coffee_roast_1791966658045.jpg',
    },
    targetAudienceProfile: 'Discerning coffee enthusiasts who prioritize ethical sourcing, peak freshness, and nuanced roast profiles.',
    campaignObjective: 'Monthly recurring subscription acquisition and sensory brand affinity.',
    psychologicalRationale: 'Builds appreciation for artisanal ritual while appealing to sensory craftsmanship.',
    storyboard: {
      approach: 'Storytelling',
      durationSeconds: 30,
      overallPacing: 'Artisan craftsmanship cadence with tactile sensory shots.',
      bgMusicMood: 'Warm acoustic folk guitar with cozy ambient morning kitchen soundscape.',
      hookSummary: 'Pour-over bloom expanding with golden crema and rising morning steam.',
      finalCta: 'Subscribe & Save 20% — Taste The Difference.',
      scenes: [
        {
          sceneNumber: 1,
          timestamp: '0:00 - 0:05',
          visualDirection: 'Slow motion gooseneck kettle pouring hot water over fresh ground coffee; rich aromatic bloom bubbles up with golden crema.',
          onScreenText: 'FRESH ROAST PERFECTION',
          voiceover: 'Why settle for stale coffee when peak freshness exists?',
          transition: 'Cross dissolve to coffee bean bag and roasting process.',
        },
        {
          sceneNumber: 2,
          timestamp: '0:05 - 0:18',
          visualDirection: 'Artisan roaster checking amber roasted beans; smooth pour of velvety black coffee into warm ceramic mug.',
          onScreenText: 'Roasted Within 48 Hours • Dark Chocolate & Blackberry',
          voiceover: 'Single origin beans from Ethiopia, roasted in small batches every week and delivered to your doorstep.',
          transition: 'Cut to steam rising in sunlit kitchen.',
        },
        {
          sceneNumber: 3,
          timestamp: '0:18 - 0:30',
          visualDirection: 'Luna Roasts matte violet pouch displayed beside full ceramic mug and scattered whole beans; promo banner slides in.',
          onScreenText: '20% OFF + FREE CERAMIC TASTING CUP',
          voiceover: 'Upgrade your morning ritual. Subscribe today to save 20% plus get a free ceramic cup.',
          transition: 'Pulsing Order Now button overlay.',
        },
      ],
    },
  },
  {
    id: 'starter-chai-bliss',
    title: 'Chai Bliss — Royal Saffron CTC Tea',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: '/src/assets/images/ad_artisan_saffron_tea_1791966613436.jpg',
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
      imageUrl: '/src/assets/images/ad_artisan_saffron_tea_1791966613436.jpg',
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
      'Remember the comforting aroma of grandmother’s morning kitchen? We captured it in a cup.',
      'What if your daily five-minute chai break felt like a royal retreat?',
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
      productImageUrl: '/src/assets/images/ad_artisan_saffron_tea_1791966613436.jpg',
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
          onScreenText: 'Pure Saffron & Assam Tea',
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
  {
    id: 'demo-ecoglow-lamp',
    title: 'EcoGlow — Bamboo Wireless Charging Desk Lamp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: '/src/assets/images/ad_minimalist_desk_lamp_1791966613744.jpg',
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
      imageUrl: '/src/assets/images/ad_minimalist_desk_lamp_1791966613744.jpg',
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
      'Your desk is cluttered with messy charging cords right now. Fix that in five seconds.',
      'The single upgrade that turns any budget table into an executive minimalist workspace.',
      'Late-night screen headaches? It’s not your monitor — it’s harsh overhead lighting.',
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
      productImageUrl: '/src/assets/images/ad_minimalist_desk_lamp_1791966613744.jpg',
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
          visualDirection: 'Overhead fast zoom: Messy desk with tangled phone chargers and harsh room glare.',
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
];

export const StorageService = {
  getCampaigns(): CampaignData[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(CURATED_GALLERY_CAMPAIGNS));
        return CURATED_GALLERY_CAMPAIGNS;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(CURATED_GALLERY_CAMPAIGNS));
        return CURATED_GALLERY_CAMPAIGNS;
      }
      return parsed;
    } catch (e) {
      console.error('Failed to read campaigns from localStorage', e);
      return CURATED_GALLERY_CAMPAIGNS;
    }
  },

  saveCampaign(campaign: CampaignData): void {
    try {
      const all = this.getCampaigns();
      const existingIndex = all.findIndex((c) => c.id === campaign.id);
      campaign.updatedAt = new Date().toISOString();

      if (existingIndex >= 0) {
        all[existingIndex] = campaign;
      } else {
        all.unshift(campaign);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      this.setActiveCampaignId(campaign.id);
    } catch (e) {
      console.error('Failed to save campaign to localStorage', e);
    }
  },

  deleteCampaign(id: string): CampaignData[] {
    try {
      const all = this.getCampaigns().filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      if (this.getActiveCampaignId() === id && all.length > 0) {
        this.setActiveCampaignId(all[0].id);
      }
      return all;
    } catch (e) {
      console.error('Failed to delete campaign from localStorage', e);
      return [];
    }
  },

  duplicateCampaign(campaign: CampaignData): CampaignData {
    const copy: CampaignData = {
      ...JSON.parse(JSON.stringify(campaign)),
      id: 'camp-' + Date.now(),
      title: `${campaign.title} (Copy)`,
      isDemo: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saveCampaign(copy);
    return copy;
  },

  getActiveCampaignId(): string | null {
    return localStorage.getItem(ACTIVE_CAMPAIGN_KEY);
  },

  setActiveCampaignId(id: string): void {
    localStorage.setItem(ACTIVE_CAMPAIGN_KEY, id);
  },

  getActiveCampaign(): CampaignData | null {
    const id = this.getActiveCampaignId();
    const all = this.getCampaigns();
    if (id) {
      const found = all.find((c) => c.id === id);
      if (found) return found;
    }
    return all.length > 0 ? all[0] : null;
  },
};
