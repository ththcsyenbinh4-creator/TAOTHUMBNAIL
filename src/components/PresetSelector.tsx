"use client";

import { Sparkles } from "lucide-react";
import { PRESETS, type EnhancementSettings } from "@/lib/image-enhancement";

interface PresetSelectorProps {
    onSelectPreset: (settings: EnhancementSettings) => void;
}

const PRESET_INFO = [
    {
        id: 'vibrant',
        name: 'Vibrant Anime',
        emoji: '✨',
        description: 'Bright, saturated colors for energetic content'
    },
    {
        id: 'soft',
        name: 'Soft Ghibli',
        emoji: '🍃',
        description: 'Dreamy, gentle aesthetic like Studio Ghibli'
    },
    {
        id: 'sharp',
        name: 'Sharp Detail',
        emoji: '⚡',
        description: 'Crisp, clear details for action scenes'
    },
    {
        id: 'cinematic',
        name: 'Cinematic',
        emoji: '🎬',
        description: 'Film-like quality with dramatic vignette'
    },
    {
        id: 'ghibli',
        name: 'Ghibli Style',
        emoji: '🌸',
        description: 'Soft focus with warm, nostalgic feel'
    }
];

export default function PresetSelector({ onSelectPreset }: PresetSelectorProps) {
    return (
        <div className="enhancement-card p-6 space-y-4">
            <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold">One-Click Presets</h3>
            </div>

            <div className="grid gap-3">
                {PRESET_INFO.map((preset) => (
                    <button
                        key={preset.id}
                        onClick={() => onSelectPreset(PRESETS[preset.id])}
                        className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 rounded-xl text-left transition-all group"
                    >
                        <div className="flex items-start gap-3">
                            <div className="text-3xl">{preset.emoji}</div>
                            <div className="flex-1">
                                <div className="font-semibold group-hover:text-blue-400 transition-colors">
                                    {preset.name}
                                </div>
                                <div className="text-sm text-gray-400 mt-1">
                                    {preset.description}
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
