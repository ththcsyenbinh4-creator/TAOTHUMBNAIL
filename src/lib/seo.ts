// SEO and International Optimization

export interface SEOSuggestion {
    title: string;
    thumbnailText: string;
    keywords: string[];
    targetAudience: 'US' | 'EU' | 'Global';
    estimatedCTR: number;
}

const POWER_WORDS = [
    'AMAZING', 'INSANE', 'SHOCKING', 'SECRET', 'VIRAL',
    'EPIC', 'ULTIMATE', 'BEST', 'WORST', 'CRAZY',
    'UNBELIEVABLE', 'MIND-BLOWING', 'INCREDIBLE', 'EXPOSED',
    'REVEALED', 'TRUTH', 'HIDDEN', 'BANNED', 'FORBIDDEN'
];

const EMOTIONAL_TRIGGERS = [
    'WOW', 'OMG', 'NO WAY', 'MUST SEE', 'WATCH THIS',
    'YOU WON\'T BELIEVE', 'THIS IS', 'FINALLY', 'NEW'
];

export function generateSEOTitle(context: string, niche: string): string[] {
    const suggestions: string[] = [];

    // Pattern 1: Power Word + Context
    suggestions.push(`${POWER_WORDS[Math.floor(Math.random() * 5)]} ${context}`);

    // Pattern 2: How to + Context
    suggestions.push(`How to ${context} (EASY METHOD)`);

    // Pattern 3: Number + Context
    suggestions.push(`${Math.floor(Math.random() * 10) + 1} ${context} You NEED to Know`);

    // Pattern 4: Question
    suggestions.push(`Is ${context} Worth It? (HONEST REVIEW)`);

    // Pattern 5: Comparison
    suggestions.push(`${context} vs ${context} - Which is BETTER?`);

    return suggestions.slice(0, 3);
}

export function generateThumbnailText(title: string): string[] {
    const suggestions: string[] = [];

    // Extract key words (3-5 words max)
    const words = title.toUpperCase().split(' ').filter(w => w.length > 3);

    // Suggestion 1: First power word
    const powerWord = words.find(w => POWER_WORDS.includes(w));
    if (powerWord) {
        suggestions.push(powerWord);
    }

    // Suggestion 2: First 2-3 words
    suggestions.push(words.slice(0, 3).join(' '));

    // Suggestion 3: Emotional trigger
    suggestions.push(EMOTIONAL_TRIGGERS[Math.floor(Math.random() * EMOTIONAL_TRIGGERS.length)]);

    return suggestions.filter(s => s && s.length <= 20).slice(0, 3);
}

export function getColorRecommendations(audience: 'US' | 'EU' | 'Global'): {
    primary: string;
    secondary: string;
    reasoning: string;
}[] {
    const recommendations = {
        US: [
            {
                primary: '#FFD700',
                secondary: '#FF0000',
                reasoning: 'Yellow + Red: High energy, urgency - performs best in US market'
            },
            {
                primary: '#00FFFF',
                secondary: '#FF00FF',
                reasoning: 'Cyan + Magenta: Modern, eye-catching - great for tech/gaming'
            }
        ],
        EU: [
            {
                primary: '#2563EB',
                secondary: '#FFFFFF',
                reasoning: 'Blue + White: Trust, professionalism - EU preference'
            },
            {
                primary: '#10B981',
                secondary: '#F59E0B',
                reasoning: 'Green + Amber: Balanced, optimistic - universal appeal'
            }
        ],
        Global: [
            {
                primary: '#FFFFFF',
                secondary: '#000000',
                reasoning: 'White + Black: Maximum contrast, works everywhere'
            },
            {
                primary: '#FFD700',
                secondary: '#8B4513',
                reasoning: 'Gold + Brown: Premium feel, culturally neutral'
            }
        ]
    };

    return recommendations[audience];
}

export function analyzeKeywords(title: string): {
    keyword: string;
    searchVolume: 'high' | 'medium' | 'low';
    competition: 'high' | 'medium' | 'low';
}[] {
    // Simplified keyword analysis (in production, use real API)
    const words = title.toLowerCase().split(' ');

    return words
        .filter(w => w.length > 4)
        .slice(0, 5)
        .map(keyword => ({
            keyword,
            searchVolume: Math.random() > 0.5 ? 'high' : 'medium',
            competition: Math.random() > 0.5 ? 'medium' : 'low'
        }));
}
