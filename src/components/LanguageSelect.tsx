import React, { useState, useMemo, useContext } from 'react'
import { FlagIcon } from 'react-flag-kit'
import allLanguages from '../data/dataLanguages'
import {
  getFilteredLanguages,
  getOrderedLanguages,
  getValidLanguages
} from '../services/languageService'
import { ILanguageSelectProps } from '../interfaces/ILanguageSelectProps'
import { TranslationContext } from '../contexts/TranslationContext'

const LanguageSelect: React.FC<ILanguageSelectProps> = ({
  selected,
  onChange,
  availableLanguages = Object.keys(allLanguages),
  isNameVisible = true,
  showSearchInput = true
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const { translateText } = useContext(TranslationContext)

  const toggleDropdown = () => setIsOpen((prev) => !prev)

  const validLanguages = useMemo(
    () => getValidLanguages(availableLanguages, allLanguages),
    [availableLanguages]
  )
  const orderedLanguages = useMemo(
    () => getOrderedLanguages(validLanguages, allLanguages),
    [validLanguages]
  )
  const filteredLanguages = useMemo(
    () => getFilteredLanguages(orderedLanguages, searchTerm, allLanguages),
    [searchTerm, orderedLanguages]
  )

  const CurrentLanguage = () => {
    const { code = 'UM', name = 'Indisponível' } = allLanguages[selected] || {}
    return (
      <div className='rtk-current-language' onClick={toggleDropdown}>
        <FlagIcon code={code} />
        {isNameVisible && <span>{name}</span>}
      </div>
    )
  }

  const LanguageOption = ({ lang }: { lang: string }) => {
    const handleClick = () => {
      onChange(lang)
      setIsOpen(false)
    }
    const { code = 'UM', name } = allLanguages[lang] || {}
    return (
      <div key={lang} className='rtk-language-option' onClick={handleClick}>
        <FlagIcon code={code} />
        {isNameVisible && <span>{name}</span>}
      </div>
    )
  }

  return (
    <div className='rtk-language-selector'>
      <CurrentLanguage />
      {isOpen && (
        <div className='rtk-languages-dropdown'>
          {isNameVisible && showSearchInput && (
            <input
              className='rtk-language-input-search'
              type='text'
              placeholder={translateText('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          {filteredLanguages.length ? (
            filteredLanguages.map((lang) => (
              <LanguageOption key={lang} lang={lang} />
            ))
          ) : (
            <div className='rtk-language-no-results'>Não encontrado</div>
          )}
        </div>
      )}
    </div>
  )
}

export { LanguageSelect }
