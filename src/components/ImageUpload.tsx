"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon, Sparkles } from "lucide-react";
import { fileToBase64, validateImageFile } from "@/lib/utils";

interface ImageUploadProps {
    onImageSelect: (imageData: string) => void;
}

export default function ImageUpload({ onImageSelect }: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        setError("");

        const validation = validateImageFile(file);
        if (!validation.valid) {
            setError(validation.error || "Invalid file");
            return;
        }

        try {
            const base64 = await fileToBase64(file);
            onImageSelect(base64);
        } catch (err) {
            setError("Failed to read file");
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div
                className={`relative border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 ${isDragging
                        ? "border-purple-500 bg-purple-500/20 scale-105 glow"
                        : "border-white/30 glass-card hover:border-purple-400 hover:bg-white/10 hover:scale-102"
                    }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleChange}
                    className="hidden"
                />

                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">
                            {isDragging ? (
                                <Sparkles className="w-12 h-12 text-white animate-pulse" />
                            ) : (
                                <Upload className="w-12 h-12 text-white" />
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-2xl font-bold gradient-text">
                            Upload Your Photo
                        </h3>
                        <p className="text-gray-300 text-lg">
                            Drag & drop or click to browse
                        </p>
                        <div className="flex items-center gap-4 justify-center text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                <span>JPG, PNG</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                            <span>Max 5MB</span>
                        </div>
                    </div>

                    <div className="glass-card px-6 py-3 rounded-full text-sm font-medium">
                        ✨ AI will transform it into viral anime thumbnail
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl flex items-center gap-3 text-red-300 glass-card">
                    <X className="w-5 h-5" />
                    <span className="font-medium">{error}</span>
                </div>
            )}
        </div>
    );
}
