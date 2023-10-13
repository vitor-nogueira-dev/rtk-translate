import { useState, useEffect } from 'react'

type UseClientLanguageReturn = [string, (lang: string) => void]

const useClientLanguage = (
  languages: Record<string, any>,
  defaultLanguage: string = 'pt',
  storageKey: string
): UseClientLanguageReturn => {
  const [language, setLanguage] = useState<string>(defaultLanguage)

  useEffect(() => {
    const storedLanguage = localStorage.getItem(storageKey)
    if (storedLanguage) {
      setLanguage(storedLanguage)
      return
    }

    const browserLanguage = navigator.language.split('-')[0]
    setLanguage(languages[browserLanguage] ? browserLanguage : defaultLanguage)
  }, [])

  const setPreferredLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem(storageKey, lang)
  }

  return [language, setPreferredLanguage]
}

export default useClientLanguage
