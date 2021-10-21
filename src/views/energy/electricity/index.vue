<template>
  <div class="app-container">
    <div id="main" style="width: 1800px;height:800px;"></div>
  </div>
</template>

<script>

import {todayElectricity} from '@/api/user'
import * as echarts from 'echarts';

export default {
  name: 'TodayElectricity',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const char = echarts.init(document.getElementById("main"));

      // let option = {
      //   xAxis: {
      //     type: 'category',
      //     // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      //     data: []
      //   },
      //   yAxis: {
      //     type: 'value'
      //   },
      //   series: [
      //     {
      //       data: [],
      //       type: 'line',
      //       smooth: true
      //     }
      //   ]
      // };

      todayElectricity().then(response => {
        this.list = response.data
        const categoryList = this.list.map(item => {
          return item.subscript
        })

        const seriesList = this.list.map(item => {
          return item.used
        })

        char.setOption({
          xAxis: {
            type: 'category',
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            data: categoryList,
            nameLocation: "center",
            name: "电量巴拉巴拉",
            nameTextStyle: {
              padding: [20, 0, 10, 0]
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: seriesList,
              type: 'line',
              smooth: true
            }
          ]
        })
      })
    }
  }
}
</script>

<style scoped>
</style>

