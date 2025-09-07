import { ref, readonly } from 'vue'

export function useTypewriterEffect(options) {
    const _text = ref('')
    const isWriting = ref(false)
    let _inputText = ''
    let _currentIndex = 0
    let _interval = -1
    let _stopped = false
    let _resuming = false
    let _options = _setOptions(options)

    function write(inputText) {
        if (_interval > 0 && !_resuming) {
            console.warn('the typewritter effect is already active, call reset() to reset the state')
            return
        }

        _ifNotStringThrow(inputText)

        _inputText = inputText
        _interval = setInterval(() => {
            if (_currentIndex < _inputText.length) {
                isWriting.value = true
                if (_options.numberOfSymbols > 1) {
                    _text.value += _inputText.slice(_currentIndex, _currentIndex + _options.numberOfSymbols)
                } else {
                    _text.value += _inputText.at(_currentIndex)
                }
                _currentIndex += _options.numberOfSymbols
            }
            else {
                clearInterval(_interval)
                _interval = -1
                _currentIndex = 0
                isWriting.value = false
            }
        }, _options.speed)
    }

    function reset() {
        stop()
        _text.value = ''
        _inputText = ''
        _currentIndex = 0
        _interval = -1
        _stopped = false
        _resuming = false
    }

    function stop() {
        _stopped = true
        if (_interval > 0) {
            clearInterval(_interval)
            isWriting.value = false
        }
    }

    function resume() {
        if (_stopped && _inputText) {
            _stopped = false
            _resuming = true
            write(_inputText)
            _resuming = false
        }
    }

    function _setOptions(inputOptions) {
        console.log("Input options", inputOptions)

        let defaultOptions = {
            speed: 10,
            numberOfSymbols: 1
        }

        if (inputOptions.speed && typeof inputOptions.speed === 'number' && inputOptions.speed > 0) {
            defaultOptions.speed = inputOptions.speed
        } else if (inputOptions.speed) {
            console.warn(`the speed option should be a valid number greater then 0. The defualt value ${defaultOptions.speed} will be used`)
        }
        if (inputOptions.numberOfSymbols && typeof inputOptions.numberOfSymbols === 'number' && inputOptions.numberOfSymbols >= 1) {
            defaultOptions.numberOfSymbols = Math.ceil(inputOptions.numberOfSymbols)
        } else if (inputOptions.numberOfSymbols) {
            console.warn(`the numberOfSymbols option should be a valid number greater or equal to 1. The defualt value ${defaultOptions.numberOfSymbols} will be used`)
        }

        console.log("Final options", defaultOptions)

        return defaultOptions
    }

    function _ifNotStringThrow(inputText) {
        if (!inputText || typeof inputText !== "string") {
            throw new Error('the type of the text must be string')
        }
    }

    const text = readonly(_text)

    return {
        text,
        isWriting,
        write,
        reset,
        stop,
        resume
    }
}