/** True when the visitor has asked the OS for reduced motion. */
export function usePrefersReducedMotion() {
  const reduced = ref(false)

  onMounted(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = query.matches

    const onChange = (e: MediaQueryListEvent) => {
      reduced.value = e.matches
    }
    query.addEventListener('change', onChange)
    onUnmounted(() => query.removeEventListener('change', onChange))
  })

  return reduced
}

/** True on devices with a precise pointer — gates cursor and tilt effects. */
export function useFinePointer() {
  const fine = ref(false)

  onMounted(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    fine.value = query.matches

    const onChange = (e: MediaQueryListEvent) => {
      fine.value = e.matches
    }
    query.addEventListener('change', onChange)
    onUnmounted(() => query.removeEventListener('change', onChange))
  })

  return fine
}

/**
 * Runs `frame` on requestAnimationFrame, but only while `target` is on
 * screen. Keeps canvas and scroll-linked effects off the main thread budget
 * once they scroll away.
 */
export function useRafWhenVisible(
  target: Ref<HTMLElement | null | undefined>,
  frame: (time: number) => void,
  options: { immediate?: boolean } = {},
) {
  let rafId = 0
  let observer: IntersectionObserver | null = null
  let running = false

  function loop(time: number) {
    frame(time)
    rafId = requestAnimationFrame(loop)
  }

  function start() {
    if (running)
      return
    running = true
    rafId = requestAnimationFrame(loop)
  }

  function stop() {
    running = false
    if (rafId)
      cancelAnimationFrame(rafId)
    rafId = 0
  }

  onMounted(() => {
    const el = target.value
    if (!el)
      return

    observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    observer.observe(el)

    if (options.immediate)
      start()
  })

  onUnmounted(() => {
    stop()
    observer?.disconnect()
  })

  return { start, stop }
}

/**
 * Scroll progress of an element through the viewport, 0 → 1.
 * 0 when its top edge first touches the bottom of the screen,
 * 1 when its bottom edge leaves the top.
 */
export function useScrollProgress(target: Ref<HTMLElement | null | undefined>) {
  const progress = ref(0)
  let ticking = false

  function measure() {
    const el = target.value
    if (!el)
      return

    const rect = el.getBoundingClientRect()
    const total = rect.height + window.innerHeight
    const travelled = window.innerHeight - rect.top
    progress.value = Math.min(1, Math.max(0, travelled / total))
    ticking = false
  }

  function onScroll() {
    if (ticking)
      return
    ticking = true
    requestAnimationFrame(measure)
  }

  onMounted(() => {
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })

  return progress
}

export function scrollToElement(id: string) {
  if (!id)
    return
  const element = document.querySelector(id) as HTMLElement | null
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
