"use client";

import { useState } from "react";
import { Upload, Sparkles, TrendingUp, Crown, Youtube } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import TemplateBrowser from "@/components/TemplateBrowser";
import ProfessionalCanvas from "@/components/ProfessionalCanvas";
import CTRPanel from "@/components/CTRPanel";
import type { ThumbnailTemplate } from "@/lib/templates";

export default function Home() {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [selectedTemplate, setSelectedTemplate] = useState<ThumbnailTemplate | undefined>();
    const [thumbnailData, setThumbnailData] = useState({
        hasFace: false,
        faceSize: 0,
        faceEmotion: 'neutral' as const,
        hasText: false,
        textLength: 0,
        textContrast: 0,
        colorVibrancy: 0,
        colorContrast: 0,
        ruleOfThirds: false
    });

    return (
        <main className="min-h-screen bg-slate-950">
            {/* Professional Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Youtube className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white">
                                YouTube Thumbnail Studio
                            </h1>
                            <p className="text-sm text-gray-400">Professional CTR-Optimized Creator</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-semibold">Research-Based Algorithm</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                            <Crown className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-semibold">Pro Templates</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                {!imageUrl ? (
                    /* Upload Screen */
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-full mb-4">
                                <Sparkles className="w-5 h-5 text-blue-400" />
                                <span className="font-semibold text-blue-400">Based on YouTube's Official Guidelines</span>
                            </div>

                            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                                Create Thumbnails That
                                <br />
                                <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                    Get Clicks
                                </span>
                            </h2>

                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Professional thumbnail creator with <span className="text-blue-400 font-bold">CTR prediction</span>,
                                proven templates, and SEO optimization for international audiences.
                            </p>
                        </div>

                        <ImageUpload onImageSelect={setImageUrl} />

                        {/* Features */}
                        <div className="grid md:grid-cols-3 gap-6 pt-8">
                            {[
                                {
                                    icon: TrendingUp,
                                    title: 'CTR Prediction',
                                    desc: 'AI analyzes your thumbnail and predicts click-through rate'
                                },
                                {
                                    icon: Crown,
                                    title: '10+ Pro Templates',
                                    desc: 'Proven designs with 7-9% average CTR'
                                },
                                {
                                    icon: Sparkles,
                                    title: 'SEO Optimized',
                                    desc: 'Title suggestions and color recommendations for US/EU'
                                }
                            ].map((feature, i) => (
                                <div key={i} className="dashboard-card p-6 text-center space-y-3">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto">
                                        <feature.icon className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h3 className="font-bold text-lg">{feature.title}</h3>
                                    <p className="text-sm text-gray-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Professional Dashboard */
                    <div className="grid lg:grid-cols-12 gap-6">
                        {/* Left Sidebar - Templates */}
                        <div className="lg:col-span-3">
                            <TemplateBrowser onSelectTemplate={setSelectedTemplate} />
                        </div>

                        {/* Center - Canvas */}
                        <div className="lg:col-span-6">
                            <ProfessionalCanvas
                                imageUrl={imageUrl}
                                template={selectedTemplate}
                                onDataChange={setThumbnailData}
                            />
                        </div>

                        {/* Right Sidebar - CTR Score */}
                        <div className="lg:col-span-3">
                            <CTRPanel thumbnailData={thumbnailData} />

                            {/* Reset Button */}
                            <button
                                onClick={() => {
                                    setImageUrl("");
                                    setSelectedTemplate(undefined);
                                }}
                                className="w-full mt-6 btn-secondary"
                            >
                                <Upload className="w-4 h-4 inline mr-2" />
                                Upload New Image
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-800 mt-20 py-8 bg-slate-900/50">
                <div className="container mx-auto px-6 text-center space-y-2">
                    <p className="text-gray-400 text-sm">
                        Built with Next.js • Based on YouTube CTR Research & Official Guidelines
                    </p>
                    <p className="text-gray-500 text-xs">
                        Optimized for International Audiences (US/EU) • 1280x720px Standard
                    </p>
                </div>
            </footer>
        </main>
    );
}
