<template>
  <div>
    <div class="language">
      <select
        v-model="language"
        class="language__options block text-center appearance-none w-min bg-transparent border border-gray-400 text-gray-400 py-1 px-3 rounded leading-tight focus:outline-none focus:bg-transparent focus:border-gray-200"
      >
        <option value="en">󠁧󠁢󠁥󠁮󠁧English</option>
        <option value="de">Deutsch</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { vxm } from '@/store/store.vuex'

@Component
export default class LanguageSwitcher extends Vue {
  language = this.currentLanguage

  @Watch('language')
  setLocale() {
    this.$store.dispatch('app/setLanguage', this.language)
  }

  get currentLanguage() {
    return vxm.app.getLanguage
  }
}
</script>

<style scoped>
select {
  text-align-last: center;
  text-align: -webkit-center;
}
</style>
