<template>
  <div class="alertWrapper">
    <div class="content fixWidth">
      <div class="message" v-html="$store.state.alertInfo.text" />
      <div class="btnWrap" :class="$store.state.alertInfo.arrBtn.length > 1 ? 'multi' : ''">
        <button
          v-for="(x, index) in $store.state.alertInfo.arrBtn.slice(0, 2)"
          :key="index"
          @click="x.event ? action(x.event) : $store.commit('openAlert', null)"
        >
          {{ x.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    action (event) {
      event()
      this.$store.commit('openAlert', null)
    }
  }
}
</script>

<style lang="scss">
.alertWrapper{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1310; /* 딤팝업보다 높게 */
  .content{
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: #FFF;
    width: calc(100% - 48px);
    /* max-width: 720px; */
    max-width: 520px;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    border: solid 1px #ebecf1;
    .message{
      padding: 40px 20px;
      text-align: center;
      font-size: 13px;
      line-height: 18px;
      > span{
        color: #ff3478;
        white-space: nowrap;
      }
    }
    .btnWrap{
      width: 100%;
      padding: 12px 14px 14px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      &.multi{
        button{
          width: 50%;
          & ~ button{
            margin-left: 7px;
          }
          &:nth-child(2) {
            color: #fff;
            background: #bbb;
            border: 1px solid #bbb;
            // color: #000;
            // border: 1px solid #000;
          }
        }
      }
      button {
        font-size: 13px;
        width: 100%;
        height: 43px;
        border-radius: 4px;
        color: #fff;
        background: #000;
        border: 1px solid #000;
        // color: #ff3478;
        // border: 1px solid #ff3478;
      }
    }
  }
}
</style>
