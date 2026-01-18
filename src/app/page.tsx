"use client";

import { useState } from "react";
import { ImageIcon, Sparkles, Upload } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import PresetSelector from "@/components/PresetSelector";
import EnhancementControls from "@/components/EnhancementControls";
import EnhancementCanvas from "@/components/EnhancementCanvas";
import { DEFAULT_SETTINGS, type EnhancementSettings } from "@/lib/image-enhancement";

export default function Home() {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [settings, setSettings] = useState<EnhancementSettings>(DEFAULT_SETTINGS);

    const handleReset = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    const handleNewImage = () => {
        setImageUrl("");
        setSettings(DEFAULT_SETTINGS);
    };

    return (
        <main className="min-h-screen bg-slate-950">
            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <ImageIcon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white">
                                Anime Thumbnail Enhancer
                            </h1>
                            <p className="text-sm text-gray-400">Professional Image Enhancement for YouTube</p>
                        </div>
                    </div>

                    {imageUrl && (
                        <button
                            onClick={handleNewImage}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-medium transition-all"
                        >
                            <Upload className="w-4 h-4" />
                            New Image
                        </button>
                    )}
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                {!imageUrl ? (
                    /* Upload Screen */
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-full mb-4">
                                <Sparkles className="w-5 h-5 text-blue-400" />
                                <span className="font-semibold text-blue-400">No Text Overlay • Pure Image Enhancement</span>
                            </div>

                            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                                Enhance Your
                                <br />
                                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Anime Thumbnails
                                </span>
                            </h2>

                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Professional image enhancement with <span className="text-blue-400 font-bold">smart cropping</span>,
                                color grading, and anime-optimized filters. No text overlay needed.
                            </p>
                        </div>

                        <ImageUpload onImageSelect={setImageUrl} />

                        {/* Features */}
                        <div className="grid md:grid-cols-3 gap-6 pt-8">
                            {[
                                {
                                    emoji: '✂️',
                                    title: 'Smart Crop',
                                    desc: 'Auto-crop to 1280x720 YouTube standard'
                                },
                                {
                                    emoji: '🎨',
                                    title: 'Color Enhancement',
                                    desc: 'Brightness, contrast, saturation controls'
                                },
                                {
                                    emoji: '✨',
                                    title: 'Anime Filters',
                                    desc: '5 one-click presets optimized for anime'
                                }
                            ].map((feature, i) => (
                                <div key={i} className="enhancement-card p-6 text-center space-y-3">
                                    <div className="text-4xl">{feature.emoji}</div>
                                    <h3 className="font-bold text-lg">{feature.title}</h3>
                                    <p className="text-sm text-gray-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Enhancement Dashboard */
                    <div className="grid lg:grid-cols-12 gap-6">
                        {/* Left Sidebar - Presets */}
                        <div className="lg:col-span-3">
                            <PresetSelector onSelectPreset={setSettings} />
                        </div>

                        {/* Center - Canvas */}
                        <div className="lg:col-span-6">
                            <EnhancementCanvas
                                imageUrl={imageUrl}
                                settings={settings}
                                onReset={handleReset}
                            />
                        </div>

                        {/* Right Sidebar - Controls */}
                        <div className="lg:col-span-3">
                            <EnhancementControls
                                settings={settings}
                                onChange={setSettings}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-800 mt-20 py-8 bg-slate-900/50">
                <div className="container mx-auto px-6 text-center space-y-2">
                    <p className="text-gray-400 text-sm">
                        Professional Image Enhancement • YouTube Optimized • 1280x720 Standard
                    </p>
                    <p className="text-gray-500 text-xs">
                        No Text Overlay • Pure Quality Enhancement
                    </p>
                </div>
            </footer>
        </main>
    );
}
