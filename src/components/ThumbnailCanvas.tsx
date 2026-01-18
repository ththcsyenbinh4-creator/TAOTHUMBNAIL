"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Type, Palette, Maximize2, Eye, EyeOff, Sparkles, Zap } from "lucide-react";

interface ThumbnailCanvasProps {
    imageUrl: string;
}

const PRESET_TEXTS = [
    "AMAZING", "WOW", "EPIC", "INSANE", "SHOCKING", "VIRAL",
    "MUST WATCH", "OMG", "INCREDIBLE", "MIND BLOWN"
];

const COLORS = [
    { name: "White", value: "#FFFFFF", shadow: "#000000" },
    { name: "Yellow", value: "#FFD700", shadow: "#8B4513" },
    { name: "Red", value: "#FF0000", shadow: "#8B0000" },
    { name: "Cyan", value: "#00FFFF", shadow: "#006666" },
    { name: "Pink", value: "#FF00FF", shadow: "#660066" },
    { name: "Green", value: "#00FF00", shadow: "#006600" },
];

export default function ThumbnailCanvas({ imageUrl }: ThumbnailCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [text, setText] = useState("AMAZING");
    const [fontSize, setFontSize] = useState(100);
    const [textColor, setTextColor] = useState("#FFD700");
    const [textShadow, setTextShadow] = useState("#8B4513");
    const [showSafeZone, setShowSafeZone] = useState(true);
    const [textPosition, setTextPosition] = useState<"top" | "center" | "bottom">("bottom");
    const [contrast, setContrast] = useState(120);
    const [saturation, setSaturation] = useState(130);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;

        img.onload = () => {
            // Clear canvas
            ctx.clearRect(0, 0, 1280, 720);

            // Draw image (cover fit)
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

            // Apply filters for viral look
            ctx.filter = `contrast(${contrast}%) saturate(${saturation}%) brightness(105%)`;
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = "none";

            // Vignette effect for focus
            const gradient = ctx.createRadialGradient(640, 360, 200, 640, 360, 600);
            gradient.addColorStop(0, "rgba(0,0,0,0)");
            gradient.addColorStop(1, "rgba(0,0,0,0.3)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1280, 720);

            // Calculate text position
            let textY = 600;
            if (textPosition === "top") textY = 150;
            if (textPosition === "center") textY = 360;

            // Draw text with premium styling
            ctx.font = `900 ${fontSize}px Impact, Arial Black, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const upperText = text.toUpperCase();

            // Multiple shadow layers for depth
            for (let i = 8; i > 0; i--) {
                ctx.strokeStyle = textShadow;
                ctx.lineWidth = fontSize / 8 + i * 2;
                ctx.strokeText(upperText, 640, textY);
            }

            // Outer glow
            ctx.shadowColor = textColor;
            ctx.shadowBlur = 20;
            ctx.strokeStyle = textColor;
            ctx.lineWidth = fontSize / 20;
            ctx.strokeText(upperText, 640, textY);

            // Main text fill
            ctx.shadowBlur = 0;
            const textGradient = ctx.createLinearGradient(0, textY - fontSize / 2, 0, textY + fontSize / 2);
            textGradient.addColorStop(0, textColor);
            textGradient.addColorStop(1, adjustBrightness(textColor, -30));
            ctx.fillStyle = textGradient;
            ctx.fillText(upperText, 640, textY);

            // Safe zone
            if (showSafeZone) {
                ctx.strokeStyle = "rgba(0, 255, 0, 0.6)";
                ctx.lineWidth = 3;
                ctx.setLineDash([15, 15]);
                ctx.strokeRect(64, 40, 1152, 640);
                ctx.setLineDash([]);

                // Safe zone label
                ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
                ctx.font = "bold 16px Arial";
                ctx.fillText("SAFE ZONE", 640, 25);
            }
        };
    }, [imageUrl, text, fontSize, textColor, textShadow, showSafeZone, textPosition, contrast, saturation]);

    const adjustBrightness = (color: string, amount: number): string => {
        const num = parseInt(color.replace("#", ""), 16);
        const r = Math.max(0, Math.min(255, (num >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
        const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = `viral-thumbnail-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
    };

    const handleColorChange = (color: string, shadow: string) => {
        setTextColor(color);
        setTextShadow(shadow);
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Canvas Preview - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
                <div className="glass-strong rounded-3xl p-8">
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden thumbnail-grid shadow-2xl">
                        <canvas
                            ref={canvasRef}
                            width={1280}
                            height={720}
                            className="w-full h-full"
                        />
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                            <Maximize2 className="w-4 h-4" />
                            <span>1280 x 720px (YouTube Standard)</span>
                        </div>

                        <button
                            onClick={handleDownload}
                            className="btn-primary flex items-center gap-3"
                        >
                            <Download className="w-5 h-5" />
                            Download HD Thumbnail
                        </button>
                    </div>
                </div>
            </div>

            {/* Controls - Takes 1 column */}
            <div className="space-y-6">
                <div className="glass-strong rounded-3xl p-6 space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-purple-400" />
                        Viral Editor
                    </h3>

                    {/* Quick Text Presets */}
                    <div>
                        <label className="block text-sm font-semibold mb-3 text-gray-300">
                            Quick Viral Text
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {PRESET_TEXTS.slice(0, 6).map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => setText(preset)}
                                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${text === preset
                                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                                            : "glass-card hover:bg-white/10"
                                        }`}
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Text Input */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300">
                            Custom Text
                        </label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="input-field font-bold text-lg"
                            placeholder="Enter viral text..."
                            maxLength={25}
                        />
                        <div className="mt-1 text-xs text-gray-500 text-right">
                            {text.length}/25 characters
                        </div>
                    </div>

                    {/* Text Position */}
                    <div>
                        <label className="block text-sm font-semibold mb-3 text-gray-300">
                            Text Position
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {(["top", "center", "bottom"] as const).map((pos) => (
                                <button
                                    key={pos}
                                    onClick={() => setTextPosition(pos)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${textPosition === pos
                                            ? "bg-purple-500 text-white"
                                            : "glass-card hover:bg-white/10"
                                        }`}
                                >
                                    {pos}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Font Size */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center justify-between">
                            <span>Font Size</span>
                            <span className="text-purple-400">{fontSize}px</span>
                        </label>
                        <input
                            type="range"
                            min="50"
                            max="180"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                    </div>

                    {/* Color Picker */}
                    <div>
                        <label className="block text-sm font-semibold mb-3 text-gray-300 flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            Viral Colors
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => handleColorChange(color.value, color.shadow)}
                                    className={`group relative h-16 rounded-xl border-2 transition-all ${textColor === color.value
                                            ? "border-white scale-110 shadow-2xl"
                                            : "border-white/20 hover:scale-105 hover:border-white/40"
                                        }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                >
                                    {textColor === color.value && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                                                <Zap className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Enhancement */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center justify-between">
                                <span>Contrast</span>
                                <span className="text-purple-400">{contrast}%</span>
                            </label>
                            <input
                                type="range"
                                min="100"
                                max="150"
                                value={contrast}
                                onChange={(e) => setContrast(Number(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-300 flex items-center justify-between">
                                <span>Saturation</span>
                                <span className="text-purple-400">{saturation}%</span>
                            </label>
                            <input
                                type="range"
                                min="100"
                                max="180"
                                value={saturation}
                                onChange={(e) => setSaturation(Number(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>
                    </div>

                    {/* Safe Zone Toggle */}
                    <label className="flex items-center gap-3 cursor-pointer glass-card p-4 rounded-xl hover:bg-white/10 transition-all">
                        <input
                            type="checkbox"
                            checked={showSafeZone}
                            onChange={(e) => setShowSafeZone(e.target.checked)}
                            className="w-5 h-5 accent-purple-500"
                        />
                        <div className="flex-1">
                            <div className="font-semibold flex items-center gap-2">
                                {showSafeZone ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                Safe Zone Guide
                            </div>
                            <div className="text-xs text-gray-400">
                                Ensures text is visible on all devices
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}
