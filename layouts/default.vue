<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
</script>

<template>
  <div class="layout-container">
    <slot />
  </div>
</template>

<style lang="scss">
.layout-container {
  height: 100vh;
}
</style>
