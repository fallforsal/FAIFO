# Storytellers of Faifo - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Dev Server
```bash
pnpm dev
```

### 3. Open Browser
Navigate to `http://localhost:3000` and experience the storytelling flow!

---

## 📱 Experience the 5-Step Journey

**Step 1** - The Greeting: "Hello" with Vietnamese welcome message
**Step 2** - The Pulse: Pottery vase with hypnotic ripple animations
**Step 3** - Product Details: "Ly gốm Faifo" with specifications
**Step 4** - Video Story: Cinema-style player card
**Step 5** - The Choice: Diary or wishes selection

Use the "Tiếp theo" (Next) button to advance, "Quay lại" (Back) to return.

---

## 🎨 Customization Quick Tips

### Change Colors
Edit `/app/globals.css` `:root` section:
```css
--ceramic-brown: #722620;    /* Primary accent */
--ceramic-blue: #2A4B7C;     /* Secondary accent */
--ceramic-light: #F5F0E6;    /* Background */
```

### Adjust Animation Speeds
Open any step component and modify `transition` values:
```tsx
transition={{ duration: 0.7, delay: 0.2 }}  // Edit duration/delay
```

### Add More Steps
1. Create new file: `/components/steps/step6-newstep.tsx`
2. Update `TOTAL_STEPS` in `story-container.tsx`
3. Add import and case in switch statement
4. Progress bar automatically scales

### Change Typography
Edit font imports in `/app/layout.tsx`:
```tsx
import { Playfair_Display, Inter } from 'next/font/google'
```

---

## 📂 Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main entry point |
| `components/story-container.tsx` | Step orchestrator & navigation |
| `components/progress-bar.tsx` | Progress indicator |
| `components/vase-pulse.tsx` | Animated pottery with ripples |
| `components/steps/*.tsx` | Individual step screens |
| `app/globals.css` | Colors, animations, typography |
| `tailwind.config.ts` | Tailwind customization |

---

## 🎬 Component Hierarchy

```
StoryContainer (manages step state)
├── ProgressBar (shows progress)
├── AnimatePresence (manages transitions)
└── Current Step Component
    ├── PageTransition (fade-in wrapper)
    └── Step Content
        ├── Titles (serif)
        ├── Interactive Elements (buttons, cards)
        └── Animations (Framer Motion)
```

---

## 💡 Common Customizations

### Disable Back Button on Step 2
In `step2-pulse.tsx`:
```tsx
<button onClick={onBack} disabled>Quay lại</button>
```

### Change Step 2 Vase Color
In `vase-pulse.tsx`, update gradient colors:
```tsx
<stop offset="0%" stopColor="#NEW_COLOR" />
```

### Add New Animation
In `globals.css`, add keyframe:
```css
@keyframes new-animation {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
```

Then use in component:
```tsx
<motion.div animate={{ scale: [0, 1] }} />
```

### Increase Number of Pulse Ripples
In `vase-pulse.tsx`, change array length:
```tsx
{[0, 1, 2, 3].map(...)  // Add 4th ripple
```

---

## 🔍 Debugging

### Check Console for Errors
Open DevTools (F12) and look at Console tab

### Test Individual Steps
Temporarily modify `initialStep` in `story-container.tsx`:
```tsx
const [currentStep, setCurrentStep] = useState(3)  // Start at step 3
```

### Inspect Animations
In Framer Motion Devtools:
- Right-click → Inspect
- Look for `motion.div` elements
- Check animation `transition` props

### Mobile Testing
```bash
# From another terminal, start Ngrok
ngrok http 3000

# Visit the Ngrok URL on your phone
```

---

## 📱 Responsive Design

The app is optimized for:
- **Mobile**: 375px+ (iPhone SE, small phones)
- **Tablet**: 640px+ (iPad, tablets)
- **Desktop**: 1024px+ (laptops, large screens)

All components use `sm:` breakpoints for responsive styling.

---

## 🎯 Next: Add Your Content

1. **Step 3 Product Image**: Replace SVG in `step3-product.tsx`
2. **Step 4 Video**: Add video URL to player
3. **Step 5 Actions**: Connect diary/wish forms to Supabase
4. **Colors**: Adjust ceramic palette to match brand
5. **Text**: Update Vietnamese copy as needed

---

## 📚 Learn More

- **STORYTELLING.md** - Complete storytelling flow documentation
- **BUILD_SUMMARY.md** - What was built and how
- **README.md** - Project architecture and module structure

---

## 🆘 Troubleshooting

**Animations not working?**
- Check that `'use client'` is at top of component
- Verify Framer Motion is imported
- Ensure `motion.div` is used, not regular `div`

**Styles not applying?**
- Check Tailwind CSS is in globals.css
- Verify custom colors are in `globals.css` `:root`
- Use `className` not `class` in JSX

**Page not updating?**
- Check `useState` is imported from React
- Verify `setCurrentStep` is called in handlers
- Look for console errors

**Mobile looking weird?**
- Check responsive classes: `sm:px-6`, `md:text-2xl`
- Verify viewport meta tag in layout.tsx
- Test in Chrome DevTools mobile emulation

---

## 🚀 Ready to Deploy?

```bash
# Build for production
pnpm build

# Test production build locally
pnpm start

# Deploy to Vercel
# Push to GitHub, Vercel auto-deploys
```

---

**Enjoy building! 🏺✨**
