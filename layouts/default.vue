<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications />
    <side-bar
      :background-color="sidebarBackground"
      :short-title="'sidebar.shortTitle'"
      :title="'sidebar.title'"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'sidebar.dashboard',
            icon: 'tim-icons icon-chart-pie-36',
            path: '/'
          }"
        />
        <sidebar-item
          :link="{
            name: 'sidebar.icons',
            icon: 'tim-icons icon-atom',
            path: '/icons'
          }"
        />
        <sidebar-item
          :link="{
            name: 'sidebar.maps',
            icon: 'tim-icons icon-pin',
            path: '/google'
          }"
        />

        <sidebar-item
          :link="{
            name: 'sidebar.notifications',
            icon: 'tim-icons icon-bell-55',
            path: '/notifications'
          }"
        />

        <sidebar-item
          :link="{
            name: 'sidebar.userProfile',
            icon: 'tim-icons icon-single-02',
            path: '/user' }"
        />

        <sidebar-item
          :link="{
            name: 'sidebar.regularTables',
            icon: 'tim-icons icon-puzzle-10',
            path: '/regular'
          }"
        />

        <sidebar-item
          :link="{
            name: 'sidebar.typography',
            icon: 'tim-icons icon-align-center',
            path: '/typography'
          }"
        />
      </template>
    </side-bar>
    <!--Share plugin (for demo purposes). You can remove it if don't plan on using it-->
    <!-- <sidebar-share :background-color.sync="sidebarBackground" /> -->
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar />
      <router-view name="header" />

      <div
        :class="{ content: !isFullScreenRoute }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <nuxt />
        </zoom-center-transition>
      </div>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar'
  import 'perfect-scrollbar/css/perfect-scrollbar.css'
  // import { SlideYDownTransition, ZoomCenterTransition } from 'vue2-transitions'
  import { ZoomCenterTransition } from 'vue2-transitions'
  // import SidebarShare from '@/components/MVP/Layout/SidebarSharePlugin.vue'

  import DashboardNavbar from '@/components/MVP/Layout/DashboardNavbar.vue'
  // import DashboardContent from '@/components/Layout/Content.vue'
  function hasElement (className) {
    return document.getElementsByClassName(className).length > 0
  }

  function initScrollbar (className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`)
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className)
      }, 100)
    }
  }

  export default {
    components: {
      DashboardNavbar,
      // DashboardContent,
      // SlideYDownTransition,
      ZoomCenterTransition
      // SidebarShare
    },
    data () {
      return {
        sidebarBackground: 'blue' // vue|blue|orange|green|red|primary
      }
    },
    computed: {
      isFullScreenRoute () {
        return this.$route.path === '/maps/full-screen'
      }
    },
    beforeMount () {
      if (this.$cookies.get('nickname') === '' || this.$cookies.get('nickname') === null) {
        alert('재로그인이 필요해요')
        this.$router.push('/login')
      }
    },
    mounted () {
      this.initScrollbar()
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      initScrollbar () {
        const docClasses = document.body.classList
        const isWindows = navigator.platform.startsWith('Win')
        if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function
          initScrollbar('sidebar')
          initScrollbar('main-panel')
          initScrollbar('sidebar-wrapper')

          docClasses.add('perfect-scrollbar-on')
        } else {
          docClasses.add('perfect-scrollbar-off')
        }
      }
    }
  }
</script>
<style lang="scss">
  $scaleSize: 0.95;
  @keyframes zoomIn95 {
    from {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
    to {
      opacity: 1;
    }
  }

  .main-panel .zoomIn {
    animation-name: zoomIn95;
  }

  @keyframes zoomOut95 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
  }

  .main-panel .zoomOut {
    animation-name: zoomOut95;
  }
</style>
