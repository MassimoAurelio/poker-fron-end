<script setup lang="ts">
import { Header } from "@/widgets/header";
</script>

<template>
  <div class="layout-container">
    <Header />
    <slot />
  </div>
</template>

<style lang="scss">
.layout-container {
  height: 100vh;
}
</style>
