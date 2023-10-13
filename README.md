# 🌍 RTK - Translate (React Kit Translate)

RTK - Translate é uma biblioteca criada para simplificar a tradução de seu site, portfólio, software e muito mais. Projetada para ser **simples**, **intuitiva** e **prática**. Integre-a facilmente em seus projetos e suporte quantos idiomas desejar.

---
## 📦 Instalação

- **Usando npm:**

```bash
npm install rtk-translate
```

- **Usando yarn:**

```bash
yarn add rtk-translate
```
--- 
## 🚀 Como começar

### 1. Configuração Inicial

Envolva o componente principal da sua aplicação com o `TranslationProvider` e passe as propriedades necessárias:

```typescript
import { TranslationProvider } from 'rtk-translate';

function App() {
  return (
    <TranslationProvider 
        storageKey='sua-chave-no-storage' // Chave usada para salvar o idioma selecionado no storage.
        languages={...} // Forneça seus idiomas e traduções aqui. Veja o exemplo abaixo.
        defaultLanguage="seu-idioma-default" // Idioma padrão da aplicação.
        availableLanguages={["pt", "en", ...]} // Idiomas que você disponibilizou nas traduções. Exemplo abaixo.
    >
      <MyComponent />
    </TranslationProvider>
  );
}
```

## 📝 Propriedades do `TranslationProvider`

<details>
<summary>Veja aqui</summary>


| Propriedade          | Tipo       | Descrição                                                                                                                       |
| -------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `storageKey`         | `string`   | Usado para salvar o idioma atual no localStorage, ela é opcional, caso não seja passada será salvo com a chave `rtk::language`. |
| `languages`          | `object`   | Objeto contendo os idiomas, chaves de identificação e as traduções desejadas.                                                   |
| `defaultLanguage`    | `string`   | Define um idioma padrão para o seu projeto, caso não seja passado será usado o valor default `pt`.                              |
| `availableLanguages` | `string[]` | Array contendo todos os idiomas disponíveis no seu array `languages`.                                                           |

</details>

### Exemplo de `languages`:

<details>
<summary>Veja aqui</summary>

```javascript
const languages = {
  pt: {
    heading: 'Título 1',
    subheading: 'Subtítulo A',
    buttonLabel: 'Clique Aqui',
    contactUs: 'Fale Conosco'
  },
  en: {
    heading: 'Title 1',
    subheading: 'Subheading A',
    buttonLabel: 'Click Here',
    contactUs: 'Contact Us'
  },
  fr: {
    heading: 'Titre 1',
    subheading: 'Sous-titre A',
    buttonLabel: 'Cliquez ici',
    contactUs: 'Contactez-nous'
  },
  es: {
    heading: 'Título 1',
    subheading: 'Subtítulo A',
    buttonLabel: 'Haz clic aquí',
    contactUs: 'Contáctenos'
  }
  // ...
}
```
</details>


### Exemplo de `availableLanguages`:

<details>
<summary>Veja aqui</summary>

```typescript
const availableLanguages = ['pt', 'en', 'fr', 'es'];
```

</details>


### 2. Uso dentro dos componentes

#### Exemplo de uso com select:

```typescript
import { useTranslation } from 'rtk-translate';

function SellectLang() {
  const { translateText, setCurrentLanguage, currentLanguage } = useTranslation();

  const handleLanguageChange = (event) => {
    setCurrentLanguage(event.target.value);
  };

  return (
  <div>
      // Exemplo de uso com um select padrão para mudar o idioma
      <select onChange={handleLanguageChange} defaultValue={currentLanguage}>
        <option value="en">English</option>
        <option value="pt">Português</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
      </select>
      <div>
        <h1>{translateText('heading')}</h1> // traduz o texto com a chave 'heading'
        <h2>{translateText('subheading')}</h2> // traduz o texto com a chave 'subheading'
        <button>{translateText('buttonLabel')}</button> // traduz o texto com a chave 'buttonLabel'
        <a href="/contact">{translateText('contactUs')}</a> // traduz o texto com a chave 'contactUs'
      </div>
    </div>
  );
}
```

#### Exemplo de uso com botões:
**atenção o onClick precisa ter uma callback, conforme o código abaixo!**
```typescript
import { useTranslation } from 'rtk-translate';

function ButtonsLang() {
  const { setCurrentLanguage } = useTranslation();

  const handleLanguageChange = (lang) =>  setCurrentLanguage(lang);

  return (
    <section>
      <ul>
        <li><button onClick={() => handleLanguageChange('pt')}>🇧🇷 PT-BR</button></li>
        <li><button onClick={() => handleLanguageChange('en')}>🇺🇸 EN</button></li>
      </ul>
    </section>
  )
}
```


## 3. Componente `LanguageSelect`
O componente `LanguageSelect` é um seletor de idiomas desenvolvido para facilitar a experiência de internacionalização no seu site. Ele foi projetado pensando na usabilidade e eficiência, por isso apresenta as seguintes características:

- **Idioma e Bandeira**: Cada opção no dropdown é representada pelo nome do idioma e uma bandeira correspondente, tornando visualmente intuitivo para os usuários. Se preferir uma abordagem mais minimalista, é possível ocultar o nome e exibir apenas a bandeira.

- **Pesquisa Rápida**: Sabendo que alguns sites podem suportar uma extensa lista de idiomas, um campo de pesquisa foi incorporado ao dropdown. Ao clicar no seletor, um input é renderizado no topo do menu dropdown, permitindo que os usuários digitem e filtrem rapidamente para encontrar o idioma desejado.

>⚠️ O nome e o input funcionam em conjunto, ou seja, se o nome do idioma estiver oculto, o input de pesquisa também será oculto. Para exibir o input de pesquisa, o nome do idioma deve estar visível.

Utilize o `LanguageSelect` para oferecer uma navegação fluída e uma experiência de usuário enriquecedora, independente do número de idiomas que seu site suporta.

### Exemplo de uso do componente `LanguageSelect`:
```typescript
import { LanguageSelect, useTranslation } from 'rtk-translate';

// import o arquivo css 
import 'rtk-translate/dist/index.css'

function MyComponent() {
  const { translateText, setCurrentLanguage, currentLanguage, validLanguages } = useTranslation();

  return (
    <div>
      <LanguageSelect
        selected={currentLanguage}
        onChange={setCurrentLanguage}
        availableLanguages={validLanguages}
        // isNameVisible={true}
        // showSearchInput={true}
      />
      <div>
        <h1>{translateText('heading')}</h1>
        <h2>{translateText('subheading')}</h2>
        <button>{translateText('buttonLabel')}</button>
        <a href="/contact">{translateText('contactUs')}</a>
      </div>
    </div>
  );
}

```

## 📝 Propriedades do componente `LanguageSelect`

<details>
<summary>Veja aqui</summary>

| Propriedade          | Tipo       | Descrição                                                                                                                                                                              |
| -------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selected`           | `string`   | Idioma atual do site, pode ser obtido através da propriedade `currentLanguage` do `useTranslation()`.                                                                                  |
| `onChange`           | `function` | Função que muda o idioma atual do site. Pode ser obtida através da propriedade `setCurrentLanguage` do `useTranslation()`.                                                             |
| `availableLanguages` | `string[]` | Array que a `rtk-translate` já validou com base nos seus idiomas fornecidos ao `TranslationProvider`. É disponibilizado através da propriedade `validLanguages` do `useTranslation()`. |
| `isNameVisible`      | `boolean`  | Booleano que define se o nome do idioma será renderizado junto com a bandeira, o valor default é `true`.                                                                               |
| `showSearchInput`    | `boolean`  | Booleano que define se o campo de pesquisa será renderizado no dropdown, o valor default é `true`.                                                                                    |

</details>


## 📝 Propriedades do `useTranslation()`
<details>
<summary>Veja aqui</summary>

| Propriedade          | Tipo       | Descrição                                                                                                    |
| -------------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| `translateText`      | `function` | Função que retorna a tradução correspondente à chave fornecida. Recebe a chave do texto que deseja traduzir. |
| `setCurrentLanguage` | `function` | Função que define o idioma atual do site. Recebe o novo idioma desejado como parâmetro.                      |
| `currentLanguage`    | `string`   | Representa o idioma atual em uso no site.                                                                    |
| `validLanguages`     | `string[]` | Array de idiomas validados pela `rtk-translate`, com base nos idiomas fornecidos ao `TranslationProvider`.   |

</details>


## 🎨 Classes `CSS` para `Customização` do componente `LanguageSelect`
Aqui estão as classes CSS que você pode sobrescrever para personalizar a aparência do componente `LanguageSelect`:
<details>
<summary>Veja aqui</summary>

| Classe                                               | Descrição                                        | Sobrescrição Sugerida                                                    |
| ---------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------ |
| `.rtk-language-selector`                             | Estilização geral do seletor de idioma.          | `.rtk-language-selector { ... !important; }`                             |
| `.rtk-current-language`                              | Estilo do idioma atual exibido.                  | `.rtk-current-language { ... !important; }`                              |
| `.rtk-current-language > img`                        | Estilo da imagem/bandeira do idioma atual.       | `.rtk-current-language > img { ... !important; }`                        |
| `.rtk-languages-dropdown`                            | Estilo do menu dropdown que lista os idiomas.    | `.rtk-languages-dropdown { ... !important; }`                            |
| `.rtk-languages-dropdown .rtk-language-option > img` | Estilo da imagem/bandeira nos itens do dropdown. | `.rtk-languages-dropdown .rtk-language-option > img { ... !important; }` |
| `.rtk-language-option, .rtk-language-no-results`     | Estilo dos itens individuais no dropdown.        | `.rtk-language-option { ... !important; }`                               |
| `.rtk-language-option:last-child`                    | Estilo para o último item no dropdown.           | `.rtk-language-option:last-child { ... !important; }`                    |
| `.rtk-language-option:hover`                         | Estilo hover dos itens no dropdown.              | `.rtk-language-option:hover { ... !important; }`                         |
| `.rtk-language-input-search`                         | Estilo do campo de busca no dropdown.            | `.rtk-language-input-search { ... !important; }`                         |                                      


</details>

---

### Mais infos 
- [Rtk Translate](https://github.com/vitor-nogueira-dev/rtk-translate) - repositório no GitHub.

### Dúvidas, sugestões e melhorias 
Se você tiver dúvidas, quiser relatar um bug ou solicitar novos recursos, por favor, abra uma [issue](https://github.com/vitor-nogueira-dev/rtk-translate/issues) no nosso repositório, ou conecte-se comigo no Linkedin - [Vitor Nogueira](https://www.linkedin.com/in/vitor-nogueira-dev/)

### Referências
- [React Flag Kit](https://www.npmjs.com/package/react-flag-kit)
- [Rtk Translate](https://www.npmjs.com/package/rtk-translate)

### Licença
Rtk Translate is [MIT licensed](./LICENSE).

### Agradecimentos

Este projeto utiliza a biblioteca **React Flag Kit**, cujo copyright é detido por Bowtie AB e está licenciada sob a licença MIT. Detalhes sobre esta licença podem ser encontrados em [MIT licensed](./LICENSE-ReactFlagKit.txt).

---
> 🔗 Veja uma [demonstração ao vivo aqui](https://rtk-translate-demo.vercel.app/).

---
> ⭐️ Este README foi gerado a partir do Gerador de README drag in drop. Experimente aqui: [Code Mark](https://code-mark.vercel.app/)
