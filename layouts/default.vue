<script setup lang="ts"></script>

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
