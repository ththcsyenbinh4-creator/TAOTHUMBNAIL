"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Type, Palette } from "lucide-react";

interface ThumbnailCanvasProps {
    imageUrl: string;
}

export default function ThumbnailCanvas({ imageUrl }: ThumbnailCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [text, setText] = useState("AMAZING");
    const [fontSize, setFontSize] = useState(80);
    const [textColor, setTextColor] = useState("#FFFFFF");
    const [showSafeZone, setShowSafeZone] = useState(true);

    const colors = ["#FFFFFF", "#FFFF00", "#FF0000", "#00FFFF", "#FF00FF"];

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

            // Apply contrast/saturation boost
            ctx.filter = "contrast(1.15) saturate(1.2)";
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = "none";

            // Draw text
            ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Text outline
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = fontSize / 12;
            ctx.strokeText(text.toUpperCase(), 640, 600);

            // Text fill
            ctx.fillStyle = textColor;
            ctx.fillText(text.toUpperCase(), 640, 600);

            // Safe zone
            if (showSafeZone) {
                ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
                ctx.lineWidth = 2;
                ctx.setLineDash([10, 10]);
                ctx.strokeRect(64, 40, 1152, 640);
                ctx.setLineDash([]);
            }
        };
    }, [imageUrl, text, fontSize, textColor, showSafeZone]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = "youtube-thumbnail.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="space-y-6">
            {/* Canvas Preview */}
            <div className="glass rounded-2xl p-6">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        width={1280}
                        height={720}
                        className="w-full h-full"
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="glass rounded-2xl p-6 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Type className="w-5 h-5" />
                    Thumbnail Editor
                </h3>

                {/* Text Input */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Thumbnail Text
                    </label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="Enter text..."
                        maxLength={20}
                    />
                </div>

                {/* Font Size */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Font Size: {fontSize}px
                    </label>
                    <input
                        type="range"
                        min="40"
                        max="140"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Color Picker */}
                <div>
                    <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Text Color
                    </label>
                    <div className="flex gap-3">
                        {colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setTextColor(color)}
                                className={`w-12 h-12 rounded-lg border-2 transition-all ${textColor === color
                                        ? "border-white scale-110 shadow-lg"
                                        : "border-white/20 hover:scale-105"
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Safe Zone Toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showSafeZone}
                        onChange={(e) => setShowSafeZone(e.target.checked)}
                        className="w-5 h-5"
                    />
                    <span className="text-sm">Show Safe Zone Guide</span>
                </label>

                {/* Download Button */}
                <button
                    onClick={handleDownload}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                >
                    <Download className="w-5 h-5" />
                    Download Thumbnail (1280x720)
                </button>
            </div>
        </div>
    );
}
