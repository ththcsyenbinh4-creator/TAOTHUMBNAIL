"use client";

interface Style {
    id: string;
    name: string;
    emoji: string;
    description: string;
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
        description: "Bright, colorful modern anime"
    },
    {
        id: "ghibli",
        name: "Studio Ghibli",
        emoji: "🍃",
        description: "Soft, dreamy watercolor style"
    },
    {
        id: "dark",
        name: "Dark Fantasy",
        emoji: "🌑",
        description: "Gothic, dramatic atmosphere"
    },
    {
        id: "cyberpunk",
        name: "Cyberpunk",
        emoji: "🤖",
        description: "Neon, futuristic aesthetic"
    }
];

export default function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {styles.map((style) => (
                <button
                    key={style.id}
                    onClick={() => onStyleChange(style.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${selectedStyle === style.id
                            ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        }`}
                >
                    <div className="text-3xl mb-2">{style.emoji}</div>
                    <div className="font-semibold mb-1">{style.name}</div>
                    <div className="text-xs text-gray-400">{style.description}</div>
                </button>
            ))}
        </div>
    );
}
