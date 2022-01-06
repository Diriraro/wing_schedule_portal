<template>
  <div class="index-container" />
</template>

<script>
export default {
  validate ({ redirect }) {
    redirect('/main')
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
