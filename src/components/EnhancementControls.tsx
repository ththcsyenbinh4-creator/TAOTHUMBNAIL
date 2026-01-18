"use client";

import { Sliders } from "lucide-react";
import type { EnhancementSettings } from "@/lib/image-enhancement";

interface EnhancementControlsProps {
    settings: EnhancementSettings;
    onChange: (settings: EnhancementSettings) => void;
}

export default function EnhancementControls({ settings, onChange }: EnhancementControlsProps) {
    const updateSetting = (key: keyof EnhancementSettings, value: number) => {
        onChange({ ...settings, [key]: value });
    };

    return (
        <div className="enhancement-card p-6 space-y-6">
            <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold">Fine-Tune</h3>
            </div>

            {/* Brightness */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Brightness</label>
                    <span className="text-sm text-blue-400">{settings.brightness}%</span>
                </div>
                <input
                    type="range"
                    min="50"
                    max="150"
                    value={settings.brightness}
                    onChange={(e) => updateSetting('brightness', Number(e.target.value))}
                    className="slider"
                />
            </div>

            {/* Contrast */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Contrast</label>
                    <span className="text-sm text-blue-400">{settings.contrast}%</span>
                </div>
                <input
                    type="range"
                    min="50"
                    max="150"
                    value={settings.contrast}
                    onChange={(e) => updateSetting('contrast', Number(e.target.value))}
                    className="slider"
                />
            </div>

            {/* Saturation */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Saturation</label>
                    <span className="text-sm text-blue-400">{settings.saturation}%</span>
                </div>
                <input
                    type="range"
                    min="50"
                    max="180"
                    value={settings.saturation}
                    onChange={(e) => updateSetting('saturation', Number(e.target.value))}
                    className="slider"
                />
            </div>

            {/* Vignette */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Vignette (Darkness)</label>
                    <span className="text-sm text-blue-400">{settings.vignette}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="60"
                    value={settings.vignette}
                    onChange={(e) => updateSetting('vignette', Number(e.target.value))}
                    className="slider"
                />
            </div>

            {/* Sharpen */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Sharpen</label>
                    <span className="text-sm text-blue-400">{settings.sharpen}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="50"
                    value={settings.sharpen}
                    onChange={(e) => updateSetting('sharpen', Number(e.target.value))}
                    className="slider"
                />
            </div>
        </div>
    );
}
