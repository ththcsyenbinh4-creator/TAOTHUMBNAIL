// Professional YouTube Thumbnail Templates
// Based on proven high-CTR designs

export interface ThumbnailTemplate {
    id: string;
    name: string;
    category: 'gaming' | 'education' | 'entertainment' | 'tech' | 'lifestyle';
    avgCTR: number;
    description: string;
    layout: {
        facePosition: { x: number; y: number; scale: number };
        textZones: Array<{
            x: number;
            y: number;
            width: number;
            height: number;
            align: 'left' | 'center' | 'right';
        }>;
        colorScheme: {
            primary: string;
            secondary: string;
            text: string;
            shadow: string;
        };
    };
    preview: string;
}

export const PROFESSIONAL_TEMPLATES: ThumbnailTemplate[] = [
    // Gaming Templates (Red/Black - Intense)
    {
        id: 'gaming-shocked',
        name: 'Gaming Shock',
        category: 'gaming',
        avgCTR: 8.5,
        description: 'Perfect for reaction videos and epic moments',
        layout: {
            facePosition: { x: 0.7, y: 0.5, scale: 0.35 },
            textZones: [
                { x: 0.05, y: 0.15, width: 0.5, height: 0.2, align: 'left' }
            ],
            colorScheme: {
                primary: '#FF0000',
                secondary: '#000000',
                text: '#FFFFFF',
                shadow: '#8B0000'
            }
        },
        preview: '/templates/gaming-shocked.jpg'
    },
    {
        id: 'gaming-vs',
        name: 'Gaming VS Battle',
        category: 'gaming',
        avgCTR: 9.2,
        description: 'Comparison and versus content',
        layout: {
            facePosition: { x: 0.25, y: 0.5, scale: 0.3 },
            textZones: [
                { x: 0.35, y: 0.4, width: 0.3, height: 0.2, align: 'center' }
            ],
            colorScheme: {
                primary: '#FFD700',
                secondary: '#FF0000',
                text: '#FFFFFF',
                shadow: '#000000'
            }
        },
        preview: '/templates/gaming-vs.jpg'
    },

    // Education Templates (Blue/White - Clean)
    {
        id: 'edu-tutorial',
        name: 'Tutorial Master',
        category: 'education',
        avgCTR: 7.8,
        description: 'How-to and educational content',
        layout: {
            facePosition: { x: 0.75, y: 0.6, scale: 0.25 },
            textZones: [
                { x: 0.05, y: 0.2, width: 0.6, height: 0.25, align: 'left' }
            ],
            colorScheme: {
                primary: '#2563EB',
                secondary: '#FFFFFF',
                text: '#1E40AF',
                shadow: '#DBEAFE'
            }
        },
        preview: '/templates/edu-tutorial.jpg'
    },
    {
        id: 'edu-tips',
        name: 'Pro Tips',
        category: 'education',
        avgCTR: 8.1,
        description: 'Tips, tricks, and life hacks',
        layout: {
            facePosition: { x: 0.3, y: 0.5, scale: 0.3 },
            textZones: [
                { x: 0.55, y: 0.3, width: 0.4, height: 0.4, align: 'center' }
            ],
            colorScheme: {
                primary: '#10B981',
                secondary: '#FFFFFF',
                text: '#065F46',
                shadow: '#D1FAE5'
            }
        },
        preview: '/templates/edu-tips.jpg'
    },

    // Entertainment Templates (Yellow/Pink - Fun)
    {
        id: 'ent-viral',
        name: 'Viral Moment',
        category: 'entertainment',
        avgCTR: 9.5,
        description: 'Trending and viral content',
        layout: {
            facePosition: { x: 0.5, y: 0.5, scale: 0.4 },
            textZones: [
                { x: 0.1, y: 0.1, width: 0.8, height: 0.15, align: 'center' }
            ],
            colorScheme: {
                primary: '#FFD700',
                secondary: '#FF1493',
                text: '#FFFFFF',
                shadow: '#8B4513'
            }
        },
        preview: '/templates/ent-viral.jpg'
    },
    {
        id: 'ent-reaction',
        name: 'Epic Reaction',
        category: 'entertainment',
        avgCTR: 8.9,
        description: 'Reaction and commentary videos',
        layout: {
            facePosition: { x: 0.65, y: 0.45, scale: 0.35 },
            textZones: [
                { x: 0.05, y: 0.6, width: 0.5, height: 0.3, align: 'left' }
            ],
            colorScheme: {
                primary: '#FF00FF',
                secondary: '#00FFFF',
                text: '#FFFFFF',
                shadow: '#000000'
            }
        },
        preview: '/templates/ent-reaction.jpg'
    },

    // Tech Templates (Cyan/Purple - Modern)
    {
        id: 'tech-review',
        name: 'Tech Review',
        category: 'tech',
        avgCTR: 7.6,
        description: 'Product reviews and unboxing',
        layout: {
            facePosition: { x: 0.25, y: 0.6, scale: 0.28 },
            textZones: [
                { x: 0.5, y: 0.25, width: 0.45, height: 0.3, align: 'center' }
            ],
            colorScheme: {
                primary: '#00FFFF',
                secondary: '#8B00FF',
                text: '#FFFFFF',
                shadow: '#000033'
            }
        },
        preview: '/templates/tech-review.jpg'
    },
    {
        id: 'tech-comparison',
        name: 'Tech Comparison',
        category: 'tech',
        avgCTR: 8.3,
        description: 'Product comparisons and benchmarks',
        layout: {
            facePosition: { x: 0.5, y: 0.7, scale: 0.2 },
            textZones: [
                { x: 0.1, y: 0.15, width: 0.35, height: 0.25, align: 'center' },
                { x: 0.55, y: 0.15, width: 0.35, height: 0.25, align: 'center' }
            ],
            colorScheme: {
                primary: '#3B82F6',
                secondary: '#8B5CF6',
                text: '#FFFFFF',
                shadow: '#1E1B4B'
            }
        },
        preview: '/templates/tech-comparison.jpg'
    },

    // Lifestyle Templates (Pastel - Aesthetic)
    {
        id: 'life-vlog',
        name: 'Daily Vlog',
        category: 'lifestyle',
        avgCTR: 7.2,
        description: 'Vlogs and daily life content',
        layout: {
            facePosition: { x: 0.6, y: 0.5, scale: 0.32 },
            textZones: [
                { x: 0.05, y: 0.25, width: 0.45, height: 0.2, align: 'left' }
            ],
            colorScheme: {
                primary: '#FFC0CB',
                secondary: '#FFE4E1',
                text: '#8B4789',
                shadow: '#FFFFFF'
            }
        },
        preview: '/templates/life-vlog.jpg'
    },
    {
        id: 'life-transformation',
        name: 'Transformation',
        category: 'lifestyle',
        avgCTR: 8.7,
        description: 'Before/after and transformation content',
        layout: {
            facePosition: { x: 0.3, y: 0.5, scale: 0.3 },
            textZones: [
                { x: 0.5, y: 0.4, width: 0.45, height: 0.2, align: 'center' }
            ],
            colorScheme: {
                primary: '#10B981',
                secondary: '#FBBF24',
                text: '#FFFFFF',
                shadow: '#065F46'
            }
        },
        preview: '/templates/life-transformation.jpg'
    }
];

export function getTemplatesByCategory(category: ThumbnailTemplate['category']) {
    return PROFESSIONAL_TEMPLATES.filter(t => t.category === category);
}

export function getTopTemplates(limit: number = 5) {
    return [...PROFESSIONAL_TEMPLATES]
        .sort((a, b) => b.avgCTR - a.avgCTR)
        .slice(0, limit);
}
