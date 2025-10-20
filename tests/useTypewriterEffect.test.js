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

        expect(text.value, 'text is not an empty string before writing for the first time').toEqual(emptyString)
        expect(isWriting.value, 'isWriting is not false before writing for the first time').toEqual(false)
    })

    test('write function', () => {
        write(testText)

        vi.advanceTimersToNextTimer()
        expect(text.value, 'text is an empty string').not.toEqual(emptyString)
        expect(text.value, 'text has been written out completely').not.toEqual(testText)
        expect(isWriting.value, 'isWriting is false while writing').toEqual(true)

        // after writing for 2 seconds that in this case means untill complition
        vi.advanceTimersByTime(twoSeconds)
        expect(text.value, 'text is an empty string after writing for 2 seconds').not.toEqual(emptyString)
        expect(text.value, 'text has not been written out completely after writing for 2 seconds').toEqual(testText)
        expect(isWriting.value, 'isWriting is still true after writing until complition').toEqual(false)
    })

    test('stop and resume functions', () => {
        write(testText)

        vi.advanceTimersToNextTimer()
        expect(text.value, 'text is an empty string').not.toEqual(emptyString)
        expect(text.value, 'text has been written out completely').not.toEqual(testText)
        expect(isWriting.value, 'isWriting is false while writing').toEqual(true)

        stop()

        expect(text.value, 'text is an empty string after stopping').not.toEqual(emptyString)
        expect(text.value, 'text has been written out completely after stopping').not.toEqual(testText)
        expect(isWriting.value, 'isWriting is true after stopping').toEqual(false)

        resume()

        vi.advanceTimersToNextTimer()
        expect(text.value, 'text is an empty string after resuming and writing for one iteration').not.toEqual(emptyString)
        expect(text.value, 'text has been written out completely after resuming and writing for one iteration which should not be enough').not.toEqual(testText)
        expect(isWriting.value, 'isWriting is false after resuming and writing not until complition').toEqual(true)

        vi.advanceTimersByTime(twoSeconds)
        expect(text.value, 'text is an empty string after writing for 2 seconds').not.toEqual(emptyString)
        expect(text.value, 'text has not been written out completely after writing for 2 seconds').toEqual(testText)
        expect(isWriting.value, 'isWriting is still true after writing until complition').toEqual(false)
    })
})