<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6" :class="'text-right'">
              <h5 class="card-category">
                Total shipments
              </h5>
              <h2 class="card-title">
                Performance
              </h2>
            </div>
            <div class="col-sm-6 d-flex d-sm-block">
              <div
                class="btn-group btn-group-toggle"
                :class="'float-left'"
                data-toggle="buttons"
              />
            </div>
          </div>
        </template>
        <div class="chart-area" />
      </card>
    </div>

    <!-- Small charts -->
    <div class="col-lg-4" :class="'text-right'">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">
            Total Shipments
          </h5>
          <h3 class="card-title">
            <i class="tim-icons icon-bell-55 text-primary " /> 763,215
          </h3>
        </template>
        <div class="chart-area" />
      </card>
    </div>
    <div class="col-lg-4" :class="'text-right'">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">
            Daily Sales
          </h5>
          <h3 class="card-title">
            <i class="tim-icons icon-delivery-fast text-info " /> 3,500€
          </h3>
        </template>
        <div class="chart-area" />
      </card>
    </div>
    <div class="col-lg-4" :class="'text-right'">
      <card type="chart">
        <template slot="header">
          <h5 class="card-category">
            Completed tasks
          </h5>
          <h3 class="card-title">
            <i class="tim-icons icon-send text-success " /> 12,100K
          </h3>
        </template>
        <div class="chart-area" />
      </card>
    </div>
    <div class="col-lg-5">
      <card type="tasks" :header-classes="'text-right'">
        <template slot="header" class="d-inline">
          <h6 class="title d-inline">
            Tasks (5)
          </h6>
          <p class="card-category d-inline">
            Today
          </p>

          <base-dropdown
            menu-on-right=""
            tag="div"
            title-classes="btn btn-link btn-icon"
            class="float-right"
          >
            <i slot="title" class="tim-icons icon-settings-gear-63" />
            <a class="dropdown-item" href="#pablo"> Action </a>
            <a class="dropdown-item" href="#pablo"> Another action </a>
            <a class="dropdown-item" href="#pablo"> Something else </a>
          </base-dropdown>
        </template>
        <div class="table-full-width table-responsive">
          <task-list />
        </div>
      </card>
    </div>
    <div class="col-lg-7">
      <card card-body-classes="table-full-width">
        <h4 slot="header" class="card-title">
          Striped table
        </h4>
        <el-table :data="tableData">
          <el-table-column
            min-width="150"
            sortable
            label="Name"
            property="name"
          />
          <el-table-column
            min-width="150"
            sortable
            label="Country"
            property="country"
          />
          <el-table-column
            min-width="150"
            sortable
            label="City"
            property="city"
          />
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Salary"
            property="salary"
          />
        </el-table>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui'
import TaskList from '@/components/MVP/Dashboard/TaskList.vue'

export default {
  name: 'Dashboard',
  components: {
    TaskList,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      tableData: [
        {
          id: 1,
          name: 'Dakota Rice',
          salary: '$36.738',
          country: 'Niger',
          city: 'Oud-Turnhout'
        },
        {
          id: 2,
          name: 'Minerva Hooper',
          salary: '$23,789',
          country: 'Curaçao',
          city: 'Sinaai-Waas'
        },
        {
          id: 3,
          name: 'Sage Rodriguez',
          salary: '$56,142',
          country: 'Netherlands',
          city: 'Baileux'
        },
        {
          id: 4,
          name: 'Philip Chaney',
          salary: '$38,735',
          country: 'Korea, South',
          city: 'Overland Park'
        },
        {
          id: 5,
          name: 'Doris Greene',
          salary: '$63,542',
          country: 'Malawi',
          city: 'Feldkirchen in Kärnten'
        }
      ]
    }
  },
  computed: {
    enableRTL () {
      return this.$route.query.enableRTL
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style></style>
