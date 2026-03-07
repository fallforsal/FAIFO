# Storytellers of Faifo - Storytelling Flow

## Overview

A cinematic, mobile-first digital storytelling experience that guides users through the craft and culture of Hội An pottery via a 5-step interactive journey.

## Visual Identity

- **Background**: Ceramic light beige (#F5F0E6)
- **Primary Accent**: Deep ceramic brown (#722620)
- **Secondary Accent**: Traditional blue (#2A4B7C)
- **Typography**: Playfair Display (serif) for titles, Inter (sans) for body text
- **Aesthetic**: Minimalist, emotional, "piece of memory" aesthetic

## The 5-Step Journey

### Step 1: The Greeting
**Component**: `Step1Greeting`

A warm welcome in Vietnamese language. Users see:
- "Hello" in large serif typography
- Vietnamese subtext: "Bạn vừa chạm vào một mảnh ký ức của Hội An"
- A "Tiếp theo" (Next) button with arrow icon

**Animation**: Staggered text entrance with 0.1-0.5s delays

---

### Step 2: The Pulse
**Component**: `Step2Pulse`

The heart of the experience—the pottery vase with cinematic ripple effect:
- Central SVG pottery vase silhouette in ceramic brown
- Expanding pulse/sonar ripple animations (3 ripples, 0.4s stagger)
- "Storytellers of Faifo" title below
- Subtle glow effect and scroll indicator

**Animation**: 
- Pulse ripples loop infinitely with cubic-bezier easing
- Vase scales up on entrance (0.8s)
- Scroll indicator bounces continuously

---

### Step 3: Product Detail
**Component**: `Step3Product`

Detailed product information for "Ly gốm Faifo":
- Product title and tagline
- High-quality image placeholder (SVG gradient mockup)
- Product attributes: Size, color, product line
- Emotional tagline: "Chúng tôi không chỉ làm gốm. Chúng tôi lưu giữ ký ức."

**Animation**: Staggered fade-in of elements (0.1-0.7s delays)

---

### Step 4: Video Story
**Component**: `Step4Video`

Full-screen video player aesthetic:
- Dark background with gradient overlay
- Play button center (16:9 aspect ratio)
- Text overlay: "Chúng tôi không chỉ làm gốm. Chúng tôi lưu giữ ký ức."
- Description of artisan stories

**Animation**: 
- Video card scales up on entrance
- Play button and text fade in with delays
- Hover effects on play button

---

### Step 5: The Choice
**Component**: `Step5Choice`

Users choose their storytelling path:

**Option 1**: "Viết nhật ký (cho bản thân)" - Write a diary for yourself
- BookOpen icon
- Personal memory preservation
- Arrow-right indicator on hover

**Option 2**: "Viết lời chúc (tặng bạn bè)" - Write wishes for friends
- Gift icon
- Sharing and connection
- Arrow-right indicator on hover

**Additional Actions**:
- "Quay lại" (Back) button
- "Bỏ qua" (Skip) button

**Animation**: 
- Cards slide in from left/right (-20/+20px)
- Hover lift effect (-4px translateY)
- Icons scale on hover
- Staggered entrance delays

---

## Progress Bar

**Component**: `ProgressBar`

Located at the top of each page:
- 6 horizontal segments representing the flow
- Current segment fills as user progresses
- Smooth animation: 0.6s cubic-bezier transition
- Light gray background, ceramic brown fill

---

## Global Navigation

**Back Button**: Returns to previous step (unavailable on Step 1)
**Next Button**: Advances to next step
**Skip Button**: Available on Step 5 to exit flow

---

## Component Architecture

```
components/
├── progress-bar.tsx          # Global progress indicator
├── page-transition.tsx       # Reusable fade-in animation wrapper
├── vase-pulse.tsx           # Animated pottery vase with ripples
├── story-container.tsx      # Main orchestrator, manages step state
└── steps/
    ├── step1-greeting.tsx
    ├── step2-pulse.tsx
    ├── step3-product.tsx
    ├── step4-video.tsx
    └── step5-choice.tsx
```

## Color Tokens

All components use CSS custom properties:
- `--ceramic-light`: #F5F0E6 (background)
- `--ceramic-brown`: #722620 (primary accent)
- `--ceramic-blue`: #2A4B7C (secondary accent)
- `--ceramic-dark`: #1a1a1a (text)
- `--ceramic-white`: #ffffff (cards)
- `--ceramic-gray`: #e5e5e5 (borders)

## Animation Patterns

### Entrance Animations
- Fade-in + slide-up: `opacity 0 → 1`, `transform translateY(20px) → 0`
- Duration: 0.6-0.7s
- Easing: `easeOut`
- Stagger delays: 0.1-0.2s between elements

### Hover States
- `whileHover={{ scale: 1.1 }}` on icons
- `whileHover={{ y: -4 }}` on cards (lift effect)
- `whileHover={{ x: 5 }}` on buttons (slide right)

### Continuous Animations
- Pulse ripples: 2.5s loop with 0.4s stagger
- Scroll indicator: 2s bounce
- Glow effect: 3s opacity pulse

## Typography Hierarchy

- **H1**: Playfair Display, 2-4rem, bold
- **H2**: Playfair Display, 1.5-3rem, bold
- **Body**: Inter, 1rem, regular
- **Small**: Inter, 0.75-0.875rem, regular

Line-height: 1.4-1.6 for body text

## Responsive Design

- Mobile-first approach
- Tailwind breakpoints: `sm:` (640px)
- Padding: `px-4 py-8` (mobile) → `sm:px-6 sm:px-8`
- Font sizes: `clamp()` for fluid scaling
- Max-width containers: `max-w-md`, `max-w-2xl`, `max-w-3xl`

## Accessibility

- Semantic HTML: `<button>`, `<h1>`, `<p>`
- ARIA labels on icon buttons
- Color contrast: WCAG AA compliant
- Touch targets: 44px+ for mobile buttons
- Keyboard navigation: Tab through buttons

## Extended Features (Future)

The architecture supports:
1. **Diary submission**: Step 5 → diary form with Supabase integration
2. **Wish sharing**: Step 5 → wish form with recipient selection
3. **NFC integration**: Entry point via `/scan/[id]`
4. **User accounts**: Supabase Auth integration
5. **Analytics**: Track user flow and engagement

## Configuration

To modify the visual design:
1. Update Tailwind colors in `tailwind.config.ts`
2. Adjust animation timings in Framer Motion `transition` props
3. Change spacing in component `className` attributes
4. Modify progress bar steps in `StoryContainer` (currently 5)

## Testing

Each step can be tested independently:
```tsx
// Test individual steps
import Step1Greeting from '@/components/steps/step1-greeting'

export default function Test() {
  return <Step1Greeting onNext={() => console.log('next')} />
}
```

## Performance Considerations

- SVG vase is lightweight (~500 bytes)
- Framer Motion animations use GPU-accelerated transforms
- Progress bar segments don't reflow on update
- Images lazy-load (when implemented)
- No external image requests on initial load
