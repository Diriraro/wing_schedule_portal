<template>
  <div class="layout-template">
    <Header ref="header" />
    <div id="tna-content-sec">
      <client-only>
        <slot name="content" />
      </client-only>
    </div>
    <!-- <Footer ref="footer" /> -->
    <a href="#top" class="btn_toppos" style="display: none;" title="맨위로 이동">TOP</a>
  </div>
</template>

<script>
import Header from '~/components/MVP/Common/Header.vue'

export default {
  components: {
    Header
  },
  data () {
    return {
      isMainPage: (this.$route.path === '/' || this.$route.path === '/main')
    }
  },
  mounted () {
    // window.addEventListener('scroll', this.scroll)
  },
  beforeDestroy () {
    // window.removeEventListener('scroll', this.scroll)
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
