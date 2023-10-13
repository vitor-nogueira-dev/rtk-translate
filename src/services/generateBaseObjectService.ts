import * as fs from 'fs'

const generateBaseObject = (
  languages: string[],
  ...translationKeys: string[]
) => {
  const keys = translationKeys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: 'Replace here with the translation to this language'
    }),
    {}
  )
  const languagesAndKeys = languages.reduce((acc, language) => {
    return {
      ...acc,
      [language]: keys
    }
  }, {})

  fs.writeFileSync('languages.json', JSON.stringify(languagesAndKeys, null, 2))
}

export default generateBaseObject
