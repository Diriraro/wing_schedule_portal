<template>
  <div v-click-outside="closeDropDown" class="fixed-plugin">
    <div class="dropdown show-dropdown" :class="{ show: isOpen }">
      <a data-toggle="dropdown" class="settings-icon">
        <i class="fa fa-cog fa-2x" @click="toggleDropDown" />
      </a>
      <ul class="dropdown-menu" :class="{ show: isOpen }">
        <li class="header-title">
          Sidebar Background
        </li>
        <li class="adjustments-line">
          <a class="switch-trigger background-color">
            <div class="badge-colors text-center">
              <span
                v-for="item in sidebarColors"
                :key="item.color"
                class="badge filter"
                :class="[`badge-${item.color}`, { active: item.active }]"
                :data-color="item.color"
                @click="changeSidebarBackground(item);"
              />
            </div>
            <div class="clearfix" />
          </a>
        </li>

        <li class="header-title">
          Sidebar Mini
        </li>
        <li class="adjustments-line">
          <!-- <div class="togglebutton switch-change-color mt-3">
            <span class="label-switch">LIGHT MODE</span>
            <base-switch v-model="darkMode" @input="toggleMode" />
            <span class="label-switch label-right">DARK MODE</span>
          </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  // import { BaseSwitch } from '@/components/MVP/BaseSwitch.vue'

  export default {
    name: 'SidebarShare',
    components: {
      // BaseSwitch
    },
    props: {
      backgroundColor: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        sidebarMini: true,
        darkMode: true,
        isOpen: false,
        sidebarColors: [
          { color: 'primary', active: false, value: 'primary' },
          { color: 'vue', active: true, value: 'vue' },
          { color: 'info', active: false, value: 'blue' },
          { color: 'success', active: false, value: 'green' }
        ]
      }
    },
    methods: {
      toggleDropDown () {
        this.isOpen = !this.isOpen
      },
      closeDropDown () {
        this.isOpen = false
      },
      toggleList (list, itemToActivate) {
        list.forEach((listItem) => {
          listItem.active = false
        })
        itemToActivate.active = true
      },
      changeSidebarBackground (item) {
        this.$emit('update:backgroundColor', item.value)
        this.toggleList(this.sidebarColors, item)
      },
      toggleMode (type) {
        const docClasses = document.body.classList
        if (type) {
          docClasses.remove('white-content')
        } else {
          docClasses.add('white-content')
        }
      },
      minimizeSidebar () {
        this.$sidebar.toggleMinimize()
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '~@/assets/sass/dashboard/custom/variables';

  .settings-icon {
    cursor: pointer;
  }

  .badge-vue {
    background-color: $vue;
  }
</style>
