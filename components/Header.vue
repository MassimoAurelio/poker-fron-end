<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
</script>

<template>
  <header>
    <div class="main-container">
      <a href="/rooms">ROOMS</a>
      <a @click="authStore.logout">LOG OUT</a>
    </div>
  </header>
</template>

<style scoped>
.main-container {
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>
