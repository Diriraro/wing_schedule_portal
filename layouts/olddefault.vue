<template>
  <Error v-if="error" :error="error" />
  <div v-else>
    <div class="tna-wrapper">
      <div class="tna-content">
        <Nuxt />
        <Alert v-if="$store.state.alertInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import Error from '~/layouts/error.vue'
import Alert from '~/components/MVP/Common/Alert.vue'

export default {
  components: {
      Alert,
      Error
    },
    data () {
    return {
      error: false
    }
  }
}
</script>

<style>
html {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #000;
}
a{
  color: #2e2e2e;
}

body{
  font-family: Apple SD Gothic Neo,Roboto,Arial Helvetica,sans-serif;
  background: #fff;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.clear{
  display: block !important;
  clear: both !important;
  float: none !important;
}
</style>
