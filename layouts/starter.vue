<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications />
    <side-bar
      :background-color="sidebarBackground"
      short-title="CT"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'tim-icons icon-chart-pie-36',
            path: '/starter-page'
          }"
        />
      </template>
    </side-bar>
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar />
      <router-view name="header" />

      <div
        :class="{ content: !isFullScreenRoute }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view />
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
  import DashboardNavbar from '@/components/MVP/Layout/starter/SampleNavbar.vue'
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
    },
    data () {
      return {
        sidebarBackground: 'vue' // vue|blue|orange|green|red|primary
      }
    },
    computed: {
      isFullScreenRoute () {
        return this.$route.path === '/maps/full-screen'
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
