"use client";

import { useState } from "react";
import { Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import StyleSelector from "@/components/StyleSelector";
import ThumbnailCanvas from "@/components/ThumbnailCanvas";

export default function Home() {
    const [step, setStep] = useState<"upload" | "style" | "edit">("upload");
    const [originalImage, setOriginalImage] = useState<string>("");
    const [processedImage, setProcessedImage] = useState<string>("");
    const [selectedStyle, setSelectedStyle] = useState<string>("vibrant");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleImageSelect = (imageData: string) => {
        setOriginalImage(imageData);
        setStep("style");
    };

    const handleGenerate = async () => {
        setIsGenerating(true);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ style: selectedStyle }),
            });

            const data = await response.json();

            if (data.success) {
                // In demo mode, use original image
                // In production, use data.imageUrl from actual AI generation
                setProcessedImage(originalImage);
                setStep("edit");
            }
        } catch (error) {
            console.error("Generation failed:", error);
            alert("Failed to generate image. Using original for demo.");
            setProcessedImage(originalImage);
            setStep("edit");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleReset = () => {
        setStep("upload");
        setOriginalImage("");
        setProcessedImage("");
        setSelectedStyle("vibrant");
    };

    return (
        <main className="min-h-screen">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-blue-500" />
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            AnimeThumbnail.ai
                        </h1>
                    </div>

                    {step !== "upload" && (
                        <button
                            onClick={handleReset}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Start Over
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {step === "upload" && (
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="text-center space-y-4">
                            <h2 className="text-5xl font-extrabold tracking-tight">
                                Transform Photos into
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Viral Anime Thumbnails
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Upload your image and let AI convert it to stunning anime style,
                                perfect for YouTube thumbnails that get clicks
                            </p>
                        </div>

                        <ImageUpload onImageSelect={handleImageSelect} />
                    </div>
                )}

                {step === "style" && (
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold">Choose Your Anime Style</h2>
                            <p className="text-gray-400">
                                Select the artistic style for your transformation
                            </p>
                        </div>

                        <div className="glass rounded-2xl p-8">
                            <img
                                src={originalImage}
                                alt="Original"
                                className="w-full max-w-2xl mx-auto rounded-lg mb-8"
                            />

                            <StyleSelector
                                selectedStyle={selectedStyle}
                                onStyleChange={setSelectedStyle}
                            />

                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="w-full mt-8 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating Magic...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Generate Anime Version
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {step === "edit" && processedImage && (
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">
                                Create Your Thumbnail
                            </h2>
                            <p className="text-gray-400">
                                Add text, adjust colors, and download your viral thumbnail
                            </p>
                        </div>

                        <ThumbnailCanvas imageUrl={processedImage} />
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 mt-20 py-8">
                <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                    <p>
                        Powered by Google Gemini AI • Built with Next.js & TailwindCSS
                    </p>
                </div>
            </footer>
        </main>
    );
}
