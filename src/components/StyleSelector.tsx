"use client";

import { Check } from "lucide-react";

interface Style {
    id: string;
    name: string;
    emoji: string;
    description: string;
    gradient: string;
}

interface StyleSelectorProps {
    selectedStyle: string;
    onStyleChange: (styleId: string) => void;
}

const styles: Style[] = [
    {
        id: "vibrant",
        name: "Vibrant Anime",
        emoji: "✨",
        description: "Bright, eye-catching colors perfect for gaming & entertainment",
        gradient: "from-yellow-400 via-orange-500 to-pink-500"
    },
    {
        id: "ghibli",
        name: "Studio Ghibli",
        emoji: "🍃",
        description: "Soft, dreamy aesthetic for storytelling & lifestyle content",
        gradient: "from-green-400 via-teal-500 to-blue-500"
    },
    {
        id: "dark",
        name: "Dark Fantasy",
        emoji: "🌑",
        description: "Dramatic, mysterious vibe for horror & thriller videos",
        gradient: "from-purple-600 via-indigo-700 to-gray-900"
    },
    {
        id: "cyberpunk",
        name: "Cyberpunk",
        emoji: "🤖",
        description: "Neon, futuristic look for tech & sci-fi channels",
        gradient: "from-cyan-400 via-purple-500 to-pink-600"
    }
];

export default function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold">Choose Your Viral Style</h3>
                <p className="text-gray-400">Each style is optimized for maximum click-through rate</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {styles.map((style) => (
                    <button
                        key={style.id}
                        onClick={() => onStyleChange(style.id)}
                        className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${selectedStyle === style.id
                                ? "border-purple-500 bg-purple-500/10 scale-105 shadow-2xl shadow-purple-500/30"
                                : "border-white/20 glass-card hover:border-white/40 hover:scale-102 hover:shadow-xl"
                            }`}
                    >
                        {selectedStyle === style.id && (
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                <Check className="w-5 h-5 text-white" />
                            </div>
                        )}

                        <div className="flex items-start gap-4">
                            <div className={`text-5xl p-3 rounded-xl bg-gradient-to-br ${style.gradient} shadow-lg`}>
                                {style.emoji}
                            </div>

                            <div className="flex-1 space-y-2">
                                <h4 className="text-xl font-bold">{style.name}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {style.description}
                                </p>
                            </div>
                        </div>

                        <div className={`mt-4 h-2 rounded-full bg-gradient-to-r ${style.gradient} opacity-50`}></div>
                    </button>
                ))}
            </div>
        </div>
    );
}
