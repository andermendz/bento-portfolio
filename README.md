# Bento Portfolio

A modern, interactive portfolio built with React and a bento grid layout.

## Features

- **Bento Grid Layout** – Modular, responsive card-based design
- **Drag & Drop** – Rearrange cards with long-press to drag
- **Dark/Light Theme** – Toggle between themes with smooth transitions
- **Animated UI** – Powered by Framer Motion
- **Interactive Globe** – Location display using Cobe

## Tech Stack

- React 19
- TypeScript
- Vite
- Framer Motion
- Tailwind CSS
- Lucide Icons
- Cobe (3D Globe)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── components/
│   ├── BentoCard.tsx      # Reusable card component
│   ├── CardContents.tsx   # Individual card content components
│   ├── DetailView.tsx     # Modal/overlay view
│   └── Globe.tsx          # Interactive globe component
├── hooks/
│   └── useDragAndDrop.ts  # Drag and drop logic
├── types/
│   └── index.ts           # TypeScript types
├── App.tsx                # Main application
└── index.css              # Global styles
```

## Customization

- Update `CardContents.tsx` to modify your personal info
- Replace `/public/profile.png` with your photo
- Edit theme colors in `index.css`

## License

MIT
