export interface IProviderProps {
  languages: Record<string, any>
  defaultLanguage?: string
  storageKey?: string
  availableLanguages: string[]
  children: React.ReactNode
}
