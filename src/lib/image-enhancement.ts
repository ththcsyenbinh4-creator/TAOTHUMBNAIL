// Image enhancement utilities

export interface EnhancementSettings {
    brightness: number; // 0-200 (100 = normal)
    contrast: number;   // 0-200 (100 = normal)
    saturation: number; // 0-200 (100 = normal)
    blur: number;       // 0-20 (background blur)
    vignette: number;   // 0-100 (darkness)
    sharpen: number;    // 0-100
}

export const DEFAULT_SETTINGS: EnhancementSettings = {
    brightness: 110,
    contrast: 115,
    saturation: 120,
    blur: 0,
    vignette: 20,
    sharpen: 10
};

export const PRESETS: Record<string, EnhancementSettings> = {
    vibrant: {
        brightness: 115,
        contrast: 125,
        saturation: 140,
        blur: 0,
        vignette: 15,
        sharpen: 20
    },
    soft: {
        brightness: 108,
        contrast: 95,
        saturation: 105,
        blur: 2,
        vignette: 25,
        sharpen: 0
    },
    sharp: {
        brightness: 105,
        contrast: 130,
        saturation: 110,
        blur: 0,
        vignette: 10,
        sharpen: 40
    },
    cinematic: {
        brightness: 95,
        contrast: 120,
        saturation: 100,
        blur: 0,
        vignette: 40,
        sharpen: 15
    },
    ghibli: {
        brightness: 112,
        contrast: 100,
        saturation: 115,
        blur: 3,
        vignette: 30,
        sharpen: 5
    }
};

export function applyEnhancements(
    canvas: HTMLCanvasElement,
    sourceImage: HTMLImageElement,
    settings: EnhancementSettings
) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to YouTube standard
    canvas.width = 1280;
    canvas.height = 720;

    // Calculate smart crop (cover fit)
    const imgAspect = sourceImage.width / sourceImage.height;
    const canvasAspect = 1280 / 720;

    let drawWidth, drawHeight, x, y;

    if (imgAspect > canvasAspect) {
        drawHeight = 720;
        drawWidth = drawHeight * imgAspect;
        x = (1280 - drawWidth) / 2;
        y = 0;
    } else {
        drawWidth = 1280;
        drawHeight = drawWidth / imgAspect;
        x = 0;
        y = (720 - drawHeight) / 2;
    }

    // Draw base image
    ctx.drawImage(sourceImage, x, y, drawWidth, drawHeight);

    // Apply filters
    const filters = [];

    if (settings.brightness !== 100) {
        filters.push(`brightness(${settings.brightness}%)`);
    }
    if (settings.contrast !== 100) {
        filters.push(`contrast(${settings.contrast}%)`);
    }
    if (settings.saturation !== 100) {
        filters.push(`saturate(${settings.saturation}%)`);
    }

    if (filters.length > 0) {
        ctx.filter = filters.join(' ');
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
    }

    // Apply vignette
    if (settings.vignette > 0) {
        const gradient = ctx.createRadialGradient(640, 360, 200, 640, 360, 700);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, `rgba(0,0,0,${settings.vignette / 100})`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1280, 720);
    }

    // Sharpen effect (simplified)
    if (settings.sharpen > 0) {
        const imageData = ctx.getImageData(0, 0, 1280, 720);
        const sharpened = applySharpen(imageData, settings.sharpen / 100);
        ctx.putImageData(sharpened, 0, 0);
    }
}

function applySharpen(imageData: ImageData, amount: number): ImageData {
    // Simplified sharpening using unsharp mask
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);

    // Sharpening kernel
    const kernel = [
        0, -amount, 0,
        -amount, 1 + 4 * amount, -amount,
        0, -amount, 0
    ];

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            for (let c = 0; c < 3; c++) {
                let sum = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = ((y + ky) * width + (x + kx)) * 4 + c;
                        const kernelIdx = (ky + 1) * 3 + (kx + 1);
                        sum += data[idx] * kernel[kernelIdx];
                    }
                }
                const outIdx = (y * width + x) * 4 + c;
                output.data[outIdx] = Math.max(0, Math.min(255, sum));
            }
            output.data[(y * width + x) * 4 + 3] = 255; // Alpha
        }
    }

    return output;
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string = 'thumbnail.png') {
    canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }, 'image/png', 1.0);
}
