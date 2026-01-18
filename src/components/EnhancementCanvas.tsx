"use client";

import { useEffect, useRef } from "react";
import { Download, RotateCcw } from "lucide-react";
import { applyEnhancements, downloadCanvas, type EnhancementSettings } from "@/lib/image-enhancement";

interface EnhancementCanvasProps {
    imageUrl: string;
    settings: EnhancementSettings;
    onReset: () => void;
}

export default function EnhancementCanvas({ imageUrl, settings, onReset }: EnhancementCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;

        img.onload = () => {
            imageRef.current = img;
            applyEnhancements(canvas, img, settings);
        };
    }, [imageUrl, settings]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        downloadCanvas(canvas, `anime-thumbnail-${Date.now()}.png`);
    };

    return (
        <div className="space-y-4">
            <div className="enhancement-card p-6">
                <div className="aspect-video bg-black rounded-xl overflow-hidden canvas-container">
                    <canvas
                        ref={canvasRef}
                        width={1280}
                        height={720}
                        className="w-full h-full"
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleDownload}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                    <Download className="w-5 h-5" />
                    Download HD (1280x720)
                </button>

                <button
                    onClick={onReset}
                    className="btn-secondary flex items-center gap-2"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>
            </div>

            <div className="text-sm text-gray-400 text-center">
                YouTube Standard • PNG Format • High Quality
            </div>
        </div>
    );
}
