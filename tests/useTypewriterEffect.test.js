import { useTypewriterEffect } from "@/composables/useTypewriterEffect";
import { describe, expect, test, vi, beforeEach, beforeAll, afterAll } from "vitest";

const testText = 'This is a test text'
const emptyString = ''
const twoSeconds = 2000

const {
    text,
    isWriting,
    write,
    reset,
    stop,
    resume } = useTypewriterEffect({
        speed: 10,
        numberOfSymbols: 2
    })

describe("Test useTypewritterEffect composable", () => {
    beforeAll(() => {
        // to simulate the time passing for the internal call to setInterval inside the write function
        vi.useFakeTimers()
    })

    afterAll(() => {
        vi.useRealTimers()
    })

    beforeEach(() => {
        reset()

        // before writing anything
        expect(text.value).toEqual(emptyString)
        expect(isWriting.value).toEqual(false)
    })

    test('write function', () => {
        write(testText)

        vi.advanceTimersToNextTimer()
        expect(text.value).not.toEqual(emptyString)
        expect(text.value).not.toEqual(testText)
        expect(isWriting.value).toEqual(true)

        // after writing for 2 seconds that in this case means untill complition
        vi.advanceTimersByTime(twoSeconds)
        expect(text.value).not.toEqual(emptyString)
        expect(text.value).toEqual(testText)
        expect(isWriting.value).toEqual(false)
    })

    test('stop and resume functions', () => {
        write(testText)

        vi.advanceTimersToNextTimer()
        expect(text.value).not.toEqual(emptyString)
        expect(text.value).not.toEqual(testText)
        expect(isWriting.value).toEqual(true)

        stop()

        expect(text.value).not.toEqual(emptyString)
        expect(text.value).not.toEqual(testText)
        expect(isWriting.value).toEqual(false)

        resume()

        vi.advanceTimersToNextTimer()
        expect(text.value).not.toEqual(emptyString)
        expect(text.value).not.toEqual(testText)
        expect(isWriting.value).toEqual(true)

        vi.advanceTimersByTime(twoSeconds)
        expect(text.value).not.toEqual(emptyString)
        expect(text.value).toEqual(testText)
        expect(isWriting.value).toEqual(false)
    })
})