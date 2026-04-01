// components/admin/editors/SpecialAlertsEditor.tsx
"use client"
import React, { useState } from 'react';
import { Megaphone, Save, AlertTriangle, Info } from 'lucide-react';
import { websiteService } from "@/services/website-service";

export default function SpecialAlertsEditor({ initialData }: { initialData: any }) {
  const [isEnabled, setIsEnabled] = useState(initialData?.alert_active || false);
  const [message, setMessage] = useState(initialData?.alert_text || "");
  const [type, setType] = useState(initialData?.alert_type || "info");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await websiteService.saveSettings({
        alert_active: isEnabled,
        alert_text: message,
        alert_type: type
      } as any);
      alert("Alert settings updated live!");
    } catch (error) {
      alert("Failed to update alert.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Special Alerts</h2>
        <p className="text-sm text-gray-500">Broadcast urgent news to the top of every page.</p>
      </div>

      {/* Main Toggle Card */}
      <div className={`p-6 rounded-xl border-2 transition-all ${isEnabled ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isEnabled ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
              <Megaphone size={20} />
            </div>
            <div>
              <p className="font-bold text-gray-900">Banner Status</p>
              <p className="text-sm text-gray-500">{isEnabled ? "Publicly visible on website" : "Hidden from public"}</p>
            </div>
          </div>
          
          {/* Toggle Switch */}
          <button 
            onClick={() => setIsEnabled(!isEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-2 ring-offset-2 ring-transparent focus:ring-blue-500 ${isEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Message Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Alert Message</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!isEnabled}
              placeholder="e.g. Due to the heavy rain, tonight's prayer meeting is moved to Zoom."
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-400">Keep it under 120 characters for best mobile view.</p>
              <p className={`text-xs font-medium ${message.length > 120 ? 'text-red-500' : 'text-gray-400'}`}>
                {message.length}/120
              </p>
            </div>
          </div>

          {/* Alert Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setType('info')}
              disabled={!isEnabled}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all ${type === 'info' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400'}`}
            >
              <Info size={16} /> General Info
            </button>
            <button 
              onClick={() => setType('urgent')}
              disabled={!isEnabled}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all ${type === 'urgent' ? 'bg-red-600 border-red-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-red-400'}`}
            >
              <AlertTriangle size={16} /> Urgent / Warning
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-all shadow-md"
        >
          <Save size={18} />
          {isSaving ? "Saving..." : "Update Live Banner"}
        </button>
      </div>
    </div>
  );
}