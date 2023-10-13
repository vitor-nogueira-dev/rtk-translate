type LanguageInfo = {
  code: string
  name: string
  lang: string
}

export const getValidLanguages = (
  availableLanguages: string[],
  allLanguages: { [key: string]: { code: string; name: string } }
): string[] => {
  const allLanguagesSet = new Set(Object.keys(allLanguages))
  return availableLanguages.filter((lang) => allLanguagesSet.has(lang))
}

export const getOrderedLanguages = (
  validLanguages: string[],
  allLanguages: { [key: string]: { code: string; name: string } }
): string[] => {
  const validAndOrdered: LanguageInfo[] = validLanguages.map((lang) => ({
    code: allLanguages[lang]?.code || 'UM',
    name: allLanguages[lang]?.name || 'Indisponível',
    lang
  }))
  return validAndOrdered
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((l) => l.lang)
}

export const getFilteredLanguages = (
  orderedLanguages: string[],
  searchTerm: string,
  allLanguages: { [key: string]: { code: string; name: string } }
): string[] => {
  if (!searchTerm.trim()) return orderedLanguages
  return orderedLanguages.filter((lang) =>
    allLanguages[lang]?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
}
