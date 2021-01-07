import i18n from '../i18n'
import { store } from '../store/store.vuex'

let language = ''
const otherLanguages = ['en', 'de', 'vi']

function getFirstBrowserLanguage() {
  const nav = window.navigator
  let i
  let language: string

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i]
      if (language && language.length) {
        return language
      }
    }
  }
  return null
}

function removeLanguageFromSupportedLanguages(language: string) {
  const index = otherLanguages.indexOf(language)
  if (index !== -1) {
    otherLanguages.splice(index, 1)
  }
}
function hasSupportedLanguages() {
  let isSupported = false
  const supportedLanguages = ['en', 'de', 'vi']
  let browserLanguage = getFirstBrowserLanguage()
  if (browserLanguage) {
    if (getFirstBrowserLanguage()?.includes('en')) {
      browserLanguage = 'en'
    }
    if (supportedLanguages.includes(browserLanguage)) {
      language = browserLanguage
      removeLanguageFromSupportedLanguages(language)
      isSupported = true
    }
  }
  return isSupported
}
export function setBrowserLanguage() {
  if (hasSupportedLanguages()) {
    if (i18n) {
      store.dispatch('app/setLanguage', language)
    }
  }
}

export default { setBrowserLanguage }
