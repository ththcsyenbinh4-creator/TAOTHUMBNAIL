# AI Anime Thumbnail Generator

Transform your photos into stunning anime-style YouTube thumbnails using AI.

## ✨ Features

- 🎨 **4 Anime Styles**: Vibrant, Ghibli, Dark Fantasy, Cyberpunk
- 🖼️ **Smart Thumbnail Editor**: Canvas-based with text overlay, safe zones
- 🤖 **AI-Powered**: Google Gemini integration for style prompts
- 📱 **Responsive Design**: Works on desktop and mobile
- ⚡ **Fast & Lightweight**: Minimal dependencies for quick deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Google Gemini API Key ([Get it here](https://aistudio.google.com/app/apikey))

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create `.env.local`:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## 📦 Deployment to Vercel

1. Push this code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add `GEMINI_API_KEY` in Environment Variables
4. Deploy!

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **AI**: Google Generative AI
- **Icons**: Lucide React
- **Language**: TypeScript

## 📝 How It Works

1. **Upload**: User uploads a photo (JPG/PNG, max 5MB)
2. **Style Selection**: Choose from 4 anime art styles
3. **AI Generation**: Gemini generates style-specific prompts
4. **Edit**: Canvas editor for text overlay, colors, safe zones
5. **Download**: Export as 1280x720 PNG thumbnail

## 🎯 SEO Optimization

The app includes AI-powered SEO suggestions for:
- Catchy video titles
- Thumbnail text (1-4 words)
- Attention-grabbing color palettes

## 📄 License

MIT License - feel free to use for your projects!
