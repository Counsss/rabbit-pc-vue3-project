<template>
  <app-topnav />
  <app-header />
  <!-- 内容容器 -->
  <div class="app-body">
    <router-view />
  </div>
  <app-footer />
</template>

<script setup>
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue';
import AppFooter from '@/components/app-footer.vue'
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>