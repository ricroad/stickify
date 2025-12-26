# Stickify - Reality Sketchbook

Transform everyday photos into handheld architectural sketches using AI. A seamless blend of digital and analog aesthetics.

## ✨ Features

- 🎨 **Lovart Design Style**: Minimalist gallery aesthetic with ample whitespace
- 🔐 **BYOK Mode**: Bring Your Own Key - users provide their own Replicate API Token
- 🚀 **Fast & Simple**: No server-side configuration needed
- 📱 **Responsive Design**: Works on mobile and desktop
- 💾 **Local Storage**: API Key saved securely in browser
- ✍️ **Optimized Prompts**: Built-in prompts for consistent sketch style

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📋 Requirements

- Node.js 22+
- pnpm 10+
- Replicate API Token (get from https://replicate.com/account/api-tokens)

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import repository in Vercel
3. **No environment variables needed** (BYOK mode)
4. Deploy

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📖 Usage

1. Visit the application
2. Click "Set API Key" and enter your Replicate token
3. Upload a JPG or PNG image
4. Wait for processing (30-60 seconds)
5. Download the generated sketch

## 🏗️ Architecture

```
Frontend (React + Vite)
    ↓
Backend (Express.js)
    ↓
Replicate API (SDXL Model)
```

**Key Points:**
- Frontend sends image + user's API Key to backend
- Backend acts as proxy (doesn't store keys)
- Backend calls Replicate with user's credentials
- Result returned to frontend for download

## 📁 Project Structure

```
stickify/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/Home.tsx    # Main UI
│   │   ├── App.tsx           # App entry
│   │   └── index.css         # Styles
│   └── public/
├── server/              # Express backend
│   ├── index.ts         # Server setup
│   └── api.ts           # API routes
├── package.json
└── DEPLOYMENT_GUIDE.md  # Detailed guide
```

## 🎨 Design Philosophy

**Lovart Minimalist Style:**
- Black & white color palette
- Grid-based layout
- Mix of serif and sans-serif typography
- Ample whitespace
- Smooth animations
- Subtle texture (noise pattern)

## 🔧 Customization

### Change Prompts

Edit `server/api.ts`:

```typescript
const SYSTEM_PROMPT = `Your custom prompt...`;
const NEGATIVE_PROMPT = `What to avoid...`;
```

### Adjust Model Parameters

In `server/api.ts`:

```typescript
{
  prompt_strength: 0.55,      // 0.3-0.7
  guidance_scale: 6.0,        // 5.0-10.0
  num_inference_steps: 30,    // 20-50
}
```

### Modify Design

Edit `client/src/index.css` to change colors, fonts, and spacing.

## 📚 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion
- **Backend**: Express.js, Multer
- **AI**: Replicate API, SDXL Model
- **Deployment**: Vercel

## ❓ FAQ

**Q: Is my API Key safe?**
A: Yes. Keys are only stored in your browser's local storage, never sent to our servers.

**Q: What image formats are supported?**
A: JPG and PNG. Recommended size: 2-5MB.

**Q: How long does processing take?**
A: Usually 30-60 seconds depending on Replicate's load.

**Q: Can I use a different AI model?**
A: Yes, modify the model ID in `server/api.ts`.

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please feel free to submit issues and pull requests.

---

**Made with ❤️ using Lovart design principles**
# Stickify - Force Redeploy
