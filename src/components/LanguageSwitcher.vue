<template>
  <div>
    <div class="language">
      <select
        v-model="$i18n.locale"
        class="language__options block text-center appearance-none w-full bg-transparent border border-gray-400 text-gray-100 py-1 px-4 rounded leading-tight focus:outline-none focus:bg-transparent focus:border-gray-200"
      >
        <option value="en">󠁧󠁢󠁥󠁮󠁧🇬🇧</option>
        <option value="de">🇩🇪</option>
        <option value="vi">🇻🇳</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LanguageSwitcher extends Vue {
  language = ''
  otherLanguages = ['en', 'de', 'vi']

  created() {
    if (this.hasSupportedLanguages()) {
      if (this.$i18n) {
        this.$i18n.locale = this.language
      }
    }
  }

  setLocale(locale: string) {
    this.$i18n.locale = locale
  }

  hasSupportedLanguages() {
    let isSupported = false
    const supportedLanguages = ['en', 'de', 'vi']
    let browserLanguage = this.getFirstBrowserLanguage()
    if (browserLanguage) {
      if (this.getFirstBrowserLanguage()?.includes('en')) {
        browserLanguage = 'en'
      }
      if (supportedLanguages.includes(browserLanguage)) {
        this.language = browserLanguage
        this.removeLanguageFromSupportedLanguages(this.language)
        isSupported = true
      }
    }
    return isSupported
  }

  getFirstBrowserLanguage() {
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
    /* 
    const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage']
    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      // eslint-disable-next-line no-undef
      console.log(browserLanguagePropertyKeys)
      language = nav[browserLanguagePropertyKeys[i]]
      if (language && language.length) {
        return language
      }
    } */

    return null
  }

  removeLanguageFromSupportedLanguages(language: string) {
    const index = this.otherLanguages.indexOf(language)
    if (index !== -1) {
      this.otherLanguages.splice(index, 1)
    }
  }
}
</script>

<style scoped>
select {
  text-align-last: center;
}
</style>
