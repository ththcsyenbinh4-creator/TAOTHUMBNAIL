import { NextRequest, NextResponse } from "next/server";
import { generateAnimePrompt } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const { style } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        // Generate AI prompt for the selected style
        const prompt = await generateAnimePrompt(style);

        // Note: For actual image generation, you would integrate with:
        // - Stable Diffusion API
        // - Imagen API (when available)
        // - Or other image generation services

        // For demo purposes, return a placeholder
        return NextResponse.json({
            success: true,
            prompt,
            // In production, this would be the generated image URL
            imageUrl: "https://placehold.co/1280x720/1a1a1a/4ade80?text=AI+Generated+Anime",
            message: "Demo mode: Using placeholder. Integrate real image generation API for production."
        });

    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate image" },
            { status: 500 }
        );
    }
}
