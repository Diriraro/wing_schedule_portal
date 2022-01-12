<template>
  <div class="testSignupCheck">
    <div class="checkForm">
      <h2>가입확인</h2>
      <div class="nicknameForm">
        <input v-model="nickname" type="text" class="nickname" placeholder="캐릭터이름">
      </div>
      <button type="button" class="btn" @click="checkNickname">
        체크하기
      </button>
      <div class="bottomText">
        <p>길드에 가입된 캐릭터명을</p><p>정확히 적어 주세요.</p>
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
        email: '',
        charClass: ''
      }
    },
    methods: {
      async checkNickname () {
        try {
          const resp = await this.$apis.getSignApi('/wingUserCheck', { nickname: this.nickname })
          if (!resp.data.isCheck) {
            alert(resp.data.message)
            this.$store.commit('setCheckNick', this.nickname)
            this.$router.push('/signup')
          } else {
            alert(resp.data.message)
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
