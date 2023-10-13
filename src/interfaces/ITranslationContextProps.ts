export interface ITranslationContextProps {
  translateText: (key: string) => string
  setCurrentLanguage: (lang: string) => void
  currentLanguage: string
  validLanguages: string[]
}
