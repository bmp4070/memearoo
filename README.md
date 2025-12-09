# memearoo
Memaroo is a playful cross-platform mobile app (built with React Native + Expo) where users recreate iconic meme expressions. Pick a meme, mimic it using the front camera, capture your attempt, save it to the in-app gallery, and share the laugh.

## Project structure

```
App.tsx
src/
  assets/           # Placeholder for bundled assets
  components/       # Reusable UI widgets (cards, previews)
  context/          # Gallery state + persistence
  data/             # Static meme seed data
  navigation/       # App navigator + types
  screens/          # Feature screens
  types/            # Shared TypeScript models
```

## Running locally

1. Install dependencies: `npm install` (Expo CLI is required).
2. Start the dev server: `npm start`.
3. Launch on a device/simulator using the Expo Go app or the provided platform commands.

## Core flow

1. Browse the meme grid on **Home**.
2. Tap a meme to open **Meme Challenge**, where the meme overlays the front camera preview.
3. Capture your attempt, preview it, then save or share from the **Result** screen.
4. Review saved attempts in **Gallery** (tap to open, delete if needed).
5. Check **Settings** for app info and future toggles.
