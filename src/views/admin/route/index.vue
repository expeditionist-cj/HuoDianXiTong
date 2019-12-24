<template>
  <div class="execution">
    <basic-container>
      <el-alert
        title="路由配置是非常专业的事情，不建议非工程师操作"
        type="warning">
      </el-alert>
      <vue-json-editor v-model="json" :show-btns="false"></vue-json-editor>
      <div align='center'>
        <el-button @click="edit()">更新</el-button>
      </div>
    </basic-container>
  </div>
</template>
<script>
  import vueJsonEditor from 'vue-json-editor'
  import {fetchList, putObj} from '@/api/admin/route'

  export default {
    data() {
      return {
        json: null
      }
    },

    // 注入vueJsonEditor组件
    components: {
      vueJsonEditor
    },

    created() {
      this.getList()
    },

    methods: {
      getList() {
        fetchList().then(response => {
          let result = response.data.data;
          for (var i = 0; i < result.length; i++) {
            let route = result[i]
            if (route.predicates) {
              let predicates = route.predicates
              route.predicates = JSON.parse(predicates)
            }
            if (route.filters) {
              let filters = route.filters
              route.filters = JSON.parse(filters)
            }
          }
          this.json = result
        })
      },

      edit() {
        putObj(this.json).then(() => {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    }
  }
</script>
