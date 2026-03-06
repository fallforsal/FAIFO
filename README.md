# 🏺 Storytellers of Faifo

An NFC-powered digital storytelling and e-commerce platform for traditional Vietnamese pottery, built with modern web technologies for a seamless mobile-first experience.

## 🚀 Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with React Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality component library (New York style)
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library for React
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icons

### Data Management
- **[Supabase](https://supabase.com/)** - Open source Firebase alternative (PostgreSQL + Auth)
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization for React
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Development Tools
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Turbopack](https://turbo.build/pack)** - Ultra-fast bundler for development
- **[ESLint](https://eslint.org/)** - Static code analysis

## 📁 Project Architecture

This project follows a **feature-based module architecture** to cleanly separate the cultural storytelling experience from the e-commerce logic:

```text
faifo/
├── app/                     # Next.js App Router
│   ├── (experience)/        # NFC interaction routes
│   │   ├── scan/[id]/       # NFC entry point
│   │   └── story/           # Storytelling flow
│   ├── shop/                # E-commerce routes
│   └── layout.tsx           # Root layout with providers
├── components/              # Reusable UI components
│   ├── ui/                  # shadcn/ui components
│   ├── animations/          # Shared Framer Motion components
│   └── providers/           # React context providers
├── modules/                 # Feature-based modules
│   ├── nfc-engine/          # NFC scanning & routing logic
│   ├── storyteller/         # Digital letters & diary entries
│   │   ├── api/             # Supabase queries & TanStack hooks
│   │   ├── components/      # Story-specific components
│   │   ├── types/           # Zod schemas & TypeScript types
│   │   └── index.ts         # Module exports
│   └── product/             # Pottery catalog logic
├── lib/                     # Utility functions
│   ├── supabase.ts          # Supabase client configuration
│   ├── utils.ts             # Common utilities
│   └── query-client.ts      # TanStack Query configuration
└── ...config files
```
## Module Structure

Each feature module contains:

api/ - Query keys, API functions, and TanStack Query hooks interacting with Supabase

components/ - Feature-specific React components

types/ - TypeScript interfaces and Zod validation schemas

index.ts - Centralized exports for clean imports

## 🛠️ Getting Started
Prerequisites

Node.js 18+

pnpm (recommended) or npm

Supabase Project Setup

## Installation

```Clone the repository

Bash
git clone <repository-url>
cd faifo
```
### Install dependencies

```Bash
pnpm install
```
### Environment Setup
```Create a .env.local file in the root directory:
#Đoạn mã
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
### Start development server

```Bash
pnpm dev
```
### Open your browser
Navigate to http://localhost:3000
(Note: To test NFC flow on a physical mobile device, use Ngrok: ngrok http 3000)

### Available Scripts

```Bash
pnpm dev      # Start development server with Turbopack
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```
## 📖 Example Usage
Creating a New Feature Module (e.g., Storyteller)

## 1.Create module structure:

```Plaintext
modules/storyteller/
├── api/index.ts
├── components/
├── types/index.ts
└── index.ts
```
### 2.Define types with Zod:

```TypeScript
// modules/storyteller/types/index.ts
import { z } from "zod";

export const storySchema = z.object({
  id: z.string().uuid(),
  nfc_id: z.string(),
  sender_name: z.string().min(1, "Name is required"),
  message: z.string().max(500, "Message is too long"),
});

export type Story = z.infer<typeof storySchema>;
```
### 3. Create API hooks (with Supabase):

```TypeScript
// modules/storyteller/api/index.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useStory = (nfcId: string) => {
  return useQuery({
    queryKey: ["story", nfcId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("nfc_id", nfcId)
        .single();

      if (error) throw error;
      return data;
    },
  });
};
```
### 4.Build components:

```TypeScript
// modules/storyteller/components/story-form.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storySchema } from "../types";

export function StoryForm() {
  const form = useForm({
    resolver: zodResolver(storySchema),
  });
  // ... component logic with Framer Motion animations
}
```
## Working Example

Visit /scan/[nfc_id] to see a complete implementation featuring:

Seamless page transitions using Framer Motion

Real-time data fetching from Supabase via TanStack Query

Type-safe emotional message validation with Zod

## 🎯 Key Benefits
Physical-Digital Bridge: Flawlessly connects real-world pottery to cloud-based memories via NFC.

Cinematic UX: Heavy focus on smooth animations and storytelling pacing.

Type Safety: End-to-end TypeScript with Zod runtime validation.

Performance: Turbopack for fast development, optimized production builds.

Scalability: Feature-based architecture separating content delivery from e-commerce.

## 📚 Documentation
- **[CLAUDE.md](https://code.claude.com/docs)** - Detailed guidance for AI development

- **[Next.js](https://nextjs.org/docs)** Docs

- **[Supabase](https://supabase.com/docs)** Docs

- **[Framer Motion](https://motion.dev)** Docs

- **[TanStack Query](https://tanstack.com/query/latest)** Docs

## 🤝 Contributing
Follow the existing module structure.

Ensure all UI components are mobile-first and gracefully animated.

Use TypeScript and Zod for all new features.

Add proper error handling and loading states (skeleton loaders preferred).

## Built with ❤️ for the artisans of Faifo.
