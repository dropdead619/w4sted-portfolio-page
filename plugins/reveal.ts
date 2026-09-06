/**
 * v-reveal — releases an element from its hidden state the first time it
 * enters the viewport. All observed elements share one IntersectionObserver,
 * so a page full of reveals costs a single observer rather than dozens.
 *
 * Usage:
 *   v-reveal
 *   v-reveal="{ delay: 120, y: 40, blur: 10, threshold: 0.4 }"
 *
 * SSR renders `data-reveal=""` so the element is already hidden in the
 * initial HTML and never flashes in before hydration.
 */
interface RevealOptions {
  delay?: number
  /** Vertical offset (px) the element travels in from. */
  y?: number
  /** Entry blur (px). */
  blur?: number
  /** Entry scale. */
  scale?: number
  threshold?: number
  /** Extra ms added per index, for staggering siblings. */
  stagger?: number
  index?: number
}

const DEFAULTS: Required<Pick<RevealOptions, 'delay' | 'y' | 'blur' | 'scale' | 'threshold'>> = {
  delay: 0,
  y: 22,
  blur: 6,
  scale: 1,
  threshold: 0.15,
}

export default defineNuxtPlugin((nuxtApp) => {
  // One observer per threshold value — most elements share the default.
  const observers = new Map<number, IntersectionObserver>()

  function observerFor(threshold: number) {
    let observer = observers.get(threshold)
    if (observer)
      return observer

    observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting)
            continue
          entry.target.setAttribute('data-reveal', 'in')
          obs.unobserve(entry.target)
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observers.set(threshold, observer)
    return observer
  }

  // Every element handed to an observer, so the failsafe below can sweep them.
  const tracked = new Set<HTMLElement>()

  /**
   * Failsafe: reveal anything that is on screen but still hidden. An element
   * that never receives its IntersectionObserver callback would otherwise stay
   * invisible for good, which is a far worse outcome than skipping the
   * animation. Off-screen elements are left alone so scroll reveals still work.
   */
  function sweep() {
    for (const el of tracked) {
      if (el.getAttribute('data-reveal') === 'in') {
        tracked.delete(el)
        continue
      }

      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.setAttribute('data-reveal', 'in')
        tracked.delete(el)
      }
    }
  }

  if (import.meta.client) {
    window.addEventListener('load', () => setTimeout(sweep, 400))
    setTimeout(sweep, 2500)
  }

  nuxtApp.vueApp.directive<HTMLElement, RevealOptions | undefined>('reveal', {
    getSSRProps() {
      return { 'data-reveal': '' }
    },

    mounted(el, binding) {
      const opts = { ...DEFAULTS, ...(binding.value ?? {}) }
      const delay = opts.delay + (opts.stagger ?? 0) * (opts.index ?? 0)

      el.style.setProperty('--reveal-delay', `${delay}ms`)
      el.style.setProperty('--reveal-y', `${opts.y}px`)
      el.style.setProperty('--reveal-blur', `${opts.blur}px`)
      el.style.setProperty('--reveal-s', `${opts.scale}`)

      // Reduced-motion users skip the choreography entirely.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.setAttribute('data-reveal', 'in')
        return
      }

      el.setAttribute('data-reveal', '')
      tracked.add(el)
      observerFor(opts.threshold).observe(el)
    },

    unmounted(el, binding) {
      const threshold = { ...DEFAULTS, ...(binding.value ?? {}) }.threshold
      observers.get(threshold)?.unobserve(el)
      tracked.delete(el)
    },
  })
})
