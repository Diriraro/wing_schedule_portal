<template>
  <PageLayout>
    <template #content>
      <div>
        <Login />
      </div>
    </template>
  </PageLayout>
</template>

<script>
import PageLayout from '~/components/MVP/Common/PageLayout.vue'
import Login from '~/components/MVP/Login/Login.vue'

export default {
  components: {
    PageLayout,
    Login
  }
}
</script>

<style lang="scss" scoped>

</style>
