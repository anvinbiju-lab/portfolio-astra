type SceneTransition = { ready: Promise<void>; finished: Promise<void>; updateCallbackDone: Promise<void>; skipTransition: () => void }
type TransitionDocument = Document & { startViewTransition?: (update: () => Promise<void>) => SceneTransition }
let running = false

/** Wait for the App Router's committed page before capturing the destination. */
export function transitionRoute(update: () => void, scene?: Element | null) {
    const doc = document as TransitionDocument
    if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches || running) { update(); return }
    running = true
    const source = scene instanceof HTMLElement ? scene : null
    source?.style.setProperty("view-transition-name", "project-media")
    let finish: () => void = () => {}, timeout: ReturnType<typeof setTimeout>
    const committed = new Promise<void>(resolve => { finish = resolve })
    const ready = () => finish()
    document.addEventListener("portfolio:route-ready", ready, { once: true })
    timeout = setTimeout(finish, 2500)
    let invoked = false
    let active: SceneTransition | undefined
    // Back/Forward must take priority over an unfinished decorative transition.
    const interrupt = () => { finish(); active?.skipTransition() }
    addEventListener("popstate", interrupt, true)
    const cleanup = () => {
        clearTimeout(timeout); document.removeEventListener("portfolio:route-ready", ready)
        removeEventListener("popstate", interrupt, true)
        source?.style.removeProperty("view-transition-name"); running = false
    }
    try {
        const transition = doc.startViewTransition(() => { invoked = true; update(); return committed })
        active = transition
        transition.ready.catch(() => {})
        transition.updateCallbackDone.catch(() => {})
        transition.finished.catch(() => {}).finally(cleanup)
    } catch { cleanup(); if (!invoked) update() }
}
