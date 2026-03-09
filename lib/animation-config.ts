// Pottery-like animation physics for Framer Motion
// Heavy, grounded, organic — nothing linear or snappy

/** Primary ease: long, sweeping, and grounded like pottery on a wheel */
export const POTTERY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Shorter but still organic ease for interactive feedback */
export const POTTERY_EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** Material Reveal: text/images emerge from dust */
export const materialReveal = {
    initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
    exit: { opacity: 0, filter: 'blur(6px)', y: -10 },
}

/** Floating parallax for product images */
export const floatingEffect = {
    animate: {
        y: [0, -12, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
}

/** Soundwave ring pulse (for concentric circles) */
export const soundwaveRing = (delay: number) => ({
    animate: {
        scale: [0.8, 2.5],
        opacity: [0.5, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: POTTERY_EASE,
            delay,
        },
    },
})

/** Logo expansion: double-tap to swallow screen */
export const logoExpansion = {
    initial: { scale: 1 },
    expand: {
        scale: 50,
        opacity: 0,
        transition: {
            duration: 1.2,
            ease: POTTERY_EASE,
        },
    },
}

/** Transition presets */
export const transitions = {
    slowReveal: {
        duration: 1.2,
        ease: POTTERY_EASE,
    },
    mediumReveal: {
        duration: 0.8,
        ease: POTTERY_EASE,
    },
    fastReveal: {
        duration: 0.5,
        ease: POTTERY_EASE_OUT,
    },
    /** For AnimatePresence page transitions */
    pageTransition: {
        duration: 0.9,
        ease: POTTERY_EASE,
    },
}

/** Stagger children animations */
export const staggerContainer = (staggerDelay = 0.15) => ({
    animate: {
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.3,
        },
    },
})
