import React, { useState } from 'react';
import {
  FolderHeart,
  Copy,
  Trash2,
  ExternalLink,
  Edit2,
  Check,
  PlusCircle,
  FileDown,
  Upload,
  AlertTriangle,
  Sparkles,
  Info,
} from 'lucide-react';
import { CampaignData } from '../types/campaign';
import { StorageService } from '../lib/storage';

interface SavedCampaignsViewProps {
  campaigns: CampaignData[];
  activeCampaignId: string | null;
  onSelectCampaign: (id: string) => void;
  onRefreshCampaigns: () => void;
  onNewCampaign: () => void;
}

export const SavedCampaignsView: React.FC<SavedCampaignsViewProps> = ({
  campaigns,
  activeCampaignId,
  onSelectCampaign,
  onRefreshCampaigns,
  onNewCampaign,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleStartEdit = (camp: CampaignData) => {
    setEditingId(camp.id);
    setEditingTitle(camp.title);
  };

  const handleSaveTitle = (camp: CampaignData) => {
    if (!editingTitle.trim()) return;
    const updated = { ...camp, title: editingTitle.trim() };
    StorageService.saveCampaign(updated);
    setEditingId(null);
    onRefreshCampaigns();
  };

  const handleDuplicate = (camp: CampaignData) => {
    const copy = StorageService.duplicateCampaign(camp);
    onRefreshCampaigns();
    onSelectCampaign(copy.id);
  };

  const handleConfirmDelete = () => {
    if (!deletingId) return;
    StorageService.deleteCampaign(deletingId);
    setDeletingId(null);
    onRefreshCampaigns();
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(campaigns, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'adgenius-campaigns-backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="rounded-3xl p-5 sm:p-6 bg-[#0E1122] border border-white/[0.08] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold text-xs">
              <FolderHeart className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              Campaign Workspace
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Saved Campaigns & History ({campaigns.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Access your previously generated marketing campaigns, duplicate them to test new styles, and export data.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportJson}
            className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-white/[0.08] transition-all"
            title="Download JSON backup"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>

          <button
            onClick={onNewCampaign}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-violet-600/30 transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* Campaigns Grid */}
      {campaigns.length === 0 ? (
        <div className="rounded-3xl p-12 bg-[#0D0F20] border border-white/[0.08] text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#080A16] text-slate-400 flex items-center justify-center mx-auto">
            <FolderHeart className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">No Saved Campaigns Yet</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Create your first advertising campaign to begin saving hooks, storyboards, and posters.
            </p>
          </div>
          <button
            onClick={onNewCampaign}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors"
          >
            Create My First Campaign
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {campaigns.map((camp) => {
            const isActive = camp.id === activeCampaignId;
            const isEditing = editingId === camp.id;
            const cardImg = camp.imageUrl || camp.poster?.productImageUrl;

            return (
              <div
                key={camp.id}
                className={`rounded-2xl overflow-hidden border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'border-violet-500/80 ring-1 ring-violet-500/50 bg-[#0F1326]'
                    : 'border-white/[0.08] bg-[#0C0F1E] hover:border-slate-700'
                }`}
              >
                {/* Optional Product Image Banner */}
                {cardImg && (
                  <div className="relative h-36 w-full overflow-hidden bg-black">
                    <img
                      src={cardImg}
                      alt={camp.input.productName}
                      className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F1E] via-transparent to-black/40" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 text-violet-300 border border-violet-500/40 backdrop-blur-md">
                        {camp.categoryBadge || camp.input.platform}
                      </span>
                    </div>
                    {camp.isDemo && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-slate-400 border border-white/10 backdrop-blur-md">
                          SAMPLE
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Content Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                      <span>{camp.input.platform}</span>
                      <span>·</span>
                      <span>{camp.input.style} Style</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">
                        {new Date(camp.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Title / Inline Edit */}
                    {isEditing ? (
                      <div className="flex items-center gap-1.5 pt-1">
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="flex-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-violet-500 text-white text-xs font-bold focus:outline-none"
                        />
                        <button
                          onClick={() => handleSaveTitle(camp)}
                          className="p-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                          title="Save title"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2 group">
                        <h3
                          onClick={() => onSelectCampaign(camp.id)}
                          className="font-bold text-sm text-white group-hover:text-violet-300 transition-colors cursor-pointer line-clamp-1"
                          title={camp.title}
                        >
                          {camp.title}
                        </h3>
                        <button
                          onClick={() => handleStartEdit(camp)}
                          className="text-slate-500 hover:text-slate-300 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Rename campaign"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Sample Hook excerpt */}
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed italic">
                      "{camp.hooks?.[0] || camp.script?.beginning || 'No preview available'}"
                    </p>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectCampaign(camp.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                        isActive
                          ? 'bg-violet-600 text-white shadow-sm'
                          : 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200'
                      }`}
                    >
                      <span>{isActive ? 'Active Project' : 'Open'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDuplicate(camp)}
                        className="p-1.5 rounded-lg bg-[#080A16] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
                        title="Duplicate to test another style"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setDeletingId(camp.id)}
                        className="p-1.5 rounded-lg bg-[#080A16] hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Delete campaign"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-3xl p-6 max-w-sm w-full bg-[#0D0F22] border border-rose-500/30 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-xl bg-rose-500/20">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Delete Campaign?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete this campaign? This will remove its generated scripts, storyboard, and poster settings from your local browser storage.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
