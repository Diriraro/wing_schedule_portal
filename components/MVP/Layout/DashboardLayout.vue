<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications />
    <side-bar
      :background-color="sidebarBackground"
      :short-title="'sidebar.shortTitle'"
      :title="'sidebar.title'"
    >
      <!-- <template slot="links" slot-scope="props"> -->
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'sidebar.dashboard',
            icon: 'tim-icons icon-chart-pie-36',
            path: '/dashboard'
          }"
        />
        <sidebar-item
          :link="{ name: 'sidebar.pages', icon: 'tim-icons icon-image-02' }"
        >
          <sidebar-item
            :link="{ name: 'sidebar.pricing', path: '/pricing' }"
          />
          <sidebar-item
            :link="{ name: 'sidebar.rtl', path: '/pages/rtl' }"
          />
          <sidebar-item
            :link="{ name: 'sidebar.timeline', path: '/pages/timeline' }"
          />
          <sidebar-item
            :link="{ name: 'sidebar.login', path: '/login' }"
          />
          <sidebar-item
            :link="{ name: 'sidebar.register', path: '/register' }"
          />
          <sidebar-item
            :link="{ name: 'sidebar.lock', path: '/lock' }"
          />
          <sidebar-item
            :link="{ name: 'sidebar.userProfile', path: '/pages/user' }"
          />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'sidebar.components',
            icon: 'tim-icons icon-molecule-40'
          }"
        >
          <sidebar-item :link="{ name: 'sidebar.multiLevelCollapse' }">
            <sidebar-item
              :link="{
                name: 'sidebar.example',
                isRoute: false,
                path: 'https://google.com',
                target: '_blank'
              }"
            />
          </sidebar-item>

          <sidebar-item
            :link="{ name: 'sidebar.buttons', path: '/components/buttons' }"
          />
          <sidebar-item
            :link="{
              name: 'sidebar.gridSystem',
              path: '/components/grid-system'
            }"
          />
          <sidebar-item
            :link="{ name: 'sidebar.panels', path: '/components/panels' }"
          />
          <sidebar-item
            :link="{
              name: 'sidebar.sweetAlert',
              path: '/components/sweet-alert'
            }"
          />
          <sidebar-item
            :link="{
              name: 'sidebar.notifications',
              path: '/components/notifications'
            }"
          />
          <sidebar-item
            :link="{ name: 'sidebar.icons', path: '/components/icons' }"
          />
          <sidebar-item
            :link="{
              name: 'sidebar.typography',
              path: '/components/typography'
            }"
          />
        </sidebar-item>
        <sidebar-item
          :link="{ name: 'sidebar.forms', icon: 'tim-icons icon-notes' }"
        >
          <sidebar-item
            :link="{ name: 'sidebar.regularForms', path: '/forms/regular' }"
          />
          <sidebar-item
            :link="{
              name: 'sidebar.extendedForms',
              path: '/forms/extended'
            }"
          />
          <sidebar-item
            :link="{
              name: 'sidebar.validationForms',
              path: '/forms/validation'
            }"
          />
          <sidebar-item
            :link="{ name: 'sidebar.wizard', path: '/forms/wizard' }"
          />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'sidebar.tables',
            icon: 'tim-icons icon-puzzle-10'
          }"
        >
          <sidebar-item
            :link="{
              name: 'sidebar.regularTables',
              path: '/table-list/regular'
            }"
          />
          <sidebar-item
            :link="{
              name: 'sidebar.extendedTables',
              path: '/table-list/extended'
            }"
          />
          <sidebar-item
            :link="{
              name: 'sidebar.paginatedTables',
              path: '/table-list/paginated'
            }"
          />
        </sidebar-item>
        <sidebar-item
          :link="{ name: 'sidebar.maps', icon: 'tim-icons icon-pin' }"
        >
          <sidebar-item
            :link="{ name: 'sidebar.googleMaps', path: '/maps/google' }"
          />
          <sidebar-item
            :link="{
              name: 'sidebar.fullScreenMaps',
              path: '/maps/full-screen'
            }"
          />
          <sidebar-item
            :link="{ name: 'sidebar.vectorMaps', path: '/maps/vector-map' }"
          />
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'sidebar.widgets',
            icon: 'tim-icons icon-settings',
            path: '/widgets'
          }"
        />
        <sidebar-item
          :link="{
            name: 'sidebar.charts',
            icon: 'tim-icons icon-chart-bar-32',
            path: '/charts'
          }"
        />
        <sidebar-item
          :link="{
            name: 'sidebar.calendar',
            icon: 'tim-icons icon-time-alarm',
            path: '/calendar'
          }"
        />
      </template>
    </side-bar>
    <!--Share plugin (for demo purposes). You can remove it if don't plan on using it-->
    <sidebar-share :background-color.sync="sidebarBackground" />
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar />
      <router-view name="header" />

      <div
        :class="{ content: !$route.meta.hideContent }"
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
import SidebarShare from './SidebarSharePlugin.vue'

import DashboardNavbar from './DashboardNavbar.vue'
// import DashboardContent from './Content.vue'
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
    ZoomCenterTransition,
    SidebarShare
  },
  data () {
    return {
      sidebarBackground: 'vue' // vue|blue|orange|green|red|primary
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
