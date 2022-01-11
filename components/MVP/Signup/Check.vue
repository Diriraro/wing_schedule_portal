<template>
  <div class="testSignupCheck">
    <div class="checkForm">
      <h2>가입확인</h2>
      <div class="nicknameForm">
        <input v-model="nickname" type="text" class="nickname" placeholder="캐릭터이름">
      </div>
      <button type="button" class="btn" @click="testCookie">
        체크하기
      </button>
      <div class="bottomText">
        <p>길드에 가입된 캐릭터명을</p><p>정확히 적어 주세요.</p>
        <!-- 처음 접속하셨나요? <em style="color: #1f1cb8; cursor:pointer;" @click="goSignUp"> 회원가입 </em> -->
      </div>
    </div>
  </div>
  <!-- <div class="testLogin">
    <input v-model="id" type="text" placeholder="id">
    <input v-model="pw" type="password" placeholder="pw">
    <input v-model="nickname" type="text" placeholder="nick">
    <input v-model="email" type="text" placeholder="email">
    <input v-model="charClass" type="text" placeholder="class">
    <input type="button" value="로그인" @click="testSignup">
    <input type="button" value="가입확인" @click="testCookie">
  </div> -->
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
            this.$router.push('/signup')
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
*{
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  font-family:sans-serif;

}

.checkForm {
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

.checkForm h2{
  text-align: center;
  margin: 30px;
}

.nicknameForm{
  border-bottom: 2px solid #adadad;
  margin: 30px;
  padding: 10px 10px;
}

.nickname {
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
