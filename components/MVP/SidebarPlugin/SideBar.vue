<template>
  <div class="sidebar" :data="backgroundColor">
    <div ref="sidebarScrollArea" class="sidebar-wrapper">
      <div class="logo">
        <a href="#" class="simple-text logo-mini">
          <img :src="logo" alt="app-logo">
        </a>
        <a href="#" class="simple-text logo-normal">
          {{ title }}
        </a>
      </div>
      <slot />
      <ul class="nav">
        <slot name="links">
          <sidebar-item
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :link="link"
          />
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  provide () {
    return {
      autoClose: this.autoClose
    }
  },
  props: {
    title: {
      type: String,
      default: 'Creative Tim',
      description: 'Sidebar title'
    },
    shortTitle: {
      type: String,
      default: 'CT',
      description: 'Sidebar short title'
    },
    // 01-27 수정
    logo: {
      type: String,
      default: '/main_symbol.png',
      description: 'Sidebar app logo'
    },
    backgroundColor: {
      type: String,
      default: 'vue',
      validator: (value) => {
        const acceptedValues = [
          '',
          'vue',
          'blue',
          'green',
          'primary'
        ]
        return acceptedValues.includes(value)
      },
      description:
        'Sidebar background color (vue|blue|green|orange|red|primary)'
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these."
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        'Whether sidebar should autoclose on mobile when clicking an item'
    }
  },
  beforeDestroy () {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false
    }
  }
}
</script>
<style>
@media (min-width: 992px) {
  .navbar-search-form-mobile,
  .nav-mobile-menu {
    display: none;
  }
}
</style>
