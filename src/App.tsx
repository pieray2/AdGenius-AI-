import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, NavigationTab } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { CampaignForm } from './components/CampaignForm';
import { CampaignOverview } from './components/CampaignOverview';
import { ReelReadyView } from './components/ReelReadyView';
import { VoiceoverView } from './components/VoiceoverView';
import { PosterView } from './components/PosterView';
import { SavedCampaignsView } from './components/SavedCampaignsView';
import { PricingView } from './components/PricingView';
import { StorageService } from './lib/storage';
import { CampaignData } from './types/campaign';

export default function App() {
  const [savedCampaigns, setSavedCampaigns] = useState<CampaignData[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<CampaignData | null>(null);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved campaigns on startup
  useEffect(() => {
    const list = StorageService.getCampaigns();
    setSavedCampaigns(list);
    const active = StorageService.getActiveCampaign();
    setActiveCampaign(active);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCampaignGenerated = (campaign: CampaignData) => {
    StorageService.saveCampaign(campaign);
    setSavedCampaigns(StorageService.getCampaigns());
    setActiveCampaign(campaign);
    setCurrentTab('campaign');
    showToast('Campaign generated successfully!');
  };

  const handleUpdateCampaign = (updated: CampaignData) => {
    StorageService.saveCampaign(updated);
    setSavedCampaigns(StorageService.getCampaigns());
    setActiveCampaign(updated);
    showToast('Changes saved to campaign!');
  };

  const handleSelectCampaign = (id: string) => {
    StorageService.setActiveCampaignId(id);
    const found = savedCampaigns.find((c) => c.id === id);
    if (found) {
      setActiveCampaign(found);
    }
  };

  const handleRefreshCampaigns = () => {
    const list = StorageService.getCampaigns();
    setSavedCampaigns(list);
    setActiveCampaign(StorageService.getActiveCampaign());
  };

  const handleSelectDemo = async (demoKey: string) => {
    try {
      const res = await fetch('/api/campaign/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: demoKey === 'ecoglow-lamp' ? 'EcoGlow Bamboo Smart Lamp' : 'Chai Bliss Royal Saffron Tea',
          description: 'Demo sample product',
          modelPreference: 'demo',
          demoKey,
        }),
      });
      const data = await res.json();
      if (data.success && data.campaign) {
        StorageService.saveCampaign(data.campaign);
        setSavedCampaigns(StorageService.getCampaigns());
        setActiveCampaign(data.campaign);
        setCurrentTab('campaign');
        showToast('Curated sample campaign loaded!');
      }
    } catch (e) {
      console.error('Failed to load demo:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D17] text-slate-100 flex flex-col antialiased selection:bg-violet-500/30 selection:text-violet-200">
      {/* Header Bar */}
      <Header
        activeCampaign={activeCampaign}
        onNewCampaign={() => setCurrentTab('create')}
        onSelectCampaign={handleSelectCampaign}
        savedCampaigns={savedCampaigns}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar (Desktop) + Bottom Nav (Mobile) */}
        <Navigation
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          campaignTitle={activeCampaign?.title}
          hasActiveCampaign={Boolean(activeCampaign)}
          savedCount={savedCampaigns.length}
        />

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-16 right-4 sm:right-8 z-50 p-3.5 rounded-2xl bg-slate-900/95 border border-violet-500/50 text-white text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          {currentTab === 'dashboard' && (
            <DashboardView
              activeCampaign={activeCampaign}
              savedCampaigns={savedCampaigns}
              onNavigate={setCurrentTab}
              onSelectCampaign={handleSelectCampaign}
              onSelectDemo={handleSelectDemo}
            />
          )}

          {currentTab === 'create' && (
            <CampaignForm
              onCampaignGenerated={handleCampaignGenerated}
              onSelectDemo={handleSelectDemo}
            />
          )}

          {currentTab === 'campaign' && activeCampaign && (
            <CampaignOverview
              campaign={activeCampaign}
              onUpdateCampaign={handleUpdateCampaign}
              onNavigateToStudio={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'campaign' && !activeCampaign && (
            <div className="text-center py-20 space-y-4">
              <h2 className="text-xl font-bold text-white">No active campaign selected</h2>
              <p className="text-slate-400 text-xs">
                Create a campaign or load a curated demo to explore all 8 advertising assets.
              </p>
              <button
                onClick={() => setCurrentTab('create')}
                className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold"
              >
                Create Campaign
              </button>
            </div>
          )}

          {currentTab === 'reelready' && activeCampaign && (
            <ReelReadyView
              campaign={activeCampaign}
              onUpdateCampaign={handleUpdateCampaign}
              onNavigateToVoiceover={() => setCurrentTab('voiceover')}
            />
          )}

          {currentTab === 'reelready' && !activeCampaign && (
            <div className="text-center py-20 space-y-4">
              <h2 className="text-xl font-bold text-white">No campaign loaded for ReelReady Studio</h2>
              <button
                onClick={() => setCurrentTab('create')}
                className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold"
              >
                Start New Campaign
              </button>
            </div>
          )}

          {currentTab === 'voiceover' && activeCampaign && (
            <VoiceoverView campaign={activeCampaign} />
          )}

          {currentTab === 'voiceover' && !activeCampaign && (
            <div className="text-center py-20 space-y-4">
              <h2 className="text-xl font-bold text-white">No campaign loaded for Voiceover Studio</h2>
              <button
                onClick={() => setCurrentTab('create')}
                className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold"
              >
                Start New Campaign
              </button>
            </div>
          )}

          {currentTab === 'poster' && activeCampaign && (
            <PosterView
              campaign={activeCampaign}
              onUpdateCampaign={handleUpdateCampaign}
            />
          )}

          {currentTab === 'poster' && !activeCampaign && (
            <div className="text-center py-20 space-y-4">
              <h2 className="text-xl font-bold text-white">No campaign loaded for Poster Designer</h2>
              <button
                onClick={() => setCurrentTab('create')}
                className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold"
              >
                Start New Campaign
              </button>
            </div>
          )}

          {currentTab === 'saved' && (
            <SavedCampaignsView
              campaigns={savedCampaigns}
              activeCampaignId={activeCampaign?.id || null}
              onSelectCampaign={(id) => {
                handleSelectCampaign(id);
                setCurrentTab('campaign');
              }}
              onRefreshCampaigns={handleRefreshCampaigns}
              onNewCampaign={() => setCurrentTab('create')}
            />
          )}

          {currentTab === 'pricing' && (
            <PricingView onNavigate={setCurrentTab} />
          )}
        </main>
      </div>
    </div>
  );
}
