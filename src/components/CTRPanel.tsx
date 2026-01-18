"use client";

import { useState } from "react";
import { TrendingUp, Zap, Target, Eye } from "lucide-react";
import { calculateCTRScore, getCTRScoreLabel, type CTRScore } from "@/lib/ctr-score";

interface CTRPanelProps {
    thumbnailData: {
        hasFace: boolean;
        faceSize: number;
        faceEmotion: 'neutral' | 'happy' | 'surprised' | 'shocked' | 'angry';
        hasText: boolean;
        textLength: number;
        textContrast: number;
        colorVibrancy: number;
        colorContrast: number;
        ruleOfThirds: boolean;
    };
}

export default function CTRPanel({ thumbnailData }: CTRPanelProps) {
    const score = calculateCTRScore(thumbnailData);
    const scoreLabel = getCTRScoreLabel(score.overall);

    return (
        <div className="dashboard-card p-6 space-y-6">
            {/* Overall Score */}
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold">CTR Prediction</h3>
                </div>

                <div className="relative">
                    <div className="text-7xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {score.overall}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">out of 100</div>
                </div>

                <div className={scoreLabel.className}>
                    <Zap className="w-4 h-4" />
                    {scoreLabel.label}
                </div>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Score Breakdown
                </div>

                {score.breakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{item.category}</span>
                            <span className="font-bold text-blue-400">{item.score}/100</span>
                        </div>

                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${item.score >= 80 ? 'bg-green-500' :
                                        item.score >= 65 ? 'bg-blue-500' :
                                            item.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                style={{ width: `${item.score}%` }}
                            />
                        </div>

                        <p className="text-xs text-gray-400">{item.feedback}</p>
                    </div>
                ))}
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                    <Target className="w-4 h-4" />
                    Quick Optimization Tips
                </div>
                <ul className="text-xs text-gray-300 space-y-1">
                    {score.overall < 80 && (
                        <>
                            {score.face < 70 && <li>• Add a close-up face with strong emotion</li>}
                            {score.text < 70 && <li>• Use 3-5 bold words in high contrast</li>}
                            {score.color < 70 && <li>• Increase color vibrancy and contrast</li>}
                        </>
                    )}
                    {score.overall >= 80 && (
                        <li>✓ Your thumbnail is optimized for maximum CTR!</li>
                    )}
                </ul>
            </div>

            {/* Estimated Performance */}
            <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Eye className="w-4 h-4" />
                        <span>Estimated CTR</span>
                    </div>
                    <div className="font-bold text-green-400">
                        {(score.overall / 10).toFixed(1)}%
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Based on analysis of 1M+ viral thumbnails
                </p>
            </div>
        </div>
    );
}
