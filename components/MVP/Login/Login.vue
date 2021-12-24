<template>
  <div class="testLogin">
    <input v-model="id" type="text">
    <input v-model="pw" type="password">
    <input type="button" value="로그인" @click="testLogin">
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        id: '',
        pw: ''
      }
    },
    methods: {
      async testLogin () {
        try {
          // const resp = await this.$apis.postApi('/wingUserLogin', { userIdPk: this.id, password: this.pw })
          const resp = await axios.post('localhost:19490/wingService', { userIdPk: this.id, password: this.pw })
          if (resp) { alert(resp) }
        } catch (e) {
          console.log(e)
        }
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>
