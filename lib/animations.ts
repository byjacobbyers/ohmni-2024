// Standard scroll reveal animations for consistent feel across the site

export const scrollReveal = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.2, // Trigger when 20% visible
    margin: "-50px", // Start animation 50px before element enters viewport
  },
  transition: {
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1] as const, // Smooth ease-in-out
  },
}

export const scrollRevealFaster = {
  ...scrollReveal,
  transition: {
    duration: 0.4,
    ease: [0.25, 0.1, 0.25, 1] as const,
  },
}

export const scrollRevealSlower = {
  ...scrollReveal,
  transition: {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1] as const,
  },
}
