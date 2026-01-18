"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
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
        <div className="w-full max-w-2xl mx-auto">
            <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${isDragging
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/20 hover:border-white/40 hover:bg-white/5"
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

                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <Upload className="w-8 h-8" />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-2">Upload Your Image</h3>
                        <p className="text-gray-400">
                            Drag and drop or click to browse
                        </p>
                    </div>

                    <div className="text-sm text-gray-500">
                        Supports JPG, PNG • Max 5MB
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
                    <X className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
