<template>
  <div class="testLogin">
    <input v-model="id" type="text">
    <input v-model="pw" type="password">
    <input type="button" value="로그인" @click="testLogin">
    <input type="button" value="쿠키테스트" @click="testCookie">
  </div>
</template>

<script>
// import axios from 'axios'
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
          const resp = await this.$apis.postSignApi('/wingUserLogin', { userIdPk: this.id, password: this.pw })
          // const resp = await axios.post('http://127.0.0.1:19490/wingService/wingUserLogin', { userIdPk: this.id, password: this.pw })
          if (resp) {
            console.log(resp)
            this.$router.push('/index')
          }
        } catch (e) {
          console.log(e)
          this.$router.push('/signup')
        }
      },
      async testCookie () {
        try {
          const resp = await this.$apis.getApi('/schedule')
          if (resp) {
            alert(resp)
            console.log(resp)
          }
        } catch (e) {
          console.log(e)
        }
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>
