<template>
  <PageLayout>
    <template #content>
      <div>
        <Check />
      </div>
    </template>
  </PageLayout>
</template>

<script>
import PageLayout from '~/components/MVP/Common/PageLayout.vue'
import Check from '~/components/MVP/Signup/Check.vue'

export default {
  components: {
    PageLayout,
    Check
  },
  layout: 'olddefault'
}
</script>

<style lang="scss" scoped>

</style>
