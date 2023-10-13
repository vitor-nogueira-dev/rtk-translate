export interface ILanguageSelectProps {
  selected: string
  onChange: (lang: string) => void
  availableLanguages?: string[]
  isNameVisible?: boolean
  showSearchInput?: boolean
}
