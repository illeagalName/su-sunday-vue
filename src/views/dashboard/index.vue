<template>
  <div class="dashboard-container">
    <div class="dashboard-text">userName: {{ userName }}</div>
    <div class="dashboard-text">nickName: {{ nickName }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'userName',
      'nickName',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
