"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Type, Palette, Maximize2, Smartphone, Monitor } from "lucide-react";
import type { ThumbnailTemplate } from "@/lib/templates";

interface ProfessionalCanvasProps {
    imageUrl: string;
    template?: ThumbnailTemplate;
    onDataChange: (data: {
        hasFace: boolean;
        faceSize: number;
        faceEmotion: 'neutral' | 'happy' | 'surprised' | 'shocked' | 'angry';
        hasText: boolean;
        textLength: number;
        textContrast: number;
        colorVibrancy: number;
        colorContrast: number;
        ruleOfThirds: boolean;
    }) => void;
}

export default function ProfessionalCanvas({ imageUrl, template, onDataChange }: ProfessionalCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [text, setText] = useState("AMAZING");
    const [fontSize, setFontSize] = useState(100);
    const [textColor, setTextColor] = useState("#FFD700");
    const [textShadow, setTextShadow] = useState("#8B4513");
    const [showSafeZone, setShowSafeZone] = useState(true);
    const [showGrid, setShowGrid] = useState(true);
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

    // Apply template if provided
    useEffect(() => {
        if (template) {
            setTextColor(template.layout.colorScheme.text);
            setTextShadow(template.layout.colorScheme.shadow);
        }
    }, [template]);

    // Update CTR data whenever canvas changes
    useEffect(() => {
        // Simulate analysis (in production, use real face detection API)
        const textWords = text.trim().split(/\s+/).length;
        const hasText = text.length > 0;

        // Calculate contrast (simplified)
        const contrast = calculateContrast(textColor, textShadow);

        onDataChange({
            hasFace: true, // Assume face present (use real detection in production)
            faceSize: 0.3,
            faceEmotion: 'surprised',
            hasText,
            textLength: textWords,
            textContrast: contrast,
            colorVibrancy: 0.8,
            colorContrast: 0.9,
            ruleOfThirds: true
        });
    }, [text, textColor, textShadow, onDataChange]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;

        img.onload = () => {
            // Clear
            ctx.clearRect(0, 0, 1280, 720);

            // Draw image
            const imgAspect = img.width / img.height;
            const canvasAspect = 1280 / 720;
            let drawWidth, drawHeight, x, y;

            if (imgAspect > canvasAspect) {
                drawHeight = 720;
                drawWidth = drawHeight * imgAspect;
                x = (1280 - drawWidth) / 2;
                y = 0;
            } else {
                drawWidth = 1280;
                drawHeight = drawWidth / imgAspect;
                x = 0;
                y = (720 - drawHeight) / 2;
            }

            ctx.drawImage(img, x, y, drawWidth, drawHeight);

            // Enhancement
            ctx.filter = "contrast(120%) saturate(130%) brightness(105%)";
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = "none";

            // Grid (Rule of Thirds)
            if (showGrid) {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
                ctx.lineWidth = 1;
                ctx.setLineDash([5, 5]);
                // Vertical lines
                ctx.beginPath();
                ctx.moveTo(1280 / 3, 0);
                ctx.lineTo(1280 / 3, 720);
                ctx.moveTo((1280 / 3) * 2, 0);
                ctx.lineTo((1280 / 3) * 2, 720);
                // Horizontal lines
                ctx.moveTo(0, 720 / 3);
                ctx.lineTo(1280, 720 / 3);
                ctx.moveTo(0, (720 / 3) * 2);
                ctx.lineTo(1280, (720 / 3) * 2);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Text
            const textY = 600;
            ctx.font = `900 ${fontSize}px Impact, Arial Black, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const upperText = text.toUpperCase();

            // Shadow layers
            for (let i = 8; i > 0; i--) {
                ctx.strokeStyle = textShadow;
                ctx.lineWidth = fontSize / 8 + i * 2;
                ctx.strokeText(upperText, 640, textY);
            }

            // Glow
            ctx.shadowColor = textColor;
            ctx.shadowBlur = 20;
            ctx.strokeStyle = textColor;
            ctx.lineWidth = fontSize / 20;
            ctx.strokeText(upperText, 640, textY);

            // Fill
            ctx.shadowBlur = 0;
            ctx.fillStyle = textColor;
            ctx.fillText(upperText, 640, textY);

            // Safe zone
            if (showSafeZone) {
                ctx.strokeStyle = "rgba(34, 197, 94, 0.6)";
                ctx.lineWidth = 3;
                ctx.setLineDash([15, 15]);
                ctx.strokeRect(64, 40, 1152, 640);
                ctx.setLineDash([]);

                ctx.fillStyle = "rgba(34, 197, 94, 0.8)";
                ctx.font = "bold 16px Arial";
                ctx.fillText("SAFE ZONE (Mobile Visible)", 640, 25);
            }
        };
    }, [imageUrl, text, fontSize, textColor, textShadow, showSafeZone, showGrid]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = `youtube-thumbnail-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
    };

    return (
        <div className="space-y-6">
            {/* Canvas */}
            <div className="dashboard-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Maximize2 className="w-5 h-5 text-blue-400" />
                        <span className="font-semibold">1280 x 720px (YouTube Standard)</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPreviewMode('desktop')}
                            className={`p-2 rounded-lg transition-all ${previewMode === 'desktop' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'
                                }`}
                        >
                            <Monitor className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setPreviewMode('mobile')}
                            className={`p-2 rounded-lg transition-all ${previewMode === 'mobile' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'
                                }`}
                        >
                            <Smartphone className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className={`bg-black rounded-xl overflow-hidden thumbnail-canvas ${previewMode === 'mobile' ? 'max-w-md mx-auto' : ''
                    }`}>
                    <canvas
                        ref={canvasRef}
                        width={1280}
                        height={720}
                        className="w-full h-full"
                    />
                </div>

                <button
                    onClick={handleDownload}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                >
                    <Download className="w-5 h-5" />
                    Download HD Thumbnail (PNG)
                </button>
            </div>

            {/* Controls */}
            <div className="dashboard-card p-6 space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Type className="w-5 h-5" />
                    Text Editor
                </h3>

                <div>
                    <label className="block text-sm font-medium mb-2">Thumbnail Text</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="input-field font-bold text-lg"
                        placeholder="Enter viral text..."
                        maxLength={30}
                    />
                    <div className="mt-1 text-xs text-gray-500 text-right">
                        {text.split(/\s+/).length} words • {text.length}/30 characters
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 flex items-center justify-between">
                        <span>Font Size</span>
                        <span className="text-blue-400">{fontSize}px</span>
                    </label>
                    <input
                        type="range"
                        min="60"
                        max="160"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Colors
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-400 mb-2">Text Color</label>
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="w-full h-12 rounded-lg cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-2">Shadow Color</label>
                            <input
                                type="color"
                                value={textShadow}
                                onChange={(e) => setTextShadow(e.target.value)}
                                className="w-full h-12 rounded-lg cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showSafeZone}
                            onChange={(e) => setShowSafeZone(e.target.checked)}
                            className="w-5 h-5"
                        />
                        <span className="text-sm font-medium">Show Safe Zone</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showGrid}
                            onChange={(e) => setShowGrid(e.target.checked)}
                            className="w-5 h-5"
                        />
                        <span className="text-sm font-medium">Show Rule of Thirds Grid</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

function calculateContrast(color1: string, color2: string): number {
    // Simplified contrast calculation
    return 0.85; // In production, use real WCAG contrast formula
}
