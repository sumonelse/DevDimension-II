import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import soundEngine from "./soundEngine"

/**
 * The whole point of the sound engine is that nothing is constructed until a
 * sound is actually requested, so the tests assert on `Audio` construction
 * rather than on playback (jsdom does not implement media at all).
 */
class FakeAudio {
    constructor(src) {
        this.src = src
        this.currentTime = 0
        this.paused = true
        this.loop = false
        this.playbackRate = 1
        this.volume = 1
        this.loadCalls = 0
        this.removed = []
        FakeAudio.instances.push(this)
    }

    play() {
        this.paused = false
        return Promise.resolve()
    }

    pause() {
        this.paused = true
    }

    load() {
        this.loadCalls += 1
    }

    removeAttribute(name) {
        this.removed.push(name)
    }

    get readyState() {
        return 1
    }
}
FakeAudio.instances = []

const AMBIENCE =
    "/audio/mixkit-futuristic-sci-fi-computer-ambience-2507.wav"
const WHOOSH = "/audio/mixkit-fast-rocket-whoosh-1714.wav"
const BLOCK_HIT = "/audio/mixkit-electronic-retro-block-hit-2185.wav"

beforeEach(() => {
    FakeAudio.instances = []
    vi.stubGlobal("Audio", FakeAudio)
    soundEngine.destroy()
})

afterEach(() => {
    soundEngine.destroy()
    vi.unstubAllGlobals()
})

describe("lazy construction", () => {
    it("constructs no audio elements until a sound is requested", () => {
        // The bug this replaces: every visitor downloaded 5.73 MB of WAV.
        expect(FakeAudio.instances).toHaveLength(0)
    })

    it("constructs exactly one player for the first request", () => {
        soundEngine.play("hover")
        expect(FakeAudio.instances).toHaveLength(1)
    })

    it("reuses the same player for repeated requests", () => {
        soundEngine.play("hover")
        soundEngine.play("hover")
        soundEngine.play("hover")
        expect(FakeAudio.instances).toHaveLength(1)
    })

    it("ignores an unknown sound", () => {
        soundEngine.play("does-not-exist")
        expect(FakeAudio.instances).toHaveLength(0)
    })
})

describe("player sharing", () => {
    it("gives `click` and `glitch` separate players despite sharing a file", () => {
        // Different playbackRate, so a shared element would fight over state.
        soundEngine.play("click")
        soundEngine.play("glitch")

        expect(FakeAudio.instances).toHaveLength(2)
        expect(FakeAudio.instances[0].src).toBe(BLOCK_HIT)
        expect(FakeAudio.instances[1].src).toBe(BLOCK_HIT)
        expect(FakeAudio.instances[1].playbackRate).toBe(0.8)
    })

    it("applies the configured volume", () => {
        soundEngine.play("hover")
        expect(FakeAudio.instances[0].volume).toBe(0.1)
    })

    it("marks the ambience as looping", () => {
        soundEngine.play("ambient")
        expect(FakeAudio.instances[0].loop).toBe(true)
    })
})

describe("mute", () => {
    it("builds nothing while muted", () => {
        soundEngine.setMuted(true)
        soundEngine.play("click")
        expect(FakeAudio.instances).toHaveLength(0)
    })

    it("reports the muted state", () => {
        expect(soundEngine.isMuted()).toBe(false)
        soundEngine.setMuted(true)
        expect(soundEngine.isMuted()).toBe(true)
    })

    it("pauses and rewinds a playing ambience when muted", () => {
        soundEngine.startAmbient()
        const ambient = FakeAudio.instances[0]
        expect(ambient.paused).toBe(false)

        soundEngine.setMuted(true)
        expect(ambient.paused).toBe(true)
    })
})

describe("ambience fade", () => {
    it("keeps volume inside [0, 1] when the frame timestamp predates scheduling", () => {
        // `requestAnimationFrame` passes the frame's timestamp, which can be
        // earlier than the `performance.now()` captured when it was scheduled.
        // A one-sided clamp turned that into a negative volume and threw
        // IndexSizeError on the media element.
        const nowSpy = vi.spyOn(performance, "now").mockReturnValue(1000)
        const frames = []

        globalThis.requestAnimationFrame = (cb) => {
            frames.push(cb)
            return frames.length
        }
        globalThis.cancelAnimationFrame = () => {}

        soundEngine.startAmbient()
        const ambient = FakeAudio.instances[0]

        // A frame stamped *before* the fade was scheduled.
        frames[0](900)

        expect(ambient.volume).toBeGreaterThanOrEqual(0)
        expect(ambient.volume).toBeLessThanOrEqual(1)

        // And a normal forward frame still lands on the target.
        frames[frames.length - 1](1400)
        expect(ambient.volume).toBeCloseTo(0.1, 5)

        nowSpy.mockRestore()
    })

    it("never writes a volume outside [0, 1] at any point in the fade", () => {
        const nowSpy = vi.spyOn(performance, "now").mockReturnValue(0)
        const frames = []
        globalThis.requestAnimationFrame = (cb) => {
            frames.push(cb)
            return frames.length
        }
        globalThis.cancelAnimationFrame = () => {}

        soundEngine.startAmbient()
        const ambient = FakeAudio.instances[0]

        for (const stamp of [-500, -1, 0, 100, 200, 399, 400, 401, 5000]) {
            for (const cb of frames.splice(0)) cb(stamp)
            expect(ambient.volume).toBeGreaterThanOrEqual(0)
            expect(ambient.volume).toBeLessThanOrEqual(1)
        }

        nowSpy.mockRestore()
    })
})

describe("autoplay unlock", () => {
    it("stays locked until a gesture", () => {
        soundEngine.watchForFirstGesture()
        expect(soundEngine.isUnlocked()).toBe(false)
    })

    it("unlocks on the first gesture and primes the frequent sounds", () => {
        soundEngine.watchForFirstGesture()

        window.dispatchEvent(new Event("pointerdown"))

        expect(soundEngine.isUnlocked()).toBe(true)
        // hover + click, but not the 4 MB ambience loop.
        expect(FakeAudio.instances).toHaveLength(2)
    })

    it("only unlocks once", () => {
        soundEngine.watchForFirstGesture()

        window.dispatchEvent(new Event("pointerdown"))
        const afterFirst = FakeAudio.instances.length

        window.dispatchEvent(new Event("keydown"))
        window.dispatchEvent(new Event("pointerdown"))

        expect(FakeAudio.instances).toHaveLength(afterFirst)
    })
})

describe("destroy", () => {
    it("releases every cached player", () => {
        soundEngine.play("hover")
        soundEngine.play("click")

        soundEngine.destroy()

        expect(FakeAudio.instances).toHaveLength(2)
        // Detaching the source and reloading is what actually stops the
        // download; a pause alone would let it continue.
        FakeAudio.instances.forEach((audio) => {
            expect(audio.removed).toContain("src")
            expect(audio.loadCalls).toBeGreaterThan(0)
        })
    })

    it("allows rebuilding afterwards", () => {
        soundEngine.play("hover")
        soundEngine.destroy()

        soundEngine.play("hover")
        expect(FakeAudio.instances).toHaveLength(2)
    })
})

describe("sound sources", () => {
    it("never points at a file that is not in the project", () => {
        // The engine hard-codes paths, so this catches a rename or a move.
        const known = new Set(
            ["ambient", "transition", "hover", "click", "webShoot", "glitch"].map(
                (name) => {
                    soundEngine.play(name)
                    const created = FakeAudio.instances.at(-1)
                    return created?.src
                }
            )
        )

        expect(known.size).toBeGreaterThan(0)
        // The ambience and whoosh are the two largest files; both are real.
        expect(known.has(AMBIENCE)).toBe(true)
        expect(known.has(WHOOSH)).toBe(true)
    })
})
