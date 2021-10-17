<template>
  <div class="app-container">
    <el-table
        :v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        :max-height="tableHeight"
        border
        stripe
        highlight-current-row
    >
      <!--      <el-table-column align="center" label="ID" width="95">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.$index }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="traceId" width="200" fixed="left" align="center">
        <template slot-scope="scope">
          {{ scope.row.trace }}
        </template>
      </el-table-column>
      <el-table-column label="spanId" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.span }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务名" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.service }}
        </template>
      </el-table-column>


      <el-table-column label="端口" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.port }}
        </template>
      </el-table-column>

      <el-table-column label="域名" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.host }}
        </template>
      </el-table-column>

      <el-table-column label="线程ID" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.pid }}
        </template>
      </el-table-column>

      <el-table-column label="线程名" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.thread }}
        </template>
      </el-table-column>

      <el-table-column label="版本号" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.version }}
        </template>
      </el-table-column>

      <el-table-column label="内容" width="1200" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.message }}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" width="100" label="级别" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.severity | statusFilter">{{ scope.row.severity }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" width="250" prop="timestamp" label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getList} from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        INFO: 'success',
        DEBUG: 'gray',
        ERROR: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      tableHeight: window.innerHeight - 150
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
