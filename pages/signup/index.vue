<template>
  <PageLayout>
    <template #content>
      <div>
        <Signup />
      </div>
    </template>
  </PageLayout>
</template>

<script>
import PageLayout from '~/components/MVP/Common/PageLayout.vue'
import Signup from '~/components/MVP/Signup/Signup.vue'

export default {
  components: {
    PageLayout,
    Signup
  }
}
</script>

<style lang="scss" scoped>

</style>
