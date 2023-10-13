import React, { createContext, useContext, useMemo, useEffect } from 'react'
import useClientLanguage from '../hooks/useClientLanguage'
import allLanguages from '../data/dataLanguages'
import { ITranslationContextProps } from '../interfaces/ITranslationContextProps'
import { IProviderProps } from '../interfaces/IProviderProps'
import languagesSearch from '../data/searchTranslate'

const defaultContext: ITranslationContextProps = {
  translateText: (key) => key,
  setCurrentLanguage: () => {},
  currentLanguage: '',
  validLanguages: []
}

export const TranslationContext =
  createContext<ITranslationContextProps>(defaultContext)

export const TranslationProvider: React.FC<IProviderProps> = ({
  languages,
  defaultLanguage = 'pt',
  storageKey = 'rtk::language',
  availableLanguages,
  children
}) => {
  useEffect(() => {
    availableLanguages.forEach((lang) => {
      if (!allLanguages[lang]) {
        console.warn(`A flag para o idioma '${lang}' não é válida.`)
      }
      if (!languages[lang]) {
        console.warn(`Tradução para o idioma '${lang}' está faltando.`)
      }
    })
  }, [availableLanguages, languages])

  const validLanguages = useMemo(() => {
    const uniqueLanguages = Array.from(new Set(availableLanguages))
    return uniqueLanguages.filter((lang) => !!languages[lang])
  }, [availableLanguages, languages])

  const [currentLanguage, setPreferredLanguage] = useClientLanguage(
    languages,
    defaultLanguage,
    storageKey
  )

  const translateText = (key: string) => {
    if (key === 'searchPlaceholder') {
      return languagesSearch[currentLanguage]?.['searchPlaceholder']
    }
    return languages[currentLanguage]?.[key] || key
  }

  const context = useMemo(
    () => ({
      translateText,
      setCurrentLanguage: setPreferredLanguage,
      currentLanguage: currentLanguage || defaultLanguage,
      validLanguages
    }),
    [currentLanguage, validLanguages]
  )

  return (
    <TranslationContext.Provider value={context}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  return useContext(TranslationContext)
}
