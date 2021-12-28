<template>
  <div class="testLogin">
    <input v-model="id" type="text" placeholder="id">
    <input v-model="pw" type="password" placeholder="pw">
    <input v-model="nickname" type="text" placeholder="nick">
    <input v-model="email" type="text" placeholder="email">
    <input v-model="charClass" type="text" placeholder="class">
    <input type="button" value="로그인" @click="testSignup">
    <input type="button" value="가입확인" @click="testCookie">
  </div>
</template>

<script>
// import axios from 'axios'
  export default {
    data () {
      return {
        id: '',
        pw: '',
        nickname: '',
        email: '',
        charClass: ''
      }
    },
    methods: {
      async testSignup () {
        try {
          const body = {
            userIdPk: this.id,
            password: this.pw,
            nickname: this.nickname,
            email: this.email,
            charClass: this.charClass
          }
          const resp = await this.$apis.postSignApi('/wingUserCreate', body)
          if (resp) {
            console.log(resp)
            this.$router.push('/')
          }
        } catch (e) {
          console.log(e)
        }
      },
      async testCookie () {
        try {
          const resp = await this.$apis.getSignApi('/wingUserCheck', { nickname: this.nickname })
          if (resp) {
            alert(resp.data.message)
            console.log(resp)
          }
        } catch (e) {
          alert('등록되지 않은 캐릭터명입니다. 관리자에게 문의하세요.')
          console.log(e)
        }
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>
