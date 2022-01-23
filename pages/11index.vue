<template>
  <div class="index-container" />
</template>

<script>
export default {
  validate ({ redirect }) {
    redirect('/main')
    console('메인으로 리다이렉트')
    return true
  }
}
</script>

<style>
.index-container {
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
