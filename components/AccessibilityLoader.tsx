'use client'

import { useEffect } from 'react'

function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script')
        s.src = src
        s.onload = () => resolve()
        s.onerror = reject
        document.head.appendChild(s)
    })
}

export function AccessibilityLoader() {
    useEffect(() => {
        (async () => {
            // 1. jQuery
            await loadScript('/js/jquery.js')
            // 2. jQuery Cookie plugin
            await loadScript('/js/jquery.cookie.min.js')
            // 3. Web Speech API as ResponsiveVoice replacement
            ;(window as any).responsiveVoice = {
                speak: (text: string) => {
                    const utterance = new SpeechSynthesisUtterance(text)
                    utterance.lang = 'ru-RU'
                    speechSynthesis.cancel()
                    speechSynthesis.speak(utterance)
                },
                cancel: () => speechSynthesis.cancel(),
                isPlaying: () => speechSynthesis.speaking,
                getResponsiveVoice: (name: string) => name,
            }
            // 4. Load the accessibility plugin
            await loadScript('/js/uhpv-full.min.js')
        })()
    }, [])

    return null
}
