<template>
  <div class="testLogin">
    <div class="loginForm">
      <h2>Login</h2>
      <div class="idForm">
        <input v-model="id" type="text" class="id" placeholder="ID">
      </div>
      <div class="passForm">
        <input v-model="pw" type="password" class="pw" placeholder="PW">
      </div>
      <button type="button" class="btn" @click="testLogin">
        LOG IN
      </button>
      <button type="button" class="btn" @click="testCookie">
        CookieTest
      </button>
      <div class="bottomText">
        처음 접속하셨나요? <em style="color: #1f1cb8; cursor:pointer;" @click="goSignUp"> 회원가입 </em>
      </div>
    </div>
    <!-- <input v-model="id" type="text">
    <input v-model="pw" type="password">
    <input type="button" value="로그인" @click="testLogin">
    <input type="button" value="쿠키테스트" @click="testCookie"> -->
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
            alert('환영합니다.')
            this.$router.push('/')
          }
        } catch (e) {
          alert('아이디 혹은 비밀번호가 잘못되었습니다.')
          console.log(e)
          // this.$router.push('/signup')
        }
      },
      async testCookie () {
        try {
          const resp = await this.$apis.getApi('/schedule')
          if (resp) {
            alert(resp.data)
            console.log(resp)
          }
        } catch (e) {
          console.log(e)
        }
      },
      goSignUp () {
        this.$router.push('/signup/check')
      }
    }

  }
</script>

<style lang="scss">
*{
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  // font-family:sans-serif;

}

.loginForm {
  position:absolute;
  width:300px;
  height:400px;
  padding: 30px, 20px;
  background-color:#FFFFFF;
  text-align:center;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  border-radius: 15px;
}

.loginForm h2{
  text-align: center;
  margin: 30px;
}

.idForm{
  border-bottom: 2px solid #adadad;
  margin: 30px;
  padding: 10px 10px;
}

.passForm{
  border-bottom: 2px solid #adadad;
  margin: 30px;
  padding: 10px 10px;
}

.id {
  width: 100%;
  border:none;
  outline:none;
  color: #636e72;
  font-size:16px;
  height:25px;
  background: none;
}

.pw {
  width: 100%;
  border:none;
  outline:none;
  color: #636e72;
  font-size:16px;
  height:25px;
  background: none;
}

.btn {
  position:relative;
  // left:40%;
  // transform: translateX(-50%);
  margin-bottom: 40px;
  width:80%;
  height:40px;
  background: linear-gradient(125deg,#81ecec,#6c5ce7,#81ecec);
  background-position: left;
  background-size: 200%;
  color:white;
  font-weight: bold;
  border:none;
  cursor:pointer;
  transition: 0.4s;
  display:inline;
}

.btn:hover {
  background-position: right;
}

.bottomText {
  text-align: center;
}

</style>
