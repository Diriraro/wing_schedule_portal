<template>
  <section class="tna-error-page-20210809">
    <div class="systemWrap-pc">
      <div class="service-wrap">
        <h1 class="tit">
          {{ message }}
        </h1>
        <div class="subcopy">
          페이지가 제거되었거나 변경되어 사용하실 수 없습니다.
        </div>
        <div class="btn-main">
          <a href="/main">메인으로 이동</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    message () {
      const { statusCode } = this.error
      let message = ''
      switch (statusCode) {
        case 403:
          message = '토큰 유효시간이 종료되었습니다. 재로그인이 필요합니다.'
          break
        case 404:
          message = '요청하신 페이지를 찾을 수 없습니다.'
          break
        case 406:
          message = this.error.message
          break
        // case 500:
        //  message = '알 수 없는 오류가 발생하였습니다.';
        //  break;
        case 502:
          message = this.error.message
          break
        default:
          message = '요청하신 페이지를 찾을 수 없습니다.'
          break
      }
      return message
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 에러 메시지 alert 후 전 화면 가기
      const { statusCode } = this.error
      if (statusCode === 406) {
        setTimeout(this.go, 3000)
        this.$common.alert(this.message)
      }
    })
  },
  methods: {
    go () {
      this.$store.commit('openAlert', null)
      this.$router.go(-1) // 전 화면으로 보내기
    }
  }
}
</script>

<style lang="scss">
.tna-error-page-20210809 {
  color: #000;
  line-height: 1.6;
  padding: 0;

  .systemWrap-pc {
    .service-wrap {
      width: 1200px;height: 500px;position: absolute;top: 50%;left: 50%;margin: -250px 0 0 -600px;border: 1px solid #e2e2e2;border-radius: 5px;background: url(/images/bg-error-icon_v2.png) no-repeat 50% 130px;font-family: "NotoSansKR" !important;text-align: center;
      .tit{
        margin:0 auto;
        padding-top:220px;
        font-weight:400;
        font-size:24px;
        line-height:37px;
        span {font-weight:600;color:#ed2377;}
      }
      .date{margin-top: 210px; padding:20px 0;font-size:19px;font-weight:400; /* background:#f5f6f8;border-radius:5px; */}
      .subcopy {font-size:16px;margin-top:10px;line-height:23px; text-align:center; color:#666;}
      .btn-main {
        margin-top:30px;
        a {display:block;width:140px;/*height:31px;*/padding-top:9px;padding-bottom:9px;margin:auto;background:#000;color:#fff;font-size:13px;border-radius:5px;text-decoration:none;}
      }
    }
  }

  .systemWrap-mo {
    display: table;
    width: 100%;
    height: 100%;
    .service-wrap {
      padding: 0 20px;
      background: url(/images/bg-error-icon_v2.png) no-repeat center 30%;
      background-size: 80px;
      text-align: center;
      padding-top: 160px;
      .tit {
        font-size: 18px;
        font-weight: bold;
        margin: 12px 0;
      }
      .date{margin:20px 0;background:#f5f6f8;border-radius:5px;padding:25px 15px;font-size:13px;font-weight:bold;}
      .subcopy {
        font-size: 14px;
        margin-bottom: 25px;
        font-weight: bold;
        line-height: 25px;
        letter-spacing: -1px;
        text-align:center;
        color:#666;
      }
      .btn-main {
        margin: 20px 0 130px;
        a {display:block;width:140px;/*height:31px;*/padding-top:9px;padding-bottom:9px;margin:auto;background:#000;color:#fff;font-size:13px;border-radius:5px;text-decoration:none;}
      }
    }
  }
}
</style>
