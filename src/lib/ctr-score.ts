// CTR Scoring Algorithm based on research

export interface CTRScore {
    overall: number;
    face: number;
    text: number;
    color: number;
    composition: number;
    emotion: number;
    breakdown: {
        category: string;
        score: number;
        feedback: string;
    }[];
}

export function calculateCTRScore(thumbnail: {
    hasFace: boolean;
    faceSize: number; // 0-1 (percentage of thumbnail)
    faceEmotion: 'neutral' | 'happy' | 'surprised' | 'shocked' | 'angry';
    hasText: boolean;
    textLength: number;
    textContrast: number; // 0-1
    colorVibrancy: number; // 0-1
    colorContrast: number; // 0-1
    ruleOfThirds: boolean;
}): CTRScore {

    // Face Score (30% weight) - Research: 35-50% CTR increase
    let faceScore = 0;
    let faceFeedback = '';

    if (thumbnail.hasFace) {
        // Optimal face size: 25-40% of thumbnail
        if (thumbnail.faceSize >= 0.25 && thumbnail.faceSize <= 0.4) {
            faceScore = 100;
            faceFeedback = 'Perfect face size for maximum engagement';
        } else if (thumbnail.faceSize > 0.4) {
            faceScore = 80;
            faceFeedback = 'Face is too large - consider showing more context';
        } else {
            faceScore = 60;
            faceFeedback = 'Face is too small - make it larger for better CTR';
        }

        // Emotion bonus
        const emotionBonus = {
            'shocked': 20,
            'surprised': 15,
            'happy': 10,
            'angry': 5,
            'neutral': 0
        };
        faceScore = Math.min(100, faceScore + emotionBonus[thumbnail.faceEmotion]);

    } else {
        faceScore = 30;
        faceFeedback = 'Add a face for 35-50% CTR increase';
    }

    // Text Score (25% weight) - Research: 23-40% CTR increase
    let textScore = 0;
    let textFeedback = '';

    if (thumbnail.hasText) {
        // Optimal: 3-5 words
        if (thumbnail.textLength >= 3 && thumbnail.textLength <= 5) {
            textScore = 100;
            textFeedback = 'Perfect text length for mobile readability';
        } else if (thumbnail.textLength > 5) {
            textScore = 70;
            textFeedback = 'Too much text - keep it under 5 words';
        } else {
            textScore = 80;
            textFeedback = 'Good, but 3-5 words is optimal';
        }

        // Contrast bonus (critical for readability)
        textScore = textScore * thumbnail.textContrast;

    } else {
        textScore = 50;
        textFeedback = 'Add text for 23-40% CTR boost';
    }

    // Color Score (20% weight) - Research: 28% increase for vibrant colors
    let colorScore = 0;
    let colorFeedback = '';

    // Vibrancy (bright colors perform better)
    const vibrancyScore = thumbnail.colorVibrancy * 50;

    // Contrast (high contrast = better visibility)
    const contrastScore = thumbnail.colorContrast * 50;

    colorScore = vibrancyScore + contrastScore;

    if (colorScore >= 80) {
        colorFeedback = 'Excellent color contrast and vibrancy';
    } else if (colorScore >= 60) {
        colorFeedback = 'Good colors, but increase contrast for better visibility';
    } else {
        colorFeedback = 'Use brighter, more contrasting colors';
    }

    // Composition Score (15% weight)
    let compositionScore = thumbnail.ruleOfThirds ? 100 : 60;
    const compositionFeedback = thumbnail.ruleOfThirds
        ? 'Perfect composition using rule of thirds'
        : 'Try positioning key elements on grid intersections';

    // Emotion Score (10% weight)
    const emotionScores = {
        'shocked': 100,
        'surprised': 90,
        'happy': 75,
        'angry': 60,
        'neutral': 40
    };
    const emotionScore = thumbnail.hasFace ? emotionScores[thumbnail.faceEmotion] : 50;
    const emotionFeedback = thumbnail.hasFace
        ? `${thumbnail.faceEmotion} expression detected`
        : 'Add expressive face for emotional connection';

    // Calculate weighted overall score
    const overall = Math.round(
        faceScore * 0.30 +
        textScore * 0.25 +
        colorScore * 0.20 +
        compositionScore * 0.15 +
        emotionScore * 0.10
    );

    return {
        overall,
        face: Math.round(faceScore),
        text: Math.round(textScore),
        color: Math.round(colorScore),
        composition: Math.round(compositionScore),
        emotion: Math.round(emotionScore),
        breakdown: [
            { category: 'Face Detection', score: Math.round(faceScore), feedback: faceFeedback },
            { category: 'Text Overlay', score: Math.round(textScore), feedback: textFeedback },
            { category: 'Color Contrast', score: Math.round(colorScore), feedback: colorFeedback },
            { category: 'Composition', score: Math.round(compositionScore), feedback: compositionFeedback },
            { category: 'Emotional Impact', score: Math.round(emotionScore), feedback: emotionFeedback },
        ]
    };
}

export function getCTRScoreLabel(score: number): {
    label: string;
    color: string;
    className: string;
} {
    if (score >= 80) {
        return { label: 'Excellent CTR', color: 'green', className: 'score-excellent' };
    } else if (score >= 65) {
        return { label: 'Good CTR', color: 'blue', className: 'score-good' };
    } else if (score >= 50) {
        return { label: 'Average CTR', color: 'yellow', className: 'score-average' };
    } else {
        return { label: 'Needs Improvement', color: 'red', className: 'score-poor' };
    }
}
