<template>
  <div class="signup">
    <div class="signupForm">
      <h2>회원가입</h2>
      <div class="idForm">
        <input v-model="id" type="text" class="id" placeholder="ID">
      </div>
      <div class="pwForm">
        <input v-model="pw" type="password" class="pw" placeholder="PW">
      </div>
      <div class="pwCheckForm">
        <input v-model="pwCheck" type="password" class="pwCheck" placeholder="PWCheck">
      </div>
      <div class="charClassForm">
        <input v-model="charClass" type="text" class="charClass" placeholder="직업">
      </div>
      <button type="button" class="btn" @click="confirmSignUp">
        회원가입
      </button>
      <div class="bottomText">
        비밀번호는 암호화되어 저장됩니다.<br>
        비밀번호찾기는 이메일로 진행하려 하였으나,<br>개인정보 이슈로 인해 기능 추가에 시간이 소요됩니다. :(<br>기억하기 쉬운 비밀번호를 사용해주세요.<br>
        만약 비밀번호를 잊어버렸을 경우 '디리라리로'에게 문의해주세요.
      </div>
    </div>
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
        email: '11',
        charClass: '',
        pwCheck: ''
      }
    },
    mounted () {
      if (this.$store.state.checkNick === '') {
        alert('잘못된 접근입니다.')
        this.$router.push('/signup/check')
      } else {
        this.initSignup()
      }
    },
    methods: {
      initSignup () {
        this.id = ''
        this.pw = ''
        this.pwCheck = ''
        this.charClass = ''
      },
      validateSignup () {
        let isValOk = true
        if (this.id === '' || this.id.length < 4) {
          alert('아이디가 너무 짧거나 입력되지 않았습니다.')
          isValOk = false
        } else if (this.pw === '' || this.pwCheck === '') {
          alert('비밀번호가 입력되지 않았습니다.')
          isValOk = false
        } else if (this.pw !== this.pwCheck) {
          alert('비밀번호가 일치하지 않습니다.')
          isValOk = false
        } else if (this.charClass === '') {
          alert('직업이 입력되지 않았습니다.')
          isValOk = false
        }
        return isValOk
      },
      async confirmSignUp () {
        const checkVal = this.validateSignup()
        if (!checkVal) { return }

        const returnFlag = await this.$common.asyncConfirm(`ID : ${this.id}<br>캐릭터명 : ${this.$store.state.checkNick}<br>회원가입을 진행하시겠습니까?`)
        if (!returnFlag) {
          return
        }
        this.postSignup()
      },
      async postSignup () {
        try {
          const body = {
            userIdPk: this.id,
            password: this.pw,
            nickname: this.$store.state.checkNick,
            email: this.email,
            charClass: this.charClass
          }
          const resp = await this.$apis.postSignApi('/wingUserCreate', body)
          if (resp) {
            // console.log(resp)
            await this.$common.alert('회원가입이 완료되었습니다.', () => {
              this.$router.push('/login')
            })
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

<style lang="scss">
*{
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  font-family:sans-serif;

}

.signupForm {
  position:absolute;
  width:600px;
  height:630px;
  padding: 30px, 20px;
  background-color:#FFFFFF;
  text-align:center;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  border-radius: 15px;
}

.signupForm h2{
  text-align: center;
  margin: 30px;
}

.idForm{
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

.pwForm{
  border-bottom: 2px solid #adadad;
  margin: 30px;
  padding: 10px 10px;
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

.pwCheckForm{
  border-bottom: 2px solid #adadad;
  margin: 30px;
  padding: 10px 10px;
}

.pwCheck {
  width: 100%;
  border:none;
  outline:none;
  color: #636e72;
  font-size:16px;
  height:25px;
  background: none;
}

.charClassForm{
  border-bottom: 2px solid #adadad;
  margin: 30px;
  padding: 10px 10px;
}

.charClass {
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
